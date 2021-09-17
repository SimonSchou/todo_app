import { Component, OnInit } from '@angular/core';
import { TodoTask, Userservice } from '../userservice';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { map } from 'rxjs/operators';
import { Loginservice } from '../loginservice';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  static readonly CompletedTaskColor: string = "completedCard";
  static readonly NotCompletedTaskColor: string = "notCompletedCard";

  $tasks = new Observable<TodoTask[]>();

  highTaskList: TodoTask[] = [];
  normalTaskList: TodoTask[] = [];
  lowTaskList: TodoTask[] = [];

  userIsLoggedIn = false;

  constructor(private userservice: Userservice, private dialog: MatDialog, private loginservice: Loginservice, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.userIsLoggedIn = this.getLoginstatus();
    this.loginservice.change.subscribe((isLoggedIn) => this.logInHandler(isLoggedIn));
    this.logInHandler(this.userIsLoggedIn);
  }

  getLoginstatus() : boolean
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


  logInHandler(isLogedIn: boolean) : void
  {
    this.userIsLoggedIn = isLogedIn;
    
    if(this.userIsLoggedIn === true )
    {
      this.getAllTaskLists();
    }
  }

  getAllTaskLists(): void {
    this.userservice.getTodoList().pipe(map(tasks => {
      this.sortListByPriority(tasks)
    })).subscribe();
  }

  sortListByPriority(taskList: TodoTask[]): void {
    this.highTaskList = [];
    this.normalTaskList = [];
    this.lowTaskList = [];

    taskList.forEach(task => {
      switch (task.priority) {
        case 0:
          this.highTaskList.push(task)
          break;
        case 1:
          this.normalTaskList.push(task)
          break;
        case 2:
          this.lowTaskList.push(task)
          break;
        default:
          break;
      }
    });
  }

  completeTask(task: TodoTask): void {
    task.completed = true;
    this.userservice.editTodoTask(task).subscribe();
  }

  deleteTask(task: TodoTask): void {
    this.userservice.deleteTodoTask(task).subscribe(() => {
      this.getAllTaskLists();
    });
  }

  getMatCardColor(task: TodoTask): string {
    return task.completed ? HomeComponent.CompletedTaskColor : HomeComponent.NotCompletedTaskColor
  }

  getFormatedDate(date: Date) : string
  {
    return this.datePipe.transform(date.toString(),"dd/MM/yyyy") || "";
  }

  openEditDialog(task: TodoTask): void {
    this.dialog.open(EditTaskComponent, { data: { task: task } }).afterClosed()
      .subscribe(() => this.getAllTaskLists());
  }

}
