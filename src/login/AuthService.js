import {firebaseAuth} from '../Root';
// import { Subject } from "rxjs/Rx";

export class AuthService {

    signupUser(user) {
        return firebaseAuth.createUserWithEmailAndPassword(user.email, user.password)
    }

    signinUser(user) {
        return firebaseAuth.signInWithEmailAndPassword(user.email, user.password);
    }

    logout() {
        firebaseAuth.signOut();
    }

    // isAuthenticated() {
    //     const state = new Subject();
    //     firebaseAuth.onAuthStateChanged(function (user) {
    //         if (user) {
    //             state.next(true);
    //         } else {
    //             state.next(false);
    //         }
    //     });
    //     return state.asObservable();
    // }
}