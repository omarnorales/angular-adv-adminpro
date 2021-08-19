import { Component, OnInit } from '@angular/core';
import { SettingService } from '../services/setting.service';
import { SidebarService } from '../services/sidebar.service';

declare function custonInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(private settingService: SettingService,
              public sidebarService: SidebarService) { }

  ngOnInit(): void {

    custonInitFunctions();
    this.sidebarService.loadMenu();

  }

  

}
