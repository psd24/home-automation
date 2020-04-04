import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class CandidateService{
    private serviceUrl = 'http://localhost:3000/bulbs/';

    constructor (
        private httpClient: HttpClient,
    ) {}

    index(params): Observable<any> {
        return this.httpClient.get(this.serviceUrl+'state/'+params).pipe(
          map(res => {
            return res;
          }),
          catchError(error => {
            return throwError(error.error)
          })
        );
    }

    info(): Observable<any> {
      return this.httpClient.get(this.serviceUrl+'info').pipe(
        map(res => {
          return res;
        }),
        catchError(error => {
          return throwError(error.error)
        })
      );
  }
}