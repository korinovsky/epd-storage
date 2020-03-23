import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StorageModule} from "./storage/storage.module";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {AuthModule} from "./auth/auth.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        StorageModule,
        AuthModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
