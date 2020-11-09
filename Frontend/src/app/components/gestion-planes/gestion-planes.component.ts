import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanesService, Plan } from '../../services/planes.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-gestion-planes',
  templateUrl: './gestion-planes.component.html',
  styleUrls: ['./gestion-planes.component.css']
})
export class GestionPlanesComponent implements OnInit {

  public planes:Plan[];
  //Variables para formularios reactivos
  public form_edit_planes:FormGroup;
  public form_new_planes:FormGroup;

  @ViewChild ('modalCrearPlan') modalCrearPlan;
  @ViewChild ('modalActualizarPlan') modalActualizarPlan;
  constructor(
    private _PlanesService:PlanesService, 
    private modalService:NgbModal, 
    private fb:FormBuilder
  ) { 
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.planes = this._PlanesService.getPlanes();
  }

  cargarCrearPlan(){
    this.modalService.open(this.modalCrearPlan, {size: 'lg'});
  }

  cargarActualizarPlan(id:number){
    let plan = this._PlanesService.getPlane(id);
    this.form_edit_planes = this.fb.group({
      nombrePlan: [plan.nombrePlan, 
        [
          Validators.required, 
          Validators.minLength(2),
          Validators.maxLength(15)
        ]
      ],
      color: [plan.color, Validators.required ],
      descripcion: [plan.descripcion],
      precio: [plan.precio, 
        [
          Validators.required, 
          Validators.min(0.99),
          Validators.max(999.99)
        ]
      ],
      limiteFilas: [plan.restricciones.limiteFilas, 
        [
          Validators.required, 
          Validators.min(3),
          Validators.max(7)
        ]
      ],
      limiteColumnas: [plan.restricciones.limiteColumnas,
        [
          Validators.required, 
          Validators.min(1),
          Validators.max(12)
        ]
      ],
      limitePaginas: [plan.restricciones.limitePaginas,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(3)
        ]
      ],
      limiteAlmacenamiento: [plan.restricciones.limiteAlmacenamiento,
        [
          Validators.required, 
          Validators.min(50),
          Validators.max(1024)
        ]
      ]      
    });

    this.modalService.open(this.modalActualizarPlan, {size: 'lg'});
  }

  crearFormulario(){
    this.form_new_planes = this.fb.group({
      nombrePlan: ['', 
        [
          Validators.required, 
          Validators.minLength(2),
          Validators.maxLength(15)
        ]
      ],
      color: ['', Validators.required ],
      descripcion: [''],
      precio: ['', 
        [
          Validators.required, 
          Validators.min(0.99),
          Validators.max(999.99)
        ]
      ],
      limiteFilas: ['', 
        [
          Validators.required, 
          Validators.min(3),
          Validators.max(7)
        ]
      ],
      limiteColumnas: ['',
        [
          Validators.required, 
          Validators.min(1),
          Validators.max(12)
        ]
      ],
      limitePaginas: ['',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(3)
        ]
      ],
      limiteAlmacenamiento: ['',
        [
          Validators.required, 
          Validators.min(50),
          Validators.max(1024)
        ]
      ]      
    });
  }

  isGratis(valor:number){
    if(valor < 0.99)
      return true;
    else
      return false;
  }

  /* Validador generico*/
  isValid(formulario:FormGroup, campo:string){
    return formulario.get(campo).invalid && formulario.get(campo).touched;
  }

  guardarPlan(){
    console.log("plan guardado");
    console.log(this.form_new_planes);
    if(this.form_new_planes.invalid){
      return Object.values(this.form_new_planes.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  actualizarPlan(){
    console.log("plan actualizado");
    console.log(this.form_edit_planes);
    if(this.form_edit_planes.invalid){
      return Object.values(this.form_edit_planes.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

}
