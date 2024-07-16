import { Component, OnInit } from '@angular/core';
import {ToDo } from '../fakeToDo';
import { TodolistService } from '../todolist.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit{
 
  toDoList:ToDo[] 
  title : string
  toDo : ToDo
  toDoEmpty: boolean = false 


  constructor(private todoService : TodolistService){}


  ngOnInit(){
   this.todoService.getToDoList()
   .subscribe(toDoList => this.toDoList = toDoList.reverse())
   this.toDo = new ToDo()

  }

  deleteToDo(toDo : ToDo){
    if(this.toDoList.length <= 1){
      this.todoService.deleteTodoById(toDo.id)
      .subscribe(() => 
        this.todoService.getToDoList()
        .subscribe(toDoList => this.toDoList = toDoList.reverse())
      )
      setTimeout(() => {
        this.toDoEmpty = true
      }, 1500);
      
      
    }
    this.todoService.deleteTodoById(toDo.id)
    .subscribe(() => 
      this.todoService.getToDoList()
      .subscribe(toDoList => this.toDoList = toDoList.reverse())
    )
  }
  
  onSubmit(){
    this.toDoEmpty = false
    if(this.toDo.id === 0){
      const createId= new Date()
      const newTodo : ToDo = {
        title : this.toDo.title,
        id :+createId
      }
      this.todoService.addToDo(newTodo)
          .subscribe(() => 
            this.todoService.getToDoList()
            .subscribe(toDoList => this.toDoList = toDoList.reverse() )
          ) 
    }else {
      this.todoService.updateToDo(this.toDo)
      .subscribe(() => 
        this.todoService.getToDoList()
        .subscribe(toDoList => this.toDoList = toDoList.reverse() )
      ) 
      
    }
    this.toDo = new ToDo()
    
  } 

  update(toDo: ToDo){
    console.log(toDo)
    this.toDo = toDo
  }

}
