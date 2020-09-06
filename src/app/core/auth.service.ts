import {Injectable} from '@angular/core';
import {auth, User as FirebaseUser} from 'firebase/app';
import {FirebaseAuth} from '@angular/fire';
import {AngularFireAuth} from '@angular/fire/auth';
import {BehaviorSubject, Observable} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map, tap} from 'rxjs/operators';

export type User = FirebaseUser;

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    readonly user$ = new BehaviorSubject<User>(undefined);
    readonly isUserLoggedIn$ = new BehaviorSubject(false);
    private readonly auth: FirebaseAuth;

    constructor(angularFireAuth: AngularFireAuth) {
        angularFireAuth.user.subscribe(user => this.user = user);
        this.auth = angularFireAuth.auth;
        this.user$.subscribe(user => this.isUserLoggedIn$.next(!!user));
    }

    get user(): User {
        return this.user$.value;
    }

    set user(user: User) {
        this.user$.next(user);
    }

    login(): Observable<User> {
        return fromPromise(this.auth.signInWithPopup(new auth.GoogleAuthProvider())).pipe(
            map(user => this.user = user.user)
        );
    }

    logout(): Observable<void> {
        return fromPromise(this.auth.signOut()).pipe(
            tap(() => this.user = null)
        );
    }
}
