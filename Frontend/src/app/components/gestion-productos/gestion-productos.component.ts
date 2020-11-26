import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductosService, Producto } from '../../services/productos.service';
import { Categoria, CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.css']
})
export class GestionProductosComponent implements OnInit {

  public productos:Producto[];
  public categorias:Categoria[];

  @ViewChild('modalCrearCategoria') modalCrearCategoria;
  @ViewChild('modalVerCategorias') modalVerCategorias;
  @ViewChild('modalCrearProducto') modalCrearProducto;

  constructor(
    private _NgModel:NgbModal,
    private _ProductosService:ProductosService,
    private _CategoriasService:CategoriasService
  ) { }

  ngOnInit(): void {
    this.productos = this._ProductosService.getProductos();
  }

  verCategorias(){
    this.categorias = this._CategoriasService.getCategorias();
    this._NgModel.open(this.modalVerCategorias, {size: "lg"});
  }

  crearCategoria(){
    this._NgModel.open(this.modalCrearCategoria, {size: "lg"});
  }

  crearProducto(){
    this.categorias = this._CategoriasService.getCategorias();
    this._NgModel.open(this.modalCrearProducto, {size: "lg"});
  }

}
