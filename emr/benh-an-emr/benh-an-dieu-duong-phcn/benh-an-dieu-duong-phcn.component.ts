import { Component,Input, OnInit } from '@angular/core';
import { EmrService } from '../../../../services/emr.service';
import { BenhAnComponent } from '../benh-an.component';

@Component({
  selector: 'app-benh-an-dieu-duong-phcn',
  templateUrl: './benh-an-dieu-duong-phcn.component.html',
  styleUrls: ['./benh-an-dieu-duong-phcn.component.scss']
})
export class BenhAnDieuDuongPHCNComponent extends BenhAnComponent {

  constructor(private emrService: EmrService) {
    super();
  }

  ngOnInit(): void {
    this.emrService.tenBenhAn = this.tenBenhAn;
  }

}
