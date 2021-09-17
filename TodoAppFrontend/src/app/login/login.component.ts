import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Loginservice } from '../loginservice';
import { User, Userservice } from '../userservice';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  constructor(private userservice: Userservice, private loginservice: Loginservice, private dialog: MatDialog) { }

  user = new User("", "", "", "")

  login() : void {
    this.userservice.loginUser(this.user).subscribe(res => {
      localStorage.setItem("token", res.jwt)
      localStorage.setItem("userId", res.userId.toString())
      localStorage.setItem("IsLogedIn", "true");
      this.loginservice.userLogedIn()
      this.dialog.closeAll();
    },
    err => {
      if(err.status == 400)
      {
        alert("Wrong username or password")
        this.user = new User("", "", "", "");
      }
    }
    );
  }
}