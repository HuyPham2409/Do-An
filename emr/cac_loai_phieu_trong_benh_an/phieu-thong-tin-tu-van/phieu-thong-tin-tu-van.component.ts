import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GiayToLienQuanComponent } from '../../benh-an-emr/giay-to-lien-quan.component';
import { ReceptionService } from '../../../../services/reception.service';
import { ShareDataService } from '../../../../services/share-data.service';
import { dieuDuong } from '../bang-theo-doi-benh-nhan-ecmo/bang-theo-doi-benh-nhan-ecmo.component';
import { Address, DateTime, Name } from '../../../../model/emr/global';
import { EhosResponse } from '../../../../model/api/response';
import { DoctorService } from '../../../../services/doctor.service';
import { CanBoYTe, KhoaDieuTri } from '../../../../model/emr/quan_ly_nguoi_benh';
import { LocalStorageService } from '@shared';
import * as moment from 'moment';
import { Moment } from 'moment';
import { DM } from '../../../../model/Patient_EMR';
import PackageService from '../../../../services/package/package.service';

class THONG_TIN_TU_VAN {
  TAI_KHOA = '';
  NGUOI_TAO_PHIEU = new nguoiTaoPhieu();
  NAM_SINH_NGUOI_TAO_PHIEU = '';
  KHOA_PHONG? = new KhoaDieuTri();
  NAM_SINH_NGUOI_BENH = 0;
  NGAY_GIO_KHAM_MOMENT: Moment | null = moment();
  NGAY_GIO_KHAM = new DateTime();
  NGAY_GIO_MOMENT: Moment | null = moment();
  NGAY_GIO: any;
  DOI_TUONG = new DM();
  DAI_DIEN_GIA_DINH = '';
  NGUOI_TU_VAN = new nguoiTuVan();
  CHUC_DANH = '';
}
export class nguoiTaoPhieu {
  chu_ky: string = '';
  nguoi_tao_phieu = new CanBoYTe();
  ho_ten_nguoi_tao_phieu: string = '';
}
export class nguoiTuVan {
  chu_ky: string = '';
  nguoi_tu_van = new CanBoYTe();
  ho_ten_nguoi_tu_van: string = '';
}
@Component({
  selector: 'app-phieu-thong-tin-tu-van',
  templateUrl: './phieu-thong-tin-tu-van.component.html',
  styleUrls: ['./phieu-thong-tin-tu-van.component.scss']
})
export class PhieuThongTinTuVanComponent extends GiayToLienQuanComponent implements OnInit, OnChanges{
  thongTinTuVan: THONG_TIN_TU_VAN = new THONG_TIN_TU_VAN();
  constructor(private receptionService: ReceptionService,
              private shareDataService: ShareDataService,
              private doctorService: DoctorService,
              private storageService: LocalStorageService,
              private packageService: PackageService,
              private storage: LocalStorageService) {
    super();
  }
  isDisabled = false;
  doctors: Name[] = [];
  user_logged!: CanBoYTe;
  listPackageType: any = [];

  filterDoctor(query = '') {
    this.doctorService.getDoctors(query, 'query').subscribe((res: Partial<EhosResponse<any[]>>) => {
      if (res.status) {
        this.doctors = this.doctorService.convertUserEMR('user', res.results);
      } else {
        this.doctors = [];
      }
    });
  }
  listDoiTuong = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Người bệnh"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Người nhà người bệnh"
    }
  ];
  ngOnInit(): void {
    this.convert()
    const user_logged = this.storageService.getUserLoggedSmall();
    this.user_logged = {
      ...user_logged,
      MA_NHAN_VIEN: user_logged.user_name,
      HO_TEN: user_logged.full_name,
      DIA_CHI_LIEN_HE: new Address(),
      SO_CHUNG_CHI_HANH_NGHE: ''
    };
    this.thongTinTuVan.NGUOI_TAO_PHIEU.nguoi_tao_phieu = { ...this.user_logged };
    this.thongTinTuVan.NGUOI_TU_VAN.nguoi_tu_van = { ...this.user_logged };
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!this.isCreateGiayToLienQuan && this.checkNonEmpty(this.selectGiayToLienQuan)) {
      this.thongTinTuVan = this.selectGiayToLienQuan
    }
    if (this.isCreateGiayToLienQuan || !this.thongTinTuVan) {
      this.thongTinTuVan = new THONG_TIN_TU_VAN();
      if (this.patientInfo) {
        this.convert();
      }
    }
    this.shareDataService.pushData(this.thongTinTuVan, 'phieu_thong_tin_tu_van');
  }
  convert(){
    let user  = localStorage.getItem('user_logged');
    if(user) {
      this.thongTinTuVan.NGUOI_TAO_PHIEU.ho_ten_nguoi_tao_phieu = JSON.parse(user).user_signature_img,
        this.thongTinTuVan.NGUOI_TAO_PHIEU.chu_ky = JSON.parse(user).user_signature,
        this.thongTinTuVan.NGUOI_TAO_PHIEU.nguoi_tao_phieu = JSON.parse(user).full_name
        this.thongTinTuVan.TAI_KHOA = this.storage.getUserLogged().room_selected.room_name
    }
    this.thongTinTuVan.NAM_SINH_NGUOI_BENH = (new Date(this.patientInfo.birthday * 1000 )).getFullYear();
  }

  autoFill(){
    if(this.thongTinTuVan.DOI_TUONG.ID == '1') // 1 là người bệnh -> auto fill
      this.thongTinTuVan.DAI_DIEN_GIA_DINH = this.patientInfo.HO_TEN;
    else{
      this.thongTinTuVan.DAI_DIEN_GIA_DINH = "";
    }
  }
}
