import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private userService: UserService,
              private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
    
      console.log(AdminGuard);
      if( this.userService.role === 'ADMIN_ROLE'){
        return true;
      }else{
        Swal.fire('Access Denied','You have not privileges to access','error');
        this.router.navigate(['/dashboard']);
        return false
      }

  }
  
}
