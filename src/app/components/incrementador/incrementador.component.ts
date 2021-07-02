import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  @Input('p_progress') progress: number = 50;
  @Input() btnClass: string = 'btn-primary';

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.btnClass = `btn ${ this.btnClass}`
    console.log('btnClass {} '+this.btnClass);
  }

  @Output() get getPorcentaje(){
    return `${this.progress}%`
  }

  cambiarValor(valor: number){

    this.progress+=valor;

    if(this.progress<0){
      this.progress = 0
    }else if(this.progress>100){
      this.progress = 100
    }

    this.valorSalida.emit(this.progress);
    
  }

  onChange( nuevoValor: number ){
    
    if(nuevoValor<0){
      this.progress = 0;
    }else if(nuevoValor>100){
      this.progress = 100;
    } else{
      this.progress = nuevoValor;
    }
    
    //call method valorSalida.emit
    this.valorSalida.emit(this.progress);
    
  }

  incrementa(){
    this.progress += 10;
  }

  disminuye(){
    this.progress -= 10;
  }
}
