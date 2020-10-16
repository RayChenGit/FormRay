import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Submission} from '../model/submission';
import {environment} from '../../../environments/environment';
import {Dispute} from '../model/dispute';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllApplications(): Observable<Submission[]> {
    return this.httpClient.get<Submission[]>(
      `${environment.Backend_URL}/submission`,
      {withCredentials: true}
    );
  }

  getAllDisputes(): Observable<Dispute[]> {
    return this.httpClient.get<Dispute[]>(
      `${environment.Backend_URL}/dispute/all`,
      {withCredentials: true}
    );
  }

  checkStatement(): Observable<boolean> {
    return this.httpClient.put<boolean>(
      `${environment.Backend_URL}/card/statementCheck`,
      [1]
    );
  }

  postTransaction(post): Observable<{success: boolean, message: string}> {
    return this.httpClient.post<{success: boolean, message: string}> (
      `${environment.Backend_URL}/transaction`,
      post
    );
  }

}
