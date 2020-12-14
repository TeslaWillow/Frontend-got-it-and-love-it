import { AfterViewInit, Component, OnInit , ElementRef, ViewChild } from '@angular/core';
import * as ace from "ace-builds";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileItem } from '../../Models/file-item';
import { ImagenesService } from '../../services/imagenes.service';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-gestion-plantillas',
  templateUrl: './gestion-plantillas.component.html',
  styleUrls: ['./gestion-plantillas.component.css']
})
export class GestionPlantillasComponent implements OnInit, AfterViewInit {
  public dejandoCaerImgs = false;
  public archivos:FileItem[] = [];
  public formPlantilla:FormGroup;
  private EditorCSS;
  private EditorJS;
  @ViewChild("editorCSS") private editorCSS: ElementRef<HTMLElement>;
  @ViewChild("editorJS") private editorJS: ElementRef<HTMLElement>;
  @ViewChild("modalCrearPlantilla") modalCrearPlantilla; 

  constructor(
    private _NgbModal:NgbModal,
    private _ImagenesService:ImagenesService
    ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    ace.config.set("fontSize", "14px");
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');

    this.EditorCSS = ace.edit(this.editorCSS.nativeElement);
    this.EditorJS = ace.edit(this.editorJS.nativeElement);
    this.EditorCSS.session.setValue(`body {
      padding: 0;
    } /*Escribe tu codigo CSS aquí*/`
    );

    this.EditorJS.session.setValue(`function saludar(){ 
      alert('Hola mundo'); 
    } /*Escribe tu codigo JS aquí*/`
    );

    //Configuracion del editor CSS
    this.EditorCSS.setTheme('ace/theme/twilight');
    this.EditorCSS.session.setMode('ace/mode/css');
    this.EditorJS.setTheme('ace/theme/twilight');
    this.EditorJS.session.setMode('ace/mode/javascript');
    //Configuracion del editor JS
    

    /* De aquí obtenemos la información */
    /*
    EditorCSS.on("change", () => {
      console.log(typeof EditorCSS.getValue());
    });
    */
  }
  
  limpiarImagenes(){
    this.archivos = [];
  }

  crearPlantilla(){
    this._NgbModal.open(this.modalCrearPlantilla, {size:"lg"});
  }
  
  POST_Plantilla(){
    //this._ImagenesService.postImagenes(this.archivos);
    console.log("CSS:" + this.EditorCSS.getValue());
  }

}
