import { Task } from './task.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  hostUrl = "http://localhost:8000/tasks/";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  url = "";
  constructor(private http:HttpClient) { }

  get_tasks():Observable<Task[]>{
    return this.http.get<Task[]>(this.hostUrl+"list/");
  }

  get_task_detail(id:Number):Observable<Task>
  {
    this.url = this.hostUrl + id + '/';
    return this.http.get<Task>(this.url);
  }

  delete_task(id:Number){
    this.url = this.hostUrl + id + '/';
    return this.http.delete(this.url);
  }

  add_task(task:Task):Observable<Task>{
    if(task.id == 0)
    {
      this.url = this.hostUrl + "list/";
      return this.http.post<Task>(this.url,task,this.httpOptions);
    }
    this.url = this.hostUrl + task.id + '/';
    return this.http.put<Task>(this.url,task,this.httpOptions);
  }
}
