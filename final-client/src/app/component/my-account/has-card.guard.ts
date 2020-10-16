import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {CardService} from '../../shared/service/card.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class HasCardGuard implements CanActivate {


  constructor(
    private cardService: CardService,
    private snack: MatSnackBar,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.cardService.activedCard) {
      this.snack.open('It seems you don\'t have a card in your account, try add one!', '', {duration: 3000, panelClass: ['red-snackbar']});
      this.router.navigate(['/myAccount/addCard']).catch();
      return false;
    }
    return true;
  }
}
