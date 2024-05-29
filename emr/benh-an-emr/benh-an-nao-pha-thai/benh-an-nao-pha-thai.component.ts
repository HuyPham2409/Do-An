import { Component, SimpleChanges } from '@angular/core';
import { BenhAnNaoPhaThai } from '../../../../model/emr/benh-an-nao-pha-thai';
import { ShareDataService } from '../../../../services/share-data.service';
import { EmrService } from '../../../../services/emr.service';
import { EmrPatientInfo } from '../../../../model/emr/patient/patient-info';
import { BenhAnComponent } from '../benh-an.component';

@Component({
  selector: 'app-benh-an-nao-pha-thai',
  templateUrl: './benh-an-nao-pha-thai.component.html',
  styleUrls: ['./benh-an-nao-pha-thai.component.scss'],
})
export class BenhAnNaoPhaThaiComponent extends BenhAnComponent {
  BENH_AN_NAO_PHA_THAI: BenhAnNaoPhaThai = new BenhAnNaoPhaThai();
  listBienPhapTT = [
    {
      ID: '1',
      MA: '1',
      MO_TA: '1. DCTC',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: '2. Thuốc tiêm',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: '3. Thuốc uống',
    },
    {
      ID: '4',
      MA: '4',
      MO_TA: '4. Que cấy',
    },
    {
      ID: '5',
      MA: '5',
      MO_TA: '5. Bao cao su',
    },
    {
      ID: '6',
      MA: '6',
      MO_TA: '6. Thuốc tránh thai khẩn cấp',
    },
    {
      ID: '7',
      MA: '7',
      MO_TA: '7. Biện pháp khác',
    },
    {
      ID: '8',
      MA: '8',
      MO_TA: '8. Không sử dụng biện pháp nào',
    },
  ];
  listTinhTrangHonNhan = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Có chồng',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Không có chồng',
    },
  ];
  showField: any;

  constructor(private shareDataService: ShareDataService,
              private emrService: EmrService) {
    super();
  }

  ngOnInit(): void {
    this.emrService.tenBenhAn = this.tenBenhAn;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.patientInfo?.currentValue) {
      const patientInfo = changes.patientInfo.currentValue as EmrPatientInfo;

      if (patientInfo.results?.benh_an_nao_pha_thai) {
        // Load dữ liệu đã lưu
        this.BENH_AN_NAO_PHA_THAI = patientInfo.results?.benh_an_nao_pha_thai;
      }
    }


    this.shareDataService.pushData(this.BENH_AN_NAO_PHA_THAI, 'benh_an_nao_pha_thai');
  }
}

