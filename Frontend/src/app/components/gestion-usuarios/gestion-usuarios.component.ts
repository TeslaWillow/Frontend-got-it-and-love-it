import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService, Usuario } from '../../services/usuarios.service';
import { TipoUsuario, TipoUsuarioService } from '../../services/tipo-usuario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {

  public usuarios:Usuario[];
  public usuario:Usuario;
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
    private _ValidadoresService:ValidadoresService,
    private modalService: NgbModal, 
    private fb:FormBuilder
    ) { 
      this.crearFormularios();
    }

  ngOnInit(): void {
    this.GET_llenarUsuarios();
    this.GET_llenarTipoUsuario();
  }
  /* Metodos para abrir y cargar data en los modales*/
  modalEditUsuario(usuario:Usuario){
    this.usuario = usuario;
    this.form_edit_usuarios.reset({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      tipo: usuario.tipoUsuario[0]._id,
      activo: usuario.activo
    });
    this.modalService.open(this.modalActualizarUsuario, {size: 'lg'});
  }

  modalNewUsuario(){
    this.modalService.open(this.modalCrearNuevoUsuario, {size: 'lg'});
  }
  /* Validadores*/
  isValid(formulario:FormGroup, campo:string){
    return formulario.get(campo).invalid && formulario.get(campo).touched;
  }

  rpt_pass(formulario:FormGroup){
    const pass1 = formulario.get('password').value;
    const pass2 = formulario.get('rpt_pass').value;

    return (pass1 === pass2) ? false : true;
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
      password: ['', 
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
    }, {
      validators: this._ValidadoresService.passMatch('password','rpt_pass')
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

  // Metodos que llaman a los servicios
  GET_llenarUsuarios(){
    this._UsuariosService.GET_Usuarios().subscribe(
      (res:any) => {
        this.usuarios = res.data;
      },
      (err:any) => {
        console.log(err);
      }
    );
  }

  GET_llenarTipoUsuario(){
    this._TipoUsuarioService.getTiposUsuario().subscribe(
      (res:any) => {
        this.tiposUsuario = res.data;
      },
      (err:any) => {

      }
    );
  }

  guardarUsuario(){
    if(this.form_new_usuarios.invalid){
      return Object.values(this.form_new_usuarios.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      console.log("Guardando...");
      this._UsuariosService.POST_Usuario(this.form_new_usuarios.value).subscribe(
        (res:any) => {
          this.GET_llenarUsuarios();
          this.modalService.dismissAll(this.modalCrearNuevoUsuario);
        },
        (err:any) => {
          console.log(err);
        }
      );
    }
  }

  actualizarUsuario(usuario:Usuario){
    if(this.form_edit_usuarios.invalid){
      return Object.values(this.form_edit_usuarios.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      console.log("Actualizando...");
      this._UsuariosService.PUT_Usuario(usuario._id, this.form_edit_usuarios.value).subscribe(
        (res:any) => {
          if(res.ok){
            this.GET_llenarUsuarios();
            this.modalService.dismissAll(this.modalActualizarUsuario);
          }
        },
        (err:any) => {
            console.log(err);
        }
      );
    }
  }
  
  inhabilitarUsuario(usuario:Usuario){
    let _id = usuario._id;
    console.log("Inhabilitando...");
    this._UsuariosService.DELETE_Usuario(_id).subscribe(
      (res:any) => {
        usuario.activo = res.data.activo;
      },
      (err:any) => {
        console.log(err);
      }
    );
  };
}
