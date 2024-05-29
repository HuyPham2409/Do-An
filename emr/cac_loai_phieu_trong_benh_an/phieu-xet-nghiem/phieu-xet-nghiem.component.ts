import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AssignmentService } from '../../../../services/assignment.service';
import { EmrService } from '../../../../services/emr.service';
import { ShareDataService } from '../../../../services/share-data.service';
import { DoctorService } from '../../../../services/doctor.service';
import { XN_GT } from '../../../../model/giay_to_dinh_kem_emr/xet-nghiem';
import { DM } from '../../../../model/Patient_EMR';
import * as moment from 'moment';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-phieu-xet-nghiem',
  templateUrl: './phieu-xet-nghiem.component.html',
  styleUrls: ['./phieu-xet-nghiem.component.scss']
})
export class PhieuXetNghiemComponent implements OnInit, OnChanges {
  @Input() patientInfo: any;
  @Input() selectGiayToLienQuan: any;
  @Input() loaiGiayToLienQuan: any;
  @Input() listHisResults: any;
  dataXNGEH : XN_GT = new XN_GT();
  phieuXN: any;
  categoryDichKetQuaXN : any = [];
  public editor = ClassicEditor;
  resetDM: DM = new DM();
  listDMLoaiXN: any;
  constructor(
    private assignmentService: AssignmentService,
    private emrService: EmrService,
    private shareDataService: ShareDataService
  ) { }

  ngOnInit(): void {
    if(this.loaiGiayToLienQuan.CLS === 3){
      this.emrService.getDMLoaiXN().subscribe(dataReturn => {
        this.listDMLoaiXN = dataReturn;
      });
    }

    this.emrService.getDMDichKetQuaXN().subscribe(dataReturn => {
      this.categoryDichKetQuaXN = dataReturn;
    });
  }

  displayphieuXN(value: any): string {
    //todo: hiển thị khi select phiếu xn
    return value && value.service_name ? moment(value.created_at * 1000).format("HH:mm DD/MM/YYYY") + " - " + value.service_name: '';
  }

  fillDataResults(phieuXN: any){
    this.assignmentService.getResultsExam(phieuXN._id.$id).subscribe((dataReturn: any) =>{
      if(dataReturn.status === true){
        this.dataXNGEH = this.emrService.mapXNToGiayToLienQuan(dataReturn.results[0]);
        this.shareDataService.pushData(this.dataXNGEH, "phieu_cls");
      }
    });
  }

  displayDM(value: any): string {
    return value && value.MO_TA ? value.MA +  " -" + value.MO_TA : '';
  }

  onDate(event: any, title: string): void{
    if(title === "DATE_YEU_CAU"){
      this.phieuXN.date_yeu_cau = moment(event).unix();
    }
    if(title === "DATE_THUC_HIEN"){
      this.phieuXN.date_thuc_hien = moment(event).unix();
    }
  }

  ngOnChanges(){
    if(this.selectGiayToLienQuan && this.selectGiayToLienQuan.emr){
      this.dataXNGEH = this.selectGiayToLienQuan.emr;
    }
    this.shareDataService.pushData(this.dataXNGEH, "phieu_cls");
  }
}
