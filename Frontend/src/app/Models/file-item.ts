export class FileItem {
    public archivo:File;
    public nombreArchivo:string;
    public url:string; // Url del archivo
    public isUpload:boolean; // Si se esta subiendo o no
    public progressUpload:number; // Cantidad de carga

    constructor( archivo:File ){
        this.archivo = archivo;
        this.nombreArchivo = archivo.name;
        
        this.isUpload = false;
        this.progressUpload = 0;
    }
}