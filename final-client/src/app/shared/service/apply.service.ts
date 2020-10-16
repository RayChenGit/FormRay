import { Injectable } from '@angular/core';
import {CardType} from '../model/card-type';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplyService {

  cardType: CardType;

  constructor(private httpClient: HttpClient) { }

  apply(submission): Observable<{success: boolean}> {
    return this.httpClient.post<{success: boolean}>(
      `${environment.Backend_URL}/submission`,
      submission
    );
  }

}
