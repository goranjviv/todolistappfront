import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private _messages: string[] = [];
  get messages() {
    return this._messages;
  }

  private _hasMessages: boolean = false;
  get hasMessages() {
    return this._hasMessages;
  }

  constructor() { }

  public push(message: string): void {
    this._messages.push(message);
    this._hasMessages = true;
  }

  public remove(index: number): void {
    this._messages.splice(index, 1);
    this._hasMessages = !!this._messages.length;
  }

  public clear(): void {
    this._messages = [];
    this._hasMessages = false;
  }
}
