import { Component, OnInit } from '@angular/core';
import { BenhAnComponent } from '../benh-an.component';
import { EmrService } from '../../../../services/emr.service';

@Component({
  selector: 'app-benh-an-ngoai-tru-rang',
  templateUrl: './benh-an-ngoai-tru-rang.component.html',
  styleUrls: ['./benh-an-ngoai-tru-rang.component.scss']
})
export class BenhAnNgoaiTruRangComponent extends BenhAnComponent implements OnInit {
  constructor(private emrService: EmrService) {
    super();
  }

  ngOnInit(): void {
    this.emrService.tenBenhAn = this.tenBenhAn;
  }
}
