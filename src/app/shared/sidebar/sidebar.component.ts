import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  
  public user: User = null;

  constructor(private sidebarService: SidebarService,
              private userService: UserService) { 

    this.menuItems = sidebarService.menu;

    this.user = userService.user;
    
    
  }

  ngOnInit(): void {
  }

}
