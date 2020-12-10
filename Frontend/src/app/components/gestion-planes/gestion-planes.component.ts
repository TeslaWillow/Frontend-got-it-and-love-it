import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanesService, Plan } from '../../services/planes.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-gestion-planes',
  templateUrl: './gestion-planes.component.html',
  styleUrls: ['./gestion-planes.component.css']
})
export class GestionPlanesComponent implements OnInit {

  public planes:Plan[];
  public plan:Plan;
  //Variables para formularios reactivos
  public form_planes:FormGroup;

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
    this.GET_Llenarplanes();
  }

  cargarCrearPlan(){
    this.form_planes.reset();

    this.modalService.open(this.modalCrearPlan, {size: 'lg'});
  }

  cargarActualizarPlan(_idPlan:string){
    this._PlanesService.GET_Plan(_idPlan).subscribe(
      (res:any) => {
        this.plan = res.data;
        this.form_planes.reset({
          nombrePlan: this.plan.nombrePlan,
          color: this.plan.color,
          descripcion:  this.plan.descripcion,
          precio: this.plan.precio,
          limiteFilas: this.plan.restricciones.limiteFilas,
          limiteColumnas: this.plan.restricciones.limiteColumnas,
          limitePaginas: this.plan.restricciones.limitePaginas,
          limiteAlmacenamiento: this.plan.restricciones.limiteAlmacenamiento
        });
        this.modalService.open(this.modalActualizarPlan, {size: 'lg'});
      },
      (err:any) => {
        console.log(err);
      }
    );
  }

  crearFormulario(){
    this.form_planes = this.fb.group({
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
          Validators.min(1024)
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

  GET_Llenarplanes(){
    this._PlanesService.GET_Planes().subscribe(
      (res:any) => {
        this.planes = res.data;
      },
      (err:any) => {
        console.log(err);
      }
    );
  }

  POST_guardarPlan(){
    if(this.form_planes.invalid){
      return Object.values(this.form_planes.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      this._PlanesService.POST_Plan(this.form_planes.value).subscribe(
        (res:any) => {
          if(res.ok){
            this.modalService.dismissAll(this.modalCrearPlan);
            this.GET_Llenarplanes();
          }
        },
        (err:any) => {
          console.log(err);
        }
      );
    }
  }

  actualizarPlan(){
    if(this.form_planes.invalid){
      return Object.values(this.form_planes.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      this._PlanesService.PUT_Plan(this.plan._id ,this.form_planes.value).subscribe(
        (res:any) => {
          if(res.ok)
            this.GET_Llenarplanes();
        },
        (err:any) => {
          console.log(err);
        }
      );
    }
  }

}
