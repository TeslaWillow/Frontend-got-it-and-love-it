import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  private static validators:Validators;

  constructor() { }

  passMatch(pass1:string, pass2:string){
    //validacion a nivel de formulario, por eso recibe un formulario
    return ( formGroup:FormGroup ) => {
      const pass1Control = formGroup.controls[pass1];
      const pass2Control = formGroup.controls[pass2];

      if(pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      }else{
        pass2Control.setErrors({ notMatch : true });
      }
    }
  }

  validatorEmpresa(tipo:string, nombreEmpresa:string, rubro:string){
    return( formGroup:FormGroup) => {
      const tipoControl = formGroup.controls[tipo];
      const nombreEmpresaControl = formGroup.controls[nombreEmpresa];
      const rubroControl = formGroup.controls[rubro];

      if(tipoControl.value === 'empresa'){
        if(nombreEmpresaControl.value === '')
          nombreEmpresaControl.setErrors({ empty: true});
        if(rubroControl.value === '')
          rubroControl.setErrors({ empty: true});
      }else{
        nombreEmpresaControl.setErrors(null);
        rubroControl.setErrors(null);
      }
    }
  }
}
