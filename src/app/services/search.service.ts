import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { GetUser } from '../interfaces/get-user.interface';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public user: User;

  constructor(private http: HttpClient) { }

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

  convertToUser( resp: any ): User[] {
    
    //console.log(resp.results);
   return resp.map(
      user => {
        return new User(user.name, user.email, '', user.img, user.google, user.role, user.uid)
      }
    );
  }

  search(
    type: 'users'|'doctors'|'hospitals',
    term: string = ''
  ){
    // http://localhost:3005/api/all/collection/users/a
    const url = `${base_url}/all/collection/${type}/${term}`;
    return this.http.get<any[]>( url, this.headers )
            .pipe(
              map( ( resp:any ) => {
                switch (type) {
                  case 'users':
                    return this.convertToUser(resp.results)
                    break;

                  default:
                    return[];
                }
              })
            )

  }

}
