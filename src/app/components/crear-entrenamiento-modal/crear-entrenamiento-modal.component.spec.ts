import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearEntrenamientoModalComponent } from './crear-entrenamiento-modal.component';

describe('CrearEntrenamientoModalComponent', () => {
  let component: CrearEntrenamientoModalComponent;
  let fixture: ComponentFixture<CrearEntrenamientoModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearEntrenamientoModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearEntrenamientoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
