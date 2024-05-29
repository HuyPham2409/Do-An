import { Component } from '@angular/core';
import { BenhAnComponent } from '../benh-an.component';
import { EmrService } from '../../../../services/emr.service';

@Component({
  selector: 'app-benh-an-chan-tay-mieng',
  templateUrl: './benh-an-chan-tay-mieng.component.html',
  styleUrls: ['./benh-an-chan-tay-mieng.component.scss'],
})
export class BenhAnChanTayMiengComponent extends BenhAnComponent {
  constructor(private emrService: EmrService) {
    super();
  }
  ngOnInit(): void {
    this.emrService.tenBenhAn = this.tenBenhAn;
  }
}
