import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ShareDataService } from '../../../services/share-data.service';
import { Moment } from 'moment';
class GiayTienMe {
  bua_an_truoc_mo: String = "";
  loai_thuc_an: String = "";
  nhom_mau: String = "";
  asa: String = "";
  mallampati: String = "";
  kc_cam_giap: String = "";
  ha_mieng: String = "";
  chan_doan: String = "";
  huong_xu_tri: String = "";
  tien_su_noi_khoa: String = "";
  tien_su_ngoai_khoa: String = "";
  tien_su_gay_me: String = "";
  di_ung: String = "";
  rang_gia: String = "";
  nghien: String = "";
  benh_lay_nhiem: String = "";
  thuoc_dang_dieu_tri: String = "";
  kham_lam_sang: String = "";
  tuan_hoan: String = "";
  ho_hap: String = "";
  than_kinh: String = "";
  cot_song: String = "";
  xet_nghiem_bat_thuong: String = "";
  yeu_cau_bo_xung: String = "";
  cach_va_thuoc_vo_cam: String = "";
  giam_dau_sau_mo: String = "";
  du_kien: String = "";
  truoc_mo_va_sau_mo: String = "";
  dieu_duong_thuc_hien: any;
  bac_si_kham_gmhs: any;
  bac_si_kham_lai_gmhs: any;
  ngay_kham: any;
  ngay_tham_lai_truoc_mo:any;
  y_lenh: String = "";
  huyet_ap: String = "";
  can_nang: Number = 0;
  mach: Number = 0;
  chieu_cao: Number = 0;
  ngay_kham_unix:any;
  ngay_tham_lai_truoc_mo_unix:any;
}
@Component({
  selector: 'app-phieu-tien-me',
  templateUrl: './phieu-tien-me.component.html',
  styleUrls: ['./phieu-tien-me.component.scss']
})
export class PhieuTienMeComponent implements OnInit {
  @Input() patientInfo: any;
  @Input() isCreateGiayToLienQuan: any;
  @Input() selectGiayToLienQuan: any;
  @Input() loaiGiayToLienQuan: any;
  GiayTienMe: GiayTienMe = new GiayTienMe();
  listRangGia = [
    {id:1, name:"Không"},
    {id:2, name:"Tháo được"},
    {id:3, name:"Cố định"},
  ];
  listNghien = [
    {id:1, name:"Thuốc lá, thuốc lào"},
    {id:2, name:"Rượu"},
    {id:3, name:"Ma túy"},
  ];
  multiple: any;
  constructor(private shareDataService: ShareDataService) {
    this.GiayTienMe.ngay_kham = new Date();
  }

  ngOnInit(): void {
  }
  ngOnChanges(changes:SimpleChanges) {
    if (this.isCreateGiayToLienQuan) {
      this.GiayTienMe = new GiayTienMe();
    }
    if (!this.isCreateGiayToLienQuan && this.selectGiayToLienQuan) {
     this.GiayTienMe = this.selectGiayToLienQuan;
    }
    this.shareDataService.pushData(this.GiayTienMe, 'giay_kham_tien_me');
  }
}
