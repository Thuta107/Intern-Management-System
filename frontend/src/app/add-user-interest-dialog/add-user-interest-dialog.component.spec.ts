import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserInterestDialogComponent } from './add-user-interest-dialog.component';

describe('AddUserInterestDialogComponent', () => {
  let component: AddUserInterestDialogComponent;
  let fixture: ComponentFixture<AddUserInterestDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserInterestDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserInterestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
