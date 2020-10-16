import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Submission} from '../model/submission';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {Dispute} from '../model/dispute';

@Injectable({
  providedIn: 'root'
})
export class BankerService {

  unReviewedSubmission: MatTableDataSource<Submission> = new MatTableDataSource<Submission>();
  unDecidedSubmission: MatTableDataSource<Submission> = new MatTableDataSource<Submission>();
  unDecidedDispute: MatTableDataSource<Dispute> = new MatTableDataSource<Submission>();

  reviewing: Submission = null;
  deciding: Submission = null;
  disputing: Dispute = null;

  constructor(
    private httpClient: HttpClient
  ) { }

  getUnreviewed(): Observable<Submission[]> {
    return this.httpClient.get<Submission[]>(
      `${environment.Backend_URL}/submission/review`,
      {withCredentials: true}
    ).pipe( map(subs => {
      return subs.sort((s1, s2) => s1.submittime.localeCompare(s2.submittime));
    }));
  }

  getUndecided(): Observable<Submission[]> {
    return this.httpClient.get<Submission[]>(
      `${environment.Backend_URL}/submission/undecide`,
      {withCredentials: true}
    ).pipe( map(subs => {
      return subs.sort((s1, s2) => s1.submittime.localeCompare(s2.submittime));
    }));
  }

  getDispute(): Observable<Dispute[]> {
    return this.httpClient.get<Dispute[]>(
      `${environment.Backend_URL}/dispute`,
      {withCredentials: true}
    ).pipe( map(disputes => {
      return disputes.sort((d1, d2) => d1.transaction.time.localeCompare(d2.transaction.time));
    }));
  }

  getNewest(): void {
    this.getUnreviewed()
      .subscribe(res => {
        this.unReviewedSubmission.data = res;
        this.reviewing = null;
      });
    this.getUndecided()
      .subscribe( res => {
        this.unDecidedSubmission.data = res;
        this.deciding = null;
      });
    this.getDispute()
      .subscribe( res => {
        this.unDecidedDispute.data = res;
        this.disputing = null;
      });
  }

  makeReview(data): Observable<{success: string, code: number, message: string}> {
    return this.httpClient.put<{success: string, code: number, message: string}>(
      `${environment.Backend_URL}/submission/review`,
      data,
      {withCredentials: true}
    );
  }

  makeDecision(data): Observable<{success: string, code: number, message: string, card: object}> {
    return this.httpClient.put<{success: string, code: number, message: string, card: object}>(
      `${environment.Backend_URL}/submission/decide`,
      data,
      {withCredentials: true}
    );
  }

  makeDisputeDecision(data): Observable<{success: string, code: number, message: string, card: object}> {
    return this.httpClient.put<{success: string, code: number, message: string, card: object}>(
      `${environment.Backend_URL}/dispute`,
      data,
      {withCredentials: true}
    );
  }


}
