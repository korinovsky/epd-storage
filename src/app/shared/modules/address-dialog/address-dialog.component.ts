import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {User} from '~models/user.model';
import {Address} from '~models/address.model';
import {AddressService} from '~services/address.service';
import {iif} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import autobind from 'autobind-decorator';
import {UserService} from '~services/user.service';

export interface DialogData {
    user: User;
    address?: Address;
}

@Component({
    selector: 'app-address-dialog',
    templateUrl: './address-dialog.component.html',
    styleUrls: ['./address-dialog.component.scss']
})
export class AddressDialogComponent implements OnInit {
    form = this.fb.group({
        name: [null, Validators.required]
    });

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private addressService: AddressService,
        private dialogRef: MatDialogRef<AddressDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: DialogData,
    ) {}

    get isNew(): boolean {
        return !this.address;
    }

    get disableClose(): boolean {
        return this.dialogRef.disableClose;
    }

    get name(): FormControl {
        return this.form.get('name') as FormControl;
    }

    get nameErrorMessage(): string {
        return 'Поле обязательно для заполнения';
    }

    private get user(): User {
        return this.data.user;
    }

    private get address(): Address {
        return this.data?.address;
    }

    ngOnInit(): void {
        if (!this.isNew) {
            this.form.reset(this.address);
        }
    }

    @autobind
    close(address?: Address): void {
        this.dialogRef.close(address);
    }

    process(): void {
        if (!this.form.valid) {
            return;
        }
        const {value} = this.form;
        this.form.disable();
        iif(
            () => this.isNew,
            this.addressService.add$(value).pipe(
                switchMap(address => {
                    const {addresses = [], ...rest} = this.user;
                    const user = {
                        ...rest,
                        addresses: [
                            ...addresses,
                            this.addressService.getDocumentRef$(address.id)
                        ]
                    };
                    return this.userService.update$(user).pipe(
                        map(() => {
                            this.user.addresses = user.addresses;
                            return address;
                        }),
                    );
                }),
            ),
            this.addressService.update$(Object.assign({}, this.address, value))
        ).subscribe(this.close);
    }
}
