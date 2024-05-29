import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-benh-an-ngoai-tru-tmh',
  templateUrl: './benh-an-ngoai-tru-tmh.component.html',
  styleUrls: ['./benh-an-ngoai-tru-tmh.component.scss']
})
export class BenhAnNgoaiTruTmhComponent implements OnInit {
  @Input() patientInfo: any;
  @Input() quanLyNguoiBenh: any;
  @Input() ketquakb: any;
  @Input() ketquaCLS: any;
  @Input() hoibenhNgoaiTru: any;
  @Input() patientOutData: any;
  @Input() ID_BENH_AN: any;
  @Input() chanDoan: any;
  @Input() lyDoVaoVienNgoaiTru: any;
  constructor() { }

  ngOnInit(): void {
  }

}
