import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gestion-planes',
  templateUrl: './gestion-planes.component.html',
  styleUrls: ['./gestion-planes.component.css']
})
export class GestionPlanesComponent implements OnInit {

  @ViewChild ('modalCrearPlan') modalCrearPlan;
  @ViewChild ('modalActualizarPlan') modalActualizarPlan;
  constructor(private modalService:NgbModal) { }

  ngOnInit(): void {
  }

  crearPlan(){
    this.modalService.open(this.modalCrearPlan, {size: 'lg'});
  }

  actualizarPlan(){
    this.modalService.open(this.modalActualizarPlan, {size: 'lg'});
  }
}
