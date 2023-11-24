import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../model/message';
import { tap } from 'rxjs/operators';
import { MessagesService } from './messages.service';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  public showMessage = false;
  public errors$: Observable<string[]>;

  constructor(
    public _messageService: MessagesService
  ) {
    console.log("Created Message component");

  }

  ngOnInit() {
    this.errors$ = this._messageService.error$
      .pipe(
        tap(() => this.showMessage = true)
      )

  }


  onClose() {
    this.showMessage = false;
  }

}
