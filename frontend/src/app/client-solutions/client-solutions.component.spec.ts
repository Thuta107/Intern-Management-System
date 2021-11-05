import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSolutionsComponent } from './client-solutions.component';

describe('ClientSolutionsComponent', () => {
  let component: ClientSolutionsComponent;
  let fixture: ComponentFixture<ClientSolutionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSolutionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
