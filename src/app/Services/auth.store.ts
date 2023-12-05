import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const AUTH_DATA = "auth_data";

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  // loginUrl = `${environment.apiUrl}/login`;

  private _subject = new BehaviorSubject<User>(null);

  user$: Observable<User> = this._subject.asObservable();

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(
    private _http: HttpClient
  ) {
    this.isLoggedIn$ = this.user$.pipe(map(user => !!user)); // le double point !! converti la valeur en boolean
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));
    const user = localStorage.getItem(AUTH_DATA);

    if (user) {
      this._subject.next(JSON.parse(user));
    }
  }

  login(email: string, password: string): Observable<User> {
    return this._http.post<User>("api/login", { email, password })
      .pipe(
        tap(user => {
          this._subject.next(user);
          localStorage.setItem(AUTH_DATA, JSON.stringify(user))
        }),
        shareReplay())
  }

  logout() {
    this._subject.next(null);
    localStorage.removeItem(AUTH_DATA)
  }
}
