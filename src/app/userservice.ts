import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class Userservice {
    constructor(private http: HttpClient) { }

     baseUrl = "https://todobackend.azure-api.net/v1/"

    getHeaderObject() : HttpHeaders
    {
        return new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token")).set("Ocp-Apim-Subscription-Key", "subscription-key 8c38b1a7d5244adabbc43aea593fb465");
    }

    getLoginHeaderObject() : HttpHeaders
    {
      return new HttpHeaders().set("Ocp-Apim-Subscription-Key", "subscription-key 8c38b1a7d5244adabbc43aea593fb465");
    }

    getTodoList() : Observable<TodoTask[]>
    {
      const url = this.baseUrl + "api/TodoTasks"
      return this.http.get<TodoTask[]>(url, {headers: this.getHeaderObject()} );
    }

    createTodoTask(task: TodoTask) : Observable<TodoTask>
    {
      const url = this.baseUrl + "api/TodoTasks"
      task.priority = parseInt(task.priority.toString());
      return this.http.post<TodoTask>(url,task, {headers: this.getHeaderObject()})
    }
    editTodoTask(task: TodoTask) : Observable<TodoTask>
    {
      const url = this.baseUrl + "api/TodoTasks/" + task.todoId;
      task.priority = parseInt(task.priority.toString());
      return this.http.put<TodoTask>(url,task, {headers: this.getHeaderObject()});
    }

    deleteTodoTask(task: TodoTask) : Observable<number>
    {
      const url = this.baseUrl + "api/TodoTasks/" + task.todoId;
      return this.http.delete<number>(url, {headers: this.getHeaderObject()});
    }

    registerUser(user: User) : Observable<User>
    {
      const url = this.baseUrl + "api/Account/register";
      return this.http.post<User>(url,user, {headers: this.getLoginHeaderObject()});
    }

    loginUser(user: User) : Observable<UserInformation>
    {
      const url = this.baseUrl + "api/Account/login"
      return this.http.post<UserInformation>(url,user, {headers: this.getLoginHeaderObject()});
    }

    getAccountInformation(userId: string) : Observable<User>
    {
      const url = this.baseUrl + "api/Account/" + userId;
      return this.http.get<User>(url, {headers: this.getLoginHeaderObject()});
    }
  }
  export class TodoTask {
    constructor(public todoId: number, public titel: string, public description: string, public completed: boolean, public priority: number, public dueDate: Date) {}
  }
  export class User {
    constructor(public firstName: string, public lastName: string, public email: string, public password: string) {}
  } 

  export class UserInformation {
    constructor(public jwt: string, public userId: number) {}
  }
