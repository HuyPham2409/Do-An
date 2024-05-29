import { Component, OnInit } from '@angular/core';
import { BenhAnComponent } from '../benh-an.component';
import { EmrService } from '../../../../services/emr.service';
import { ReceptionService } from '../../../../services/reception.service';

@Component({
  selector: 'app-benh-an-mat-glocom',
  templateUrl: './benh-an-mat-glocom.component.html',
  styleUrls: ['./benh-an-mat-glocom.component.scss']
})
export class BenhAnMatGlocomComponent extends BenhAnComponent{
  patientOutData: any;
  constructor(private emrService: EmrService,
  private receptionService: ReceptionService) {
    super();
  }
  ngOnInit(): void {
    this.receptionService.getPatientOut(this.patientInfo.reception_queue_id).subscribe(dataReturn => {
      if(dataReturn.status === true && dataReturn.results.length > 0){
        this.patientOutData = dataReturn.results[0];
      }else{
        this.patientOutData = [];
      }
    });
    this.emrService.tenBenhAn = this.tenBenhAn
  }

}
