import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService, Usuario } from '../../services/usuarios.service';
import { ValidadoresService } from '../../services/validadores.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.component.html',
  styleUrls: ['./registrate.component.css']
})
export class RegistrateComponent implements OnInit {

  public usuarios:Usuario[];
  public isEmpresa:Boolean = false;
  public form_reg_usuario:FormGroup;
  public serverError = false;
  public dataError = false;
  public solicitandoInformacion = false;

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private _ValidadoresService:ValidadoresService,
    private _UsuariosService:UsuariosService
    ) {}

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario(){
    this.form_reg_usuario = this.fb.group({
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
      rpt_pass: ['']
    }, {
      validators: this._ValidadoresService.passMatch('password','rpt_pass')
    });
  }

  rpt_pass(){
    const pass1 = this.form_reg_usuario.get('password').value;
    const pass2 = this.form_reg_usuario.get('rpt_pass').value;

    return (pass1 === pass2) ? false : true;
  }

  isValid(formulario:FormGroup, campo:string){
    return formulario.get(campo).invalid && formulario.get(campo).touched;
  }

  radioTipoUsuario(tipo:string){
    if(tipo === "cliente")
      this.isEmpresa = false;
    else
      this.isEmpresa = true;
    this.form_reg_usuario.get('tipo').setValue(tipo);
  }

  guardarUsuario(){
    console.log("guardando usuario: ");
    if(this.form_reg_usuario.invalid){
      console.log("llena todos los campos primero");
      return Object.values(this.form_reg_usuario.controls).forEach(control => {
        if( control instanceof FormGroup)
          Object.values(control.controls).forEach( control => control.markAsTouched());
        else
          control.markAsTouched();
      });
    }else{
      this.solicitandoInformacion = true;
      this._UsuariosService.POST_Usuario(this.form_reg_usuario.value).subscribe(
        (res:any) => {
          this.solicitandoInformacion = false;
        if(res.ok)
          this.router.navigateByUrl('/inicio-sesion-usuario');
        else
          console.log(res);
        },
        (err:any) => {
          this.solicitandoInformacion = false;
          if(err.status === 500)
            this.serverError = true;
          if(err.status === 400)
            this.dataError = true;
        }
      );
    }
  }

}
