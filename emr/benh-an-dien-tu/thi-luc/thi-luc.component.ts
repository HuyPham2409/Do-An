import { Component, Input, OnInit,OnChanges, SimpleChanges } from '@angular/core';
import { THI_LUC } from '../../../../model/emr/kham_mat';
import { EmrService } from '../../../../services/emr.service';
import { ShareDataService } from '../../../../services/share-data.service';
import { BenhAnComponent } from '../../benh-an-emr/benh-an.component';

@Component({
  selector: 'app-thi-luc',
  templateUrl: './thi-luc.component.html',
  styleUrls: ['./thi-luc.component.scss']
})
export class ThiLucComponent extends BenhAnComponent {
  thiLuc = new THI_LUC();
  showField: any;

  /**
   * TODO: Dùng tên bệnh án thay vì ID bệnh án
   */
  private readonly componentName = 'thi_luc';

  constructor(private emrService: EmrService,
              private shareDataService: ShareDataService) {
    super();
  }

  ngOnInit(): void {
    /**
     * TODO: Nếu dùng name thì không dùng ID_BENH_AN
     */
    if (this.tenBenhAn) {
      this.emrService.getShowFieldComponentByConfig_new(this.componentName, this.tenBenhAn).then((dataReturn: any) => this.showField = dataReturn);
    } else {
      this.emrService.getShowFieldComponentByConfig(this.componentName, this.ID_BENH_AN.toString()).then((dataReturn: any) => this.showField = dataReturn);
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if(this.patientInfo.idEMR && this.patientInfo.results && this.patientInfo.results.thi_luc){
      this.thiLuc = this.patientInfo.results.thi_luc;
    }
    console.log(this.thiLuc);
    this.shareDataService.pushData(this.thiLuc, "thi_luc");

  }
}
