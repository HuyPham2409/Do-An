import { Component, OnInit, Input } from '@angular/core';
import {BenhAnComponent} from "../benh-an.component";
import { EmrService } from '../../../../services/emr.service';

@Component({
  selector: 'app-benh-an-da-lieu',
  templateUrl: './benh-an-da-lieu.component.html',
  styleUrls: ['./benh-an-da-lieu.component.scss']
})
export class BenhAnDaLieuComponent extends BenhAnComponent implements OnInit {
  @Input() inputHoiBenhInfo: any;
  patientOutData: any;
  constructor(private emrService: EmrService) {
    super();
  }

  ngOnInit(): void {
    this.emrService.tenBenhAn = this.tenBenhAn;
  }
}
