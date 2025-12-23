import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Todolist } from "./todolist/todolist";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Todolist,FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tudu-list');
  
  task ="";
  taskList:{id:number,task:string} []=[]
  editId:number | null = null;

  addTask(){
    if(!this.task.trim()) return;
    if(this.editId !== null) return;
    this.taskList.push({id:this.taskList.length+1,task:this.task})
    this.task = ''    
  }
  deleteTask(taskId:number){
    this.taskList =this.taskList.filter((item)=>item.id!=taskId)
  
      this.taskList = this.taskList.map((task, index) =>({
    ...task,
    id:index + 1
  }));
  }

  editTask(taskItem: any){
    this.task = taskItem.task;
    this.editId = taskItem.id;
  }

  updateTask(){
    if(this.editId === null) return;
    const index = this.taskList.findIndex(
    task => task.id === this.editId
  );

  if (index !== -1) {
    this.taskList[index].task = this.task;
  }
    
    this.task = '';
    this.editId = null
  }
}
