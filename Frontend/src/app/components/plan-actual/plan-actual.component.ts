import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-plan-actual',
  templateUrl: './plan-actual.component.html',
  styleUrls: ['./plan-actual.component.css']
})
export class PlanActualComponent implements OnInit {

  @ViewChild("modalActualizarPlan") modalActualizarPlan;
  constructor(private modalService:NgbModal) { }

  ngOnInit(): void {
  }

  actualizarPlan(){
    this.modalService.open(this.modalActualizarPlan, {size: 'lg'});
  }
}
