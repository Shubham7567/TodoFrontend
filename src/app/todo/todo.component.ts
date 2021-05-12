import { Task } from './../task.model';
import { TaskService } from './../task.service';
import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  tasks: Task[]=[];
  task: Task = {
    id:0,
    title:'',
    description:'',
    done:false
  };

  constructor(private service:TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  triggerEmitterToList(event:Event)
  {
    this.getTasks();
  }

  task_done(id:Number)
  {
    this.service.get_task_detail(id).subscribe((data) => {
      if(!data.done)
      {
        data.done=true;
        this.service.add_task(data).subscribe((data)=>{
          alert(data.title + " is done");
        });
      }else{
        data.done=false;
        this.service.add_task(data).subscribe((data)=>{
          alert(data.title + " is undone");
        });
      }
    });
  }

  deleteTask(id:Number){
    this.service.delete_task(id).subscribe(()=>{

    });
    alert("Task is deleted");
    this.getTasks();
  }



  editTask(id:Number){
    this.service.get_task_detail(id).subscribe((data)=>{
      this.task = data;
    });
  }

  getTasks()
  {
    this.service.get_tasks().subscribe((data)=>{
      this.tasks = data;
    });
  }
}
