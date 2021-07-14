import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';
import { apiUrl } from 'src/environments/environment';
import { ILoggedUser, IUserCredentials } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userProfile: any;

  constructor(
    private http: HttpClient
  ) { }

  login(credentials: IUserCredentials): Observable<void> {
    return new Observable<void>((subscriber: Subscriber<void>) => {
      this.getToken(credentials).subscribe({
        complete: () => {
          this.getUserProfile().subscribe({
            complete: () => subscriber.complete()
          })
        }
      })
    });
  }

  getToken(credentials: IUserCredentials): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded',
      Autorization: `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`
    });
    return this.http.post<any>(
      `${apiUrl.domain}/auth/access_token`, null, { headers }
    ).pipe(
      map((token: any) => {
        this.setTokenInSession(token);
        return token;
      })
    );
  }

  getUserProfile(): Observable<any> {
    return this.http.get<any>(`${apiUrl.domain}/userInfo`).pipe(
      map((profile: ILoggedUser) => {
        localStorage.setItem('session-user', JSON.stringify(profile));
      })
    );
  }

  setTokenInSession(token: any): void {
    localStorage.setItem('access-token', JSON.stringify(token.access_token));
    localStorage.setItem('refresh-token', JSON.stringify(token.refresh_token));
    localStorage.setItem('issued-date', JSON.stringify(token.issue_date));
    localStorage.setItem('token-type', JSON.stringify(token.token_type));
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access-token');
    if (!token) {
      return false;
    } else {
      return true;
    }
  }

}
