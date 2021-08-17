import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchService } from 'src/app/services/search.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit, OnDestroy{

  doctors:Doctor[] = [];
  doctorsTemp:Doctor[] = [];
  public loading: boolean = true;
  public showUpdateNotification: boolean = false;

  public imgSubs: Subscription;

  constructor(private doctorService: DoctorService,
              private modalImageService: ModalImageService,
              private searchService: SearchService,
              private router: Router) { }
              
  ngOnInit(): void {
    
    this.getDoctors();
    
    this.imgSubs = this.modalImageService.newImage
    .pipe( delay(200) )
    .subscribe( img => this.getDoctors() );

  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  getDoctors(){
    this.loading = true;
    this.doctorService.getDoctors().subscribe(data => {
        this.doctors = data;
        this.doctorsTemp = this.doctors;
        this.loading = false;
    })
  }

  updateDoctor(doctor: Doctor){
    this.doctorService.updateDoctor(doctor).subscribe( data =>{
      Swal.fire('Updated', ` Doctor ${doctor.name} updated.`, 'success');
    },
      error => { Swal.fire('Error', error, 'error'); }
    )
  }

  deleteDoctor(doctor: Doctor){
    Swal.fire({
      title: `sure do you want to delete doctor: '${doctor.name}'?`,
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      if (result.isConfirmed) {
        this.doctorService.deleteDoctor(doctor._id)
        .subscribe(resp => {
          Swal.fire(
            ` Deleted!`,
            `Doctor '${doctor.name}' has been deleted.`,
            'success'
          );

          this.getDoctors();

          })
      }
    })
  }

  

  async openCreateModal(){
    const {value = ''} = await Swal.fire<string>({
      title: 'Create Doctor',
      input: 'text',
      inputLabel: 'Doctor name',
      inputPlaceholder: 'Enter doctor name',
      showCancelButton: true
    })
    


    // if(value.trim().length > 0){
    //   const doctor = new Doctor(value);
    //   this.doctorService.createDoctor(doctor)
    //   .subscribe(

    //     (result: any) => {
    //       this.doctors.push(result.doctor)
    //     },
       
    //     error => {
    //       Swal.fire('Error', error, 'error');
    //       console.log(error);
    //     }
    //   )
    // }
  }

  openModal(doctor: Doctor){
    
    this.modalImageService.openModal('doctors',doctor._id, doctor.img);
     
  }

  search(term: string){
    
    if(term.length == 0){
      this.doctors = this.doctorsTemp;
      return;
    }

    this.searchService.search('doctors', term).subscribe(resp =>{
      this.doctors = resp as Doctor[];
    })
  }

  navitetoDoctorById( id: string ){
    this.router.navigate(['/dashboard','doctor',id]);
  }





}
