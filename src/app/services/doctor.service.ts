import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  public doctor: Doctor;
  
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

  getDoctors(){
    // http://localhost:3005/api/doctors/

    const url = `${base_url}/doctors`;
    return this.http.get(url,this.headers)
    .pipe(
      map( (response:{ok: boolean, doctors: Doctor[]}) => response.doctors)
    )

  }

  getDoctorById( id: string){
    const url = `${base_url}/doctors/${id}`;
    return this.http.get(url,this.headers)
    .pipe(
      map( (response:{ok: boolean, doctor: Doctor}) => response.doctor)
    )
  }

  createDoctor( doctor: {name: string, hospital: string} ){
    const url = `${base_url}/doctors`;
    return this.http.post(url, doctor, this.headers);
  }

  updateDoctor( doctor: Doctor){
    
    const url = `${base_url}/doctors/${doctor._id}`;
    return this.http.put(url, doctor,this.headers);
  }

  deleteDoctor( id: string ){
    
    const url = `${base_url}/doctors/${id}`;
    return this.http.delete(url,this.headers);

  }




}
