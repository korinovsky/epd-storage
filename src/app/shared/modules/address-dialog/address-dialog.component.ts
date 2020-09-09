import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {User} from '~models/user.model';
import {Address} from '~models/address.model';

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

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AddressDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data: DialogData,
    ) {}

    get disableClose(): boolean {
        return this.dialogRef.disableClose;
    }

    ngOnInit(): void {
    }

    close(address?: Address): void {
        this.dialogRef.close(address);
    }
}
