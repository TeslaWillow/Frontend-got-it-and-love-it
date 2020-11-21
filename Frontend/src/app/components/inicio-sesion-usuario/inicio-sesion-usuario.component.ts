import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-inicio-sesion-usuario',
  templateUrl: './inicio-sesion-usuario.component.html',
  styleUrls: ['./inicio-sesion-usuario.component.css']
})
export class InicioSesionUsuarioComponent implements OnInit {
  
  public form_login:FormGroup;

  constructor(
    private fb:FormBuilder,
    private auth:AuthService
    ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }


  crearFormulario(){
    this.form_login = this.fb.group({
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
      ]
    });
  }

  /* Validador generico*/
  isValid(formulario:FormGroup, campo:string){
    return formulario.get(campo).invalid && formulario.get(campo).touched;
  }

  loggear(){
    if(this.form_login.invalid){
      return Object.values(this.form_login.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      let correo:string = this.form_login.get('correo').value; 
      let pass:string = this.form_login.get('pass').value;
      if(this.auth.login(correo, pass))
        console.log("logeando usuario");
      else
        console.log("usuario o contraseña invalidos");
    }
  }
}
