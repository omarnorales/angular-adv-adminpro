import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators'

// enviroment
import { environment } from 'src/environments/environment';

// Interfaces
import { GetUser } from '../interfaces/get-user.interface';
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

  get headers(){
    return {
      headers: { 
        'x-token': this.token,
      }
    }
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

    return this.http.put(`${base_url}/users/${this.uid}`, data, this.headers)
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

  getUsers( from: number = 0 ) {
    // http://localhost:3005/api/users?from=0
    const url = `${base_url}/users?from=${from}`;
    return this.http.get<GetUser>(url,this.headers)
    .pipe(
      map( (response: any) =>{
        
        const users = response.users.map( 
          user => new User(user.name, user.email, '', user.img, user.google, user.role, user.uid)
          );
          
        return {
          total: response.total,
          users
        };
      })
    )
  }

  deleteUser( user: User){
    const url = `${base_url}/users/${user.uid}`;
    return this.http.delete(url,this.headers);
  }

  saveUser( user: User){

    return this.http.put(`${base_url}/users/${user.uid}`, user, this.headers);
  }
}
