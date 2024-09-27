import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
@Injectable({
    providedIn: 'root'
})
  
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise<boolean | UrlTree> | boolean | UrlTree {
        
        return this.authService.isLoggedIn().then((isLoggedIn) => {
          if (isLoggedIn) {
            return true;
          } else {
            return this.router.createUrlTree(['/auth/login']); // Redirigir al login
          }
        });
      }
}