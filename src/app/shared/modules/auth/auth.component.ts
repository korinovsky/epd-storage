import {Component} from '@angular/core';
import {AuthService, User} from "~core/auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
    user: User;
    constructor(
        private auth: AuthService
    ) {
        this.auth.user$.subscribe(user => this.user = user);
    }

    login() {
        this.auth.login();
    }

    logout() {
        this.auth.logout();
    }
}
