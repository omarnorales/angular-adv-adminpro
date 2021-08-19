import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  public user: User;
  
  constructor(private http: HttpClient) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: { 
        'x-token': this.token,
      }
    }
  }
  getHospitals(){
    // http://localhost:3005/api/hospitals/

    const url = `${base_url}/hospitals/`;
    return this.http.get(url,this.headers)
    .pipe(
      map( (response:{ok: boolean, hospitals: Hospital[]}) => response.hospitals)
    )

  }

  getHospitalById( id: string ){
    // http://localhost:3005/api/hospitals/byid/{id}

    const url = `${base_url}/hospitals/byid/${id}`;
    return this.http.get(url,this.headers)
    .pipe(
      map( (response:{ok: boolean, hospital: Hospital}) => response.hospital)
    )

  }

  createHospital( name: string ){
    
    const url = `${base_url}/hospitals`;
    return this.http.post(url, {name},this.headers);

  }

  updateHospital( id: string, name: string ){
    
    const url = `${base_url}/hospitals/${id}`;
    return this.http.put(url, {name},this.headers);

  }

  deleteHospital( id: string ){
    
    const url = `${base_url}/hospitals/${id}`;
    return this.http.delete(url,this.headers);

  }
}
