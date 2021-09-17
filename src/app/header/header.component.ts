import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { Loginservice } from '../loginservice';
import { User } from '../userservice';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {

  constructor(private dialog: MatDialog, private loginservice: Loginservice) { }

  user : Observable<User> = new Observable<User>();

  openLoginDialog() : void {
    this.dialog.open(LoginComponent);
  }

  getLoginStatus() : boolean
  {
    if(localStorage.getItem("IsLogedIn") == "true")
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  logout() : void  {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("IsLogedIn");
    
    this.loginservice.userLogedOut();
  }
}
