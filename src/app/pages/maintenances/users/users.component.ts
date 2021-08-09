
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { GetUser } from 'src/app/interfaces/get-user.interface';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';

import { User } from 'src/app/models/user.model';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit, OnDestroy {

  public totalUsers: number = 0;
  public totalPages: number = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];
  public from: number = 0;
  public nextButtonEnable: boolean = true;
  public previosButtonEnable: boolean = true;
  public loading: boolean = true;

  public imgSubs: Subscription;

  constructor(private userService: UserService,
              private searchService: SearchService,
              private modalImageService: ModalImageService,) { }

  ngOnInit(): void {

    this.loadUsers();
    this.previosButtonEnable = false;

    this.imgSubs = this.modalImageService.newImage
    .pipe( delay(200) )
    .subscribe( img => this.loadUsers() );
    
  }

  ngOnDestroy(){
    this.imgSubs.unsubscribe();
  }

  loadUsers(): void {

    this.loading = true;

    this.userService.getUsers(this.from).subscribe((resp: GetUser) => {
      this.totalUsers = resp.total;
      this.totalPages = resp.totalPages;
      this.users = resp.users;
      this.usersTemp = this.users
      this.loading = false;
      
    })
  }

  changePage( value: number ){
    if((this.from+value) > this.totalUsers){
      this.nextButtonEnable = false;
      return;
    }
    this.nextButtonEnable = true;

    this.from += value; 

    if(this.from < 0 ){
      this.from = 0;
    }

    if(this.from <= 0 ){
      this.previosButtonEnable = false;
    }else{
      this.previosButtonEnable = true;
    }

    if((this.from+value) > this.totalUsers){
      this.nextButtonEnable = false;
    }

    this.loadUsers();
  }

  search(term: string){
    
    if(term.length == 0){
      this.users = this.usersTemp;
      return;
    }

    this.searchService.search('users', term).subscribe(resp =>{
      this.users = resp;
    })
  }

  deleteUser(user: User){

    if( user.uid === this.userService.uid ){
      return Swal.fire('Error', 'You cannot delete yourself', 'error' );
    }

    Swal.fire({
      title: `sure do you want to delete user: '${user.name}'?`,
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      if (result.isConfirmed) {
        this.userService.deleteUser(user)
        .subscribe(resp => {
          Swal.fire(
            ` Deleted!`,
            `User '${user.name}' has been deleted.`,
            'success'
          );

          this.loadUsers();

        })

      }

    })
    
  }

  modifyUser(userId){
    console.log(`Modify ${userId}`);
  }

  changeRole(user: User){
    this.userService.saveUser(user)
    .subscribe(
      resp => { console.log(resp); },
      err  => { Swal.fire('error', err,'error'); }
    )
  }

  openModal(user: User){
    
    this.modalImageService.openModal('users',user.uid, user.img);
  }

}
