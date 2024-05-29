import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { THI_LUC } from '../../../../model/emr/kham_mat';
import { EmrService } from '../../../../services/emr.service';
import { ShareDataService } from '../../../../services/share-data.service';

@Component({
  selector: 'app-thi-luc-ra-vien',
  templateUrl: './thi-luc-ra-vien.component.html',
  styleUrls: ['./thi-luc-ra-vien.component.scss']
})
export class ThiLucRaVienComponent implements OnInit {
  @Input() patientInfo: any;
  @Input() ID_BENH_AN: any;
  thiLucRaVien = new THI_LUC();
  showField: any;
  constructor(private emrService: EmrService,
              private shareDataService: ShareDataService) { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    if(this.patientInfo.idEMR && this.patientInfo.results && this.patientInfo.results.thi_luc_ra_vien){
      this.thiLucRaVien = this.patientInfo.results.thi_luc_ra_vien;
    }
    console.log(this.thiLucRaVien);
    this.shareDataService.pushData(this.thiLucRaVien, "thi_luc_ra_vien");

  }
}
