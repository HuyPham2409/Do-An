import { Component, Input, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import moment from 'moment';
import { UploadService } from '../../../services/upload.service';
import { LocalStorageService } from '@shared';
import { ToastrTranslateService } from '@shared/services/toastr-translate-service';
import { DocumentExam, UploadFile } from '../../../model/emr/document-exam/document-exam';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  providers:[UploadService]
})
export class UploadFileComponent implements OnInit {
  @Input() giayto!: DocumentExam;
  @Input() patientInfo: any;
  id_giaytio: number = 0;
  name_giaytio: string = '';
  reception_queue_id: string = '';
  listImages: any = [];
  listImageServes: any = [];
  local_files: any = [];
  localfiles: any = [];
  constructor(private dbService: NgxIndexedDBService,
              private uploadService: UploadService,
              private localStorageService: LocalStorageService,
              private toastr: ToastrTranslateService) {
  }

  ngOnInit(){
  }
  ngOnChanges(){
    this.id_giaytio = (this.giayto && (this.giayto.UPLOAD_FILE === UploadFile.CanUpload)) ? this.giayto.ID: 0;
    this.name_giaytio = (this.giayto) ? (this.giayto.MO_TA || ''): '';
    this.reception_queue_id = (this.patientInfo) ? this.patientInfo.reception_queue_id: '';
    this.listImageServes = [];
    this.listImages = [];
    this.getFileUpload();
  }
  uploadFromLocal(event: Event){
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    // this.localfiles = files;
    this.localStorageService.set('file_images', files) // TODO: value trong localstorage là {"0": {}}
    if (files.length > 0) {
      for (var i = 0; i < files.length; i++) {
        var fileNew = files[i];
        let file = {
          file: fileNew,
          name: this.name_giaytio,
          reception_queue_id: this.reception_queue_id,
          created_at: moment().unix()
        }
        this.listImages.push(file);
        this.localfiles.push({
          name: files[i].name,
          type: files[i].type
        });
      }
    }
  }

  upload_patient_pic(){
    if(this.listImages && this.listImages.length > 0){
      this.uploadService.uploadImage(this.listImages, this.reception_queue_id, 'patient', 'emr'+this.id_giaytio).subscribe(data =>{
        this.getFileUpload();
        this.listImages = [];
      });
    }
  }
  getFileUpload(){
    if(this.id_giaytio != undefined && this.id_giaytio != 0){
      this.uploadService.getImage(this.reception_queue_id, 'patient','emr'+this.id_giaytio).subscribe(dataImage =>{
        if(dataImage.status == true){
          this.listImageServes = dataImage.results
        }else {
          this.listImageServes = []
        }
      })
    }
  }
  removeImage(){
    if(this.listImageServes.length > 0){
      let fileRemove = this.listImageServes.filter((x: any) => x.checked == true);
     this.uploadService.deleteImage(fileRemove, this.reception_queue_id, 'patient', 'emr'+this.id_giaytio).then((data: any) => {
       if(data == 'success'){
         this.toastr.info('Xóa ảnh thành công!', 'nav.delete');
       }else {
         this.toastr.error(data, '');
       }
       this.getFileUpload();
     })
    }
  }
}
