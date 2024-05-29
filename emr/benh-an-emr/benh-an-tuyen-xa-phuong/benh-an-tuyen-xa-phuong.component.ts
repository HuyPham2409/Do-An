import { Component } from '@angular/core';
import { BenhAnComponent } from '../benh-an.component';
import { EmrService } from '../../../../services/emr.service';

@Component({
  selector: 'app-benh-an-tuyen-xa-phuong',
  templateUrl: './benh-an-tuyen-xa-phuong.component.html',
  styleUrls: ['./benh-an-tuyen-xa-phuong.component.scss'],
})
export class BenhAnTuyenXaPhuongComponent extends BenhAnComponent {
  constructor(private emrService: EmrService) {
    super();
  }

  ngOnInit(): void {
    this.emrService.tenBenhAn = this.tenBenhAn;
  }
}
