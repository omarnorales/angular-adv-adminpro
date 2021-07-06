import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  public linkTheme = document.querySelector('#theme');
  

  constructor() { 
    console.log('Setting service Init');
    this.loadTheme();

  }

  loadTheme(){

    const url = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css'
    this.linkTheme.setAttribute('href', url);

  }

  changeTheme( theme: string){

    const url = `./assets/css/colors/${ theme }.css`;
    /*
    *  vanilla javascript
    */
    this.linkTheme.setAttribute('href', url);

    localStorage.setItem('theme', url)

    this.checkCurrentTheme()

  }

  checkCurrentTheme() {

    const links: NodeListOf<Element> = document.querySelectorAll('.selector');

    links.forEach(element => {
      
      element.classList.remove('working');

      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`;
      const currentTheme = this.linkTheme.getAttribute('href');

      if( btnThemeUrl === currentTheme ){
        element.classList.add("working")
      }

    });
  }

}