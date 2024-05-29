import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import moment from 'moment';
import { ShareDataService } from '../../../services/share-data.service';
import { ReceptionService } from '../../../services/reception.service';
import { GiayDongYThucHienPTTT } from '../giay-dong-y-thuc-hien-pttt/giay-dong-y-thuc-hien-pttt.component';
import { GiayToLienQuanComponent } from '../benh-an-emr/giay-to-lien-quan.component';
import { MOMENT } from 'angular-calendar';
import { ToastrService } from 'ngx-toastr';
import { NgModel } from '@angular/forms';


export class GIAY_CAM_KET_NGUOI_BENH_NAM_NOI_CHU {
  thongTin: any = {
    Do_Tuoi : 0,
    DIA_CHI_BENH_NHAN : '',
    SO_VAO_VIEN : 0,
    GIOI_TINH: '',
    MA_Y_TE: 0,
    VAO_VIEN_LUC: '',
    vao_vien_luc: 0,
    TAI_KHOA: '',
    SO_BHYT: '',
    NHYT_gia_tri_den: moment(),
    NAM_SINH: 0,
    TEN_BENH_NHAN : '',
    ngay_gio: '',
  };
  thongTinCanNhap: any = {
    DOI_TUONG: '',
    TEN : '',
    DIA_CHI : '',
    CMTND : '0',
    NGAY_CAP: '',
    ngay_cap: 0,
    DT : '0',
    QUAN_HE: '',
    NGAY_SINH: 0,
  };
  chuKy: any = {
    chu_ky: '',
    ho_va_ten: '',
  };
}

@Component({
  selector: 'app-giay-cam-ket-nguoi-benh-nam-noi-chu',
  templateUrl: './giay-cam-ket-nguoi-benh-nam-noi-chu.component.html',
  styleUrls: ['./giay-cam-ket-nguoi-benh-nam-noi-chu.component.scss'],
})
export class GiayCamKetNguoiBenhNamNoiChuComponent extends GiayToLienQuanComponent implements OnInit {
  // giayCamKetNguoiBenhNamNoiChu = new GIAY_CAM_KET_NGUOI_BENH_NAM_NOI_CHU();
  giayCamKetNguoiBenhNamNoiChu!: GIAY_CAM_KET_NGUOI_BENH_NAM_NOI_CHU;
  readonly FORM_NAME = 'FORM_GIAY_CAM_KET_NGUOI_BENH_NAM_NOI_CHU';
  @Input() patient?: any;

  constructor(private shareDataService: ShareDataService, private receptionService: ReceptionService,private toast: ToastrService) {

    super();
    this.giayCamKetNguoiBenhNamNoiChu = new GIAY_CAM_KET_NGUOI_BENH_NAM_NOI_CHU();
  }

  ngOnInit(): void {
  }


  objs = [
    {
      id: 1,
      name: 'Bệnh nhân',
    },
    {
      id: 2,
      name: 'Người nhà bệnh nhân',
    },
  ];

  ngOnChanges(changes: SimpleChanges) {
    if (!this.isCreateGiayToLienQuan && this.checkNonEmpty(this.selectGiayToLienQuan)) {
      this.giayCamKetNguoiBenhNamNoiChu = this.selectGiayToLienQuan;
    }
    if (this.patientInfo) {
      this.giayCamKetNguoiBenhNamNoiChu.thongTin.TEN_BENH_NHAN = this.patientInfo.HO_TEN;
      this.giayCamKetNguoiBenhNamNoiChu.thongTin.DIA_CHI_BENH_NHAN = this.patientInfo.address1;
      this.giayCamKetNguoiBenhNamNoiChu.thongTin.MA_Y_TE = this.patientInfo.patient_id;
      this.giayCamKetNguoiBenhNamNoiChu.thongTin.SO_VAO_VIEN = this.patientInfo.reception_queue_id;
      this.giayCamKetNguoiBenhNamNoiChu.thongTin.SO_BHYT = this.patientInfo.MA_THE_BHYT;
      this.giayCamKetNguoiBenhNamNoiChu.thongTin.vao_vien_luc = this.patientInfoHis.parent_time_line?this.patientInfoHis.parent_time_line[0].parent_id_in:0;
    }
    let user = localStorage.getItem('user_logged');
    if(user){
      let object = JSON.parse(user);
      this.giayCamKetNguoiBenhNamNoiChu.chuKy.chu_ky = object.user_signature_image;
      this.giayCamKetNguoiBenhNamNoiChu.chuKy.ho_va_ten = object.user_signature;
    }
    this.shareDataService.pushData(this.giayCamKetNguoiBenhNamNoiChu, 'GIAY_CAM_KET_NGUOI_BENH_NAM_NOI_CHU');
  }

  autofill(id: number){
    this.giayCamKetNguoiBenhNamNoiChu.thongTinCanNhap = new GIAY_CAM_KET_NGUOI_BENH_NAM_NOI_CHU().thongTinCanNhap;
    if(id == 1 && this.patientInfo){
      this.giayCamKetNguoiBenhNamNoiChu.thongTinCanNhap.TEN = this.patientInfo.HO_TEN;
      this.giayCamKetNguoiBenhNamNoiChu.thongTinCanNhap.DIA_CHI = this.patientInfo.address1;
      this.giayCamKetNguoiBenhNamNoiChu.thongTinCanNhap.DT = this.patientInfo.phone_contact;
      this.giayCamKetNguoiBenhNamNoiChu.thongTinCanNhap.NGAY_SINH_unix = this.patientInfo.birthday;
      if(this.patientInfo.identity_id) {
        this.giayCamKetNguoiBenhNamNoiChu.thongTinCanNhap.CMTND = this.patientInfo.identity_id;
      }
      if(this.patientInfo.patient_health_insurance_selected)
        this.giayCamKetNguoiBenhNamNoiChu.thongTinCanNhap.SO_BHYT = this.patientInfo.patient_health_insurance_selected.insurance_number;
    }
  }

  validate(model: NgModel) {
    if(model.errors !== null){
      this.toast.error("Trường thông tin này chỉ được điền số", "Lỗi ký tự")
    }
    else
      this.toast.clear()
  }
}
