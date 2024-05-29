import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GiayToLienQuanComponent } from '../../benh-an-emr/giay-to-lien-quan.component';
import { ReceptionService } from '../../../../services/reception.service';
import { ShareDataService } from '../../../../services/share-data.service';

export class PTDTSDU {
  THUOC_DI_UNG = new THUOC_DI_UNG();
  CON_TRUNG_DI_UNG = new CON_TRUNG_DI_UNG();
  THUC_PHAM_DI_UNG = new THUC_PHAM_DI_UNG();
  TAC_NHAN_DI_UNG = new TAC_NHAN_DI_UNG();
  TIEU_SU_DI_UNG = new TIEU_SU_DI_UNG();
  GIA_DINH_DI_UNG = new GIA_DINH_DI_UNG();
}
export class THUOC_DI_UNG {
  TEN = '';
  SO_LAN = 0;
  BIEU_HIEN_LAM_SANG = ''
}
export class CON_TRUNG_DI_UNG {
  TEN = '';
  SO_LAN = 0;
  BIEU_HIEN_LAM_SANG = ''
}
export class THUC_PHAM_DI_UNG {
  TEN = '';
  SO_LAN = 0;
  BIEU_HIEN_LAM_SANG = ''
}
export class TAC_NHAN_DI_UNG {
  TEN = '';
  SO_LAN = 0;
  BIEU_HIEN_LAM_SANG = ''
}
export class TIEU_SU_DI_UNG {
  TEN = '';
  SO_LAN = 0;
  BIEU_HIEN_LAM_SANG = ''
}
export class GIA_DINH_DI_UNG {
  TEN = '';
  SO_LAN = 0;
  BIEU_HIEN_LAM_SANG = ''
}
@Component({
  selector: 'app-phieu-theo-doi-tien-su-di-ung',
  templateUrl: './phieu-theo-doi-tien-su-di-ung.component.html',
  styleUrls: ['./phieu-theo-doi-tien-su-di-ung.component.scss']
})
export class PhieuTheoDoiTienSuDiUngComponent extends GiayToLienQuanComponent implements OnInit, OnChanges {
  phieuTheoDoiTienSuDiUng: PTDTSDU = new PTDTSDU();
  constructor(private receptionService: ReceptionService,
              private shareDataService: ShareDataService) {
    super();
  }

  ngOnInit(): void {
    this.convert();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!this.isCreateGiayToLienQuan && this.checkNonEmpty(this.selectGiayToLienQuan)) {
      this.phieuTheoDoiTienSuDiUng = this.selectGiayToLienQuan
    }
    if (this.isCreateGiayToLienQuan || !this.phieuTheoDoiTienSuDiUng) {
      this.phieuTheoDoiTienSuDiUng = new PTDTSDU();
      if (this.patientInfo) {
        this.convert();
      }
    }
    this.shareDataService.pushData(this.phieuTheoDoiTienSuDiUng, 'phieu_theo_doi_tien_su_di_ung');
  }
  convert(){}
}
