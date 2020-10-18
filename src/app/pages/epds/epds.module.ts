import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EpdsComponent} from './epds.component';
import {MatButtonModule} from '@angular/material/button';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {EpdsItemModule} from './item/item.module';
import {EpdsRoutingModule} from './epds-routing.module';
import {EpdsDetailsModule} from '~app/pages/epds/details/details.module';
import {EpdsFormModule} from '~app/pages/epds/form/form.module';
import {LoaderModule} from '~modules/loader/loader.module';

@NgModule({
    declarations: [
        EpdsComponent
    ],
    imports: [
        EpdsRoutingModule,
        CommonModule,
        AngularFirestoreModule,
        MatButtonModule,
        EpdsItemModule,
        EpdsDetailsModule,
        EpdsFormModule,
        LoaderModule
    ]
})
export class EpdsModule {}
