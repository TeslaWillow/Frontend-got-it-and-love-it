import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoArchivo'
})
export class TipoArchivoPipe implements PipeTransform {

  transform(_value: string, ...args: unknown[]): unknown {
    let value:string = _value.toLowerCase();
    let icon:string = ``;
    switch(value) {
      case "pdf":
        icon = 'far fa-file-pdf';
        break;
      case "img":
        icon = 'far fa-file-image';
        break;
      case "png":
        icon = 'far fa-file-image';
        break;
      case "docx":
        icon = 'far fa-file-word';
        break;
      case "zip":
        icon = 'far fa-file-archive';
        break;
      case "mp4":
        icon = 'far fa-file-video';
        break;
      default:
        icon = 'far fa-file';
    }
    return icon;
  }

}
