import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/service/task.service';
import { Task }  from 'src/app/common/task';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private taskService: TaskService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listTasks();
  }


  listTasks(){
    this.taskService.getTaskList().subscribe(
      data => {
        this.tasks = data;
      }
    );
  }




}
