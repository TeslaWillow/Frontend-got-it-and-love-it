import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPlantillasComponent } from './gestion-plantillas.component';

describe('GestionPlantillasComponent', () => {
  let component: GestionPlantillasComponent;
  let fixture: ComponentFixture<GestionPlantillasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionPlantillasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionPlantillasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
