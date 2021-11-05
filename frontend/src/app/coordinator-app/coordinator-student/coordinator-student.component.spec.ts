import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorStudentComponent } from './coordinator-student.component';

describe('CoordinatorStudentComponent', () => {
  let component: CoordinatorStudentComponent;
  let fixture: ComponentFixture<CoordinatorStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinatorStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
