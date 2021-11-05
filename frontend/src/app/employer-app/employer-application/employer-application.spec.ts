import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerJoblistComponent } from './employer-joblist.component';

describe('EmployerJoblistComponent', () => {
  let component: EmployerJoblistComponent;
  let fixture: ComponentFixture<EmployerJoblistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerJoblistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerJoblistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
