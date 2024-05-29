import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CDHA_GT } from '../../../../model/giay_to_dinh_kem_emr/chan_doan_hinh_anh';
import { AssignmentService } from '../../../../services/assignment.service';
import * as moment from "moment";
import { DoctorService } from '../../../../services/doctor.service';
import { DM } from '../../../../model/Patient_EMR';
import { EmrService } from '../../../../services/emr.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ShareDataService } from '../../../../services/share-data.service';
@Component({
  selector: 'app-phieu-cls',
  templateUrl: './phieu-cls.html',
  styleUrls: ['./phieu-cls.scss']
})
export class PhieuClsComponent implements OnInit, OnChanges {
  public editor = ClassicEditor;
  @Input() patientInfo: any;
  @Input() selectGiayToLienQuan: any;
  @Input() loaiGiayToLienQuan: any;
  @Input() listHisResults: any;
  phieuCLS: any;
  listDMLoaiCLS : any;
  isCDHA : boolean = false;
  dataCLSEMR: CDHA_GT = new CDHA_GT();
  constructor(
    private assignmentService: AssignmentService,
    private emrService: EmrService,
    private shareDataService: ShareDataService,
    private doctorService: DoctorService,
  ) { }
  filteredUserCBYTs: any;
  resetDM: DM = new DM();
  ngOnInit(): void {
    console.log(this.listHisResults)
    if(this.loaiGiayToLienQuan.CLS === 5){
      this.emrService.getDMLoaiTDCN().subscribe(dataReturn => {
        this.listDMLoaiCLS = dataReturn;
        this.isCDHA = false;
      });
    }
    if(this.loaiGiayToLienQuan.CLS === 4){
      this.emrService.getDMLoaiCDHA().subscribe(dataReturn => {
        this.listDMLoaiCLS = dataReturn;
        this.isCDHA = true;
      });
    }
  }
  displayphieuCLS(value: any): string {
    //todo: hiển thị khi select phiếu pttt
    return value && value.service_name ? moment(value.created_at * 1000).format("HH:mm DD/MM/YYYY") + " - " + value.service_name: '';
  }
  fillDataResults(phieuCLS: any){
    this.assignmentService.getResultsExam(phieuCLS._id.$id).subscribe((dataReturn: any) =>{
      if(dataReturn.status === true){
        this.dataCLSEMR = this.emrService.mapCDHAToGiayToLienQuan(dataReturn.results[0]);
        console.log(this.dataCLSEMR)
        this.shareDataService.pushData(this.dataCLSEMR, "phieu_cls");
      }
    });
  }
  ngOnChanges(){
    if(this.selectGiayToLienQuan && this.selectGiayToLienQuan.emr){
      this.dataCLSEMR = this.selectGiayToLienQuan.emr;
    }

  }
  filterUser(query: any){
    this.doctorService.getDoctors(query, "query").subscribe(dataReturn => {
      if(dataReturn.status === true){
        this.filteredUserCBYTs = dataReturn.results;
      }
    });
  }
  displayCBYT(value: any): string {
    return value && value.user_name ? value.user_code + " - " + value.user_name : '';
  }
  onDate(event: any, title: string, obj: any): void{
    if(title === "DATE_YEU_CAU"){
      this.phieuCLS.date_yeu_cau = moment(event).unix();
    }
    if(title === "DATE_THUC_HIEN"){
      this.phieuCLS.date_thuc_hien = moment(event).unix();
    }
  }
}
