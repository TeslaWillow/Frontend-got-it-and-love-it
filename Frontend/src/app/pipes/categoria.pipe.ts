import { Pipe, PipeTransform } from '@angular/core';
import { CategoriasService, Categoria } from '../services/categorias.service';

@Pipe({
  name: 'categoria'
})
export class CategoriaPipe implements PipeTransform {

  constructor(
    private _CategoriasService:CategoriasService
  ){}

  transform(value: number, ...args: unknown[]): String {
    let categoria:Categoria = this._CategoriasService.getCategoria(value);
    return categoria.nombre;
  }

}
