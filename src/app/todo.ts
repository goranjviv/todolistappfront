export class Todo {
    public title: string = "";
    public text: string = "";
    public priority: number = 1;
    public done: boolean = false;

    constructor(
        title: string, text: string,
        priority: number, done: boolean
    ) {
        this.title = title;
        this.text = text;
        this.priority = priority;
        this.done = done;
    }
}
