import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LyDo } from '../../../../model/emr/benh_an';
import { ShareDataService } from '../../../../services/share-data.service';
import { EmrService } from '../../../../services/emr.service';
import { DB } from '../../../../model/emr/benh_an_san_phu_khoa';
import * as moment from 'moment';
import { AssignmentService } from 'app/services/assignment.service';
import { ServiceService } from 'app/services/service.service';
import { GetServiceUsedResponseResults } from 'app/model/service/response';

@Component({
  selector: 'app-ly-do-vao-vien',
  templateUrl: './ly-do-vao-vien.component.html',
  styleUrls: ['./ly-do-vao-vien.component.scss']
})
export class LyDoVaoVienComponent implements OnInit, OnChanges {
  ldvv: LyDo = new LyDo();
  @Input() ID_BENH_AN: any;
  @Input() lyDoVaoVienNgoaiTru: any;
  showField: any;
  @Input() patientInfo: any;
  @Input() thongTinKhamBenh: any
  @Input() isCreatingNew: any;

  /**
   * TODO: Dùng tên bệnh án thay vì ID bệnh án
   */
  @Input() tenBenhAn = '';

  @Input() counter_benhAn = 'A - ';

  listTrieuChung = [
    {
      ID: "1",
      MA: "01",
      MO_TA: "Nhìn mờ"
    },
    {
      ID: "2",
      MA: "02",
      MO_TA: "Đau nhức"
    },
    {
      ID: "3",
      MA: "03",
      MO_TA: "Đỏ mắt"
    },
    {
      ID: "4",
      MA: "04",
      MO_TA: "Chói mắt"
    }
  ];

  private readonly componentName = 'ly_do_vao_vien';

  constructor(private shareDataService: ShareDataService,
              private serviceService: ServiceService,
              private emrService: EmrService

  ) { }


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
    if(changes.thongTinKhamBenh && this.thongTinKhamBenh && this.isCreatingNew === true) {
      this.ldvv.LY_DO_VAO_VIEN = this.thongTinKhamBenh.ly_do_vao_vien
    }
    if(this.patientInfo.results && this.patientInfo.results.ldvv){
      this.ldvv = this.patientInfo.results.ldvv;
    }
    if(this.patientInfo.in_patient !== 1 && !this.patientInfo.idEMR){
      this.ldvv = this.lyDoVaoVienNgoaiTru;
    }
    this.shareDataService.pushData(this.ldvv, "ldvv");
  }
  onDate(event: any, title: string): void{
    if(title === "THOI_GIAN_MAC_BENH"){
      this.ldvv.THOI_GIAN_MAC_BENH = moment(event).format("DD/MM/YYYY");
    }
  }
  reset( title: string){
    if (title === "MAC_PHAI") {
      if(this.ldvv.NGUYEN_NHAN_VV === 1){
        this.ldvv.THOI_GIAN_MAC_BENH = "";
      }
    }
    if (title === "PHAU_THUAT") {
      if(this.ldvv.CHECK_BOX_PHAU_THUAT === true){
        this.ldvv.TEN_PHAU_THUAT = "";
      }
    }
  }
}
