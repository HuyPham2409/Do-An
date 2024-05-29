import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ReceptionService } from '../../../../services/reception.service';
import { ShareDataService } from '../../../../services/share-data.service';
import { GiayToLienQuanComponent } from '../../benh-an-emr/giay-to-lien-quan.component';
import { nguoiDanhGia } from '../bang-danh-gia-thang-diem-glasgow/bang-danh-gia-thang-diem-glasgow.component';
import { CanBoYTe } from '../../../../model/emr/quan_ly_nguoi_benh';
import { DateTime } from '../../../../model/emr/global';
import moment, { Moment } from 'moment';
import { LocalStorageService } from '@shared';
import { SelectionModel } from '@angular/cdk/collections';

class Ecmo {
  ho_ten_nguoi_benh: string = '';
  nam_sinh: number = 0;
  gioi_tinh: number = 0;
  khoa: string = '';
  chan_doan: string = '';
  ngay_vao_vien: number = 0;
  ma_so_ba: number = 0;
  mat: number = 0;
  tong_diem: number = 0;
  ghi_chu: string = '';
  nguoi_danh_gia = new nguoiDanhGia();

  THOI_GIAN = new DateTime();
  thoi_gian : Moment | null = null;
  CI = '';
  CO = '';
  LUU_LUONG = '';
  FIO2 = '';
  VONG_CANG_CHAN_PHAI = 0;
  VONG_CANG_CHAN_TRAI = 0;
  VONG_DUI_PHAI = 0;
  VONG_DUI_TRAI = 0;
  VI_TRI_CHAY_MAU = '';
  SO_LUONG_CHAY_MAU = '';
  TINH_TRANG_DUONG_NUOI = '';
  time_unix: number | null;
  time_moment: Moment;
  id = 0;
  created_by = '';
  LIST_ECMO = <Ecmo[]>[];
  DIEU_DUONG = new dieuDuong();
  constructor(isAddedByUser?: boolean) {
    const now = moment();
    const nowUnix = now.unix();
    this.time_unix = nowUnix;
    this.time_moment = moment(now);
    if (isAddedByUser) {
      this.id = Number(now);
    }
  }
}
 export class dieuDuong {
   chu_ky: string = '';
   dieu_duong: string = '';
   ho_ten_dieu_duong: string ='';
 }

@Component({
  selector: 'app-bang-theo-doi-benh-nhan-ecmo',
  templateUrl: './bang-theo-doi-benh-nhan-ecmo.component.html',
  styleUrls: ['./bang-theo-doi-benh-nhan-ecmo.component.scss']
})
export class BangTheoDoiBenhNhanEcmoComponent extends GiayToLienQuanComponent implements OnInit, OnChanges {
  ecmo: Ecmo = new Ecmo();
  newEcmo = new Ecmo();
  listECMO: Ecmo [] = [];
  ecmoSelect = new SelectionModel<number>(false,[]);
  constructor(private receptionService: ReceptionService,
              private shareDataService: ShareDataService,
              private storageService: LocalStorageService) {
    super();
  }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!this.isCreateGiayToLienQuan && this.checkNonEmpty(this.selectGiayToLienQuan)) {
      this.ecmo = this.selectGiayToLienQuan
    }
    if (this.isCreateGiayToLienQuan || !this.ecmo) {
      this.ecmo = new Ecmo();
      if (this.patientInfo) {
        this.convert();
      }
    }
    this.shareDataService.pushData(this.ecmo, 'bang_theo_doi_benh_nhan_ecmo');
  }
  convert(){
    this.ecmo.ho_ten_nguoi_benh = this.patientInfo.HO_TEN;
    this.ecmo.nam_sinh = (new Date(this.patientInfo.birthday * 1000 )).getFullYear();
    this.ecmo.gioi_tinh = this.patientInfo.sex;
    this.ecmo.khoa  = this.patientInfo.parent_name;
    this.ecmo.chan_doan = this.patientInfo.examining_diagnosis;
    this.ecmo.ma_so_ba = this.patientInfo.reception_queue_id;
    let user  = localStorage.getItem('user_logged');
    if(user) {
      this.ecmo.DIEU_DUONG.ho_ten_dieu_duong = JSON.parse(user).user_signature_img,
        this.ecmo.DIEU_DUONG.chu_ky = JSON.parse(user).user_signature,
        this.ecmo.DIEU_DUONG.dieu_duong = JSON.parse(user).full_name
    }
    if(this.patientInfo.in_patient == 0){
      //nếu bệnh nhân ngoại trú thì lấy theo created_at
      this.ecmo.ngay_vao_vien = this.patientInfo.created_at
    } else{
      //Nếu bệnh nhân là nội trú thì gọi API gfri để lấy thời điểm vào viện là patient_id_in -> anh Đức bảo xử lý như thế này.
      //todo: Dùng API gfri để lấy thời điểm vào khoa.
      this.receptionService.getPatientOut(this.patientInfo.reception_queue_id).subscribe(dataReturn => {
        if(dataReturn.status  == true){
          let length = dataReturn.results[0].parent_time_line.length
          console.log(dataReturn.results[0].parent_time_line[length - 1].parent_id_in)
          this.ecmo.ngay_vao_vien = dataReturn.results[0].parent_time_line[length - 1].parent_id_in;
        }
      })
    }



    this.ecmo.ngay_vao_vien = this.patientInfo
  }
  addEcmo() {
    let newEcmo = new Ecmo(true);
    if(this.selectGiayToLienQuan){
      if(this.selectGiayToLienQuan.LIST_ECMO) {
        let length = this.selectGiayToLienQuan.LIST_ECMO.length
        newEcmo = Object.assign(  {},this.selectGiayToLienQuan.LIST_ECMO[length -1])
        newEcmo.time_unix = moment().unix();
        newEcmo.time_moment = moment();
        newEcmo.id = Number(moment());
      }
    }
    if (this.ecmo.LIST_ECMO !== undefined) {
      this.ecmo.LIST_ECMO.push(newEcmo);
    }
    else {
      this.ecmo.LIST_ECMO = <Ecmo[]>[]
    }
    this.selectEcmo(newEcmo.id);
    newEcmo.created_by = this.storageService.getUserLogged().user_name;
    this.redrawList();
  }
  selectEcmo(id: number) {
    this.ecmoSelect.select(id);
    if(id)
      this.newEcmo = this.findEcmo(id);
  }
  removeEcmo(id: number) {
    const index = this.ecmo.LIST_ECMO.findIndex(bp => bp.id === id);
    if (index > -1) {
      this.ecmo.LIST_ECMO.splice(index, 1);
      this.redrawList();
    }
  }
  private findEcmo(id: number): Ecmo {
    let tmp =  this.ecmo.LIST_ECMO.find(bp => bp.id === id)
    if(tmp)
      return tmp
    return new Ecmo();
  }
  private redrawList() {
    this.listECMO = [...this.ecmo.LIST_ECMO];
  }
}
