import { TestBed, inject } from '@angular/core/testing';

import { DataParamService } from './data-param.service';

describe('DataParamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataParamService]
    });
  });

  it('should be created', inject([DataParamService], (service: DataParamService) => {
    expect(service).toBeTruthy();
  }));
});
