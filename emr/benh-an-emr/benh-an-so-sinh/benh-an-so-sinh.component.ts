import { Component } from '@angular/core';
import { BenhAnComponent } from '../benh-an.component';
import { EmrService } from '../../../../services/emr.service';

@Component({
  selector: 'app-benh-an-so-sinh',
  templateUrl: './benh-an-so-sinh.component.html',
  styleUrls: ['./benh-an-so-sinh.component.scss'],
})
export class BenhAnSoSinhComponent extends BenhAnComponent {
  constructor(private emrService: EmrService) {
    super();
  }

  ngOnInit(): void {
    this.emrService.tenBenhAn = this.tenBenhAn;
  }
}
