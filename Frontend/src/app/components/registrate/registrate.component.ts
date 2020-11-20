import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService, Usuario } from '../../services/usuarios.service';
import { ValidadoresService } from '../../services/validadores.service';


@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.component.html',
  styleUrls: ['./registrate.component.css']
})
export class RegistrateComponent implements OnInit {

  public usuarios:Usuario[];
  public isEmpresa:Boolean = false;
  public form_reg_usuario:FormGroup;

  constructor(
    private fb:FormBuilder,
    private _ValidadoresService:ValidadoresService
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
      pass: ['', 
        [
          Validators.required, 
          Validators.minLength(8)
        ]
      ],
      rpt_pass: [''],
      tipo: ['cliente', Validators.required],
      nombreEmpresa: [''],
      direccionEmpresa: [''],
      rubroEmpresa: ['']
    }, {
      validators: [
        this._ValidadoresService.passMatch('pass','rpt_pass'),
        this._ValidadoresService.validatorEmpresa('tipo','nombreEmpresa','rubroEmpresa')
      ]
    });
  }

  rpt_pass(){
    const pass1 = this.form_reg_usuario.get('pass').value;
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
    console.log("guardando usuario");
    console.log(this.form_reg_usuario);
    if(this.form_reg_usuario.invalid){
      return Object.values(this.form_reg_usuario.controls).forEach(control => {
        if( control instanceof FormGroup)
          Object.values(control.controls).forEach( control => control.markAsTouched());
        else
          control.markAsTouched();
      });
    }
  }

}
