import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Transaction} from '../model/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  disputeOne: Transaction = null;

  constructor(private httpClient: HttpClient) { }

  reward(transaction): Observable<{success: boolean, message: string}> {
    return this.httpClient.put<{success: boolean, message: string}> (
      `${environment.Backend_URL}/transaction/reward`,
      transaction,
      {withCredentials: true}
    );
  }

  postDispute(data): Observable<{success: boolean, message: string}> {
    return this.httpClient.post<{success: boolean, message: string}> (
      `${environment.Backend_URL}/dispute`,
      data,
      {withCredentials: true}
    );
  }





}
