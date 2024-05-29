import { Component, OnInit } from '@angular/core';
import { EmrService } from '../../../../services/emr.service';
import { BenhAnComponent } from '../benh-an.component';

@Component({
  selector: 'app-benh-an-ngoai-tru-phcn',
  templateUrl: './benh-an-ngoai-tru-phcn.component.html',
  styleUrls: ['./benh-an-ngoai-tru-phcn.component.scss']
})
export class BenhAnNgoaiTruPhcnComponent extends BenhAnComponent implements OnInit {
  constructor(private emrService: EmrService) {
    super();
  }

  ngOnInit(): void {
    this.emrService.tenBenhAn = this.tenBenhAn;
  }

}
