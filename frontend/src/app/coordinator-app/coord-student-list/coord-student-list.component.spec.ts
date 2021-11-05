import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordStudentListComponent } from './coord-student-list.component';

describe('CoordStudentListComponent', () => {
  let component: CoordStudentListComponent;
  let fixture: ComponentFixture<CoordStudentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordStudentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordStudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
