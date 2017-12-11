import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  fromAuthentication,
  AuthenticationState,
  getLoginPagePending,
  getLoginPageError
} from 'app/authentication/+store';
import { Store } from '@ngrx/store';
import { Authenticate } from '../../models/user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticationComponent {
  public pending$ = this.store.select(getLoginPagePending);
  public error$ = this.store.select(getLoginPageError);

  constructor(private store: Store<AuthenticationState>) { }

  onLogin($event: Authenticate) {
    this.store.dispatch(new fromAuthentication.Login($event));
  }

  onRegister($event: any) {
    this.store.dispatch(new fromAuthentication.Register($event));
  }
}
