import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Activo'
})
export class ActivoPipe implements PipeTransform {

  transform(value:Boolean, ...args: unknown[]): unknown {
    let html = ``;
    if(value)
      html = `fas fa-check txt-naranja`;
    else
      html = `fas fa-times txt-red`;
    return html;
  }

}
