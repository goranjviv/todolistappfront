import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './todo';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  //TODO: handle errors

  constructor(private httpClient: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>('/todos');
  }

  getTodo(id: number): Observable<Todo> {

    return this.httpClient.get<Todo>(`/todos/${id}`);
  } 

  updateTodo(todo: Todo): Observable<any> {
    return this.httpClient.put(`/todos/${todo.id}`, todo);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.httpClient.post<Todo>('/todos', todo);
  }

  deleteTodo(id: number): Observable<any> {

    return this.httpClient.delete(`/todos/${id}`);
  }


}
