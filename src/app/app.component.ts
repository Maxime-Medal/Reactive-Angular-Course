import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading/loading.service';
import { MessagesService } from './messages/messages.service';
import { AuthStore } from './Services/auth.store';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    public _auth: AuthStore
  ) {

  }

  ngOnInit() {
  }

  logout() {
    this._auth.logout();
  }

}
