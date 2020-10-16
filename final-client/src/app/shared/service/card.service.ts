import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CardType} from '../model/card-type';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Card} from '../model/card';
import {MatTableDataSource} from '@angular/material/table';
import {Transaction} from '../model/transaction';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  cardTypes: CardType[];

  activedCard: Card;
  transactions: MatTableDataSource<Transaction>;

  constructor(private httpClient: HttpClient) { }

  getAllCardType(): Observable<CardType[]> {
    return this.httpClient.get<CardType[]>(
      `${environment.Backend_URL}/cardtype`
    );
  }

  getById(id): Observable<{success: boolean, cardType: CardType}> {
    this.init();
    return this.httpClient.get<{success: boolean, cardType: CardType}>(
      `${environment.Backend_URL}/cardtype/${id}`
    );
  }

  init(): void {
    if (!this.cardTypes) {
      this.getAllCardType().subscribe(res => {
        res.sort((c1, c2) => c1.id - c2.id)
          .forEach(cardtype => cardtype.benefits.sort( (b1, b2) => b1.id - b2.id));
        this.cardTypes = res;
      });
    }
  }

  pay(payment): Observable<{success: boolean, message: string}> {
    return this.httpClient.put<{success: boolean, message: string}>(
      `${environment.Backend_URL}/card/pay`,
      payment,
      {withCredentials: true}
    );
  }

}
