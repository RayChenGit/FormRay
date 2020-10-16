import { Injectable } from '@angular/core';
import {CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // console.log(next.routeConfig.path);

    if (!this.auth.user) {
      this.router.navigate(['/home']).catch();
      return false;
    }
    switch (next.routeConfig.path) {
      case 'myAccount':
        !this.auth.normal && this.router.navigate(['/home']).catch();
        return this.auth.normal;
      case 'banker':
        !this.auth.banker && this.router.navigate(['/home']).catch();
        return this.auth.banker;
      case 'admin':
        !this.auth.admin && this.router.navigate(['/home']).catch();
        return this.auth.admin;
      default:
        return false;
    }
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    // console.log(route.path);

    if (!this.auth.user) {
      this.router.navigate(['/home']).catch();
      return false;
    }
    switch (route.path) {
      case 'myAccount':
        !this.auth.normal && this.router.navigate(['/home']).catch();
        return this.auth.normal;
      case 'banker':
        !this.auth.banker && this.router.navigate(['/home']).catch();
        return this.auth.banker;
      case 'admin':
        !this.auth.admin && this.router.navigate(['/home']).catch();
        return this.auth.admin;
      default:
        return false;
    }
  }
}
