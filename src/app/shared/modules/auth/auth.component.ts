import {Component} from '@angular/core';
import {AuthService, AuthUser} from '~core/auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
    user: AuthUser;
    constructor(
        private auth: AuthService
    ) {
        this.auth.user$.subscribe(user => this.user = user);
    }

    login(): void {
        this.auth.login$();
    }

    logout(): void {
        this.auth.logout$();
    }
}
