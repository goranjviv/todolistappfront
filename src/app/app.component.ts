import { Component } from '@angular/core';
import { UserService } from './user.service';
import { TodoListComponent } from './todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todolistappfront';
  constructor (private userService: UserService) {}
}
