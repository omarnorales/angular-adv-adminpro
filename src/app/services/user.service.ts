import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators'

import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { User } from '../models/user.model';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;
  public user: User;

  constructor( private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) { 
    
                this.googleInit();
  }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get uid(): string{
    return this.user.uid || '';
  }

  googleInit() {

    return new Promise<void>( resolve => {
      console.log('Google INIT Promise');
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '504209647908-qbbcc7oo04pani5nmhus512g2ffv722p.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        
        resolve();
      });

    })
  }
  
  logout(){

    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {

      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })

    });
  }

  validarToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`,{
      headers: { 
        'x-token': this.token,
      }
    }).pipe(
      map( (resp: any) => {
        
        const {email,google,name,role,img = '',uid} = resp.user;
        this.user = new User(name, email,'', img, google,role, uid);
        localStorage.setItem('token', resp.token);
        return true; //if token is generated
      }),
      catchError( error => {
        console.log(error);
        return of(false)
      } ) // else return false
    );
  }

  createUser( formData: RegisterForm ){
    console.log('Creating user');
    
    return this.http.post(`${base_url}/users`, formData)
              .pipe(
                tap( (resp: any) =>{
                  localStorage.setItem('token', resp.token);
                })
              )
  }

  updateProfile( data: {email: string, name: string, role: string} ){

    data = {
      ...data,
      role: this.user.role
    };

    return this.http.put(`${base_url}/users/${this.uid}`, data, {
      headers: { 
        'x-token': this.token,
      }
    })
  }

  login( formData: LoginForm ){
    console.log('Login...');
    
    return this.http.post(`${base_url}/login`, formData)
              .pipe(
                tap( (resp: any) =>{
                  localStorage.setItem('token', resp.token);
                })
              )
  }

  loginGoogle( token: string ){
    console.log('Login...');
    
    return this.http.post(`${base_url}/login/google`, {token})
              .pipe(
                tap( (resp: any) =>{
                  localStorage.setItem('token', resp.token);
                })
              )
  }
}
