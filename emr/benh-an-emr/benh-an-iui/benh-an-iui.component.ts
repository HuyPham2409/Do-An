import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ShareDataService } from '../../../../services/share-data.service';
import * as moment from 'moment';
import { EmrPatientInfo, HisPatientInfo } from '../../../../model/emr/patient/patient-info';
import { SexEnum } from '../../../../model/patient';
import { BenhAnComponent } from '../benh-an.component';
import { ReceptionService } from '../../../../services/reception.service';
import { EmrService } from '../../../../services/emr.service';

@Component({
  selector: 'app-benh-an-iui',
  templateUrl: './benh-an-iui.component.html',
  styleUrls: ['./benh-an-iui.component.scss'],
})
export class BenhAnIuiComponent extends BenhAnComponent implements OnInit, OnChanges {
  @Input() inputHoiBenhInfo: any;
  patientOutData: any;

  benhAnIui: any = {};

  constructor(private shareDataService: ShareDataService,
              private receptionService: ReceptionService,
              private emrService: EmrService) {
    super();
  }

  ngOnInit(): void {
    this.shareDataService.pushData(this.benhAnIui, 'emr_iui');

    this.emrService.tenBenhAn = this.tenBenhAn;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.patientInfo?.currentValue !== undefined) {
      const patientInfo = changes.patientInfo.currentValue as EmrPatientInfo;

      if (patientInfo.results?.emr_iui) {
        // Load dữ liệu đã lưu
        this.benhAnIui = patientInfo.results?.emr_iui;
      }
    }

    if (changes.patientInfoHis?.currentValue) {
      const patientInfoHis = changes.patientInfoHis.currentValue as HisPatientInfo;

      // Load dữ liệu mặc định
      if (patientInfoHis.sex === SexEnum.Female) {
        this.initOrKeepValues(this.benhAnIui, [
          {
            key: 'ho_ten_vo',
            defaultValueFactory: () => patientInfoHis.patient_fullname,
          },
          {
            key: 'birthday_vo',
            defaultValueFactory: () => patientInfoHis.birthday ? moment.unix(patientInfoHis.birthday) : '',
          },
          {
            key: 'job_vo',
            defaultValueFactory: () => patientInfoHis.position_name,
          },
          {
            key: 'address',
            defaultValueFactory: () => patientInfoHis.address1,
          },
          {
            key: 'phone_vo',
            defaultValueFactory: () => patientInfoHis.phone_number,
          },
        ]);

        // const biographyServiceIDs = this.localStorageService.getVariableGlobal<string>()['IVF_SERVICE_ID_KTSBD']?.value.split(',').map(biographyServiceID => Number(biographyServiceID));
        //
        // Lấy thông tin chồng
        this.receptionService.getFamiliesOfPatient(patientInfoHis.patient_id)
          .subscribe(res => {
            if (res.status) {
              const husband = res.results[0];

              if (!husband) {
                return;
              }

              this.initOrKeepValues(this.benhAnIui, [
                {
                  key: 'ho_ten_chong',
                  defaultValueFactory: () => husband.fullname,
                },
                {
                  key: 'birthday_chong',
                  defaultValueFactory: () => husband.birthday ? moment.unix(husband.birthday) : '',
                },
                {
                  key: 'job_chong',
                  defaultValueFactory: () => JSON.parse(husband.note).position_name,
                },
                {
                  key: 'trinh_do_chong',
                  defaultValueFactory: () => JSON.parse(husband.note).TrinhDo,
                },
                {
                  key: 'phone_chong',
                  defaultValueFactory: () => husband.phone_number,
                },
              ]);

              // TODO: Lấy tinh dịch đồ mới nhất của chồng (cần test bằng truy cập ext_domain từ localhost)
              // this.spermService.getSperm({
              //   id: husband.patient_id,
              //   donation: false
              // }).subscribe((resSperm) => {
              //   console.log('>>>', resSperm);
              // });
            }
          });
      }
      // TODO: Không lấy dữ liệu mặc định nếu là bệnh nhân nam?
    }
  }

  onDate(event: any, title: string): void {
    if (title === 'NGAY_SINH') {
      // this.patientHanhChinh.NGAY_SINH = moment(event).format("DD/MM/YYYY");
      // this.patientHanhChinh.DO_TUOI = moment().diff(event, 'years');
    }

  }
}
