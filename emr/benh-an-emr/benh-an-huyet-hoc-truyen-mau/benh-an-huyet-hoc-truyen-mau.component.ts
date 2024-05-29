import { Component, OnInit } from '@angular/core';
import { BenhAnComponent } from '../benh-an.component';
import { EmrService } from '../../../../services/emr.service';

@Component({
  selector: 'app-benh-an-huyet-hoc-truyen-mau',
  templateUrl: './benh-an-huyet-hoc-truyen-mau.component.html',
  styleUrls: ['./benh-an-huyet-hoc-truyen-mau.component.scss'],
})
export class BenhAnHuyetHocTruyenMauComponent extends BenhAnComponent implements OnInit {
  constructor(private emrService: EmrService) {
    super();
  }

  ngOnInit(): void {
    this.emrService.tenBenhAn = this.tenBenhAn;
  }
}
