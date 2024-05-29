import { Component, OnInit, Input } from '@angular/core';
import { HisPatientInfo } from '../../../../model/emr/patient/patient-info';
import { BenhAnComponent } from '../benh-an.component';
import { EmrService } from '../../../../services/emr.service';

@Component({
  selector: 'app-benh-an-nhi-khoa',
  templateUrl: './benh-an-nhi-khoa.component.html',
  styleUrls: ['./benh-an-nhi-khoa.component.scss']
})
export class BenhAnNhiKhoaComponent extends BenhAnComponent implements OnInit {
  @Input() inputHoiBenhInfo: any;
  patientOutData: any;
  constructor(private emrService: EmrService) {
    super();
  }

  ngOnInit(): void {
    this.emrService.tenBenhAn = this.tenBenhAn;
  }

}
