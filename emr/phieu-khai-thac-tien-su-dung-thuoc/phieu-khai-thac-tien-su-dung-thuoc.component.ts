import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import moment from 'moment';
import {
  PharmaTienSuDiUng,
  PhieuKhaiThacTienSuDiUng,
  ThongTinDiUng,
} from '../../../model/emr/phieu_khai_thac_tien_su_di_ung';
import { LocalStorageService } from '@shared';
import { DoctorService } from '../../../services/doctor.service';
import { ShareDataService } from '../../../services/share-data.service';
import { PharmaService } from '../../../services/medicament/pharma.service';
import { Pharma } from '../../../model/medicament/pharma';
import { Name } from '../../../model/emr/global';
import { DataChangeEvent } from '../../../model/data-change/event';
import { ReceptionService } from '../../../services/reception.service';
import { KhoaDieuTri } from '../../../model/emr/quan_ly_nguoi_benh';

@Component({
  selector: 'app-phieu-khai-thac-tien-su-dung-thuoc',
  templateUrl: './phieu-khai-thac-tien-su-dung-thuoc.component.html',
  styleUrls: ['./phieu-khai-thac-tien-su-dung-thuoc.component.scss'],
  providers:[PharmaService]
})
export class PhieuKhaiThacTienSuDungThuocComponent implements OnInit {
  @Input() patientInfo: any;
  @Input() isCreateGiayToLienQuan: any;
  @Input() selectGiayToLienQuan: any;
  @Output() pharmaChange = new EventEmitter<DataChangeEvent | null>();
  filteredRooms: any = [];
  khai_thac_tien_su_di_ung_thuoc: PhieuKhaiThacTienSuDiUng = new PhieuKhaiThacTienSuDiUng();
  thong_tin_di_ung: ThongTinDiUng = new ThongTinDiUng();
  variableGlobal: any;
  resetKDT: KhoaDieuTri = new KhoaDieuTri();
  KHAITHAC_TIENSU_DUNGTHUOC: any;
  ngay_thuc_hien: any;
  ngay_vao_vien: any;
  pharmaSelected: PharmaTienSuDiUng = new PharmaTienSuDiUng();
  listPharmas: Array<PharmaTienSuDiUng> = new Array<PharmaTienSuDiUng>();
  supply_id= 1;
  filteredUserCBYTs: any = [];
  filteredUsers: any = [];
  resetUser: Name = new Name();
  constructor(private localStorageService : LocalStorageService,
              private doctorService: DoctorService,
              private shareDataService: ShareDataService,
              private receptionService: ReceptionService) {
    this.variableGlobal = this.localStorageService.get("variableGlobal");
  }

