import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.component.html',
  styleUrls: ['./registrate.component.css']
})
export class RegistrateComponent implements OnInit {

  isEmpresa:Boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
