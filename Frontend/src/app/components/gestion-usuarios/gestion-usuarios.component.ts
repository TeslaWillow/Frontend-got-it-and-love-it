import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService, Usuario } from '../../services/usuarios.service';
import { TipoUsuario, TipoUsuarioService } from '../../services/tipo-usuario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {

  public usuarios:Usuario[];
  public tiposUsuario:TipoUsuario[];
  public verEliminados = true;
  //Variables para formularios reactivos
  public form_edit_usuarios:FormGroup;
  public form_new_usuarios:FormGroup;

  @ViewChild ('modalCrearNuevoUsuario') modalCrearNuevoUsuario;
  @ViewChild ('modalActualizarUsuario') modalActualizarUsuario;

  constructor(
    private _UsuariosService:UsuariosService, 
    private _TipoUsuarioService:TipoUsuarioService,
    private modalService: NgbModal, 
    private fb:FormBuilder
    ) { 
      this.crearFormularios();
    }

  ngOnInit(): void {
    this.usuarios = this._UsuariosService.getUsuarios();
    this.tiposUsuario = this._TipoUsuarioService.getTiposUsuario();
  }
  /* Metodos para abrir y cargar data en los modales*/
  modalEditUsuario(id:number){
    let usuario = this._UsuariosService.getUsuario(id);
    this.form_edit_usuarios.setValue({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      tipo: usuario.tipoUsuario,
      activo: usuario.activo
    });
    this.modalService.open(this.modalActualizarUsuario, {size: 'lg'});
  }

  modalNewUsuario(){
    this.modalService.open(this.modalCrearNuevoUsuario, {size: 'lg'});
  }
  /* Validador generico*/
  isValid(formulario:FormGroup, campo:string){
    return formulario.get(campo).invalid && formulario.get(campo).touched;
  }
  /*Crea los formularios que empiezan vacios*/
  crearFormularios(){
    this.form_new_usuarios = this.fb.group({
      nombre: ['', 
        [
          Validators.required, 
          Validators.minLength(2),
          Validators.maxLength(20)
        ]
      ],
      apellido: ['', 
        [
          Validators.required, 
          Validators.minLength(2),
          Validators.maxLength(20)
        ]
      ],
      correo: ['', 
        [
          Validators.required, 
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
        ]
      ],
      pass: ['', 
        [
          Validators.required, 
          Validators.minLength(8)
        ]
      ],
      rpt_pass: ['', 
        [
          Validators.required, 
          Validators.minLength(8)
        ]
      ],
      tipo: ['', Validators.required]
    });
    
    this.form_edit_usuarios = this.fb.group({
      nombre: ['', 
        [
          Validators.required, 
          Validators.minLength(2),
          Validators.maxLength(20)
        ]
      ],
      apellido: ['', 
        [
          Validators.required, 
          Validators.minLength(2),
          Validators.maxLength(20)
        ]
      ],
      tipo: ['',  Validators.required],
      activo: ['',  Validators.required]
    });
  }

  guardarUsuario(){
    console.log(this.form_new_usuarios);
    if(this.form_new_usuarios.invalid){
      return Object.values(this.form_new_usuarios.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  actualizarUsuario(){
    console.log(this.form_edit_usuarios);
    if(this.form_edit_usuarios.invalid){
      return Object.values(this.form_edit_usuarios.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
  
}
