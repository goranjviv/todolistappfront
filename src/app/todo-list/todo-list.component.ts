import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = [];
  newTodo: Todo = new Todo();
  oldTodo: Todo;

  constructor(
    private todoService: TodoService,
    private messagesService: MessagesService
  ) { }

  getTodos(): void {
    this.todoService.getTodos().subscribe(
      todos => {
        this.todos = todos;
      }
    );
  }

  deleteTodo(todo: Todo): void {
    this.todoService.deleteTodo(todo.id).subscribe(
      () => 
      {
        this.todos = this.todos.filter(t => t != todo);
        this.messagesService.push("Todo removed!");
      },
      error => 
      {
        this.messagesService.push("Removing todo failed!");
      }
    );
  }
  
  addTodo(): void {
    if (this.newTodo.title !== "")
    {
      this.todoService.addTodo(this.newTodo).subscribe(
        todo => {
          //success
          this.messagesService.push("Todo added!");
          this.newTodo = new Todo();
          this.todos.push(todo);
        },
        error => {
          this.messagesService.push("Todo adding failed!");
        }
      );
    }
    else 
    {
      this.messagesService.push('Todo must have a title!');
    }
  }


  ngOnInit() {
    this.getTodos();
  }

}
