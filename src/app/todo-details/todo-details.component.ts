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

  @HostBinding('hidden')
  isHidden:boolean = false;

  private _todo: Todo;
  @Input()
  set todo(todo) {
    this._todo = todo;
    this.oldTodo = new Todo(this.todo);
    this.isHidden = false;
  }
  get todo() {
    return this._todo;
  }

  private oldTodo: Todo;

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

  cancelEditingTodo(): void {
    this.todo.title = this.oldTodo.title;
    this.todo.text = this.oldTodo.text;
    this.isHidden = true;
  };

  ngOnInit() {
  }

}
