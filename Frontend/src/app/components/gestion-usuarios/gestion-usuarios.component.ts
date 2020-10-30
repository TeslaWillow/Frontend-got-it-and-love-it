import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService, Usuario } from '../../services/usuarios.service';
import { TipoUsuario, TipoUsuarioService } from '../../services/tipo-usuario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {

  public usuarios:Usuario[];
  private tipoUsuario:TipoUsuario;
  public tiposUsuario:TipoUsuario[];
  //Variables para formularios reactivos
  public form_nombre:FormControl = new FormControl('');
  public form_apellido:FormControl = new FormControl('');
  public form_tipoUsuario:FormControl = new FormControl('');
  public form_activo:FormControl = new FormControl('');

  @ViewChild ('modalCrearNuevoUsuario') modalCrearNuevoUsuario;
  @ViewChild ('modalActualizarUsuario') modalActualizarUsuario;

  constructor(
    private _UsuariosService:UsuariosService, 
    private modalService: NgbModal, 
    private _TipoUsuarioService:TipoUsuarioService
    ) { }

  ngOnInit(): void {
    this.usuarios = this._UsuariosService.getUsuarios();
    this.tiposUsuario = this._TipoUsuarioService.getTiposUsuario();
  }

  getTipoUsuario(id:number){
    return this._TipoUsuarioService.getTipoUsuario(id);
  }

  actualizarUsuario(id:number){
    let usuario = this._UsuariosService.getUsuario(id);
    console.log(usuario);
    this.form_nombre.setValue(usuario.nombre);
    this.form_apellido.setValue(usuario.apellido);
    this.form_tipoUsuario.setValue(usuario.tipoUsuario); //El valor (id) del html, tiene que hacer match, con el valor de la variable de formulario reactivo para cambiar
    this.form_activo.setValue(usuario.activo);
    this.modalService.open(this.modalActualizarUsuario, {size: 'lg'});
  }

  crearNuevoUsuario(){
    this.modalService.open(this.modalCrearNuevoUsuario, {size: 'lg'});
  }

}
