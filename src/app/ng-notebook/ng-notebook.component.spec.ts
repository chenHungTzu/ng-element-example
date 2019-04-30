import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgNotebookComponent } from './ng-notebook.component';

describe('NgNotebookComponent', () => {
  let component: NgNotebookComponent;
  let fixture: ComponentFixture<NgNotebookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgNotebookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgNotebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
