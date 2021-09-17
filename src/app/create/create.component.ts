import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Loginservice } from '../loginservice';
import { TodoTask, Userservice } from '../userservice';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less']
})
export class CreateComponent {
  constructor(private userservice: Userservice, private router: Router, private loginservice: Loginservice) {}

   task = new TodoTask(0, "", "", false, 0, new Date());

  create(): void {
      this.userservice.createTodoTask(this.task).subscribe(() => 
      {
        this.router.navigate(['/']),
        this.loginservice.userLogedIn()
      });
   }
}

