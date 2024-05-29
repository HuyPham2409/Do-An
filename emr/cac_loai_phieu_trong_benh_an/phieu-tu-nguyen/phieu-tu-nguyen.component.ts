import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GiayToLienQuanComponent } from '../../benh-an-emr/giay-to-lien-quan.component';
import { ReceptionService } from '../../../../services/reception.service';
import { ShareDataService } from '../../../../services/share-data.service';
import { CanBoYTe } from '../../../../model/emr/quan_ly_nguoi_benh';
export class PHIEU_TU_NGUYEN {
  KY_THUAT = '';
  SO_TIEN = '';
  Y_TA_HC = new CanBoYTe();
  DD_TRUC = new CanBoYTe();
}
@Component({
  selector: 'app-phieu-tu-nguyen',
  templateUrl: './phieu-tu-nguyen.component.html',
  styleUrls: ['./phieu-tu-nguyen.component.scss']
})
export class PhieuTuNguyenComponent extends GiayToLienQuanComponent implements OnInit, OnChanges {
  phieuTuNguyen: PHIEU_TU_NGUYEN = new PHIEU_TU_NGUYEN();
  constructor(private receptionService: ReceptionService,
              private shareDataService: ShareDataService) {
    super();
  }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!this.isCreateGiayToLienQuan && this.checkNonEmpty(this.selectGiayToLienQuan)) {
      this.phieuTuNguyen = this.selectGiayToLienQuan
    }
    if (this.isCreateGiayToLienQuan || !this.phieuTuNguyen) {
      this.phieuTuNguyen = new PHIEU_TU_NGUYEN();
    }
    this.shareDataService.pushData(this.phieuTuNguyen, 'phieu_tu_nguyen');
  }
}