  ngOnInit(): void {
    this.KHAITHAC_TIENSU_DUNGTHUOC = this.variableGlobal["KHAITHAC_TIENSU_DUNGTHUOC"] ? this.variableGlobal["KHAITHAC_TIENSU_DUNGTHUOC"].value: {}
  }
  onDate(event: any, title: string, index: number = -1): void{
    switch (title){
      case 'ngay_vao_vien':
        this.khai_thac_tien_su_di_ung_thuoc['ngay_vao_vien'] = moment(event).unix();
        break;
      case 'ngay_thuc_hien':
        this.khai_thac_tien_su_di_ung_thuoc['ngay_thuc_hien'] = moment(event).unix();
        break;
      case 'thoi_gian_xay_ra':
        if(index > -1){
          this.khai_thac_tien_su_di_ung_thuoc.thong_tin_di_ung[index].thoi_gian_xay_ra_unix = moment(event).unix();
        }else {
          this.thong_tin_di_ung.thoi_gian_xay_ra_unix = moment(event).unix();
        }
        break;
    }
  }
  filterRoom(value: any){
    var objParam = {
      active: 1,
      query: value,
      room_type_id: 568
    }
    this.receptionService.filterRoom(objParam).subscribe(dataReturn =>{
      if(dataReturn.status === true){
        this.filteredRooms = this.receptionService.convertKDT(dataReturn.results);
      }else{
        this.filteredRooms = [];
      }
    })
  }
  createDiUng(objCreate: any){
    objCreate.thoi_gian_xay_ra_unix = moment(objCreate.thoi_gian_xay_ra).unix();
    this.khai_thac_tien_su_di_ung_thuoc.thong_tin_di_ung.push(objCreate);
    this.thong_tin_di_ung = new ThongTinDiUng();
  }
  removeDiUng(indexOfelement: number){
    this.khai_thac_tien_su_di_ung_thuoc.thong_tin_di_ung.splice(indexOfelement, 1);
  }
  createThuoc(objCreate: any){
    this.khai_thac_tien_su_di_ung_thuoc.tien_su_dung_thuoc.push(objCreate);
    this.pharmaSelected = new PharmaTienSuDiUng();
  }
  removeThuoc(indexOfelement: number){
    this.khai_thac_tien_su_di_ung_thuoc.tien_su_dung_thuoc.splice(indexOfelement, 1);
  }
  getPharma(event: any){
    this.pharmaSelected = event;
  }
  displayFn(pharma: Pharma): string {
    return pharma && pharma.pharma_name ? pharma.pharma_name +" "+ ((pharma.pharma_dosage.length > 0) ? (", "+ pharma.pharma_dosage) : "") : '';
  }
  filterUser(query: any, isCBYT: number){
    this.doctorService.getDoctors(query, "query").subscribe(dataReturn => {
      if(dataReturn.status === true){
        if(isCBYT === 1){
          this.filteredUserCBYTs = this.doctorService.convertUserCBYT("user", dataReturn.results);
        }else {
          this.filteredUsers = this.doctorService.convertUserEMR("user", dataReturn.results);
        }
      }
    });
  }
  displayUser(value: any): string {
    return value && value.TEN ? value.TEN : '';
  }
  displayDMKDT(value: any): string {
    return value && value.TEN_KHOA_PHONG ? value.TEN_KHOA_PHONG : '';
  }
  ngOnChanges() {
    if (this.selectGiayToLienQuan && this.selectGiayToLienQuan.id){
      this.khai_thac_tien_su_di_ung_thuoc = this.selectGiayToLienQuan;
      if(this.KHAITHAC_TIENSU_DUNGTHUOC){
        this.KHAITHAC_TIENSU_DUNGTHUOC.khannang_tuanthu_dt = (this.khai_thac_tien_su_di_ung_thuoc.kha_nang_tuan_thu_dieu_tri) ? this.khai_thac_tien_su_di_ung_thuoc.kha_nang_tuan_thu_dieu_tri : this.KHAITHAC_TIENSU_DUNGTHUOC.khannang_tuanthu_dt;
        this.KHAITHAC_TIENSU_DUNGTHUOC.tansuat_quanly_ngoaitru = (this.khai_thac_tien_su_di_ung_thuoc.tan_suat_quan_ly_ngoai_tru) ? this.khai_thac_tien_su_di_ung_thuoc.tan_suat_quan_ly_ngoai_tru : this.KHAITHAC_TIENSU_DUNGTHUOC.tansuat_quanly_ngoaitru;
      }
      this.ngay_thuc_hien = moment.unix(this.khai_thac_tien_su_di_ung_thuoc.ngay_thuc_hien).format();
      this.ngay_vao_vien = moment.unix(this.khai_thac_tien_su_di_ung_thuoc.ngay_vao_vien).format();
    }else {
      this.khai_thac_tien_su_di_ung_thuoc = new PhieuKhaiThacTienSuDiUng();
      this.ngay_thuc_hien = moment();
      this.ngay_vao_vien = moment();
      this.khai_thac_tien_su_di_ung_thuoc.ngay_vao_vien = moment().unix();
      this.khai_thac_tien_su_di_ung_thuoc.ngay_thuc_hien = moment().unix();
      this.khai_thac_tien_su_di_ung_thuoc.parent_name = this.patientInfo.parent_name;
      this.khai_thac_tien_su_di_ung_thuoc.room_name = this.patientInfo.in_patient_room_name;
      if(this.KHAITHAC_TIENSU_DUNGTHUOC && this.KHAITHAC_TIENSU_DUNGTHUOC.khannang_tuanthu_dt && this.KHAITHAC_TIENSU_DUNGTHUOC.khannang_tuanthu_dt.length > 0){
        this.KHAITHAC_TIENSU_DUNGTHUOC.khannang_tuanthu_dt.forEach((tiensu: any)=>{
          tiensu.checked = false;
        })
      }
      if(this.KHAITHAC_TIENSU_DUNGTHUOC && this.KHAITHAC_TIENSU_DUNGTHUOC.tansuat_quanly_ngoaitru && this.KHAITHAC_TIENSU_DUNGTHUOC.tansuat_quanly_ngoaitru.length > 0){
        this.KHAITHAC_TIENSU_DUNGTHUOC.tansuat_quanly_ngoaitru.forEach((tiensu: any)=>{
          tiensu.checked = false;
        })
      }
    }
    this.khai_thac_tien_su_di_ung_thuoc.kha_nang_tuan_thu_dieu_tri = (this.KHAITHAC_TIENSU_DUNGTHUOC && this.KHAITHAC_TIENSU_DUNGTHUOC.khannang_tuanthu_dt) ? this.KHAITHAC_TIENSU_DUNGTHUOC.khannang_tuanthu_dt : {};
    this.khai_thac_tien_su_di_ung_thuoc.tan_suat_quan_ly_ngoai_tru = (this.KHAITHAC_TIENSU_DUNGTHUOC && this.KHAITHAC_TIENSU_DUNGTHUOC.tansuat_quanly_ngoaitru) ? this.KHAITHAC_TIENSU_DUNGTHUOC.tansuat_quanly_ngoaitru : {};
    this.khai_thac_tien_su_di_ung_thuoc.note = (this.KHAITHAC_TIENSU_DUNGTHUOC && this.KHAITHAC_TIENSU_DUNGTHUOC.note) ? this.KHAITHAC_TIENSU_DUNGTHUOC.note : {};
    this.shareDataService.pushData(this.khai_thac_tien_su_di_ung_thuoc, "khai_thac_tien_su_di_ung_thuoc");
  }
}
