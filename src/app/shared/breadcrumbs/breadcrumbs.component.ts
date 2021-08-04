import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  public title: string;
  public tituloSub$: Subscription;

  constructor(private router: Router) { 
    
    this.tituloSub$ = this.getArgumentosRuta()
    // data: {title}
    .subscribe( ({title}) => {
      this.title = title;
      document.title = `AdminPro - ${title}`;
    })
  
  }
  ngOnDestroy(): void {
    this.tituloSub$.unsubscribe();
  }

  ngOnInit(): void {
  }

  getArgumentosRuta(){
    
    return this.router.events
    .pipe(
      filter( event => event instanceof ActivationEnd),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null),
      // ActivationEnd -> data: {title}
      map( (event: ActivationEnd) => event.snapshot.data),

    );
  }

}
