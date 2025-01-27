import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntrenadoresPage } from './entrenadores.page';

describe('EntrenadoresPage', () => {
  let component: EntrenadoresPage;
  let fixture: ComponentFixture<EntrenadoresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrenadoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
