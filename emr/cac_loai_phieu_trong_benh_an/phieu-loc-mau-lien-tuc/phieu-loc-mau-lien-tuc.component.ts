import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LocalStorageService } from '@shared';
import { DM } from 'app/model/Patient_EMR';
import { DateTime } from 'app/model/emr/global';
import { ReceptionService } from 'app/services/reception.service';
import { ShareDataService } from 'app/services/share-data.service';
import moment from 'moment';
import { GiayToLienQuanComponent } from '../../benh-an-emr/giay-to-lien-quan.component';
import { PTM } from 'app/model/giay_to_dinh_kem_emr/phieu_truyen_mau';

export class LOC_MAU_LIEN_TUC {
  bac_si_chi_dinh = '';
  ho_ten_nguoi_benh = '';
  tuoi = 0;
  gioi_tinh = 0;
  chan_doan= '';
  qua_loc = '';
  thoi_gian_bdau_loc = moment();
  thoi_gian_ket_thuc_loc = moment();
  THOI_GIAN_BDAU_LOC = new DateTime();
  THOI_GIAN_KTHUC_LOC = new DateTime();
  toc_do_mau = 0;
  dich_thay_the = '';
  toc_do_thay_the = 0;
  truoc_mang = '';
  sau_mang = '';
  toc_do_dich_tham_tach = '';
  rut_dich = '';
  kali_clorid = '';
  chong_dong = '';
  bolus = '';
  duy_tri = '';
  corticoid = '';
  tai_bien_xu_tri = '';
}

@Component({
  selector: 'app-phieu-loc-mau-lien-tuc',
  templateUrl: './phieu-loc-mau-lien-tuc.component.html',
  styleUrls: ['./phieu-loc-mau-lien-tuc.component.scss'],
})
export class PhieuLocMauLienTucComponent extends GiayToLienQuanComponent implements OnInit, OnChanges {
  locMauLienTuc: LOC_MAU_LIEN_TUC = new LOC_MAU_LIEN_TUC();
  ptm!: PTM;
  constructor(
    private receptionService: ReceptionService,
              private shareDataService: ShareDataService,
              private storageService: LocalStorageService
  ) {
    super();
  }
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.isCreateGiayToLienQuan && this.selectGiayToLienQuan) {
      this.locMauLienTuc = this.selectGiayToLienQuan;
    }
    if (this.isCreateGiayToLienQuan || !this.locMauLienTuc) {
      this.locMauLienTuc = new LOC_MAU_LIEN_TUC();
      if (this.patientInfo) {
        this.convert();
      }
      if (this.ptm) {
        this.convert();
      }
    }
    this.shareDataService.pushData(this.locMauLienTuc, 'phieu_loc_mau_lien_tuc');
  }
  convert() {}
}
