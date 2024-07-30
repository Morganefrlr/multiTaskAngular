import { Component, OnInit } from '@angular/core';
import { TodosService } from '../todos.service';
import { Todo } from '../todoModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  template:`
    <app-form
      [todo]="todo"
      (handleBtn)="addTodo()"
    >
    </app-form>

    
  `
})
export class AddTodoComponent implements OnInit{
   
  todo : Todo = new Todo('')
  


  constructor(
    private todosService : TodosService,
    private router : Router
  ){}

  ngOnInit() {
    
  }

  addTodo(){
    this.todosService.addTodo(this.todo)
    this.router.navigate(['/todos'])

  }
}
