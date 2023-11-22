import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable() // pour l'utiliser que via ce service et non dans l'appli global
export class LoadingService {

  loading$ = Observable<boolean>;

  constructor() { }

  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return undefined;

  }

  loadingOn() {

  }

  loadingOff() {

  }

}
