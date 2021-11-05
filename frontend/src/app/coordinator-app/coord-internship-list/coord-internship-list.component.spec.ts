import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordInternshipListComponent } from './coord-internship-list.component';

describe('CoordInternshipListComponent', () => {
  let component: CoordInternshipListComponent;
  let fixture: ComponentFixture<CoordInternshipListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordInternshipListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordInternshipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
