import { Component, OnInit, SimpleChanges, OnChanges, Input } from '@angular/core';
import { khamBenhSoSinh } from '../../../../model/emr/benh-an-so-sinh';
import { ShareDataService } from '../../../../services/share-data.service';
import { EmrService } from '../../../../services/emr.service';

@Component({
  selector: 'app-kham-benh-co-quan-khac-so-sinh',
  templateUrl: './kham-benh-co-quan-khac-so-sinh.component.html',
  styleUrls: ['./kham-benh-co-quan-khac-so-sinh.component.scss']
})
export class KhamBenhCoQuanKhacSoSinhComponent implements OnInit,OnChanges {
  @Input() patientInfo: any;
  @Input() ID_BENH_AN: any;
  khamBenhSoSinh = new khamBenhSoSinh();
  constructor(private shareDataService: ShareDataService,
              private emrService: EmrService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.patientInfo.idEMR && this.patientInfo.results && this.patientInfo.results.kb_so_sinh){
      this.khamBenhSoSinh = this.patientInfo.results.kb_so_sinh;
    }
    this.shareDataService.pushData(this.khamBenhSoSinh, "kb_so_sinh");
  }
}
