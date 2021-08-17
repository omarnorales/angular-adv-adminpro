import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type: 'users'|'doctors'|'hospitals'): string {

    // (arg1 |'image:' arg2)
    if( (img===null) || (img == undefined )) {
      img = '';
    }

    

    if( !img ){
    
      return `${base_url}/upload/${type}/no-image`;

    }else if( img.includes('https')){
  
        return img;
  
    }else if (img){
  
        return `${base_url}/upload/${type}/${img}`;
  
    }else{
  
        return `${base_url}/upload/${type}/no-image`;
    }
    
  }

}
