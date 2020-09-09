import { Injectable } from '@angular/core';
import {AuthService, AuthUser} from '~core/auth.service';
import {UserService} from '~services/user.service';
import {catchError, filter, switchMap, tap} from 'rxjs/operators';
import {Error} from '~models/error.model';
import {User} from '~models/user.model';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import _identity from 'lodash/identity';
import {MatDialog} from '@angular/material/dialog';
import {AddressDialogComponent, DialogData} from '~modules/address-dialog/address-dialog.component';
import autobind from 'autobind-decorator';

@Injectable({
  providedIn: 'root'
})
export class AppService {
    user$ = new BehaviorSubject<User>(null);

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private matDialog: MatDialog,
    ) {}

    get user(): User {
        return this.user$.value;
    }

    set user(user: User) {
        this.user$.next(user);
    }

    init(): void {
        this.authService.user$.pipe(
            tap(user => {
                if (!user && this.user) {
                    this.user = null;
                }
            }),
            filter(_identity),
            switchMap(this.getUser$)
        ).subscribe(user => {
            if (user.addresses?.length > 0) {
                return;
            }
            this.addAddress$(user, true).subscribe(() => {
                this.user = user;
            });
        });
    }

    @autobind
    private getUser$(user: AuthUser): Observable<User> {
        return this.userService.get$(user.uid).pipe(
            catchError(error =>
                error === Error.NotFound
                    ? this.userService.add$({id: user.uid} as User)
                    : throwError(error)
            )
        );
    }

    private addAddress$(user: User, disableClose = false): Observable<void> {
        const dialogRef = this.matDialog.open(AddressDialogComponent, {
            data: {user} as DialogData,
            disableClose
        });
        return dialogRef.beforeClosed().pipe(
            filter(_identity)
        );
    }
}
