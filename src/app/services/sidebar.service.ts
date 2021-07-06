import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    { 
      title: 'dashboard!!!' ,
      icon: 'mdi mdi-gauge',
      subMenu: [
        { title: 'Main', url: '/' },
        { title: 'ProgressBar', url: 'progress' },
        { title: 'Graficas', url: 'grafica1' },
        // { titulo: 'Account Setting', url: '/account-settings' },
      ]
    }
  ];

  constructor() { }
}
