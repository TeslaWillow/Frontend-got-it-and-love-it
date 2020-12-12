import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extension'
})
export class ExtensionPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if(value === ".png" || value === ".jpg" || value === ".jpeg" || value === ".gif"){
      return `far fa-file-image`;
    }else if(value === ".rar" || value === ".zip"){
      return `far fa-file-archive`
    }else{
      return `far fa-file`
    }
  }

}
