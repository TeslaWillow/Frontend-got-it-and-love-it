import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lista-paginas-empresa',
  templateUrl: './lista-paginas-empresa.component.html',
  styleUrls: ['./lista-paginas-empresa.component.css']
})
export class ListaPaginasEmpresaComponent implements OnInit {

  public usarPlantilla = false;

  @ViewChild("modalDetallesDeEmpresa") modalDetallesDeEmpresa;
  @ViewChild("modalCrearPagina") modalCrearPagina;

  constructor(
    private _NgbModal:NgbModal
  ) { }

  ngOnInit(): void {
  }

  crearNuevaPagina(){
    this._NgbModal.open(this.modalCrearPagina, { size:"lg" });
  }

  detallesDeempresa(){
    this._NgbModal.open(this.modalDetallesDeEmpresa, { size:"lg" });
  }
}
