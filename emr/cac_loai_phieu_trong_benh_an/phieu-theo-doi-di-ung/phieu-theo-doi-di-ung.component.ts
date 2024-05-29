import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DM, Patient_EMR } from '../../../../model/Patient_EMR';
import * as moment from 'moment';
import { phieuTDDU } from '../../../../model/emr/phieu_theo_doi_di_ung';
import { ShareDataService } from '../../../../services/share-data.service';
import { DoctorService } from '../../../../services/doctor.service';
import { DateTime, Name } from '../../../../model/emr/global';
import { GiayToLienQuanComponent } from '../../benh-an-emr/giay-to-lien-quan.component';

@Component({
  selector: 'app-phieu-theo-doi-di-ung',
  templateUrl: './phieu-theo-doi-di-ung.component.html',
  styleUrls: ['./phieu-theo-doi-di-ung.component.scss']
})
export class PhieuTheoDoiDiUngComponent extends GiayToLienQuanComponent implements OnInit, OnChanges {
  td_di_ung_thuoc:phieuTDDU = new phieuTDDU();
  patientHanhChinh : Patient_EMR = new Patient_EMR();
  phieuTDDU: phieuTDDU = new phieuTDDU();
  filteredUserCBYTs: any = [];
  filteredUsers: any = [];
  resetUser: Name = new Name();
  displayDMICD(value: any): string {
    return value && value.TEN ? value.TEN : '';
  }
  constructor(private shareDataService: ShareDataService,
              private doctorService: DoctorService,) {
    super();
  }
  onDate(event: any, title: string): void{
    if(title === "NGAY_SINH"){
      this.patientHanhChinh.NGAY_SINH = moment(event).format("DD/MM/YYYY");
      this.patientHanhChinh.DO_TUOI = moment().diff(event, 'years');
    }
  }
  changeRadioSex(event: any) {
    this.patientHanhChinh.GIOI_TINH = {
      ID: event + "",
      MA: event + "",
      MO_TA: event === '1' ? "Nam" : (event === '2' ? "Nữ" : "")
    }
  }
  ngOnInit(): void {
  }
  Diung: any = {
    DI_NGUYEN_THUOC: "",
    SELECT: "",
    BIEU_HIEN_LAM_SANG: ""
  }
  createDiUng(objCreate: any){
    this.Diung = {
      DI_NGUYEN_THUOC: "",
      SELECT: "",
      BIEU_HIEN_LAM_SANG: ""
    }
    this.td_di_ung_thuoc.LIST_DI_UNG.push(objCreate);
  }
  removeDiung(indexOfelement: number){
    this.td_di_ung_thuoc.LIST_DI_UNG.splice(indexOfelement, 1);
  }
  ngOnChanges() {
    console.log(">>>", this.patientInfo);
    if (this.isCreateGiayToLienQuan) {
      this.td_di_ung_thuoc = new phieuTDDU();
    }
    if (!this.isCreateGiayToLienQuan && this.selectGiayToLienQuan) {
      this.td_di_ung_thuoc = this.selectGiayToLienQuan;
    }
    this.shareDataService.pushData(this.td_di_ung_thuoc, "td_di_ung_thuoc");
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
}
