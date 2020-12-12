import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pesoArchivos'
})
export class PesoArchivosPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): any {
    return ((value / 1024) / 1014).toFixed(2);
  }

}
