import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateApiUserComponent } from './generate-api-user.component';

describe('GenerateApiUserComponent', () => {
  let component: GenerateApiUserComponent;
  let fixture: ComponentFixture<GenerateApiUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateApiUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateApiUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
