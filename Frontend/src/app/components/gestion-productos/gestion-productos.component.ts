import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductosService, Producto } from '../../services/productos.service';
import { Categoria, CategoriasService } from '../../services/categorias.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.css']
})
export class GestionProductosComponent implements OnInit {

  public productos:Producto[];
  public categorias:Categoria[];
  public formProductos:FormGroup;

  @ViewChild('modalCrearCategoria') modalCrearCategoria;
  @ViewChild('modalVerCategorias') modalVerCategorias;
  @ViewChild('modalCrearProducto') modalCrearProducto;
  @ViewChild('modalEditarProducto') modalEditarProducto;

  constructor(
    private _NgModel:NgbModal,
    private _ProductosService:ProductosService,
    private _CategoriasService:CategoriasService,
    private fb:FormBuilder
  ) { 
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.productos = this._ProductosService.getProductos();
  }

  /* Validador generico*/
  isValid(formulario:FormGroup, campo:string){
    return formulario.get(campo).invalid && formulario.get(campo).touched;
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

  editarProducto(_id:number){
    let producto:Producto = this._ProductosService.getProducto(_id);
    this.formProductos.reset({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      foto: producto.foto,
      categoria: producto.categoria
    });
    this._NgModel.open(this.modalEditarProducto, {size: "lg"});
  }

  crearFormulario(){
    this.formProductos = this.fb.group({
      nombre: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(200)
      ]],
      descripcion: ['', [
        Validators.maxLength(500)
      ]],
      precio: ['', [
        Validators.required,
        Validators.min(0.99),
        Validators.max(9999999)
      ]],
      foto: [''],
      categoria: ['', [
        Validators.required
      ]]
    });
  }

  guardarProducto(){
    console.log(this.formProductos);
  }
}
