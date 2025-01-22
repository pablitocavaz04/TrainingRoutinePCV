import { TestBed } from '@angular/core/testing';

import { SesionesService } from './sesiones.service';

describe('SesionesService', () => {
  let service: SesionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SesionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
