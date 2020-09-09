import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthModule} from '~modules/auth/auth.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from '~core/core.module';
import {MatButtonModule} from '@angular/material/button';
import {AppService} from '~services/app.service';
import {MatDialogModule} from '@angular/material/dialog';
import {AddressDialogModule} from '~modules/address-dialog/address-dialog.module';

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
        MatButtonModule,
        MatDialogModule,
        AddressDialogModule
    ],
    providers: [
        AppService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
