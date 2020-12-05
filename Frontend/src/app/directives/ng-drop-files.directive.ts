import { FileItem } from '../Models/file-item';
import { FormGroup } from '@angular/forms';
import {  Directive, EventEmitter, 
          ElementRef, HostListener, 
          Input, Output, Host } from '@angular/core';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {
  @Input() archivos:FileItem[] = [];
  @Input() formPlantilla:FormGroup;
  @Output() mouseSobre:EventEmitter<boolean> = new EventEmitter();

  constructor() { }
  /* eventos que controlan cuando el mouse entra o sale*/ 
  //Cuando el mouse entra con archivos
  @HostListener('dragover', ['$event'])
  public onDragEnter( event:any ){
    this.mouseSobre.emit(true);
    this._prevenirDefault(event);
  }
  //Cuando se arrastran los archivos fuera
  @HostListener('dragleave', ['$event'])
  public onDragLeave( event:any ){
    this.mouseSobre.emit(false);
  }
  //Cuando se sueltan los archivos
  @HostListener('drop', ['$event'])
  public onDrop( event:any ){
    const transferencia = this._getTransferencia( event );
    if(!transferencia){
      return; //no se hace nada
    }
    
    this._extraerArchivos( transferencia.files );
    this._prevenirDefault(event);
    this.mouseSobre.emit( false );
  }
  /*----------------------------------------------------*/ 
  //Funcion que solventa problemas de compatibilidad entre navegadores
  private _getTransferencia(event:any){
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extraerArchivos( archivosList:FileList){
    //tslint:disable-next-line:forin
    for(const propiedad in archivosList){
      const archivoTemp = archivosList[propiedad];
      if(this._fileCanBeUploaded(archivoTemp)){
        const nuevoArchivo = new FileItem(archivoTemp);
        this.archivos.push(nuevoArchivo);
      }
    }
    console.log(this.archivos);
  }
  //Validaciones
  private  _fileCanBeUploaded( archivo:File ):boolean {
    if(!this._archivoIsAlreadyDrop(archivo.name) && this._esImagen(archivo.type))
      return true;
    else
      return false;
  }

  private _prevenirDefault( event:Event ){
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoIsAlreadyDrop( nombreArchivo:string):boolean{
    for(const archivo of this.archivos){
      if( archivo.nombreArchivo == nombreArchivo ){
        console.log(`Un archivo ya a sido dropeado: ${nombreArchivo}`);
        return true;
      }
    }
    return false;
  }
  //Retorna 1 si encuentra una imagen, falso si no es de tipo imagen.
  private _esImagen( tipoArchivo: string):boolean {
    return (tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
  }
}
