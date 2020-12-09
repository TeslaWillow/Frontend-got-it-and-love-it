import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-inicio-sesion-usuario',
  templateUrl: './inicio-sesion-usuario.component.html',
  styleUrls: ['./inicio-sesion-usuario.component.css']
})
export class InicioSesionUsuarioComponent implements OnInit {
  
  public form_login:FormGroup;
  public notAuthUser:boolean = false;
  public solicitandoInformacion = false;
  public errores = {
    ok: true,
    mensaje: ""
  };
  constructor(
    private fb:FormBuilder,
    private auth:AuthService,
    private router:Router
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
      password: ['', 
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
  /*limpiar los errores*/ 
  limpiarErrores(){
    this.errores.ok = true;
    this.errores.mensaje = "";
  }

  loggear(){
    this.limpiarErrores();
    if(this.form_login.invalid){
      return Object.values(this.form_login.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
       this.solicitandoInformacion = true;
       this.auth.login(this.form_login.value).subscribe(
         (res:any) => {
            this.auth.createSession(res);
            this.solicitandoInformacion = false;
            this.router.navigateByUrl('/dashboard');
         },
         (err:any) => {
            this.solicitandoInformacion = false;
            if(err.status === 400){
              this.errores.mensaje = err.error.mensaje;
              this.errores.ok = err.error.ok;
            }
            else if(err.status === 500){
              this.errores.mensaje = "Tenemos problemas con el servidor. D':";
              this.errores.ok = false;
            }
            else{
              this.errores.mensaje = "Tenemos problemas para conectarnos con el servidor. D':";
              this.errores.ok = false;
            }
         }
       );
    }
  }
}
