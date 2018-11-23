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
  selectedTodo: Todo;
  newTodo: Todo = new Todo();
  oldTodo: Todo;
  priorityValues: number[] = [1,2,3];

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
        if (this.selectedTodo && this.selectedTodo.id === todo.id) {
          this.selectedTodo = null;
        }
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

  selectTodo(todo: Todo): void {
    this.oldTodo = new Todo(todo);
    this.selectedTodo = todo;
  }


  setPriority(todo: Todo, priority: number): void {
    let oldPriority = todo.priority;
    todo.priority = priority;
    this.todoService.updateTodo(todo).subscribe(
      () => {
        this.messagesService.push("Todo priority updated!");
      },
      error => {
        this.messagesService.push("Todo priority updating failed!");
        todo.priority = oldPriority;
      }
    );
  }

  toggleDone(todo: Todo): void {
    todo.done = !todo.done;
    this.todoService.updateTodo(todo).subscribe(
      () => {
        this.messagesService.push("Toggling 'done' succeeded!");
      },
      error => {
        this.messagesService.push("Toggling 'done' failed!");
        todo.done = !todo.done;
      }
    );
  }

  ngOnInit() {
    this.getTodos();
  }

}
