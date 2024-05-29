import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BenhAnComponent } from '../benh-an.component';
import { EmrService } from '../../../../services/emr.service';

@Component({
  selector: 'app-benh-an-ngoai-tru-rhm',
  templateUrl: './benh-an-ngoai-tru-rhm.component.html',
  styleUrls: ['./benh-an-ngoai-tru-rhm.component.scss']
})
export class BenhAnNgoaiTruRhmComponent extends BenhAnComponent implements OnInit, OnChanges {
  @Input() patientInfo: any;
  @Input() quanLyNguoiBenh: any;
  @Input() ketquakb: any;
  @Input() ketquaCLS: any;
  @Input() hoibenhNgoaiTru: any;
  @Input() patientOutData: any;
  @Input() ID_BENH_AN: any;
  @Input() lyDoVaoVienNgoaiTru: any;
  @Input() chanDoan: any;
  constructor(private emrService: EmrService) {
    super();
  }

  ngOnInit(): void {
    this.emrService.tenBenhAn = this.tenBenhAn;
  }
  ngOnChanges(changes: SimpleChanges): void {

  }

}
