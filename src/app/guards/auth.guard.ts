import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private userService: UserService,
              private router: Router){}

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return this.userService.validarToken()
      .pipe(
        tap( isAuthenticated => {

          if( !isAuthenticated ){
            this.router.navigateByUrl('/login');
          }
        })
      );
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot)
              : Observable<boolean> {

      return this.userService.validarToken()
      .pipe(
        tap( isAuthenticated => {

          if( !isAuthenticated ){
            this.router.navigateByUrl('/login');
          }
        })
      );
  }
  
}
