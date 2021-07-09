import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, from, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy {

  obsReturnInterval: Subscription;

  constructor() {

  //   this.returnObservable().pipe(retry(2)).subscribe(
  //     valor => console.log('Subs: ',valor),
  //     error => console.warn('Error', error),
  //     () => console.info('Obs Terminado')
  //  );

  // pipe(map()) -> to add +1 to each value
  this.obsReturnInterval =  this.returnInterval().subscribe( console.log )

  //pipe(map()) ->could also use pluck
  this.plunk();

  //pipe(map()) -> to add +10 to each value
  this.add();

  }
  ngOnDestroy(): void {
    this.obsReturnInterval.unsubscribe();
  }

  ngOnInit(): void {

  }

  returnInterval(): Observable<number>{

    return interval(500)
    .pipe(
      //take(10),
      map( valor =>  valor + 1  ),
      filter(valor => ( ( valor%2 ) === 0 )?true:false ),
    );

  }

  returnObservable(): Observable<number>{

    let i = -1;

    return new Observable<number>( observer => {

      const interval = setInterval(() => {

        i++;
        observer.next(i)

        if(i === 4){
          //cancel interval
          clearInterval(interval);

          //parar de emitir
          observer.complete();
        }

        if( i === 2){
          i=-1;
          observer.error('Llego al valor de 2, #Complete no se disparara')
        }
        
      }, 1000 )

    });

    /*
    (method) Observable<unknown>.subscribe(
      next?: (value: unknown) => void, 
      error?: (error: any) => void, complete?: 
      () => void
      ): Subscription (+4 overloads)
    */

  }

  plunk(){
    //emit ({name: 'Joe', age: 30}, {name: 'Frank', age: 20},{name: 'Ryan', age: 50})
    const source = from([
      { name: 'Joe', age: 30 },
      { name: 'Frank', age: 20 },
      { name: 'Ryan', age: 50 }
    ]);
    //grab each persons name, could also use pluck for this scenario
    const example = source.pipe(map(({ name }) => name));
    //output: "Joe","Frank","Ryan"
    const subscribe = example.subscribe(val => console.log(val));
  }

  add(){
    //emit (1,2,3,4,5)
    const source = from([1, 2, 3, 4, 5]);
    //add 10 to each value
    const example = source.pipe(map(val => val + 10));
    //output: 11,12,13,14,15
    const subscribe = example.subscribe(val => console.log(val));
  }

}
