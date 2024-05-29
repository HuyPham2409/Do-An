import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { THKTPHCN } from '../../../../model/giay_to_dinh_kem_emr/thuc_hien_ky_thuat_phcn';
import { ShareDataService } from '../../../../services/share-data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-thuc-hien-ky-thuat-phcn',
  templateUrl: './thuc-hien-ky-thuat-phcn.component.html',
  styleUrls: ['./thuc-hien-ky-thuat-phcn.component.scss'],
})
export class ThucHienKyThuatPhcnComponent implements OnInit {
  @Input() patientInfo: any;
  @Input() selectGiayToLienQuan: any;
  @Input() isCreateGiayToLienQuan: any;
  @Input() loaiGiayToLienQuan: any;
  thucHienKyThuatPHCN = new class {
    CHAN_DOAN = '';
    THUC_HIEN = [{
      NGAY_GIO: '',
      MO_TA: '',
      DICH_VU: '',
      THOI_GIAN_TH: '',
      NGUOI_TH: '',
      BS_CHI_DINH: '',
      XAC_NHAN_NB_NN: '',
    }];
  };
  formColumns = ['NGAY_GIO', 'MO_TA', 'DICH_VU', 'THOI_GIAN_TH', 'NGUOI_TH', 'BS_CHI_DINH', 'XAC_NHAN_NB_NN'];
  displayedColumns = [...this.formColumns, 'actions'];

  readonly ROW_INDEX_FOR_CREATE = 0;

  constructor( private shareDataService: ShareDataService) {}

  ngOnInit(): void {
  }

  addTH() {
    this.thucHienKyThuatPHCN.THUC_HIEN = [
      {
        NGAY_GIO: '',
        MO_TA: '',
        DICH_VU: '',
        THOI_GIAN_TH: '',
        NGUOI_TH: '',
        BS_CHI_DINH: '',
        XAC_NHAN_NB_NN: '',
      },
      ...this.getTH(),
      this.thucHienKyThuatPHCN.THUC_HIEN[this.ROW_INDEX_FOR_CREATE]
    ];
  }

  removeTH(index: number) {
    console.log(index);
    this.thucHienKyThuatPHCN.THUC_HIEN.splice(index, 1);
    // this.thucHienKyThuatPHCN.THUC_HIEN = [...this.thucHienKyThuatPHCN.THUC_HIEN];
  }

  initTH() {
    return {
      NGAY_GIO: '',
      MO_TA: '',
      DICH_VU: '',
      THOI_GIAN_TH: '',
      NGUOI_TH: '',
      BS_CHI_DINH: '',
      XAC_NHAN_NB_NN: '',
    }
  }

  getTH() {
    return this.thucHienKyThuatPHCN.THUC_HIEN.slice(this.ROW_INDEX_FOR_CREATE + 1);
  }
  ngOnChanges(changes : SimpleChanges){
    if(this.selectGiayToLienQuan?.THUC_HIEN) {
      this.thucHienKyThuatPHCN.CHAN_DOAN = this.selectGiayToLienQuan.CHAN_DOAN;
      this.thucHienKyThuatPHCN.THUC_HIEN = this.selectGiayToLienQuan.THUC_HIEN;
      console.log('this', this.thucHienKyThuatPHCN.THUC_HIEN);
    }
    if(!this.isCreateGiayToLienQuan && this.selectGiayToLienQuan?.THUC_HIEN){
      // this.thucHienKyThuatPHCN = this.selectGiayToLienQuan;
      this.thucHienKyThuatPHCN.CHAN_DOAN = this.selectGiayToLienQuan.CHAN_DOAN;
      this.thucHienKyThuatPHCN.THUC_HIEN = this.selectGiayToLienQuan.THUC_HIEN;
      // this.thucHienKyThuatPHCN.THUC_HIEN.unshift(this.initTH());
      this.thucHienKyThuatPHCN.THUC_HIEN = [this.initTH(), ...this.thucHienKyThuatPHCN.THUC_HIEN];
      console.log('new', this.thucHienKyThuatPHCN.THUC_HIEN);
    }
    if(!this.thucHienKyThuatPHCN.THUC_HIEN[0]){
      this.thucHienKyThuatPHCN.THUC_HIEN.shift();
    }
    console.log('>>> after', this.selectGiayToLienQuan);
    this.shareDataService.pushData(this.thucHienKyThuatPHCN, "phieu_thuc_hien_ky_thuat_phcn");
  }

  onDate(event: any, element: any): void{
    element.NGAY_GIO =  moment(event).unix();
  }
}
