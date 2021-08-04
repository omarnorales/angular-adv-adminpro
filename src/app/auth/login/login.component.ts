import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

declare const  gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css'
  ]
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [ ( localStorage.getItem('email') || '' ), [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  })

  constructor(private router: Router,
              private fb: FormBuilder,
              private userService: UserService,
              private ngZone: NgZone) { }

  ngOnInit(): void {
    this.renderButton();
  }
  

  login(){

    this.userService.login(this.loginForm.value).subscribe(res => {
      console.log(res);
      if( this.loginForm.get('remember').value ){
        localStorage.setItem('email', this.loginForm.get('email').value);
      }else{
        localStorage.removeItem('email');
      }
      
      // Navigate to dashboard
      this.router.navigateByUrl('/'); 

    }, err => {

      Swal.fire({
        title: 'Error!',
        text: err.error.msg,
        icon: 'error',
        confirmButtonText: 'Ok'
      })

    })
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      
    });

    this.startApp();
  }

  async startApp() {

    await this.userService.googleInit();
    this.auth2 = this.userService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));

    // gapi.load('auth2', () => {
    //   // Retrieve the singleton for the GoogleAuth library and set up the client.
    //   this.auth2 = gapi.auth2.init({
    //     client_id: '504209647908-qbbcc7oo04pani5nmhus512g2ffv722p.apps.googleusercontent.com',
    //     cookiepolicy: 'single_host_origin',
    //   });
    //   // generate button for google signIn
    //   this.attachSignin(document.getElementById('my-signin2'));
    // });
  }

  attachSignin(element) {

    console.log(element.id);

    this.auth2.attachClickHandler( element, {},
        (googleUser) => {
          
          const id_token = googleUser.getAuthResponse().id_token;
          this.userService.loginGoogle(id_token).subscribe(()=>{

            // Navigate to dashboard
            this.ngZone.run(() => {
              this.router.navigateByUrl('/');
            })
          })
           
        }, (error) => {
            alert(JSON.stringify(error, undefined, 2));
        });
  }
}

