import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GiayToLienQuanComponent } from '../../benh-an-emr/giay-to-lien-quan.component';
import { ReceptionService } from '../../../../services/reception.service';
import { ShareDataService } from '../../../../services/share-data.service';
import { HisPatientInfo } from '../../../../model/emr/patient/patient-info';
import { parseIsolatedEntityName } from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import { DM } from '../../../../model/Patient_EMR';
import { EmrService } from '../../../../services/emr.service';



class Glasgow {
  ho_ten_nguoi_benh: string = '';
  nam_sinh: number = 0;
  gioi_tinh: number = 0;
  khoa: string = '';
  chan_doan: string = '';
  ngay_vao_vien: number = 0;
  ma_so_ba: number = 0;
  mat: number = 0;
  loi_noi: number = 0;
  van_dong: number = 0;
  tong_diem: number = 0;
  ghi_chu: string = '';
  nguoi_danh_gia = new nguoiDanhGia();
}

export class nguoiDanhGia {
  chu_ky: string = '';
  nguoi_danh_gia: string = '';
  ho_ten_nguoi_danh_gia: string ='';
}

@Component({
  selector: 'app-bang-danh-gia-thang-diem-glasgow',
  templateUrl: './bang-danh-gia-thang-diem-glasgow.html',
  styleUrls: ['./bang-danh-gia-thang-diem-glasgow.scss'],
})
export class BangDanhGiaThangDiemGlasgowComponent extends GiayToLienQuanComponent implements OnInit, OnChanges {

  glasgow: Glasgow =  new Glasgow();
  constructor(private receptionService: ReceptionService,
              private emrService: EmrService,
              private shareDataService: ShareDataService) {
    super();
  }

  async ngOnInit(): Promise<void> {
    await this.getExdocument()
    //Lấy thông tin phiếu cũ
    if (this.patientInfo) { //Đè thông tin bác sỹ mới lên phiếu cũ
      this.convert();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.isCreateGiayToLienQuan && this.selectGiayToLienQuan) {
      this.glasgow = this.selectGiayToLienQuan
    }
    if (this.isCreateGiayToLienQuan || !this.glasgow) {
      this.glasgow = new Glasgow();
      if (this.patientInfo) {
        this.convert();
      }
    }
    this.shareDataService.pushData(this.glasgow, 'bang_danh_gia_thang_diem_glasgow');
  }

   convert(){
     this.glasgow.ho_ten_nguoi_benh = this.patientInfo.HO_TEN;
     this.glasgow.nam_sinh = (new Date(this.patientInfo.birthday * 1000 )).getFullYear();
     this.glasgow.gioi_tinh = this.patientInfo.sex;
     this.glasgow.khoa  = this.patientInfo.parent_name;
     this.glasgow.chan_doan = this.patientInfo.examining_diagnosis;
     this.glasgow.ma_so_ba = this.patientInfo.reception_queue_id;
     let user  = localStorage.getItem('user_logged');
     if(user) {
       this.glasgow.nguoi_danh_gia.ho_ten_nguoi_danh_gia = JSON.parse(user).user_signature_img,
       this.glasgow.nguoi_danh_gia.chu_ky = JSON.parse(user).user_signature,
       this.glasgow.nguoi_danh_gia.nguoi_danh_gia = JSON.parse(user).full_name
     }
     if(this.patientInfo.in_patient == 0){
       //nếu bệnh nhân ngoại trú thì lấy theo created_at
          this.glasgow.ngay_vao_vien = this.patientInfo.created_at
     } else{
       //Nếu bệnh nhân là nội trú thì gọi API gfri để lấy thời điểm vào viện là patient_id_in -> anh Đức bảo xử lý như thế này.
       //todo: Dùng API gfri để lấy thời điểm vào khoa.
          this.receptionService.getPatientOut(this.patientInfo.reception_queue_id).subscribe(dataReturn => {
            if(dataReturn.status  == true){
              let length = dataReturn.results[0].parent_time_line.length
              this.glasgow.ngay_vao_vien = dataReturn.results[0].parent_time_line[length - 1].parent_id_in;
              if(this.glasgow.chan_doan == "" || this.glasgow.chan_doan == null || !this.glasgow.chan_doan)
                this.glasgow.chan_doan = dataReturn.results[0].examining_diagnosis
            }
        })
     }
    this.glasgow.ngay_vao_vien = this.patientInfo
  }

  sum(){
    this.glasgow.tong_diem = this.glasgow.mat + this.glasgow.loi_noi + this.glasgow.van_dong
  }

  //todo: Gọi getExDocument để lấy thông tin phiếu cũ.
   getExdocument() {
    return new Promise<void>(resolve => {
      this.emrService.getExDocument(6010, this.patientInfo.patient_id,
        this.patientInfo.reception_queue_id.toString()).subscribe(
        (data) => {
          // this.object_id = data.results[0]._id;
          if(data.status){
            // console.log(data.results,data.results[data.results.length - 1])
            Object.assign(this.glasgow, data.results[0].results[data.results[0].results.length - 1]) //Lấy kết quả giấy tờ mới nhất.
          }
          resolve()
        }
      )
    })
  }
}
