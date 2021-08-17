import { environment } from "src/environments/environment";
import { Hospital } from "./hospital.model";

interface _doctorUser{
    _id: string;
    name: string;
    img: string;
}

const base_url = environment.base_url;

export class Doctor{

    constructor(
        public name: string,
        public _id?: string,
        public img?: string,
        public user?: _doctorUser,
        public hospital?: Hospital,
    ){}

    get imageUrl(){

        if( !this.img ){

            return `${base_url}/upload/users/no-image`;

        }else if( this.img.includes('https')){

            return this.img;

        }else if (this.img ){

            return `${base_url}/upload/users/${this.img}`;

        }else{

            return `${base_url}/upload/users/no-image`;
        }
        
    }
}