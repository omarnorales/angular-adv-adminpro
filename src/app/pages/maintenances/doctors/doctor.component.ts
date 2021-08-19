import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

import { DoctorService } from 'src/app/services/doctor.service';
import { HospitalService } from '../../../services/hospital.service';

import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit {

  isNewUser: boolean = false;
  id: string = '';

  public selectedHospital: Hospital;
  public selectedDoctor: Doctor;
  

  public doctorForm: FormGroup;
  public hospitals: Hospital[] = [];
  public title: string = 'Doctor';

  constructor(private activedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private hospitalService: HospitalService,
              private doctorService: DoctorService,
              private router: Router) { 

  }

  ngOnInit(): void {

    this.mainLoad();

    this.getHospitals();
    
    this.doctorForm.get('hospital').valueChanges
    .pipe(
      delay(200)
    )
    .subscribe(hospitalId => {
      this.selectedHospital = this.hospitals.find( h => h._id === hospitalId )
    })


  }

  mainLoad(){
    /*
      getting parameters by snapshot
    */
    if( !this.activedRoute.snapshot.params.id ){
      return this.router.navigateByUrl(`/dashboard/doctors`);
    }else if( this.activedRoute.snapshot.params.id == 'new'){
      this.isNewUser = true;
    }else{
      this.isNewUser = false;
    }

    /*
      getting parameters by params(live)
    */
     this.activedRoute.params.subscribe(({ id }) => {
       
       if(id.length > 0 && id != 'new'){

        this.getDoctorById(id);
        this.title = 'Update Doctor'

       }else{
        this.title = 'New Doctor'
       }
       
     })

    /*
      Form Inicialization
    */

      this.doctorForm = this.fb.group({
        name: ['', Validators.required],
        hospital: ['', Validators.required]
      })


  }

  saveDoctor(){
    
    const { name } = this.doctorForm.value;

    if(this.selectedDoctor){
      // updated
      const data = {
        ...this.doctorForm.value,
        _id: this.selectedDoctor._id
      }

      
      this.doctorService.updateDoctor( data ).subscribe(resp => {
        Swal.fire('Updated', `Doctor ${name} successfully updated.`,'success');
      })
    }else{
      // created
      
      this.doctorService.createDoctor( this.doctorForm.value )
      .subscribe( (response: any) => {
        
        Swal.fire('Created', `Doctor ${name} successfully created.`,'success');
        this.router.navigateByUrl(`/dashboard/doctor/${response.doctor._id}`);
      })
    }

  }

  getHospitals(){
     this.hospitalService.getHospitals()
    // .pipe(
    //   delay(100)
    // )
    .subscribe((resp) => {
      this.hospitals = resp;
    })
  }

  getDoctorById( id: string ){
    this.doctorService.getDoctorById(id).subscribe( doctor =>{

      if(!doctor){
        return this.router.navigateByUrl(`/dashboard/doctors`);
      }

      this.selectedDoctor = doctor;

      const {name, hospital:{ _id } } = doctor;
      this.doctorForm.setValue({name, hospital: _id});
    });
  }



}
