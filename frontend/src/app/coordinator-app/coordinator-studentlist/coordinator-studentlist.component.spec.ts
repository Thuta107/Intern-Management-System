import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorStudentlistComponent } from './coordinator-studentlist.component';

describe('CoordinatorStudentlistComponent', () => {
  let component: CoordinatorStudentlistComponent;
  let fixture: ComponentFixture<CoordinatorStudentlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinatorStudentlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorStudentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
