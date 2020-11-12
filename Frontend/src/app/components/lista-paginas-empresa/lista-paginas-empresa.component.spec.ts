import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPaginasEmpresaComponent } from './lista-paginas-empresa.component';

describe('ListaPaginasEmpresaComponent', () => {
  let component: ListaPaginasEmpresaComponent;
  let fixture: ComponentFixture<ListaPaginasEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPaginasEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPaginasEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
