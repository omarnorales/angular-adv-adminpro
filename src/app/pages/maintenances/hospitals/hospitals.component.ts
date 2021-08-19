import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchService } from 'src/app/services/search.service';
import Swal from 'sweetalert2';
import { Hospital } from '../../../models/hospital.model';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit, OnDestroy{

  public hospitals: Hospital[] = [];
  public hospitalsTemp: Hospital[] = [];
  public loading: boolean = true;
  public showUpdateNotification: boolean = false;

  public imgSubs: Subscription;

  constructor(private hospitalService: HospitalService,
              private modalImageService: ModalImageService,
              private searchService: SearchService,) { }

  ngOnInit(): void {

    this.loadHospitals();

    this.imgSubs = this.modalImageService.newImage
    .pipe( delay(200) )
    .subscribe( img => this.loadHospitals() );
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  loadHospitals(){
    this.loading = true;
    this.hospitalService.getHospitals()
    .subscribe( (hospitals: any) => {
      
      this.hospitals = hospitals;
      this.hospitalsTemp = this.hospitals;
      this.loading = false;

    })
  }

  updateHospital(hospital: Hospital){
    this.hospitalService.updateHospital(hospital._id, hospital.name)
    .subscribe(
      resp => { 
        console.log('Hospital Uploaded');
        Swal.fire('Updated', hospital.name, 'success');
    },
      error => { Swal.fire('Error', error, 'error'); }
    )
  }

  deleteHospital(hospital: Hospital){
    this.hospitalService.deleteHospital(hospital._id)
    .subscribe(
      resp => {
        Swal.fire('Deleted', `${hospital.name} deleted`, 'success');
        this.loadHospitals();
      },
      error =>{ Swal.fire('Error', error, 'error'); }
    )
  }

  async openCreateModal(){
    const {value = ''} = await Swal.fire<string>({
      title: 'Create Hospital',
      input: 'text',
      inputLabel: 'Hospital name',
      inputPlaceholder: 'Enter hospital name',
      showCancelButton: true
    })
    


    if(value.trim().length > 0){

      this.hospitalService.createHospital(value)
      .subscribe(

        (result: any) => {
          this.hospitals.push(result.hospital)
        },
        error => {Swal.fire('Error', error, 'error');}
      )
    }
  }

  openModal(hospital: Hospital){
    
    this.modalImageService.openModal('hospitals',hospital._id, hospital.img);
     
  }

  search(term: string){
    
    if(term.length == 0){
      this.hospitals = this.hospitalsTemp;
      return;
    }

    this.searchService.search('hospitals', term).subscribe(resp =>{
      this.hospitals = resp;
    })
  }

}
