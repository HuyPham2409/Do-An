import { Component, Input, OnInit } from '@angular/core';
import { BenhAnComponent } from '../benh-an.component';
import { EmrService } from '../../../../services/emr.service';

@Component({
  selector: 'app-benh-an-ngoai-tru-than-nhan-tao',
  templateUrl: './benh-an-ngoai-tru-than-nhan-tao.component.html',
  styleUrls: ['./benh-an-ngoai-tru-than-nhan-tao.component.scss']
})
export class BenhAnNgoaiTruThanNhanTaoComponent extends BenhAnComponent {
  @Input() patientOutData: any;

  constructor(private emrService: EmrService) {
    super();
  }

  /**
   * Phần này cần thiết để gán phiếu in
   */
  ngOnInit(): void {
    this.emrService.tenBenhAn = this.tenBenhAn;
  }
}
