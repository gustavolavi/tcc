import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Incident } from './model/incident';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  
  constructor(private http: HttpClient) { }

  private endpoint = 'http://localhost:8080/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getIncidents(): Observable<any> {
    return this.http.get(this.endpoint + 'incident').pipe(
      map(this.extractData));
  }

  getIncident(id:number): Observable<any> {
    return this.http.get(this.endpoint + 'incident/' + id).pipe(
      map(this.extractData));
  }

  addIncident(incident:Incident): Observable<any> {
    return this.http.post<Incident>(this.endpoint+ 'incident', incident, this.httpOptions).pipe(
      catchError(this.handleError<any>('addIncident'))
    );
  }

  updateIncident(id:number, incident:Incident): Observable<Incident> {
    return this.http.put(this.endpoint + 'incident/' + id, JSON.stringify(incident), this.httpOptions).pipe(
      tap(_ => console.log(`updated incident id=${id}`)),
      catchError(this.handleError<any>('updateIncident'))
    );
  }

  deleteIncident (id:number): Observable<any> {
    return this.http.delete<Incident>(this.endpoint + 'incident/' + id, this.httpOptions).pipe(
      tap(_ => console.log(`deleted incident id=${id}`)),
      catchError(this.handleError<any>('deleteIncident'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
