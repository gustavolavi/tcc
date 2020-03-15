import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Incident } from './model/incident';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  constructor(private http: HttpClient) { }

  private endpoint = 'http://localhost:8181/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getLogin(user: User): Observable<User> {
    return this.http.post<User>(this.endpoint + 'users/login', user, this.httpOptions).pipe(
      catchError(this.handleError<any>('getLogin'))
    );
  }

  getIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(this.endpoint + 'incidents').pipe(
      catchError(this.handleError<any>('getIncidents'))
    );
  }

  getIncident(id: number): Observable<Incident> {
    return this.http.get<Incident>(this.endpoint + 'incidents/' + id).pipe(
      catchError(this.handleError<any>('getIncident'))
    );
  }

  addIncident(incident: Incident): Observable<any> {
    return this.http.post<Incident>(this.endpoint + 'incidents', incident, this.httpOptions).pipe(
      catchError(this.handleError<any>('addIncident'))
    );
  }

  updateIncident(id: number, incident: Incident): Observable<Incident> {
    return this.http.put(this.endpoint + 'incidents/' + id, JSON.stringify(incident), this.httpOptions).pipe(
      catchError(this.handleError<any>('updateIncident'))
    );
  }

  deleteIncident(id: number): Observable<any> {
    return this.http.delete<Incident>(this.endpoint + 'incidents/' + id, this.httpOptions).pipe(
      catchError(this.handleError<any>('deleteIncident'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
