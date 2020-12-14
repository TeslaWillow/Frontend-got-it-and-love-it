import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as ace from "ace-builds";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-pagina-empresa',
  templateUrl: './pagina-empresa.component.html',
  styleUrls: ['./pagina-empresa.component.css']
})
export class PaginaEmpresaComponent implements OnInit, AfterViewInit {

  public rows:any[] = [{
    columns: [{
      descripcion: "Titulo 1",
      html: "<p>¡Tu contenido aquí!</p>",
      css: "",
      color: "#FFF"
    },
    {
      descripcion: "Titulo 2",
      html: "<p>¡Tu contenido aquí!</p>",
      css: "",
      color: "#D62828"
    }]
  },
  {
    columns: [{
      descripcion: "Titulo 3",
      html: "<p>¡Tu contenido aquí!</p>",
      css: "",
      color: "#F77F00"
    },
    {
      descripcion: "Titulo 4",
      html: "<p>¡Tu contenido aquí!</p>",
      css: "",
      color: "#FCBF49"
    },
    {
      descripcion: "Titulo 5",
      html: "<p>¡Tu contenido aquí!</p>",
      css: "",
      color: "#FFF"
    }]
  }];
  public bloque:any;
  public tipoBloque:boolean = true;
  public verOpciones = true;
  public verGrilla = true;
  public verCodigo = true;
  public verPreview = true;
  public html = "";
  public Editor = ClassicEditor;
  private EditorHTML;
  private EditorCSS;

  @ViewChild("DOMeditorHTML") DOMeditorHTML: ElementRef<HTMLElement>;
  @ViewChild("DOMeditorCSS") DOMeditorCSS: ElementRef<HTMLElement>;
  @ViewChild("modalDetallesPagina") modalDetallesPagina;
  constructor(
    private modalService:NgbModal
    ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
      ace.config.set("fontSize", "14px");
      ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');

      this.EditorHTML = ace.edit(this.DOMeditorHTML.nativeElement);
      this.EditorCSS = ace.edit(this.DOMeditorCSS.nativeElement);
      this.EditorHTML.session.setValue(``);
      this.EditorCSS.session.setValue(``);
      //Configuracion del editor CSS
      this.EditorHTML.setTheme('ace/theme/twilight');
      this.EditorHTML.session.setMode('ace/mode/html');
      this.EditorCSS.setTheme('ace/theme/twilight');
      this.EditorCSS.session.setMode('ace/mode/css');
      //Configuracion del editor JS
      
  
      /* De aquí obtenemos la información */
      
      // this.EditorHTML.on("change", () => {
      //   this.bloque.html = this.EditorHTML.getValue();
      // });
  }
  

  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
  }

  actualizarHTML_ACE(){
    this.bloque.html = this.EditorHTML.getValue();
    this.tipoBloque = false;
  }

  actualizarHTML_WYSIWYG(){
    this.EditorHTML.session.setValue(this.bloque.html);
  }

  anchoColumna(elementos:number):any{
    let ancho = (100/elementos) - 0.5;
    return ancho.toString();
  }

  agregarFila():void{
    this.rows.push({
      columns: [{
        descripcion: "Titulo X",
        html: "<p>¡Tu contenido aquí!</p>",
        css: "",
        color: "#FCBF49"
      }]
    });
  }

  eliminarFila(index:number):void{
    this.rows.splice(index,1);
  }

  agregarColumna(fila:number):void{
    this.rows[fila].columns.push({
      descripcion: "Titulo X",
      html: "<p>¡Tu contenido aquí!</p>",
      css: "",
      color: "#FFF"
    });
  }

  eliminarColumna(fila:number, columna:number):void{
    this.rows[fila].columns.splice(columna,1);
  }

  detallesPagina(){
    this.modalService.open(this.modalDetallesPagina, {size: 'lg'});
  }

  crearHTML(){
    this.html = '<!doctype html><html lang="en"><head><style>p {color: red;}</style></head>';
    this.html += '<body><div class="container">';
    for (const row of this.rows) {
      this.html +=  '<div class="row">';
      for (const column of row.columns) {
        this.html += `<div class="col-${12/Number(row.columns.length)} text-break">`
        this.html += `${column.html}`
        this.html += `</div>`
      }
      this.html +=  '</div>';
    }
    this.html += '</div></body></html>'
  }

  contenidoBloque(fila:number, columna:number){
    this.bloque = this.rows[fila].columns[columna];
  }
}
