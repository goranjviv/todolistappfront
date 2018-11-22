export class Todo {
    public id: number = -55;
    public title: string = "";
    public text: string = "";
    public priority: number = 1;
    public done: boolean = false;

    constructor(todo: Todo = null) {
        if (todo !== null) {
            this.id = todo.id;
            this.title = todo.title;
            this.text = todo.text;
            this.priority = todo.priority;
            this.done = todo.done;
        }
     }
}
