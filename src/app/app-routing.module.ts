import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { TodoListComponent } from '../app/todo-list/todo-list.component';
import { TodoDetailsComponent } from '../app/todo-details/todo-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component:RegisterComponent, canActivate: [AuthGuardService]  },
  { path: 'todos', component: TodoListComponent, canActivate: [AuthGuardService]  },
  { path: 'todos/:id', component: TodoDetailsComponent, canActivate: [AuthGuardService]  },
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
