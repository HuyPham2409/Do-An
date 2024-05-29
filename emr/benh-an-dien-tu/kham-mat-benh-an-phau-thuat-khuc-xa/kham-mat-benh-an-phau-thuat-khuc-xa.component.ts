import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import { HoiBenh } from '../../../../model/emr/hoi_benh';
import  {KhamMatBAPTKX} from '../../../../model/emr/BA_Phau_Thuat_Khuc_Xa/kham-mat-BAPTKX';
import { ShareDataService } from '../../../../services/share-data.service';
import { EmrService } from '../../../../services/emr.service';



@Component({
  selector: 'app-kham-mat-benh-an-phau-thuat-khuc-xa',
  templateUrl: './kham-mat-benh-an-phau-thuat-khuc-xa.component.html',
  styleUrls: ['./kham-mat-benh-an-phau-thuat-khuc-xa.component.scss']
})
export class KhamMatBenhAnPhauThuatKhucXaComponent implements OnInit {
  @Input() patientInfo: any;
  @Input() hoibenhNgoaiTru: any;
  @Input() formType: any;
  @Input() ketquakb: any;
  showField: any;
  hoiBenh: HoiBenh = new HoiBenh();
  khamMatBAPTKX : KhamMatBAPTKX = new KhamMatBAPTKX();

  constructor(private shareDataService: ShareDataService,
              private emrService: EmrService) {
  }

  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges){
    if (changes.patientInfo.currentValue.results?.kmbaptkx) {
      // Load dữ liệu đã lưu

      this.khamMatBAPTKX = changes.patientInfo.currentValue.results?.kmbaptkx;
      console.log(this.khamMatBAPTKX);
    }
    this.shareDataService.pushData(this.khamMatBAPTKX, "kmbaptkx");
  }
}
