import {Injectable} from '@angular/core';
import {auth, User as FirebaseUser} from 'firebase/app';
import {FirebaseAuth} from "@angular/fire";
import {AngularFireAuth} from "@angular/fire/auth";
import {BehaviorSubject} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";
import {tap} from "rxjs/operators";

export type User = FirebaseUser;

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    readonly user$ = new BehaviorSubject<User>(undefined);
    readonly isUserLoggedIn$ = new BehaviorSubject(false);
    private readonly auth: FirebaseAuth;

    constructor(auth: AngularFireAuth) {
        auth.user.subscribe(user => this.user = user);
        this.auth = auth.auth;
        this.user$.subscribe(user => this.isUserLoggedIn$.next(!!user));
    }

    get user() {
        return this.user$.value;
    }

    set user(user: User) {
        this.user$.next(user);
    }

    login() {
        return fromPromise(this.auth.signInWithPopup(new auth.GoogleAuthProvider())).pipe(
            tap(user => this.user = user.user)
        );
    }

    logout() {
        return fromPromise(this.auth.signOut()).pipe(
            tap(() => this.user = null)
        );
    }
}
