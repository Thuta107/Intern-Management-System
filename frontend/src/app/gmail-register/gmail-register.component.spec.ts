import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmailRegisterComponent } from './gmail-register.component';

describe('GmailRegisterComponent', () => {
  let component: GmailRegisterComponent;
  let fixture: ComponentFixture<GmailRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmailRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmailRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
