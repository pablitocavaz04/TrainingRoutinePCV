import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JugadoresPage } from './jugadores.page';

describe('JugadoresPage', () => {
  let component: JugadoresPage;
  let fixture: ComponentFixture<JugadoresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JugadoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
