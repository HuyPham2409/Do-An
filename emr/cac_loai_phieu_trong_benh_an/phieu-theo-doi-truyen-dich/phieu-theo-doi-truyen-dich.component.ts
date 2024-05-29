import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import {
  PHIEU_THEO_DOI_TRUYEN_DICH,
  TheoDoiTruyenDich
} from '../../../../model/giay_to_dinh_kem_emr/phieu_theo_doi_truyen_dich';
import { ShareDataService } from '../../../../services/share-data.service';
import { GiayToLienQuanComponent } from '../../benh-an-emr/giay-to-lien-quan.component';

@Component({
  selector: 'app-phieu-theo-doi-truyen-dich',
  templateUrl: './phieu-theo-doi-truyen-dich.component.html',
  styleUrls: ['./phieu-theo-doi-truyen-dich.component.scss']
})
export class PhieuTheoDoiTruyenDichComponent extends GiayToLienQuanComponent implements OnInit {
  PHIEU_THEO_DOI_TRUYEN_DICH: PHIEU_THEO_DOI_TRUYEN_DICH = new PHIEU_THEO_DOI_TRUYEN_DICH();

  @Input() listGiayTo: any;
  @Output() listGiayToChange = new EventEmitter<{
    created_at: number
    created_by: string
  }[]>();
  @Input() idGiayTo = 5085;
  // ID_THEO_DOI_TRUYEN_DICH : number = 5038;
  displayedColumns: any;
  dataList:any = [];
  constructor(private shareDataService: ShareDataService) {
    super();
  }
  pharmaTestList: any[] = [];
  theo_doi_truyen_dich: TheoDoiTruyenDich = new TheoDoiTruyenDich();
  readonly indexesToPrint: number[] = [];
  addPharmaTest() {
    // this.pharmaTestList.push(this.newTestControl);
  }
  createTruyenDich(){
    const {
      ngay_thang, NGAY_THANG, PHARMA, SO_LUONG, LO_SO_SAN_XUAT,
      TOC_DO_GIOT, time_start, TIME_START, time_end, TIME_END, BS_CHI_DINH, YT_DD_THUC_HIEN,..._} = this.PHIEU_THEO_DOI_TRUYEN_DICH;
    this.PHIEU_THEO_DOI_TRUYEN_DICH.theo_doi_truyen_dich.push({
      ngay_thang, NGAY_THANG, PHARMA, SO_LUONG, LO_SO_SAN_XUAT,
      TOC_DO_GIOT, time_start, TIME_START, time_end, TIME_END, BS_CHI_DINH, YT_DD_THUC_HIEN});
    this.theo_doi_truyen_dich = new TheoDoiTruyenDich();
  }
  removeTruyenDich(indexOfelement: number){
    this.PHIEU_THEO_DOI_TRUYEN_DICH.theo_doi_truyen_dich.splice(indexOfelement, 1);
  }
  ngOnInit(): void {
  }
  ngOnChanges() {
    // if (this.isCreateGiayToLienQuan === true) {
    //   this.PHIEU_THEO_DOI_TRUYEN_DICH = new  PHIEU_THEO_DOI_TRUYEN_DICH();
    // }
    if (!this.isCreateGiayToLienQuan && this.selectGiayToLienQuan){
      this.PHIEU_THEO_DOI_TRUYEN_DICH = this.selectGiayToLienQuan;
    }
    // this.PHIEU_THEO_DOI_TRUYEN_DICH = {
    //   PHIEU_THEO_DOI_TRUYEN_DICH: this.
    // }
    this.shareDataService.pushData(this.PHIEU_THEO_DOI_TRUYEN_DICH, 'phieu_theo_doi_truyen_dich');
  }
}
