import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalOutlineComponent } from './portal-outline.component';

describe('PortalOutlineComponent', () => {
  let component: PortalOutlineComponent;
  let fixture: ComponentFixture<PortalOutlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalOutlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
