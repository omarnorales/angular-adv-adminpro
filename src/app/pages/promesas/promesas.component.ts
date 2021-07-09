import { Component, OnInit } from '@angular/core';
import { rejects } from 'assert';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then((user) => {
        console.log(user);
    })

    // const promesa = new Promise((resolve, reject) => {
    //   if(false){
    //     resolve("Hola Mundo");
    //   }else{
    //     reject('Algo salio mal')
    //   }
    // })
    
    // promesa.then((mensaje) => {
    //   console.log(mensaje);
    // })
    // .catch((err) => {
    //   console.log('Error en mi promesa', err);
    // })
    // console.log("Fin OnInit()");
  }

  getUsuarios(){

    const promise = new Promise((resolve) => {

      // endpoint
     fetch('https://reqres.in/api/users')
     // Response (in json Format)
      .then( resp => resp.json() )
  
      //Encadena la siguiente promesa en el json la cual es body
      // Response -> body.data
     .then( body => resolve( body.data ));
     })

     return promise;

    }


}
