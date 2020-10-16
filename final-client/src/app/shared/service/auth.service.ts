import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {User} from '../model/user';
import {Card} from '../model/card';
import {CardService} from './card.service';
import {MatTableDataSource} from '@angular/material/table';
import {Transaction} from '../model/transaction';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  normal: boolean;
  banker: boolean;
  admin: boolean;

  constructor(private httpClient: HttpClient, private cardService: CardService) {
    this.checkLogin()
      .subscribe( res => {
        if (res.success) {
          this.user = res.user;
          this.normal = this.checkAuthority('normal_user');
          this.banker = this.checkAuthority('banker');
          this.admin = this.checkAuthority('admin');
          this.user.cards.sort((c1, c2) => c1.cardType.id - c2.cardType.id);
          if (this.user.cards.length > 0) {
            this.cardService.activedCard = this.user.cards[0];
            this.cardService.transactions =
              new MatTableDataSource<Transaction>(this.cardService.activedCard.transactions.
              sort((t1, t2) => t2.time.localeCompare(t1.time)));
          }
        }
      });
  }

  checkLogin(): Observable<{success: boolean, user?: User}> {
    return this.httpClient.get<{success: boolean, user?: User}> (
      `${environment.Backend_URL}/checkLogin`,
      {withCredentials: true}
    );
  }

  checkAuthority(auth): boolean {
    if (this.user) {
      return this.user.roles.findIndex(role => role?.type === auth) > -1;
    }
    return false;
  }

  updateUser(user): void {
    this.user = user;
    this.normal = this.checkAuthority('normal_user');
    this.banker = this.checkAuthority('banker');
    this.admin = this.checkAuthority('admin');
    this.user.cards.sort((c1, c2) => c1.cardType.id - c2.cardType.id);
  }

  clearUser(): void {
    this.user = null;
    this.normal = false;
    this.banker = false;
    this.admin = false;
    this.cardService.activedCard = null;
    this.cardService.transactions = null;
  }

  getNewest(): void {
    this.httpClient.put<User> (
      `${environment.Backend_URL}/users/newest`,
      {username: this.user.username},
      {withCredentials: true}
    ).subscribe(res => {
      this.user = res;
      this.user.cards.sort((c1, c2) => c1.cardType.id - c2.cardType.id);
      this.cardService.activedCard = this.user.cards.find(c => c.cardnumber === this.cardService.activedCard.cardnumber);
      if (this.cardService.activedCard) {
        this.cardService.transactions.data = this.cardService.activedCard.transactions.sort((t1, t2) => t2.time.localeCompare(t1.time));
      }
    });
  }

  login(user, checked): Observable<{success: boolean, user?: User}> {
    const userFormData = new HttpParams()
      .append('username', user.username)
      .append('password', user.password)
      .append('remember-me', checked);
    return this.httpClient.post<{success: boolean, user: User}>(
      `${environment.Backend_URL}/login`,
      userFormData,
      {withCredentials: true}
    );
  }


  logout(): Observable<{success: boolean}> {
    return this.httpClient.get<{success: boolean}>(
      `${environment.Backend_URL}/logout`,
      {withCredentials: true}
    );
  }

  checkCard(card): Observable<{success: boolean, message: string, code: number}> {
    return this.httpClient.post<{success: boolean, message: string, code: number}>(
      `${environment.Backend_URL}/card/check`,
      card
    );
  }

  register(user): Observable<{success: boolean, message: string, code: number}> {
    return this.httpClient.post<{success: boolean, message: string, code: number}>(
      `${environment.Backend_URL}/users`,
      user
    );
  }

  addCard(data): Observable<{success: boolean, message: string, code: number}> {
    return this.httpClient.put<{success: boolean, message: string, code: number}>(
      `${environment.Backend_URL}/users/addCard`,
      data
    );
  }

  update_password(data): Observable<{success: boolean, message: string, code: number}> {
    return this.httpClient.put<{success: boolean, message: string, code: number}> (
      `${environment.Backend_URL}/users/password`,
      data,
      {withCredentials: true}
    );
  }


  deletePay(data): Observable<{success: boolean, message: string}> {
    return this.httpClient.put<{success: boolean, message: string}> (
      `${environment.Backend_URL}/payment/delete`,
      data,
      {withCredentials: true}
    );
  }

  addPayment(data): Observable<{success: boolean, message: string}> {
    return this.httpClient.put<{success: boolean, message: string}> (
      `${environment.Backend_URL}/payment/add`,
      data,
      {withCredentials: true}
    );
  }

  updateInformation(user): Observable<{success: boolean, message: string}> {
    return this.httpClient.put<{success: boolean, message: string}> (
      `${environment.Backend_URL}/users/information`,
      user,
      {withCredentials: true}
    );
  }


}
