import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanesService, Plan } from '../../services/planes.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-gestion-planes',
  templateUrl: './gestion-planes.component.html',
  styleUrls: ['./gestion-planes.component.css']
})
export class GestionPlanesComponent implements OnInit {

  public planes:Plan[];
  //Variables para formularios reactivos
  public form_nombrePlan:FormControl = new FormControl('');
  public form_color:FormControl = new FormControl('');
  public form_descripcion:FormControl = new FormControl('');
  public form_precio:FormControl = new FormControl('');
  public form_limiteFilas:FormControl = new FormControl('');
  public form_limiteColumnas:FormControl = new FormControl('');
  public form_limitePaginas:FormControl = new FormControl('');
  public form_limiteAlmacenamiento:FormControl = new FormControl('');

  @ViewChild ('modalCrearPlan') modalCrearPlan;
  @ViewChild ('modalActualizarPlan') modalActualizarPlan;
  constructor(private modalService:NgbModal, private _PlanesService:PlanesService) { }

  ngOnInit(): void {
    this.planes = this._PlanesService.getPlanes();
  }

  crearPlan(){
    this.form_nombrePlan.setValue("");
    this.form_color.setValue("");
    this.form_descripcion.setValue(""); //El valor (id) del html, tiene que hacer match, con el valor de la variable de formulario reactivo para cambiar
    this.form_precio.setValue("");
    this.form_limiteFilas.setValue("");
    this.form_limiteColumnas.setValue("");
    this.form_limitePaginas.setValue("");
    this.form_limiteAlmacenamiento.setValue("");
    this.modalService.open(this.modalCrearPlan, {size: 'lg'});
  }

  actualizarPlan(id:number){
    let plan = this._PlanesService.getPlane(id);
    this.form_nombrePlan.setValue(plan.nombrePlan);
    this.form_color.setValue(plan.color);
    this.form_descripcion.setValue(plan.descripcion); //El valor (id) del html, tiene que hacer match, con el valor de la variable de formulario reactivo para cambiar
    this.form_precio.setValue(plan.precio);
    this.form_limiteFilas.setValue(plan.restricciones.limiteFilas);
    this.form_limiteColumnas.setValue(plan.restricciones.limiteColumnas);
    this.form_limitePaginas.setValue(plan.restricciones.limitePaginas);
    this.form_limiteAlmacenamiento.setValue(plan.restricciones.limiteAlmacenamiento);
    this.modalService.open(this.modalActualizarPlan, {size: 'lg'});
  }

  isGratis(valor:number){
    if(valor < 1)
      return true;
    else
      return false;
  }
}
