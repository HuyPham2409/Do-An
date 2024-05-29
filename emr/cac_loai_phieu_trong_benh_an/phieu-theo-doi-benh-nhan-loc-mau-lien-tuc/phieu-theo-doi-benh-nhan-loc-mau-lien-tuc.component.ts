import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GiayToLienQuanComponent } from '../../benh-an-emr/giay-to-lien-quan.component';
import { ReceptionService } from '../../../../services/reception.service';
import { ShareDataService } from '../../../../services/share-data.service';
import { LocalStorageService } from '@shared';
import moment from 'moment';
import { DateTime } from '../../../../model/emr/global';
import { DM } from '../../../../model/Patient_EMR';
import { CanBoYTe } from '../../../../model/emr/quan_ly_nguoi_benh';

class THEO_DOI_LOC_MAU {
  ho_ten_nguoi_benh: string = '';
  ngay_thuc_hien =  moment();
  NGAY_THUC_HIEN = new DateTime();
  PHUONG_PHAP_THUC_HIEN = '';
  TRUOC_VAO = new TRUOC_VAO();
  SAU_VAO_15P = new SAU_VAO_15P();
  SAU_VAO_30P = new SAU_VAO_30P();
}
export class TRUOC_VAO {
  gio_thuc_hien =  moment();
  GIO_THUC_HIEN = new DateTime();
  MACH = 0;
  SPO2 = 0;
  HUYET_AP_TAM_THU = 0;
  HUYET_AP_TAM_TRUONG = 0;
  TOC_DO_MAU = 0;
  DICH_THAY_THE = '';
  DICH_DIASY = '';
  ACCESS = '';
  FILTER = '';
  TMP = '';
  RENTUN = '';
  HEPARIN = '';
  RUT_DICH = '';
  DIEU_DUONG = new CanBoYTe();
}
  export class SAU_VAO_15P {
  gio_thuc_hien =  moment();
  GIO_THUC_HIEN = new DateTime();
  MACH = 0;
  SPO2 = 0;
  HUYET_AP_TAM_THU = 0;
  HUYET_AP_TAM_TRUONG = 0;
  TOC_DO_MAU = 0;
  DICH_THAY_THE = '';
  DICH_DIASY = '';
  ACCESS = '';
  FILTER = '';
  TMP = '';
  RENTUN = '';
  HEPARIN = '';
  RUT_DICH = '';
  DIEU_DUONG = new CanBoYTe();
}
export class SAU_VAO_30P {
  gio_thuc_hien =  moment();
  GIO_THUC_HIEN = new DateTime();
  MACH = 0;
  SPO2 = 0;
  HUYET_AP_TAM_THU = 0;
  HUYET_AP_TAM_TRUONG = 0;
  TOC_DO_MAU = 0;
  DICH_THAY_THE = '';
  DICH_DIASY = '';
  ACCESS = '';
  FILTER = '';
  TMP = '';
  RENTUN = '';
  HEPARIN = '';
  RUT_DICH = '';
  DIEU_DUONG = new CanBoYTe();
}
@Component({
  selector: 'app-phieu-theo-doi-benh-nhan-loc-mau-lien-tuc',
  templateUrl: './phieu-theo-doi-benh-nhan-loc-mau-lien-tuc.component.html',
  styleUrls: ['./phieu-theo-doi-benh-nhan-loc-mau-lien-tuc.component.scss']
})
export class PhieuTheoDoiBenhNhanLocMauLienTucComponent extends GiayToLienQuanComponent implements OnInit, OnChanges {
  theoDoiLocMau: THEO_DOI_LOC_MAU = new THEO_DOI_LOC_MAU();
  constructor(private receptionService: ReceptionService,
              private shareDataService: ShareDataService,
              private storageService: LocalStorageService) {
    super();
  }

  ngOnInit(): void {
  }
  PHUONG_PHAP_THUC_HIEN: DM[] = [{
    ID: '1',
    MA: '1',
    MO_TA: 'CVVH'
  }, {
    ID: '2',
    MA: '2',
    MO_TA: 'CVVHD'
  }, {
    ID: '3',
    MA: '3',
    MO_TA: 'CVVHDF'
  }, {
    ID: '4',
    MA: '4',
    MO_TA: 'SCUF'
  }];
  ngOnChanges(changes: SimpleChanges) {
    if (!this.isCreateGiayToLienQuan && this.checkNonEmpty(this.selectGiayToLienQuan)) {
      this.theoDoiLocMau = this.selectGiayToLienQuan
    }
    if (this.isCreateGiayToLienQuan || !this.theoDoiLocMau) {
      this.theoDoiLocMau = new THEO_DOI_LOC_MAU();
      if (this.patientInfo) {
        this.convert();
      }
    }
    this.shareDataService.pushData(this.theoDoiLocMau, 'phieu_theo_doi_benh_nhan_loc_mau_lien_tuc');
  }
  convert(){

  }
}
