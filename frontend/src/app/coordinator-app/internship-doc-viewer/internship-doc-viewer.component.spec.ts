import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipDocViewerComponent } from './internship-doc-viewer.component';

describe('InternshipDocViewerComponent', () => {
  let component: InternshipDocViewerComponent;
  let fixture: ComponentFixture<InternshipDocViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternshipDocViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternshipDocViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
