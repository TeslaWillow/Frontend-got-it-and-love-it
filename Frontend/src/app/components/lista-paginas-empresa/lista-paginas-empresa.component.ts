import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresasService } from '../../services/empresas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-paginas-empresa',
  templateUrl: './lista-paginas-empresa.component.html',
  styleUrls: ['./lista-paginas-empresa.component.css']
})
export class ListaPaginasEmpresaComponent implements OnInit {

  public usarPlantilla = false;
  public hasEmpresa:boolean = false;
  public formEmpresa:FormGroup;

  @ViewChild("modalDetallesDeEmpresa") modalDetallesDeEmpresa;
  @ViewChild("modalCrearPagina") modalCrearPagina;

  constructor(
    private _NgbModal:NgbModal,
    private _EmpresasService:EmpresasService,
    private auth:AuthService,
    private router:Router,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.crearFormularios();
    this.verificarEmpresaUsuario();
  }

  crearFormularios(){
    this.formEmpresa = this.fb.group({
      nombre: ['', [
        Validators.required,
        Validators.maxLength(200)
      ]],
      direccion: [''],
      rubro: ['', [
        Validators.required
      ]]
    });
  }

  /* Validador generico*/
  isValid(formulario:FormGroup, campo:string){
    return formulario.get(campo).invalid && formulario.get(campo).touched;
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

  crearNuevaPagina(){
    this._NgbModal.open(this.modalCrearPagina, { size:"lg" });
  }

  detallesDeempresa(){
    this._NgbModal.open(this.modalDetallesDeEmpresa, { size:"lg" });
  }

  GuardarDatos(){
    if(!this.hasEmpresa)
      this.POST_guardarEmpresa();
    else
      this.PUT_actualizarEmpresa();
  }

  POST_guardarEmpresa(){
    if(this.formEmpresa.invalid){
      return Object.values(this.formEmpresa.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      this._EmpresasService.POST_Empresa(this.formEmpresa.value).subscribe(
        (res:any) => {
          if(res.ok){
            this.auth.logout();
            this._NgbModal.dismissAll(this.modalDetallesDeEmpresa);
            this.router.navigateByUrl("/inicio-sesion-usuario");
          }
        },
        (err:any) => {
          console.log(err);
        }
      );
    }
  }

  PUT_actualizarEmpresa(){
    if(this.formEmpresa.invalid){
      return Object.values(this.formEmpresa.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      console.log("Actualizando empresa", this.formEmpresa.value);
    }
  }
}
