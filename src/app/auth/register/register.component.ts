import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css'
  ]
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terms: [true, Validators.required]
  }, {
    validators: this.passwordMatch('password','password2')
  })

  constructor( private fb: FormBuilder,
               private userService: UserService) { }

  ngOnInit(): void {
  }

  createUser(): void {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if(this.registerForm.invalid){
      console.log('registerForm is not valid...');
      return;
    }else{
      this.userService.createUser( this.registerForm.value )
      .subscribe( res =>{
        console.log('User Created');
        console.log(res);
      }, (err) => {

        console.warn(err.error.msg);

        Swal.fire({
          title: 'Error!',
          text: err.error.msg,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      });
      
    }
  }

  invalidField( field: string): boolean {

    if( this.registerForm.get(field).invalid && this.formSubmitted ){
      return true;
    }else{
      return false;
    }
  }

  invalidPasswordConfirm(){
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if( (pass1 !== pass2) && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  acceptTerms(): boolean {
    if(!this.registerForm.get('terms').value && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  passwordMatch(pass1Name: string, pass2Name: string){
    
    return ( formGroup: FormGroup ) =>{
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if( pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null)
      }else{
        pass2Control.setErrors({noMatch: true})
      }
    }
  }


}
