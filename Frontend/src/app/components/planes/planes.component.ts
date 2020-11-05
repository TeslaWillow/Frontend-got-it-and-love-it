import { Component, OnInit } from '@angular/core';
import { PlanesService, Plan } from '../../services/planes.service';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {

  public planes:Plan[];

  constructor(private _PlanesService:PlanesService) { }

  ngOnInit(): void {
    this.planes = this._PlanesService.getPlanes();
  }

  isGratis(valor:number){
    if(valor < 1)
      return true;
    else
      return false;
  }
}
