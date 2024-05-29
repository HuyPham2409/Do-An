import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { dienBienBenh } from '../../../../model/emr/dien_bien_benh';
import { ShareDataService } from '../../../../services/share-data.service';

@Component({
  selector: 'app-dien-bien-benh-y-lenh',
  templateUrl: './dien-bien-benh-y-lenh.component.html',
  styleUrls: ['./dien-bien-benh-y-lenh.component.scss']
})
export class DienBienBenhYLenhComponent implements OnInit,OnChanges {
  @Input() patientInfo: any;
  @Input() ID_BENH_AN: any;
  newBenh = new dienBienBenh();
  listBenh: dienBienBenh [] = [];
  constructor(private shareDataService: ShareDataService) { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    if(this.patientInfo.idEMR && this.patientInfo.results && this.patientInfo.results.dien_bien_benh_y_lenh){
      this.listBenh = this.patientInfo.results.dien_bien_benh_y_lenh;
    }
    console.log(this.listBenh);
    this.shareDataService.pushData(this.listBenh, "dien_bien_benh_y_lenh");
  }

  addBenh () {
    this.listBenh.push({ ...this.newBenh });
    // this.tongKetBenhAn.LICH_SU_PHAU_THUAT.push({
    //   THOI_GIAN: this.convertDataToServer(this.newPtHis.time, 'time'),
    //   BAC_SI_GAY_ME: this.convertDataToServer(this.newPtHis.anesthesiologist, 'name'),
    //   BAC_SI_PHAU_THUAT: this.convertDataToServer(this.newPtHis.surgeon, 'name'),
    //   PHUONG_PHAP_THUC_HIEN: this.convertDataToServer(this.newPtHis.description, 'description'),
    // });
    this.newBenh = new dienBienBenh();
  }
  removeBenh(index: any) {
    this.listBenh.splice(index,1);
  }
}
