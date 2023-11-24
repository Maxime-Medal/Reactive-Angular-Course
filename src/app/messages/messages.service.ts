import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

// pas d'injestion dans root comme pour le loaderService.
// Pour pouvoir l'utiliser indépendemment dans l'application
@Injectable()
export class MessagesService {
  private _subject = new BehaviorSubject<string[]>([]);
  public error$: Observable<string[]> = this._subject.asObservable()
    .pipe(
      filter(messages => messages && messages.length > 0)
    );

  showErrors(...errors: string[]) {
    this._subject.next(errors);
  }

}
