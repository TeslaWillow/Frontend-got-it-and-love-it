import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductosService, Producto } from '../../services/productos.service';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.css']
})
export class GestionProductosComponent implements OnInit {

  public productos:Producto[];

  @ViewChild('modalCrearCategoria') modalCrearCategoria;
  @ViewChild('modalVerCategorias') modalVerCategorias;

  constructor(
    private _NgModel:NgbModal,
    private _ProductosService:ProductosService
  ) { }

  ngOnInit(): void {
    this.productos = this._ProductosService.getProductos();
  }

  verCategorias(){
    this._NgModel.open(this.modalVerCategorias, {size: "lg"});
  }

  crearCategoria(){
    this._NgModel.open(this.modalCrearCategoria, {size: "lg"});
  }



}
