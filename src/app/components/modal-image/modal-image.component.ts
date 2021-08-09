import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit {

  public imgTemp: any='';
  public imageToUpload: File;
  //public user: User;

  constructor(public modalImageService: ModalImageService,
              public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.imgTemp = null;
    this.modalImageService.closeModal();
  }

  changeImage( file: File ){
    this.imageToUpload = file;

    if( !file ){ return this.imgTemp =  null; }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);

    reader.onloadend = () =>{
      this.imgTemp = reader.result;
    }
  }

  uploadImage(){

    const id = this.modalImageService.id;
    const type = this.modalImageService.type;

    this.fileUploadService
    .updatePicture(this.imageToUpload, type, id)
    .then(img => {
      
      Swal.fire('Image Updated', 'Image was successfully updated','success');

      this.modalImageService.newImage.emit(img);
      
      this.closeModal();
    }).catch(err => {
      Swal.fire('Error', 'Unable to upload image','error');
    })

}

}
