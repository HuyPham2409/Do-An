import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ShareDataService } from '../../../../services/share-data.service';
import { GiayToLienQuanComponent } from '../../benh-an-emr/giay-to-lien-quan.component';
import { CanBoYTe } from '../../../../model/emr/quan_ly_nguoi_benh';
import moment, { Moment } from 'moment';

class PhieuGHMS {
  CHIEU_CAO = '';
  CAN_NANG = '';
  NHOM_MAU = '';
  TU_THE = '';
  CHAN_DOAN = '';
  PHUONG_PHAP_PHAU_THUAT = '';
  PHUONG_PHAP_VO_CAM = '';
  NKQ_SO = '';
  NKQ_MUI = false;
  MKQ_MIENG = false;
  NKQ_BONG_CHEN = false;
  BAC_SI_PHAU_THUAT = new CanBoYTe();
  BAC_SI_GAY_ME = '';
  DIEU_DUONG = '';
  ngay_thuc_hien: Moment | null = null;
  time_todo: number | null = moment().unix();
  st_tm_mach = '';
  st_tm_huyet_ap = '';
  st_tm_nhip_tho = '';
  st_tm_spo2 = '';
  tien_me = '';
  tac_dung = '';
  tien_su_thuoc_gmhs = '';
  bat_thuong_gmhs = '';
  nhan_xet_ket_luan = '';
  result = {
    blood_pressure: <HuyetApGHMS[]>[]
  }
}

class HuyetApGHMS {
  no_minute: number;
  mx = 0;
  mn = 0;

  constructor(index: number) {
    this.no_minute = index * 5;
  }
}

@Component({
  selector: 'app-phieu-gay-me-hoi-suc',
  templateUrl: './phieu-gay-me-hoi-suc.component.html',
  styleUrls: ['./phieu-gay-me-hoi-suc.component.scss']
})
export class PhieuGayMeHoiSuc extends GiayToLienQuanComponent implements OnInit, OnChanges {
  phieuGMHS!: PhieuGHMS;

  constructor(private shareDataService: ShareDataService) {
    super();
  }

  ngOnInit(): void {
    this.phieuGMHS = new PhieuGHMS();
  }

  ngOnChanges(changes:SimpleChanges) {
    if (!this.isCreateGiayToLienQuan && this.checkNonEmpty(this.selectGiayToLienQuan)) {
      this.phieuGMHS = this.selectGiayToLienQuan;
    }
    if(this.isCreateGiayToLienQuan){
      this.phieuGMHS = new PhieuGHMS();
    }
    this.shareDataService.pushData(this.phieuGMHS, "phieu_gay_me_hoi_suc");
  }

  addHuyetAp() {
    this.phieuGMHS.result.blood_pressure.push(new HuyetApGHMS(
      this.phieuGMHS.result.blood_pressure.length
    ));
  }
}
