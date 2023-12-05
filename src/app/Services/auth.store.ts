import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  private _subject = new BehaviorSubject<User>(null);

  user$: Observable<User> = this._subject.asObservable();

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(
    private _http: HttpClient
  ) {
    this.isLoggedIn$ = this.user$.pipe(map(user => !!user)) // le double point !! converti la valeur en boolean
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !!loggedIn)) // le double point !! converti la valeur en boolean
  }

  login(email: string, pwd: string): Observable<User> {
    return this._http.post<User>("/api/login", { email, pwd })
      .pipe(
        tap(user => this._subject.next(user)),
        shareReplay())
  }

  logout() {
    this._subject.next(null);
  }
}
