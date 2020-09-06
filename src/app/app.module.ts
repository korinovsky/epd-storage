import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthModule} from '~modules/auth/auth.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from '~core/core.module';
import {MatButtonModule} from '@angular/material/button';

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
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
