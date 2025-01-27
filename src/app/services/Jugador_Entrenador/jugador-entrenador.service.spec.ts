import { TestBed } from '@angular/core/testing';

import { JugadorEntrenadorService } from './jugador-entrenador.service';

describe('JugadorEntrenadorService', () => {
  let service: JugadorEntrenadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JugadorEntrenadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
