import { Component, Input, OnInit } from '@angular/core';
import { BenhAnComponent } from '../benh-an.component';
import { EmrService } from '../../../../services/emr.service';

@Component({
  selector: 'app-benh-an-truyen-nhiem',
  templateUrl: './benh-an-truyen-nhiem.component.html',
  styleUrls: ['./benh-an-truyen-nhiem.component.scss']
})
export class BenhAnTruyenNhiemComponent extends BenhAnComponent implements OnInit {
  @Input() chanDoan : any
  @Input() lyDoVaoVienNgoaiTru : any;
  @Input() hoibenhNgoaiTru: any;
  constructor(private emrService: EmrService) {
    super();
  }

  ngOnInit(): void {
    this.emrService.tenBenhAn = this.tenBenhAn;
  }
}
