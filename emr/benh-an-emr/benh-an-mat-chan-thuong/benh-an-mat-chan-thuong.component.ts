import { Component } from '@angular/core';
import { BenhAnComponent } from '../benh-an.component';
import { EmrService } from '../../../../services/emr.service';

@Component({
  selector: 'app-benh-an-mat-chan-thuong',
  templateUrl: './benh-an-mat-chan-thuong.component.html',
  styleUrls: ['./benh-an-mat-chan-thuong.component.scss'],
})
export class BenhAnMatChanThuongComponent extends BenhAnComponent {
  constructor(private emrService: EmrService) {
    super();
  }

  ngOnInit(): void {
    this.emrService.tenBenhAn = this.tenBenhAn;
  }
}
