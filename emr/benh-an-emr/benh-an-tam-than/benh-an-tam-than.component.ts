import { Component } from '@angular/core';
import { BenhAnComponent } from '../benh-an.component';
import { EmrService } from '../../../../services/emr.service';

@Component({
  selector: 'app-benh-an-tam-than',
  templateUrl: './benh-an-tam-than.component.html',
  styleUrls: ['./benh-an-tam-than.component.scss'],
})
export class BenhAnTamThanComponent extends BenhAnComponent {
  constructor(private emrService: EmrService) {
    super();
  }

  ngOnInit(): void {
    this.emrService.tenBenhAn = this.tenBenhAn;
  }
}
