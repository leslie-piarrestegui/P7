import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { User } from "../models/user.model";


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isAuthSubject = new Subject<boolean>();
    private users: User[] = [
        {
            lastName: "",
            firstName: "",
            email: ""
        }
    ];
    userSubject = new Subject<User[]>();


    constructor(private router: Router) { }

    private isAuth = false;

    emitIsAuth() {
        this.isAuthSubject.next(this.isAuth);
    } 

    signIn() {
        return new Promise(
            (resolve) => {
                setTimeout(
                    () => {
                        this.isAuth = true;
                        this.emitIsAuth();
                        resolve(true);
                    }, 1000
                );
            }
        );
    }

    singOut() {
        this.isAuth = false;
        this.emitIsAuth();
        this.router.navigate(['/auth', 'signin']);
    }

    emitUsers() {
        this.userSubject.next(this.users.slice());
    }

    addUser(user: User) {
        this.users.push(user);
        this.emitUsers();
    }
}

