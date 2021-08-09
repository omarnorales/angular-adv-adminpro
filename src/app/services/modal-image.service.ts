import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private _hideModal = true;
  public type: 'users'|'doctors'|'hospitals';
  public id: string;
  public img: string;

  public newImage: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  get hideModal(){
    return this._hideModal;
  }

  openModal(
    type: 'users'|'doctors'|'hospitals',
    id: string,
    img: string = 'no-img'
  ){
    this._hideModal = false;
    this.type = type;
    this.id = id;

    // http://localhost:3005/api/upload/users/c506a73f-80a0-47c4-a5d3-9aa9569f3572.jpeg

    if( img.includes('https')){
      this.img = img;
    }else{
      this.img = `${base_url}/upload/${type}/${img}`
      console.log(this.img);
    }

  }

  closeModal(){
    this._hideModal = true;
  }

  
}
