import { Component } from '@angular/core';
import { BenhAnComponent } from '../benh-an.component';
import { EmrService } from '../../../../services/emr.service';

@Component({
  selector: 'app-benh-an-mat-tre-em',
  templateUrl: './benh-an-mat-tre-em.component.html',
  styleUrls: ['./benh-an-mat-tre-em.component.scss'],
})
export class BenhAnMatTreEmComponent extends BenhAnComponent {
  constructor(private emrService: EmrService) {
    super();
  }

  ngOnInit(): void {
    this.emrService.tenBenhAn = this.tenBenhAn;
  }
}
