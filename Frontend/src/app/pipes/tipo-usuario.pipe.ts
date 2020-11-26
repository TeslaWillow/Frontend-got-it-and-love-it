import { Pipe, PipeTransform } from '@angular/core';
import { TipoUsuarioService, TipoUsuario } from '../services/tipo-usuario.service';

@Pipe({
  name: 'tipoUsuario'
})
export class TipoUsuarioPipe implements PipeTransform {

  constructor(
    private _TipoUsuarioService:TipoUsuarioService
  ){}

  transform(value: number, ...args: unknown[]): string {
    let tipoUsuario:TipoUsuario = this._TipoUsuarioService.getTipoUsuario(value);
    return tipoUsuario.tipo;
  }

}
