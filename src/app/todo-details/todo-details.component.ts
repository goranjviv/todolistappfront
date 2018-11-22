import { Component, OnInit, Input } from '@angular/core';
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

  @Input() todo: Todo;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private messagesService: MessagesService
  ) { }

  getTodo(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.todoService.getTodo(id).subscribe(todo => this.todo = todo);
  }

  updateTodo(): void {
    if (this.todo.title !== '')
    {
      this.todoService.updateTodo(this.todo).subscribe(
        () => {
          //poruka da je ok
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


  ngOnInit() {
  }

}
