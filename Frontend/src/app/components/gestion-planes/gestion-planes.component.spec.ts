import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPlanesComponent } from './gestion-planes.component';

describe('GestionPlanesComponent', () => {
  let component: GestionPlanesComponent;
  let fixture: ComponentFixture<GestionPlanesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionPlanesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
