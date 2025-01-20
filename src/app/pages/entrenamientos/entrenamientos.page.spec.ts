import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntrenamientosPage } from './entrenamientos.page';

describe('EntrenamientosPage', () => {
  let component: EntrenamientosPage;
  let fixture: ComponentFixture<EntrenamientosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrenamientosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
