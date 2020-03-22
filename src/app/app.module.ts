import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StorageModule} from "./storage/storage.module";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        StorageModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
