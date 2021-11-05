import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateApiClientComponent } from './generate-api-client.component';

describe('GenerateApiClientComponent', () => {
  let component: GenerateApiClientComponent;
  let fixture: ComponentFixture<GenerateApiClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateApiClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateApiClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
