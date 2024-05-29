import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { GCNTT } from '../../../../model/emr/giay_chung_nhan_thuong_tich';
import * as moment from 'moment';
import { DM } from '../../../../model/Patient_EMR';
import { ShareDataService } from '../../../../services/share-data.service';
import { DoctorService } from '../../../../services/doctor.service';
import { Name } from '../../../../model/emr/global';

@Component({
  selector: 'app-giay-chung-nhan-thuong-tich',
  templateUrl: './giay-chung-nhan-thuong-tich.component.html',
  styleUrls: ['./giay-chung-nhan-thuong-tich.component.scss']
})
export class GiayChungNhanThuongTichComponent implements OnInit, OnChanges {
  @Input() selectGiayToLienQuan: any;
  @Input() patientInfo: any;
  giayChungNhanThuongTich: GCNTT = new GCNTT();
  resetDM: DM = new DM();
  filteredUserCBYTs: any = [];
  filteredUsers: any = [];
  resetUser: Name = new Name();
  constructor(private shareDataService: ShareDataService,
              private doctorService: DoctorService,) { }
  ngOnInit(): void {
  }
  ngOnChanges() {
    if (this.selectGiayToLienQuan){
      this.giayChungNhanThuongTich = this.selectGiayToLienQuan;
    }
    this.shareDataService.pushData(this.giayChungNhanThuongTich, "gcntt");
  }
  filterUser(query: any, isCBYT: number) {
    this.doctorService.getDoctors(query, 'query').subscribe(dataReturn => {
      if (dataReturn.status === true) {
        if (isCBYT === 1) {
          this.filteredUserCBYTs = this.doctorService.convertUserCBYT('user', dataReturn.results);
        } else {
          this.filteredUsers = this.doctorService.convertUserEMR('user', dataReturn.results);
        }
      }
    });
  }
  displayDMICD(value: any): string {
    return value && value.TEN ? value.TEN : '';
  }
  onDate(event: any, title: string, obj: any): void{
    if(title === "NGAY_SINH"){
      this.giayChungNhanThuongTich.NGAY_SINH = moment(event).format("DD/MM/YYYY");
    }
    if(title === "NGAY_CAP"){
      this.giayChungNhanThuongTich.NGAY_CAP = moment(event).format("DD/MM/YYYY");
    }
    if(title === "VAO_VIEN_LUC"){
      this.giayChungNhanThuongTich.VAO_VIEN_LUC_MOMENT = moment(event).unix();
    }
    if(title === "RA_VIEN_LUC"){
      this.giayChungNhanThuongTich.RA_VIEN_LUC_MOMENT = moment(event).unix();
    }
  }
}

