import {Inject, Component, Output, EventEmitter} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {RegistrationService} from './registration.service';

@Component({
    selector: 'register',
    template: `<div>
	  <h1>Register user</h1>
      <form>
        <p><input required type="text" #email id="email" value="" placeholder="Email"></p>
        <p><input required type="password" #password id="password" value="" placeholder="Password">
        <p><button (click)="onClick(email.value, password.value)">Register</button></p>
      </form>
    </div>
    `,
	providers: [RegistrationService, HTTP_PROVIDERS]
})

export class RegistrationComponent {

    onClick(username: string, password: string) {

        if(!username || !password){
            return;
        }
    }

}
