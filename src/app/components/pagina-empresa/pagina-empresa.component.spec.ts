import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaEmpresaComponent } from './pagina-empresa.component';

describe('PaginaEmpresaComponent', () => {
  let component: PaginaEmpresaComponent;
  let fixture: ComponentFixture<PaginaEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
