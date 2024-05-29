import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ReceptionService } from '../../../../services/reception.service';
import { ShareDataService } from '../../../../services/share-data.service';
import { PLGCN } from '../../../../model/giay_to_dinh_kem_emr/phieu_luong_gia_chuc_nang';

@Component({
  selector: 'app-luong-gia-chuc-nang-va-su-tham-gia',
  templateUrl: './luong-gia-chuc-nang-va-su-tham-gia.component.html',
  styleUrls: ['./luong-gia-chuc-nang-va-su-tham-gia.component.scss'],
})
export class LuongGiaChucNangVaSuThamGiaComponent implements OnInit, OnChanges {
  @Input() selectGiayToLienQuan: any;
  luongGiaChucNangVaSuThamGia : any = new PLGCN();

  constructor(private receptionService: ReceptionService,
              private shareDataService: ShareDataService) {

  }

  ngOnInit(): void {
  }
  ngOnChanges(changes:SimpleChanges){
    if(this.selectGiayToLienQuan){
      this.luongGiaChucNangVaSuThamGia = this.selectGiayToLienQuan;
    }
    this.shareDataService.pushData(this.luongGiaChucNangVaSuThamGia, "plgcn");
  }

}
