import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/service/task.service';
import { Task } from 'src/app/common/task';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {

  initialDate = new Date().toString;
  selectedDate!: string;
  tasks: Task[] = [];
  searchMode: boolean = false;

  constructor(private taskService: TaskService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listTasks();
    console.log('sa');

  }


  listTasks() {
    this.searchMode = this.route.snapshot.paramMap.has('creationDate');
    if (this.searchMode) {
      console.log("tarih var");
      this.handleFindByDate();
    } else {
      console.log("tarih yok");

      this.handleListTasks();
    }
  }

  handleListTasks() {
    const formattedDAte = formatDate(Date.now(), 'yyyy-MM-dd', 'en-US');
    this.taskService.getTasksByCreationTime(formattedDAte)
      .subscribe(
        data => {
          this.tasks = data
        }
      );
  }

  handleFindByDate() {
    this.taskService.getTasksByCreationTime(this.selectedDate)
      .subscribe(
        data => {
          this.tasks = data;
        }
      );

  }
}
