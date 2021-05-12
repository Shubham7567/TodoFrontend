import { TaskService } from './../../task.service';
import { Task } from './../../task.model';
import { Component, OnInit, Output,EventEmitter,Input } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  @Input() task: Task = {
    id:0,
    title:'',
    description:'',
    done:false
  };

  @Output() refreshTableForMe: EventEmitter<any> = new EventEmitter();

  constructor(private service:TaskService) { }

  ngOnInit(): void {
  }

  add_task()
  {
    this.service.add_task(this.task).subscribe((data) => {
      console.log(data);
      this.refreshTableForMe.emit();
    });
  }
  reset()
  {
    this.task = {
      id:0,
      title:'',
      description:'',
      done:false
    };
  }
}
