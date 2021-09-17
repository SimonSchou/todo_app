import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Userservice } from '../userservice';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.less']
})
export class EditTaskComponent {
  constructor(private userservice: Userservice, @Inject(MAT_DIALOG_DATA) public data: any) { }
  
  saveChanges() : void
  {
    this.userservice.editTodoTask(this.data.task).subscribe();
  }
}
