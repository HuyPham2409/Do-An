import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { hoiBenhSoSinh } from '../../../../model/emr/benh-an-so-sinh';
import * as moment from 'moment';
import { ShareDataService } from '../../../../services/share-data.service';
import { EmrService } from '../../../../services/emr.service';

@Component({
  selector: 'app-hoi-benh-so-sinh',
  templateUrl: './hoi-benh-so-sinh.component.html',
  styleUrls: ['./hoi-benh-so-sinh.component.scss']
})
export class HoiBenhSoSinhComponent implements OnInit,OnChanges {
  @Input() patientInfo: any;
  hoiBenhSoSinh = new hoiBenhSoSinh();

  listCachDe = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Đẻ thường"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Can thiệp"
    },
  ];

  listTinhTrangKhiRaDoi = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Khóc ngay"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Ngạt"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Khác"
    },
  ];
  constructor(private shareDataService: ShareDataService,
              private emrService: EmrService) { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    if(this.patientInfo.idEMR && this.patientInfo.results && this.patientInfo.results.hb_so_sinh){
      this.hoiBenhSoSinh = this.patientInfo.results.hb_so_sinh;
    }
    this.shareDataService.pushData(this.hoiBenhSoSinh, "hb_so_sinh");
  }

  onDate(event: any, title: string, obj: any): void{
    if(title === "DATE_OI_VO"){
      this.hoiBenhSoSinh.OI_VO = moment(event).unix();
    }
  }
}
