import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {

  titleGrafica1: string = "Grafica #1";
  labelsGrafica1: string[] = ["Bonu", "Dabuledu", "Adulu"];
  valoresGrafica1: number[] = [10, 70, 20];
  chartData = [ 
    this.valoresGrafica1 
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
