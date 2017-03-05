import { firebaseAuth } from '../Root';
import { Subject } from "rxjs/Rx";


export function signupUser(user) {
    return firebaseAuth.createUserWithEmailAndPassword(user.email, user.password)
}

export function signinUser(user) {
    return firebaseAuth.signInWithEmailAndPassword(user.email, user.password);
}

export function logout() {
    firebaseAuth.signOut();
}

export function isAuthenticated() {
    const state = new Subject();
    firebaseAuth.onAuthStateChanged(function (user) {
        if (user) {
            state.next(true);
        } else {
            state.next(false);
        }
    });
    return state.asObservable();
}