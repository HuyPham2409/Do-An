import { Component, Input } from '@angular/core';
import { BenhAnComponent } from '../benh-an.component';
import { EmrService } from '../../../../services/emr.service';

@Component({
  selector: 'app-benh-an-mat-lac-sup-mi',
  templateUrl: './benh-an-mat-lac-sup-mi.component.html',
  styleUrls: ['./benh-an-mat-lac-sup-mi.component.scss'],
})
export class BenhAnMatLacSupMiComponent extends BenhAnComponent {
  @Input() patientOutData: any;

  constructor(private emrService: EmrService) {
    super();
  }

  ngOnInit(): void {
    this.emrService.tenBenhAn = this.tenBenhAn;
  }
}
