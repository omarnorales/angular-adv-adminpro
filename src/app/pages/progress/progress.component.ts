import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'
  ]
})
export class ProgressComponent   {

  progress1: number = 25;
  progress2: number = 35;

  get getProgress1(){
    return `${this.progress1}%`
  }

  get getProgress2(){
    return `${this.progress2}%`
  }

  cambioValorHijo( valor: number){
    console.log('Cambio valor hijo', valor);
  }

  setProgress1(valor: number){
    this.progress1 = valor; 
  }

  setProgress2(valor: number){
    this.progress2 = valor; 
  }
  
}
