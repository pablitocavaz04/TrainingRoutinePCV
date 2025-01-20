import { TestBed } from '@angular/core/testing';

import { EntrenamientosService } from './entrenamientos.service';

describe('EntrenamientosService', () => {
  let service: EntrenamientosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntrenamientosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
