import { Component } from '@angular/core';
import { BenhAnComponent } from '../benh-an.component';
import { EmrService } from '../../../../services/emr.service';

@Component({
  selector: 'app-benh-an-mat',
  templateUrl: './benh-an-mat.component.html',
  styleUrls: ['./benh-an-mat.component.scss'],
})
export class BenhAnMatComponent extends BenhAnComponent {
  constructor(private emrService: EmrService) {
    super();
  }

  ngOnInit(): void {
    this.emrService.tenBenhAn = this.tenBenhAn;
  }
}
