import {Component} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase';
import {FirebaseAuth} from "@angular/fire";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
    private user: firebase.User;
    private auth: FirebaseAuth;

    constructor(auth: AngularFireAuth) {
        auth.user.subscribe(user => console.log(this.user = user));
        this.auth = auth.auth;
    }

    login() {
        this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then(user => this.user = user.user);
    }

    logout() {
        this.auth.signOut()
            .then(() => this.user = null);
    }
}
