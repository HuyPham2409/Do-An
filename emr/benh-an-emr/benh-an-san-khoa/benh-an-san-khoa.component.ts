import {Component, Input, OnInit} from '@angular/core';
import { TongKetBenhAn } from '../../../../model/emr/tong_ket_benh_an';
import { KhamBenh } from '../../../../model/emr/kham_benh';
import { LyDo } from '../../../../model/emr/benh_an';
import { Chan_doan } from '../../../../model/emr/chan_doan';
import { HoiBenh } from '../../../../model/emr/hoi_benh';
import { QLNB } from '../../../../model/emr/quan_ly_nguoi_benh';
import { BenhAnComponent } from '../benh-an.component';
import { EmrService } from '../../../../services/emr.service';

@Component({
  selector: 'app-benh-an-san-khoa',
  templateUrl: './benh-an-san-khoa.component.html',
  styleUrls: ['./benh-an-san-khoa.component.scss']
})
export class BenhAnSanKhoaComponent extends BenhAnComponent implements OnInit {
  @Input() inputHoiBenhInfo: any;
  constructor(private emrService: EmrService) {
    super();
  }

  ngOnInit(): void {
    this.emrService.tenBenhAn = this.tenBenhAn;
  }

}
