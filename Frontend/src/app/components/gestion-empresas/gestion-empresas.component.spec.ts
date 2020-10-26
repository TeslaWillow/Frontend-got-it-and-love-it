import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEmpresasComponent } from './gestion-empresas.component';

describe('GestionEmpresasComponent', () => {
  let component: GestionEmpresasComponent;
  let fixture: ComponentFixture<GestionEmpresasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionEmpresasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
