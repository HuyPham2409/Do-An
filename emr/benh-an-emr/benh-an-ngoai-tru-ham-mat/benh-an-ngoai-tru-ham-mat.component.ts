import { Component, OnInit } from '@angular/core';
import { BenhAnComponent } from '../benh-an.component';
import { EmrService } from '../../../../services/emr.service';

@Component({
  selector: 'app-benh-an-ngoai-tru-ham-mat',
  templateUrl: './benh-an-ngoai-tru-ham-mat.component.html',
  styleUrls: ['./benh-an-ngoai-tru-ham-mat.component.scss']
})
export class BenhAnNgoaiTruHamMatComponent extends BenhAnComponent implements OnInit {
  constructor(private emrService: EmrService) {
    super();
  }

  ngOnInit(): void {
    this.emrService.tenBenhAn = this.tenBenhAn;
  }
}
