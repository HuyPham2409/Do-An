import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GiayToLienQuanComponent } from '../../benh-an-emr/giay-to-lien-quan.component';
import { ReceptionService } from '../../../../services/reception.service';
import { ShareDataService } from '../../../../services/share-data.service';
import { DM } from '../../../../model/Patient_EMR';

class BO_CAU_HOI_TRE_EM {
  CAN_NANG_HIEN_TAI = 0;
  CHIEU_CAO_HIEN_TAI = 0;
  BMI_HIEN_TAI = 0;
  CAN_NANG_THEO_CHIEU_CAO = new DM();
  CAN_NANG_1_THANG_TRUOC = 0;
  SUT_CAN_TRONG_THANG = new DM();
  NHO_HON_2_TUOI = new DM();
  LON_HON_2_TUOI = new DM();
  LUONG_AN_TRONG_1_TUAN = new DM();
}

@Component({
  selector: 'app-bo-cau-hoi-tre-em',
  templateUrl: './bo-cau-hoi-tre-em.component.html',
  styleUrls: ['./bo-cau-hoi-tre-em.component.scss']
})
export class BoCauHoiTreEmComponent extends GiayToLienQuanComponent implements OnInit, OnChanges {
  boCauHoiTreEm: BO_CAU_HOI_TRE_EM = new BO_CAU_HOI_TRE_EM();
  constructor(private receptionService: ReceptionService,
              private shareDataService: ShareDataService,) {
    super();
  }

  ngOnInit(): void {
    this.convert()
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!this.isCreateGiayToLienQuan && this.checkNonEmpty(this.selectGiayToLienQuan)) {
      this.boCauHoiTreEm = this.selectGiayToLienQuan
    }
    if (this.isCreateGiayToLienQuan || !this.boCauHoiTreEm) {
      this.boCauHoiTreEm = new BO_CAU_HOI_TRE_EM();
      if (this.patientInfo) {
        this.convert();
      }
    }
    this.shareDataService.pushData(this.boCauHoiTreEm, 'bo_cau_hoi_tre_em');
  }
  listcn = [
    {
      ID:"1",
      MA: "1",
      MO_TA: ">-1SD"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "-1SD đến -2SD"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "<=-2SD"
    }
  ];
  listsutcan = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Có"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Không"
    }
  ];
  listbehon2tuoi = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Tăng cân < 50% so với chuẩn"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Tăng cân < 25% so với chuẩn"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Sụt cân 7,5% trọng lượng"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "Sụt cân 10% trọng lượng"
    }
  ];
  listluongantrong1tuan = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Không giảm"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Giảm >= 50%"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Giảm >= 75%"
    }
  ];
  convert(){
  }
  calBMI(weight: number, height: number){
    this.boCauHoiTreEm.BMI_HIEN_TAI = Number(GiayToLienQuanComponent.calcBMI(weight, height));
  }
}
