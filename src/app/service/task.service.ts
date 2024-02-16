import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Task } from '../common/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = 'http://localhost:8080/api/tasks';

  constructor(private httpClient: HttpClient) { }



  getTaskList(): Observable<Task[]>{
    return this.httpClient
        .get<GetResponseTasks>(this.baseUrl)
        .pipe(map((response) => response._embedded.tasks));
  }
}

interface GetResponseTasks{
  _embedded:{
    tasks: Task[];
  };
}