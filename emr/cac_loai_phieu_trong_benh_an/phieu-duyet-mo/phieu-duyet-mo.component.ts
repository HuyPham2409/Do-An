import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { GiayToLienQuanComponent } from '../../benh-an-emr/giay-to-lien-quan.component';
import moment from 'moment';
import { ReceptionService } from '../../../../services/reception.service';
import { ShareDataService } from '../../../../services/share-data.service';
import { CanBoYTe } from '../../../../model/emr/quan_ly_nguoi_benh';
import { DM } from '../../../../model/Patient_EMR';

export class PhieuDuyetMo {
  thong_tin: any = {
    HO_TEN: '',
    patient_id: 0,
    GIOI_TINH: DM,
    address1: '',
  }
  hoi_chan_luc = moment();
  tom_tat_dien_bien = '';
  cac_y_kien_hoi_chan = '';
  kham_me_truoc_mo = '';
  chan_doan = '';
  phuong_phap_phau_thuat = new pp_vo_cam();
  phuong_phap_vo_cam = new pp_vo_cam();
  phau_thuat_vien = new CanBoYTe();
  pgd_phu_trach_ngoai = new CanBoYTe();
  bac_sy_gay_me = new CanBoYTe();
  tuoi = '';
}

export class pp_vo_cam {
  anesthetic_method_id: number = 0;
  anesthetic_method_code: string = '';
  anesthetic_method_name: string = '';
  anesthetic_method_name_en: string = '';
  anesthetic_method_group_id: string = '';
  active : number = 0;
  is_del: number = 0;
  _id: string = '';
}

@Component({
  selector: 'app-phieu-duyet-mo',
  templateUrl: './phieu-duyet-mo.component.html',
  styleUrls: ['./phieu-duyet-mo.component.scss'],
})

export class PhieuDuyetMoComponent extends GiayToLienQuanComponent {

  phieuDuyetMo: PhieuDuyetMo = new PhieuDuyetMo();

  constructor(private receptionService: ReceptionService,
              private shareDataService: ShareDataService) {
    super();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.isCreateGiayToLienQuan && this.selectGiayToLienQuan) {
      this.phieuDuyetMo = this.selectGiayToLienQuan
    }
    if (this.isCreateGiayToLienQuan || !this.phieuDuyetMo) {
      this.phieuDuyetMo = new PhieuDuyetMo();
    }
    if (this.patientInfo) {
      let info = (({HO_TEN, patient_id, GIOI_TINH, address1}) => ({HO_TEN, patient_id, GIOI_TINH, address1}))(this.patientInfo)
      this.phieuDuyetMo.thong_tin = Object.assign({}, this.phieuDuyetMo.thong_tin, info)
    }
    this.shareDataService.pushData(this.phieuDuyetMo, 'phieu_duyet_mo');
  }

}
