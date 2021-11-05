import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerCompanyformComponent } from './employer-companyform.component';

describe('EmployerCompanyformComponent', () => {
  let component: EmployerCompanyformComponent;
  let fixture: ComponentFixture<EmployerCompanyformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerCompanyformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerCompanyformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
