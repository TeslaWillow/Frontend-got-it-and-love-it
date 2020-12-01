import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductosService, Producto } from '../../services/productos.service';
import { Categoria, CategoriasService } from '../../services/categorias.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.css']
})
export class GestionProductosComponent implements OnInit {

  public productos:Producto[];
  public categorias:Categoria[];
  public formProductos:FormGroup;
  public formCategorias:FormGroup;
  public imagen:string;
  public verInactivos = true;

  @ViewChild('modalCrearCategoria') modalCrearCategoria;
  @ViewChild('modalVerCategorias') modalVerCategorias;
  @ViewChild('modalCrearProducto') modalCrearProducto;
  @ViewChild('modalEditarProducto') modalEditarProducto;
  @ViewChild('modalEditCategoria') modalEditCategoria;
  
  constructor(
    private _NgModel:NgbModal,
    private _ProductosService:ProductosService,
    private _CategoriasService:CategoriasService,
    private fb:FormBuilder
  ) { 
    this.crearFormularios();
  }

  ngOnInit(): void {
    this.productos = this.GET_Productos();
  }
  
  crearFormularios(){
    this.formProductos = this.fb.group({
      _id: [''],
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
      foto: ['',  [
        RxwebValidators.file({minFiles:1, maxFiles:1 }),
        RxwebValidators.extension({extensions:["jpeg","gif","png","jpg"]})
      ]],
      categoria: ['', [
        Validators.required
      ]]
    });
  
    this.formCategorias = this.fb.group({
      _id: [''],
      nombre: ['', [
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(2)
      ]],
      descripcion: ['', [
        Validators.maxLength(200)
      ]]
    });
  }
  /* Validador generico*/
  isValid(formulario:FormGroup, campo:string){
    return formulario.get(campo).invalid && formulario.get(campo).touched;
  }

  cargarFoto(event:any){
    if(event.target.files && event.target.files.length > 0){
      const archivo = (event.target as HTMLInputElement).files[0];
      if(archivo.type.split("/")[0] === "image"){
        this.formProductos.patchValue({
          foto: archivo
        });
        this.formProductos.get('foto').updateValueAndValidity();
    
        //preview
        const reader = new FileReader();
        reader.onload = () => {
          this.imagen = reader.result as string;
        };
        reader.readAsDataURL(archivo);
      }else{
        this.imagen = null;
      }
    }
  }

  verCategorias(){
    this.categorias = this.GET_Categorias();
    this._NgModel.open(this.modalVerCategorias, {size: "lg"});
  }

  crearCategoria(){
    this.limpiarFormularioCategorias();
    this._NgModel.open(this.modalCrearCategoria, {size: "lg"});
  }

  limpiarFormularioProductos(){
    this.formProductos.reset();
    this.imagen = null;
  }

  limpiarFormularioCategorias(){
    this.formCategorias.reset();
  }

  crearProducto(){
    this.limpiarFormularioProductos();
    this.categorias = this.GET_Categorias();
    this._NgModel.open(this.modalCrearProducto, {size: "lg"});
  }

  editarProducto(_id:number){
    this.limpiarFormularioProductos();
    let producto:Producto = this.GET_Producto(_id);
    this.categorias = this.GET_Categorias();
    this.formProductos.reset({
      _id: _id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      categoria: producto.categoria,
      foto: producto.foto
    });
    this._NgModel.open(this.modalEditarProducto, {size: "lg"});
  }

  editarCategoria(_id:number){
    this.limpiarFormularioCategorias();
    let categoria:Categoria = this.GET_Categoria(_id);
    this.formCategorias.reset({
      _id: _id,
      nombre: categoria.nombre,
      descripcion: categoria.descripcion
    });
    this._NgModel.open(this.modalEditCategoria, {size: "lg"});
  }

  // Metodos que solicitan informacion. (GET)
  GET_Productos(){
    return this._ProductosService.getProductos();
  }

  GET_Producto(_id:number){
    return this._ProductosService.getProducto(_id);
  }

  GET_Categorias(){
    return this._CategoriasService.getCategorias();
  }

  GET_Categoria(_id:number){
    return this._CategoriasService.getCategoria(_id);
  }
  // Metodos que se conectan a servicios para hacer el envio de la informacion y recibir respuestas de confirmación.
  POST_Producto(){
    if(this.formProductos.invalid){
      return Object.values(this.formProductos.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      console.log("Guardando producto", this.formProductos.value);
    }
  }

  POST_Categoria(){
    if(this.formCategorias.invalid){
      return Object.values(this.formCategorias.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      console.log("Categoria guardada:", this.formCategorias.value);
    }
  }
  
  PUT_Producto(){
    if(this.formProductos.invalid){
      return Object.values(this.formProductos.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      console.log("Producto Actualizado", this.formProductos.value);
    }
  }

  PUT_Categoria(){
    if(this.formCategorias.invalid){
      return Object.values(this.formCategorias.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      console.log("Categoria Actualizada", this.formCategorias.value);
    }
  }
}
