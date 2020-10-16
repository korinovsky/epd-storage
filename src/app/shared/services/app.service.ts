import { Injectable } from '@angular/core';
import {AuthService, AuthUser} from '~core/auth.service';
import {UserService} from '~services/user.service';
import {catchError, filter, map, switchMap, tap} from 'rxjs/operators';
import {Error} from '~models/error.model';
import {User} from '~models/user.model';
import {BehaviorSubject, iif, Observable, of, throwError} from 'rxjs';
import _identity from 'lodash/identity';
import {MatDialog} from '@angular/material/dialog';
import {AddressDialogComponent, DialogData} from '~modules/address-dialog/address-dialog.component';
import autobind from 'autobind-decorator';
import {AddressService} from '~services/address.service';
import {Address} from '~models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
    user$ = new BehaviorSubject<User>(null);
    address$ = new BehaviorSubject<Address>(null);

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private addressService: AddressService,
        private matDialog: MatDialog,
    ) {}

    get user(): User {
        return this.user$.value;
    }

    set user(user: User) {
        this.user$.next(user);
    }

    get address(): Address {
        return this.address$.value;
    }

    set address(address: Address) {
        this.address$.next(address);
    }

    init(): void {
        this.authService.user$.pipe(
            tap(user => {
                if (!user && this.user) {
                    this.user = null;
                }
            }),
            filter(_identity),
            switchMap(this.getUserInfo$)
        ).subscribe(({user, address}) => {
            if (!address) {
                this.addAddress$(user, true).subscribe(newAddress => {
                    this.user = user;
                    this.address = newAddress;
                });
            }
            this.user = user;
            this.address = address;
        });
    }

    @autobind
    private getUserInfo$({uid: id}: AuthUser): Observable<{ user: User, address?: Address }> {
        return this.userService.get$(id).pipe(
            catchError(error =>
                error === Error.NotFound
                    ? this.userService.add$({id} as User)
                    : throwError(error)
            ),
            switchMap(user => {
                const {addresses = [], currentAddress = 0} = user;
                const addressRef = addresses.length > 0 && addresses[currentAddress < addresses.length ? currentAddress : 0];
                return iif(
                    () => !addressRef,
                    of({user}),
                    this.addressService.getByRef$(addressRef).pipe(
                        map(address => ({user, address}))
                    )
                );
            })
        );
    }

    addAddress(): void {
        const {user} = this;
        this.addAddress$(user).subscribe(
            address => {
                this.user = user;
                this.address = address;
            }
        );
    }

    private addAddress$(user: User, disableClose = false): Observable<Address> {
        const dialogRef = this.matDialog.open(AddressDialogComponent, {
            data: {user} as DialogData,
            disableClose
        });
        return dialogRef.beforeClosed().pipe(
            filter(_identity)
        );
    }
}
