import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { BenhAnComponent } from '../benh-an.component';
import { EmrService } from '../../../../services/emr.service';

@Component({
  selector: 'app-benh-an-phu-khoa',
  templateUrl: './benh-an-phu-khoa.component.html',
  styleUrls: ['./benh-an-phu-khoa.component.scss'],
})
export class BenhAnPhuKhoaComponent extends BenhAnComponent implements OnInit, OnChanges {
  @Input() patientInfoHis: any;
  @Input() chanDoan : any;
  @Input() lyDoVaoVienNgoaiTru : any;
  @Input() hoibenhNgoaiTru: any;

  constructor(private emrService: EmrService) {
    super();
  }

  ngOnInit(): void {
    this.emrService.tenBenhAn = this.tenBenhAn;
  }

  ngOnChanges(): void {
  }

}
