import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { User } from 'src/app/models/user.model';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  public term = "";

  public users: User[] = [];
  public doctors: Doctor[] = [];
  public hospitals: Hospital[] = [];

  constructor( private activatedRoute: ActivatedRoute,
              private searchService: SearchService,
              private router: Router) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({term}) => {
      console.log(term);
      this.term = term;
      this.searchGlobal( term );

    })
  }

  searchGlobal( term: string ){
    this.searchService.searchGlobal(term).subscribe((result: any) => {

      this.users     =  result.users;
      this.doctors   = result.doctors;
      this.hospitals = result.hospitals;
      
    })
  }

  openDoctor( doctor: Doctor) {
    this.router.navigateByUrl(`/dashboard/doctor/${doctor._id}`);
  }

}
