import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import { HoiBenh } from '../../../../model/emr/hoi_benh';
import  {HoiBenhBAPTKS} from '../../../../model/emr/BA_Phau_Thuat_Khuc_Xa/hoi-benh-BAPTKS';
import { ShareDataService } from '../../../../services/share-data.service';
import { EmrService } from '../../../../services/emr.service';
import { Patient_EMR } from '../../../../model/Patient_EMR';
import * as moment from "moment";


@Component({
  selector: 'app-hoi-benh-benh-an-khuc-xa',
  templateUrl: './hoi-benh-benh-an-khuc-xa.component.html',
  styleUrls: ['./hoi-benh-benh-an-khuc-xa.component.scss']
})
export class HoiBenhBenhAnKhucXaComponent implements OnInit {
  @Input() patientInfo: any;
  @Input() hoibenhNgoaiTru: any;
  showField: any;
  hoiBenh: HoiBenh = new HoiBenh();
  hoiBenhBAPTKS: HoiBenhBAPTKS = new HoiBenhBAPTKS();

  constructor(private shareDataService: ShareDataService,
              private emrService: EmrService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges){
    if (changes.patientInfo.currentValue.results?.hbbaptkx) {
      // Load dữ liệu đã lưu
      this.hoiBenhBAPTKS = changes.patientInfo.currentValue.results?.hbbaptkx;
    }
    this.shareDataService.pushData(this.hoiBenhBAPTKS, "hbbaptkx");
  }

}
