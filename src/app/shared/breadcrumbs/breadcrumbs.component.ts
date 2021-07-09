import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit {

  public title: string;

  constructor(private router: Router) { 
    
    this.getArgumentosRuta();
  
  }

  ngOnInit(): void {
  }

  getArgumentosRuta(){
    this.router.events
    .pipe(
      filter( event => event instanceof ActivationEnd),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null),
      // ActivationEnd -> data: {title}
      map( (event: ActivationEnd) => event.snapshot.data),

    ) // data: {title}
    .subscribe( ({title}) => {
      this.title = title;
      document.title = `AdminPro - ${title}`;
    })
  }

}
