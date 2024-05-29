import { Component } from '@angular/core';
import { ReceptionService } from '../../../../services/reception.service';
import { BenhAnComponent } from '../benh-an.component';
import { EmrService } from '../../../../services/emr.service';

@Component({
  selector: 'app-benh-an-ngoai-khoa',
  templateUrl: './benh-an-ngoai-khoa.component.html',
  styleUrls: ['./benh-an-ngoai-khoa.component.scss'],
})
export class BenhAnNgoaiKhoaComponent extends BenhAnComponent {
  patientOutData: any;

  constructor(private receptionService: ReceptionService,
              private emrService: EmrService) {
    super();
  }

  ngOnInit(): void {
    this.receptionService.getPatientOut(this.patientInfo.reception_queue_id || '').subscribe(dataReturn => {
      if (dataReturn.status === true && dataReturn.results.length > 0) {
        this.patientOutData = dataReturn.results[0];
      } else {
        this.patientOutData = [];
      }
    });
    this.emrService.tenBenhAn = this.tenBenhAn;
  }

}
