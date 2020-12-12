import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductosService, Producto } from '../../services/productos.service';
import { Categoria, CategoriasService } from '../../services/categorias.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { EmpresasService } from '../../services/empresas.service';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.css']
})
export class GestionProductosComponent implements OnInit {

  public productos:Producto[];
  public producto:Producto;
  public categorias:Categoria[];
  public categoria:Categoria;
  public formProductos:FormGroup;
  public formCategorias:FormGroup;
  public imagen:string;
  public hasEmpresa:boolean = false;
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
    private _EmpresasService:EmpresasService,
    private fb:FormBuilder
  ) { 
    this.crearFormularios();
  }

  ngOnInit(): void {
    this.GET_Productos();
    this.verificarEmpresaUsuario();
  }
  
  verificarEmpresaUsuario(){
    this._EmpresasService.GET_EmpresaUsuario().subscribe(
      (res:any) => {
        this.hasEmpresa = res.ok;
      },
      (err:any) => {
        this.hasEmpresa = err.ok;
      }
    );
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
    this.GET_Categorias();
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
    this.GET_Categorias();
    this._NgModel.open(this.modalCrearProducto, {size: "lg"});
  }

  editarProducto(producto:Producto){
    this.limpiarFormularioProductos();
    this.producto = producto;
    this.GET_Categorias();
    this.formProductos.reset({
      _id: this.producto._id,
      nombre: this.producto.nombre,
      descripcion: this.producto.descripcion,
      precio: this.producto.precio,
      categoria: this.producto.categoria[0]._id,
      foto: this.producto.foto
    });
    this._NgModel.open(this.modalEditarProducto, {size: "lg"});
  }

  editarCategoria(_idCategoria:string){
    this.limpiarFormularioCategorias();
    this.GET_Categoria(_idCategoria);
  }

  // Metodos que solicitan informacion. (GET)
  GET_Productos(){
    this._ProductosService.GET_ProductosEmpresa().subscribe(
      (res:any) => {
        this.productos = res.data;
      },
      (err:any) => {
        console.log(err);
      }
    );
  }

  GET_Producto(_id:string){
    this._ProductosService.GET_Producto(_id).subscribe(
      (res:any) => {
        this.producto = res.data;
      },
      (err:any) => {
        console.log(err);
      }
    );
  }

  GET_Categorias(){
    this._CategoriasService.GET_CategoriasEmpresa().subscribe(
      (res:any) => {
        this.categorias = res.data;
      },
      (err:any) => {
        console.log(err);
      }
    );
  }

  GET_Categoria(_idCategoria:string){
    this._CategoriasService.GET_Categoria(_idCategoria).subscribe(
      (res:any) => {
        this.categoria = res.data;
        this.formCategorias.reset({
          _id: this.categoria._id,
          nombre: this.categoria.nombre,
          descripcion: this.categoria.descripcion
        });
        this._NgModel.open(this.modalEditCategoria, {size: "lg"});
      },
      (err:any) => {
        console.log(err);
      }
    );
  }
  // Metodos que se conectan a servicios para hacer el envio de la informacion y recibir respuestas de confirmación.
  POST_Producto(){
    if(this.formProductos.invalid){
      return Object.values(this.formProductos.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      this._ProductosService.POST_Producto(this.formProductos.value).subscribe(
        (res:any) => {
          if(res.ok){
            this.GET_Productos();
            this._NgModel.dismissAll();
          }
        },
        (err:any) => {
          console.log(err);
        }
      );
    }
  }

  POST_Categoria(){
    if(this.formCategorias.invalid){
      return Object.values(this.formCategorias.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      this._CategoriasService.POST_Categoria(this.formCategorias.value).subscribe(
        (res:any) => {
          this._NgModel.dismissAll();
          console.log(res);
        },
        (err:any) => {
          console.log(err);
        }
      );
    }
  }
  
  PUT_Producto(){
    if(this.formProductos.invalid){
      return Object.values(this.formProductos.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      this._ProductosService.PUT_Producto(this.producto._id ,this.formProductos.value).subscribe(
        (res:any) => {
          this.GET_Productos();
          this._NgModel.dismissAll();
          console.log(res);
        },
        (err:any) => {
          console.log(err);
        }
      );
    }
  }

  PUT_Categoria(){
    if(this.formCategorias.invalid){
      return Object.values(this.formCategorias.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      this._CategoriasService.PUT_Categoria(this.categoria._id, this.formCategorias.value).subscribe(
        (res:any) => {
          this.GET_Categorias();
          this._NgModel.dismissAll();
          console.log(res);
        },
        (err:any) => {
          console.log(err);
        }
      );
    }
  }

  DELETE_Categoria(_idCategoria:string){
    this._CategoriasService.DELETE_Categoria(_idCategoria).subscribe(
      (res:any) => {
        console.log(res);
        this.GET_Categorias();
      },
      (err:any) => {
        console.log(err);
      }
    );
  }

  DELETE_Producto(_idProducto:string){
    this._ProductosService.DELETE_Producto(_idProducto).subscribe(
      (res:any) => {
        this.GET_Productos();
      },
      (err:any) => {}
    );
  }
}
