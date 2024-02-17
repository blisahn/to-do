import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/service/task.service';
import { Task } from 'src/app/common/task';
import { formatDate } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {

  private modalService = inject(NgbModal);
  closeResult = '';


  initialDate = new Date().toString;
  selectedDate!: string;
  tasks: Task[] = [];
  searchMode: boolean = false;

  tempTaskDescription!: string;

  taskFormGroup!: FormGroup;
  formBuilder: any;

  constructor(private taskService: TaskService,
    private route: ActivatedRoute,) { }

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
    console.log("selam");
    if (this.selectedDate === "") {
      this.selectedDate = formatDate(Date.now(), 'yyyy-MM-dd', 'en-US');
    }
    console.log(this.selectedDate);

    this.taskService.getTasksByCreationTime(this.selectedDate)
      .subscribe(
        data => {
          this.tasks = data;
        }
      );
  }



  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        this.listTasks();
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        this.listTasks();
        return 'by clicking on a backdrop';
      default:
        this.listTasks();
        return `with: ${reason}`;
    }
  }


  submitTask() {
    let tempTask: Task = {
      id: 0,
      description: "Default Description",
      creationTime:undefined ,
      lastUpdate: undefined
    };
    tempTask.description = this.tempTaskDescription;
    console.log(tempTask.description);

    this.taskService.placeTask(tempTask).subscribe({
      next: response =>{
        alert(`Your Task has been saved`);
      },
      error: err => {
        alert(`There was an error`)
      }
    });
      
    console.log("Done!!");
  
  }
}
