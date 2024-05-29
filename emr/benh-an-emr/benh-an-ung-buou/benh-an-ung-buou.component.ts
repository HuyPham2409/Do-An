import { Component, Input, OnInit } from '@angular/core';
import { EmrService } from '../../../../services/emr.service';
import { BenhAnComponent } from '../benh-an.component';

@Component({
  selector: 'app-benh-an-ung-buou',
  templateUrl: './benh-an-ung-buou.component.html',
  styleUrls: ['./benh-an-ung-buou.component.scss']
})
export class BenhAnUngBuouComponent extends BenhAnComponent {
  constructor(private emrService: EmrService) {
    super();
  }
  ngOnInit(): void {
    this.emrService.tenBenhAn = this.tenBenhAn;
  }
}
