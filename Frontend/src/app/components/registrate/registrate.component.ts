import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService, Usuario } from '../../services/usuarios.service';


@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.component.html',
  styleUrls: ['./registrate.component.css']
})
export class RegistrateComponent implements OnInit {

  public usuarios:Usuario[];
  public isEmpresa:Boolean = false;
  public form_reg_usuario:FormGroup;

  constructor(private fb:FormBuilder) {
    this.crearFormulario();
   }

  ngOnInit(): void {
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
      rpt_pass: ['', 
        [
          Validators.required, 
          Validators.minLength(8)
        ]
      ],
      tipo: ['', Validators.required],
      empresa: this.fb.group({
        nombreEmpresa: ['',
          [
            Validators.required, 
            Validators.minLength(1),
            Validators.maxLength(20)
          ]
        ],
        direccionEmpresa: [''],
        rubroEmpresa: ['', Validators.required]
      })
    });
  }

  isValid(formulario:FormGroup, campo:string){
    return formulario.get(campo).invalid && formulario.get(campo).touched;
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
