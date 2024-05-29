import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {PPTTTE} from "../../../../model/giay_to_dinh_kem_emr/phieu_phau_thuat_thu_thuat_emr";
import * as moment from "moment";
import {DM} from "../../../../model/Patient_EMR";
import {Name} from "../../../../model/emr/global";
import {DoctorService} from "../../../../services/doctor.service";
import {ShareDataService} from "../../../../services/share-data.service";
import { ReceptionService } from '../../../../services/reception.service';
import { ExaminationService } from '../../../../services/examination.service';

@Component({
  selector: 'app-phieu-phau-thuat-thu-thuat-emr',
  templateUrl: './phieu-phau-thuat-thu-thuat-emr.component.html',
  styleUrls: ['./phieu-phau-thuat-thu-thuat-emr.component.scss']
})
export class PhieuPhauThuatThuThuatEmrComponent implements OnInit, OnChanges {
  @Input() patientInfo: any;
  @Input() listPPTTTE: any;
  @Input() selectGiayToLienQuan: any;
  phieuPhauThuatThuThuatEmr: PPTTTE = new PPTTTE();
  filteredICDs : any = [];
  resetUser: Name = new Name();
  resetDM: DM = new DM();
  filteredUserCBYTs: any = [];
  resetPhieuPTTTEMR: PPTTTE = new PPTTTE();
  filteredUsers: any = [];
  filteredID : any = [];
  constructor(private doctorService: DoctorService,
              private examinationService: ExaminationService,
              private receptionService: ReceptionService,
              private shareDataService: ShareDataService,) { }

  ngOnInit(): void {
  }
  onDate(event: any, title: string): void{
    if(title === "NGAY_PHAU_THUAT"){
      this.phieuPhauThuatThuThuatEmr.Ngaygio.DATE = moment(event).format("DD/MM/YYYY");
      this.phieuPhauThuatThuThuatEmr.Ngaygio.TIME = moment(event).format("HH:mm");
    }
  }
  displayBSi(value: any): string {
    return value && value.TEN ? value.TEN : '';
  }
  filterUser(query: any, isCBYT: number){
    this.doctorService.getDoctors(query, "query").subscribe(dataReturn => {
      if(dataReturn.status === true){
        if(isCBYT === 1){
          this.filteredUserCBYTs = this.doctorService.convertUserCBYT("user", dataReturn.results);
          console.log(this.filteredUserCBYTs)
        }else {
          this.filteredUsers = this.doctorService.convertUserEMR("user", dataReturn.results);
        }
      }
    });
  }
  filterICD(textSearch: any) {
    this.examinationService.filterICD(textSearch).subscribe(dataReturn => {
      if(dataReturn.status === true){
        this.filteredICDs = this.receptionService.convertDM("service", dataReturn.results);
      }
    });
  }

  fillDataPPTTTE(ppttte: PPTTTE){
    this.phieuPhauThuatThuThuatEmr = ppttte;
    // console.log(ppttte, "cccccccccc")
    this.shareDataService.pushData(this.phieuPhauThuatThuThuatEmr, "pttt");
  }
  displayDMICD(value: any): string {
    return value && value.MO_TA ? value.MA + " - " + value.MO_TA : '';
  }
  ngOnChanges(changes: SimpleChanges) {
    if(this.selectGiayToLienQuan){
      // Lấy phiếu đã tạo ra view
      this.phieuPhauThuatThuThuatEmr = this.selectGiayToLienQuan;
    }
    this.shareDataService.pushData(this.phieuPhauThuatThuThuatEmr, "pttt");
  }
}
