import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { ActivatedRoute } from '@angular/router';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit {

  priorityValues: number[] = [1,2,3];

  private isBeingEdited: boolean;

  private _todo: Todo = new Todo();
  @Input()
  set todo(todo) {
    //zbog otvaranja drugog todoa bez cuvanja
    //da bi se detalji vratili na staro
    this._todo.title = this.oldTodo.title;
    this._todo.text = this.oldTodo.text;

    this._todo = todo;
    this.oldTodo = new Todo(todo);
    this.isBeingEdited = false;
  }
  get todo() {
    return this._todo;
  }

  private oldTodo: Todo = new Todo();

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private messagesService: MessagesService
  ) { }

  getTodo(): void {
    //za rute
    const id = +this.route.snapshot.paramMap.get('id');
    this.todoService.getTodo(id).subscribe(todo => this.todo = todo);
  }

  updateTodo(): void {
    if (this.todo.title !== '')
    {
      this.todoService.updateTodo(this.todo).subscribe(
        () => {
          //poruka da je ok
          this.oldTodo.title = this.todo.title;
          this.oldTodo.text = this.todo.text;
          this.messagesService.push("Todo updated!");
        },
        error => {
          //poruka da nije ok
          this.messagesService.push("Todo update failed!");
        }
      );
    }
    else 
    {
      this.messagesService.push("Todo must have a title!");
    }
  }

  setPriority(priority: number): void {
    this.todo.priority = priority;
    this.todoService.updateTodo(this.todo).subscribe(
      () => {
        this.messagesService.push("Todo priority updated!");
        this.oldTodo.priority = priority;
      },
      error => {
        this.messagesService.push("Todo priority updating failed!");
        this.todo.priority = this.oldTodo.priority;
      }
    );
  }

  toggleDone(): void {
    this.todo.done = !this.todo.done;
    this.todoService.updateTodo(this.todo).subscribe(
      () => {
        this.messagesService.push("Toggling 'done' succeeded!");
      },
      error => {
        this.messagesService.push("Toggling 'done' failed!");
        this.todo.done = !this.todo.done;
      }
    );
  }

  toggleEditingTodo(): void {
    this.isBeingEdited = !this.isBeingEdited;
  }

  cancelEditingTodo(): void {
    this.todo.title = this.oldTodo.title;
    this.todo.text = this.oldTodo.text;
    this.isBeingEdited = false;
  };

  ngOnInit() {
  }

}
