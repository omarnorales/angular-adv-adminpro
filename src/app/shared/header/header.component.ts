import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  
  public user: User = null;

  constructor(private userService: UserService,
              private router: Router) { 
    
    
    this.user = userService.user;
  }

  ngOnInit(): void {
  }

  logout(){
    this.userService.logout();
  }

  search(term: string): void {
    
    if(term.length === 0) {
      this.router.navigate(['/dashboard']);
    }

    console.log(`Search ${term} on collections of users, doctors and hospitals`);
    
    this.router.navigate(['dashboard/search', term]);
  }

}
