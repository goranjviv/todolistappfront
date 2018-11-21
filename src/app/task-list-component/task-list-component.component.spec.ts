import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponentComponent } from './task-list-component.component';

describe('TaskListComponentComponent', () => {
  let component: TaskListComponentComponent;
  let fixture: ComponentFixture<TaskListComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskListComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
