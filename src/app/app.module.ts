import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthModule} from '~modules/auth/auth.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from '~core/core.module';
import {AppService} from '~services/app.service';
import {AddressDialogModule} from '~modules/address-dialog/address-dialog.module';
import {AddressModule} from '~modules/address/address.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        AuthModule,
        MatToolbarModule,
        AddressDialogModule,
        AddressModule
    ],
    providers: [
        AppService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
