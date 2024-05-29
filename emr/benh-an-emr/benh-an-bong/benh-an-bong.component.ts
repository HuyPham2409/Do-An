import { Component } from '@angular/core';
import { BenhAnComponent } from '../benh-an.component';
import { EmrService } from '../../../../services/emr.service';

@Component({
  selector: 'app-benh-an-bong',
  templateUrl: './benh-an-bong.component.html',
  styleUrls: ['./benh-an-bong.component.scss'],
})
export class BenhAnBongComponent extends BenhAnComponent {
  constructor(private emrService: EmrService) {
    super();
  }
  ngOnInit(): void {
    this.emrService.tenBenhAn = this.tenBenhAn;
  }
}
