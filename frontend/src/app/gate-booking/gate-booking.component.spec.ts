import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GateBookingComponent } from './gate-booking.component';

describe('GateBookingComponent', () => {
  let component: GateBookingComponent;
  let fixture: ComponentFixture<GateBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GateBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GateBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
