import { Component, OnInit ,SimpleChanges,OnChanges} from '@angular/core';
import { BenhAnComponent } from '../../benh-an-emr/benh-an.component';
import { ShareDataService } from '../../../../services/share-data.service';
import { ExaminationService } from '../../../../services/examination.service';
import { ReceptionService } from '../../../../services/reception.service';
import { DM } from '../../../../model/Patient_EMR';
export class chan_doan_mat {
  MAT_PHAI = {
    BENH_CHINH:'',
    BENH_KEM_THEO: ''
  };
  MAT_TRAI = {
    BENH_CHINH:'',
    BENH_KEM_THEO: ''
  };
  BENH_TOAN_THAN = new  DM();
}
@Component({
  selector: 'app-chan-doan-benh-an-mat',
  templateUrl: './chan-doan-benh-an-mat.component.html',
  styleUrls: ['./chan-doan-benh-an-mat.component.scss']
})
export class ChanDoanBenhAnMatComponent extends BenhAnComponent{
  chanDoanMat = new chan_doan_mat();
  filteredICDs : any = [];
  resetDM: DM = new DM();
  constructor(private shareDataService: ShareDataService,
              private examinationService: ExaminationService,
              private receptionService: ReceptionService,) {
    super();
  }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    if(this.patientInfo.idEMR && this.patientInfo.results && this.patientInfo.results.chan_doan_mat){
      this.chanDoanMat = this.patientInfo.results.chan_doan_mat;
    }
    this.shareDataService.pushData(this.chanDoanMat, "chan_doan_mat");
  }
  displayDMICD(value: any): string {
    return value && value.MO_TA ? value.MA + " - " + value.MO_TA : '';
  }
  filterICD(textSearch: any) {
    this.examinationService.filterICD(textSearch).subscribe(dataReturn => {
      if(dataReturn.status === true){
        this.filteredICDs = this.receptionService.convertDM("service", dataReturn.results);
      }
    });
  }
}
