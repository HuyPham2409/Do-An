import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CDDTPHCN } from '../../../../model/giay_to_dinh_kem_emr/chi_dinh_dieu_tri_phcn';
import { ShareDataService } from '../../../../services/share-data.service';

@Component({
  selector: 'app-chi-dinh-dieu-tri-phcn',
  templateUrl: './chi-dinh-dieu-tri-phcn.component.html',
  styleUrls: ['./chi-dinh-dieu-tri-phcn.component.scss'],
})
export class ChiDinhDieuTriPhcnComponent implements OnInit, OnChanges {
  @Input() selectGiayToLienQuan: any;
  chiDinhDieuTriPHCN : any = new CDDTPHCN();

  constructor(private shareDataService : ShareDataService) {
  }

  ngOnInit(): void {
  }
  ngOnChanges(){
    if(this.selectGiayToLienQuan){
      this.chiDinhDieuTriPHCN = this.selectGiayToLienQuan;
    }
    this.shareDataService.pushData(this.chiDinhDieuTriPHCN, "plgcn");
  }
}
