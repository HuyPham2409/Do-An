import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BenhAnComponent } from '../../benh-an-emr/benh-an.component';
import { HoiBenhPhaco } from '../../../../model/emr/hoi-benh/hoi-benh-phaco';
import { EmrPatientInfo } from '../../../../model/emr/patient/patient-info';
import { ShareDataService } from '../../../../services/share-data.service';

@Component({
  selector: 'app-hoi-benh-phaco',
  templateUrl: './hoi-benh-phaco.component.html',
  styleUrls: ['./hoi-benh-phaco.component.scss'],
})
export class HoiBenhPhacoComponent extends BenhAnComponent implements OnInit, OnChanges {
  hoiBenhPhaco = new HoiBenhPhaco();

  constructor(private shareDataService: ShareDataService) {
    super();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.patientInfo?.currentValue) {
      const patientInfo = changes.patientInfo.currentValue as EmrPatientInfo;

      if (patientInfo.results?.hbphaco) {
        // Load dữ liệu đã lưu
        this.hoiBenhPhaco = patientInfo.results?.hbphaco;
      }
    }

    this.shareDataService.pushData(this.hoiBenhPhaco, 'hbphaco');
  }
}
