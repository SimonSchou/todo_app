import { Component } from '@angular/core';
import { User, Userservice } from '../userservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent {

  constructor(private userservice: Userservice, private router: Router) { }

  user = new User("", "", "", "");

  register() : void
  {
    this.userservice.registerUser(this.user).subscribe(() => this.router.navigate(['/']));
  }

}
