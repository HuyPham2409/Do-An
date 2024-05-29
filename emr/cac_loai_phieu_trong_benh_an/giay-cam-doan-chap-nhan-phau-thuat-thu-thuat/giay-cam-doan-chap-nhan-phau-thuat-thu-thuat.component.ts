import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DoctorService } from '../../../../services/doctor.service';
import { Name } from '../../../../model/emr/global';
import { ShareDataService } from 'app/services/share-data.service';
import { GiayToLienQuanComponent } from '../../benh-an-emr/giay-to-lien-quan.component';

class GiayCamDoan {
  HO_TEN: string = "";
  NAM_SINH: string = "";
  GIOI_TINH: number|null = null;
  ten_nguoi_dai_dien: string = "";
  dong_y_phau_thuat: boolean | null = null;
  ngoai_kieu: string = "";
  DAN_TOC: string="";
  NGHE_NGHIEP:string="";
  NOI_CONG_TAC:string="";
  DIA_CHI:string ="";
  KHOA: string = "";
  VIEN: string = "Bệnh viện đa khoa Đức Giang";
}

@Component({
  selector: 'app-giay-cam-doan-chap-nhan-phau-thuat-thu-thuat',
  templateUrl: './giay-cam-doan-chap-nhan-phau-thuat-thu-thuat.component.html',
  styleUrls: ['./giay-cam-doan-chap-nhan-phau-thuat-thu-thuat.component.scss'],
})
export class GiayCamDoanChapNhanPhauThuatThuThuatComponent extends GiayToLienQuanComponent implements OnInit, OnChanges {

  @Input() patientInfo: any;
  @Input() isCreateGiayToLienQuan: any;
  @Input() selectGiayToLienQuan: any;
  giay_cam_doan = new GiayCamDoan()
  filteredUserCBYTs: any = [];
  filteredUsers: any = [];
  resetUser: Name = new Name();

  constructor(
    private shareDataService: ShareDataService,
  ) {
    super();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.isCreateGiayToLienQuan === true) {
      this.giay_cam_doan = new GiayCamDoan()
      if(this.patientInfo){
        this.giay_cam_doan.ten_nguoi_dai_dien = this.patientInfo.HO_TEN;
        this.giay_cam_doan.KHOA = this.patientInfo.parent_name;
      }
    }
    if (this.isCreateGiayToLienQuan !== true && this.checkNonEmpty(this.selectGiayToLienQuan)) {
      this.giay_cam_doan = this.selectGiayToLienQuan;
    }
    this.shareDataService.pushData(this.giay_cam_doan, 'giay-cam-doan-chap-nhan-phau-thuat-thu-thuat');
  }

}
