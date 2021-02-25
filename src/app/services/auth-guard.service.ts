import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    isAuth = false;

    constructor(private authService: AuthService,
        private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        this.authService.isAuthSubject.subscribe(isAuth => this.isAuth = isAuth);
        this.authService.emitIsAuth();

        if (this.isAuth) {
            return true;
        } else {
            return this.router.navigate(['auth', 'signin']);
        }
    }
}



