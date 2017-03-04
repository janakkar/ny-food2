import {firebaseAuth} from '../App';
// import { Subject } from "rxjs/Rx";

export class AuthService {

    static signupUser(user) {
        return firebaseAuth.createUserWithEmailAndPassword(user.email, user.password)
    }

    static signinUser(user) {
        return firebaseAuth.signInWithEmailAndPassword(user.email, user.password);
    }

    static logout() {
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