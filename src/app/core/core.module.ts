import {LOCALE_ID, NgModule} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeRu from "@angular/common/locales/ru";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../environments/environment";
import {AngularFirestore} from "@angular/fire/firestore";

registerLocaleData(localeRu, 'ru');

@NgModule({
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
    ],
    providers: [
        {provide: LOCALE_ID, useValue: 'ru'},
        AngularFirestore
    ],
})
export class CoreModule {}
