import { Component, Input, OnInit } from '@angular/core';
import { EmrService } from '../../../../services/emr.service';
import { BenhAnComponent } from '../benh-an.component';

@Component({
  selector: 'app-benh-an-ngoai-tru-chung',
  templateUrl: './benh-an-ngoai-tru-chung.component.html',
  styleUrls: ['./benh-an-ngoai-tru-chung.component.scss']
})
export class BenhAnNgoaiTruChungComponent extends BenhAnComponent implements OnInit {
  @Input() patientInfo: any;
  @Input() ketquaCLS: any;
  @Input() ID_BENH_AN: any;
  @Input() hoibenhNgoaiTru: any;
  @Input() ketquakb: any;
  @Input() inputHoiBenhInfo: any;
  @Input() quanLyNguoiBenh: any;
  @Input() chanDoan: any;
  @Input() lyDoVaoVienNgoaiTru: any;
  constructor(private emrService: EmrService) {
    super();
  }

  ngOnInit(): void {
    this.emrService.tenBenhAn = this.tenBenhAn;
  }
}
