import { Injectable } from '@angular/core';

// pas d'injestion dans root comme pour le loaderService.
// Pour pouvoir l'utiliser indépendemment dans l'application
@Injectable()
export class MessagesService {

  showErrors(...errors: string[]) {

  }

}
