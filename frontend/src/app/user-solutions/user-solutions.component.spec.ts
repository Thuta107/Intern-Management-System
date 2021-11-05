import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSolutionsComponent } from './user-solutions.component';

describe('UserSolutionsComponent', () => {
  let component: UserSolutionsComponent;
  let fixture: ComponentFixture<UserSolutionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSolutionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
