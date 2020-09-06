import {LOCALE_ID, NgModule} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {AngularFireModule} from '@angular/fire';
import {environment} from '~env/environment';
import {AngularFirestore} from '@angular/fire/firestore';
import moment from 'moment';
import 'moment/locale/ru';

registerLocaleData(localeRu, 'ru');

moment.locale('ru');

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
