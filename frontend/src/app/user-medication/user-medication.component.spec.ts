import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMedicationComponent } from './user-medication.component';

describe('UserMedicationComponent', () => {
  let component: UserMedicationComponent;
  let fixture: ComponentFixture<UserMedicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMedicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMedicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
