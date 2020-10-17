import {Injectable} from '@angular/core';
import {auth, User as FirebaseUser} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {BehaviorSubject, Observable} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map, tap} from 'rxjs/operators';

export type AuthUser = FirebaseUser;

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    readonly user$ = new BehaviorSubject<AuthUser>(undefined);
    readonly isUserLoggedIn$ = new BehaviorSubject(false);

    constructor(private fireAuth: AngularFireAuth) {
        fireAuth.user.subscribe(user => this.user = user);
        this.user$.subscribe(user => this.isUserLoggedIn$.next(!!user));
    }

    get user(): AuthUser {
        return this.user$.value;
    }

    set user(user: AuthUser) {
        this.user$.next(user);
    }

    login$(): Observable<AuthUser> {
        return fromPromise(this.fireAuth.signInWithPopup(new auth.GoogleAuthProvider())).pipe(
            map(user => this.user = user.user)
        );
    }

    logout$(): Observable<void> {
        return fromPromise(this.fireAuth.signOut()).pipe(
            tap(() => this.user = null)
        );
    }
}
