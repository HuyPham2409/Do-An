import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { BenhAnComponent } from '../benh-an.component';
import { EmrService } from '../../../../services/emr.service';
import { ServiceService } from 'app/services/service.service';
import { GetServiceUsedResponseResults } from 'app/model/service/response';
import { ReceptionService } from 'app/services/reception.service';

@Component({
  selector: 'app-benh-an-noi-khoa',
  templateUrl: './benh-an-noi-khoa.component.html',
  styleUrls: ['./benh-an-noi-khoa.component.scss']
})
export class BenhAnNoiKhoaComponent extends BenhAnComponent implements OnInit, OnChanges {
  @Input() hoibenhNgoaiTru: any;
  @Input() inputHoiBenhInfo: any;
  @Input() isCreatingNew: any;
  @Input() benhAnSelect: any

  isBenhAnNoiKhoa: boolean = true;
  thongTinKhamBenh: any
  thongTinChanDoan: any

  patientOutData: any;
  constructor(private emrService: EmrService, private serviceService: ServiceService, private receptionService: ReceptionService) {
    super();
  }

  ngOnInit(): void {
    this.emrService.tenBenhAn = this.tenBenhAn;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.patientInfo) {
      // Check benh nhan co benh an noi khoa hay chua
      if(!this.patientInfo.results) {
        this.isCreatingNew = true
        this.getPatientResult()
        this.getThongTinChanDoan()
      } else {
        this.isCreatingNew = false
      }
    }
  }

  getThongTinChanDoan():void {
    this.receptionService.getPatientOut(this.patientInfo.reception_queue_id).subscribe(dataReturn => {
          if (dataReturn.status === true && dataReturn.results.length > 0) {
            this.thongTinChanDoan = dataReturn.results[0]
          } else {
            this.thongTinChanDoan = {}
          }
    });
  }

  getPatientResult(): void { //Link kết quả từ màn hình khám bệnh sang EMR
    this.serviceService.getServiceUsed<GetServiceUsedResponseResults<
    '_id', 'service_category_parent_id', 'service_category_id'>>(
      this.patientInfo.patient_id,
      this.patientInfo.reception_queue_id,
    {$in: [0,1]},
    [
      {service_category_id: {$in: [6]}},
      {service_category_parent_id: {$in: [6]}},
      {form_id: {$in: [5]}}
    ],
    {
      key_level_1: '_id',
      key_level_2: 'used_at',
      key_level_3: 'service_category_id',
    },
    undefined,
    this.patientInfo.medical_record_no,
    {
      service_category_id: '$service_category_id',
      results: '$results',
      form_id: '$form_id',
    }
  ).subscribe((res: any)=>{
    if (!res.status) {
      return;
    }
    let data: any = {};
    data = res.results[0].data[0].exams[0].services[0].services
    this.thongTinKhamBenh = data.results
  })
  }
}
