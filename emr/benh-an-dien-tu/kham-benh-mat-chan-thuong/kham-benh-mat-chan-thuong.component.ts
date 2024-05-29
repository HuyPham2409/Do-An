import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {KhamBenhMatChanThuong} from "../../../../model/emr/BA_MAT_CHAN_THUONG/Kham-benh";
import {ShareDataService} from "../../../../services/share-data.service";
import { BenhAnComponent } from '../../benh-an-emr/benh-an.component';

@Component({
  selector: 'app-kham-benh-mat-chan-thuong',
  templateUrl: './kham-benh-mat-chan-thuong.component.html',
  styleUrls: ['./kham-benh-mat-chan-thuong.component.scss']
})
export class KhamBenhMatChanThuongComponent extends BenhAnComponent {
  khamMatChanThuong: KhamBenhMatChanThuong = new KhamBenhMatChanThuong()

  constructor(private shareDataService: ShareDataService) {
    super();
  }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    if(this.patientInfo.idEMR && this.patientInfo.results && this.patientInfo.results.kham_mat_chan_thuong){
      this.khamMatChanThuong = this.patientInfo.results.kham_mat_chan_thuong;
    }
    this.shareDataService.pushData(this.khamMatChanThuong, "kham_mat_chan_thuong");
  }
}
