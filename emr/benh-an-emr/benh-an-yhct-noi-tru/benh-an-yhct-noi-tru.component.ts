import { Component, Input, OnInit } from '@angular/core';
import { BenhAnComponent } from '../benh-an.component';
import { EmrService } from '../../../../services/emr.service';

@Component({
  selector: 'app-benh-an-yhct-noi-tru',
  templateUrl: './benh-an-yhct-noi-tru.component.html',
  styleUrls: ['./benh-an-yhct-noi-tru.component.scss']
})
export class BenhAnYhctNoiTruComponent extends BenhAnComponent implements OnInit {
  @Input() inputHoiBenhInfo: any;
  patientOutData: any;
  constructor(private emrService: EmrService) {
    super();
  }
  ngOnInit(): void {
    this.emrService.tenBenhAn = this.tenBenhAn;
  }
}
