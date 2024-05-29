import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { TTRV } from '../../../../model/emr/tong_ket_benh_an';
import * as moment from 'moment';
import { CD_Tuvong } from '../../../../model/emr/chan_doan';
import { DM } from '../../../../model/Patient_EMR';
import { ExaminationService } from '../../../../services/examination.service';
import { ReceptionService } from '../../../../services/reception.service';
import { ShareDataService } from '../../../../services/share-data.service';
import { ShowFieldByComponentConfig } from '../../../../model/emr/config/show-field-by-component-config';
import { EmrService } from '../../../../services/emr.service';
import {DateTime} from '../../../../model/emr/global';

@Component({
  selector: 'app-tinh-trang-ra-vien',
  templateUrl: './tinh-trang-ra-vien.component.html',
  styleUrls: ['./tinh-trang-ra-vien.component.scss'],
})
export class TinhTrangRaVienComponent implements OnInit {
  @Input() patientInfo: any;
  @Input() patientOutData: any;
  @Input() ID_BENH_AN!: number;

  /**
   * TODO: Dùng tên bệnh án thay vì ID bệnh án
   */
  @Input() tenBenhAn = '';
  private readonly componentName = 'tinh_trang_ra_vien';

  showField: ShowFieldByComponentConfig = {};

  constructor(private examinationService: ExaminationService,
              private receptionService: ReceptionService,
              private shareDataService: ShareDataService,
              private emrService: EmrService) {
  }

  tinh_trang_rv: TTRV = new TTRV();
  chan_doan_tu_vong: CD_Tuvong = new CD_Tuvong();

  filteredICDs: any = [];
  resetDM: DM = new DM();
  listKQDT: DM[] = [];

  listGiaiPhauBenh = [
    {
      ID: '1',
      MA: '1',
      MO_TA: '1. Lành tính',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: '2. Nghi ngờ',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: '3. Ác tính',
    },
  ];

  listLyDoTuVong = [
    {
      ID: '1',
      MA: '01',
      MO_TA: '1. Do bệnh',
    },
    {
      ID: '2',
      MA: '02',
      MO_TA: '2. Do tai biến điều trị',
    },
    {
      ID: '3',
      MA: '03',
      MO_TA: '3. Khác',
    },

  ];

  listThoiGianTuVong1 = [
    {
      ID: '1',
      MA: '1',
      MO_TA: '1. Trong 24h vào viện',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: '2. Trong 48h vào viện',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: '3. Trong 72h vào viện',
    },
  ];
  listThoiGianTuVong2 = [
    {
      ID:'1',
      MA: '1',
      MO_TA: '1. Trong 24h vào viện'
    },
    {
      ID:'2',
      MA: '2',
      MO_TA: '2. Sau 24h vào viện'
    },

  ];

  ngOnInit(): void {
    /**
     * TODO: Nếu dùng name thì không dùng ID_BENH_AN
     */
    if (this.tenBenhAn) {
      this.emrService.getShowFieldComponentByConfig_new(this.componentName, this.tenBenhAn).then((dataReturn: any) => this.showField = dataReturn);
    } else {
      this.emrService.getShowFieldComponentByConfig(this.componentName, this.ID_BENH_AN.toString()).then((dataReturn: any) => this.showField = dataReturn);
    }
    if (this.patientInfo.idEMR && this.patientInfo.results && this.patientInfo.results.tinh_trang_ra_vien) {
      this.tinh_trang_rv = this.patientInfo.results.tinh_trang_ra_vien;
    }
    if (this.patientInfo.idEMR && this.patientInfo.results && this.patientInfo.results.chan_doan.CHAN_DOAN_TU_VONG) {
      this.chan_doan_tu_vong = this.patientInfo.results.chan_doan.CHAN_DOAN_TU_VONG;
    }
    // if(this.patientInfo.results && this.patientInfo.results.tinh_trang_ra_vien){
    //   this.tinh_trang_rv = this.patientInfo.results.tinh_trang_ra_vien;
    // }
    // // this.tinh_trang_rv.KET_QUA_DIEU_TRI = this.listKQDT[0];
    // this.shareDataService.pushData(this.tinh_trang_rv, "tinh_trang_ra_vien");
    // this.shareDataService.pushData(this.chan_doan_tu_vong, "chan_doan_tu_vong");
    // console.log(this.shareDataService.pushData);

    // Radio
    switch (this.tenBenhAn) {
      case 'EMR_BENH_AN_SAN_KHOA': {
        this.listKQDT = [
          {
            ID: '1',
            MA: '1',
            MO_TA: '1. Khỏi',
          },
          {
            ID: '2',
            MA: '2',
            MO_TA: '2. Đỡ, giảm',
          },
          {
            ID: '3',
            MA: '3',
            MO_TA: '3. Không thay đổi',
          },
          {
            ID: '4',
            MA: '4',
            MO_TA: '4. Nặng hơn',
          },
          {
            ID: '5',
            MA: '5',
            MO_TA: '5. Chuyển viện',
          },
          {
            ID: '6',
            MA: '6',
            MO_TA: '6. Tử vong',
          },
        ];
        break;
      }
      default: {
        this.listKQDT = [
          {
            ID: '1',
            MA: '1',
            MO_TA: '1. Khỏi',
          },
          {
            ID: '2',
            MA: '2',
            MO_TA: '2. Đỡ, giảm',
          },
          {
            ID: '3',
            MA: '3',
            MO_TA: '3. Không thay đổi',
          },
          {
            ID: '4',
            MA: '4',
            MO_TA: '4. Nặng hơn',
          },
          {
            ID: '5',
            MA: '5',
            MO_TA: '5. Tử vong',
          },
        ];
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    // console.log(changes.patientInfo.currentValue.results);
    // console.log(this.patientInfo.results)
    if (this.patientInfo.idEMR && this.patientInfo.results && this.patientInfo.results.tinh_trang_ra_vien) {
      this.tinh_trang_rv = this.patientInfo.results.tinh_trang_ra_vien;
    }
    if (this.patientInfo.idEMR && this.patientInfo.results && this.patientInfo.results.chan_doan.CHAN_DOAN_TU_VONG) {
      this.chan_doan_tu_vong = this.patientInfo.results.chan_doan.CHAN_DOAN_TU_VONG;
    }

    this.shareDataService.pushData(this.tinh_trang_rv, 'tinh_trang_ra_vien');
    this.shareDataService.pushData(this.chan_doan_tu_vong, 'chan_doan_tu_vong');

    // if (changes['patientOutData'] && this.patientOutData) {
    //   if (this.patientOutData.exam_done_state  && this.patientOutData.exam_done_state.states) {
    //     const key = (this.patientOutData.exam_done_state.states.result == "5" || this.patientOutData.exam_done_state.states.result == "6")
    //       ? 4 : parseInt(this.patientOutData.exam_done_state.states.result) - 1;
    //     console.log(key);
    //     this.tinh_trang_rv.KET_QUA_DIEU_TRI = this.listKQDT[key];
    //     console.log(this.tinh_trang_rv.KET_QUA_DIEU_TRI);
    //
    //     if (this.patientOutData.exam_done_state.states.exam_done_state_cause) {
    //       const keyTV = parseInt(this.patientOutData.exam_done_state.states.exam_done_state_cause) - 1;
    //       this.tinh_trang_rv.LOAI_NGUYEN_NHAN_TU_VONG = this.listLyDoTuVong[keyTV];
    //     }
    //
    //     if (this.patientOutData.exam_done_state.states.exam_done_state_time) {
    //
    //       this.tinh_trang_rv.KHOANG_THOI_GIAN_TU_VONG = moment.unix(this.patientOutData.exam_done_state.states.exam_done_state_time).toISOString();
    //     }
    //
    //     if (this.patientOutData.exam_done_state.exam_done_state_gp) {
    //       const keyGP = parseInt(this.patientOutData.exam_done_state.exam_done_state_gp) - 1;
    //       this.tinh_trang_rv.KET_QUA_GIAI_PHAU_BENH = this.listGiaiPhauBenh[keyGP];
    //     }
    //
    //     let benhChinh = new DM();
    //     let benhPhu = new DM();
    //
    //     if (this.patientOutData.exam_done_state.states.exam_done_state_service_icd_chinh) {
    //       benhChinh.ID = this.patientOutData.exam_done_state.states.exam_done_state_service_icd_chinh.service_icd_id;
    //       benhChinh.MA = this.patientOutData.exam_done_state.states.exam_done_state_service_icd_chinh.service_icd_code;
    //       benhChinh.MO_TA = this.patientOutData.exam_done_state.states.exam_done_state_service_icd_chinh.service_icd_name;
    //     }
    //     this.chan_doan_tu_vong.CHAN_DOAN_NGUYEN_NHAN_TU_VONG = benhChinh;
    //
    //     if (this.patientOutData.exam_done_state.states.exam_done_state_service_icd_phu) {
    //       benhPhu.ID = this.patientOutData.exam_done_state.states.exam_done_state_service_icd_phu.service_icd_id;
    //       benhPhu.MA = this.patientOutData.exam_done_state.states.exam_done_state_service_icd_phu.service_icd_code;
    //       benhPhu.MO_TA = this.patientOutData.exam_done_state.states.exam_done_state_service_icd_phu.service_icd_name;
    //     }
    //
    //     this.chan_doan_tu_vong.CHAN_DOAN_GIAI_PHAU_TU_THI = benhPhu;
    //
    //     this.shareDataService.pushData(this.tinh_trang_rv, "tinh_trang_ra_vien");
    //     this.shareDataService.pushData(this.chan_doan_tu_vong, "chan_doan_tu_vong");
    //   }
    // }
  }

  onDate(event: any, title: string): void {
    if (title === 'ngay_gio_tu_vong') {
      this.tinh_trang_rv.NGAY_GIO_TU_VONG.DATE = moment(event).format('DD/MM/YYYY');
      this.tinh_trang_rv.NGAY_GIO_TU_VONG.TIME = moment(event).format('HH:mm');
    }
  }

  displayDMICD(value: any): string {
    return value && value.MO_TA ? value.MA + ' - ' + value.MO_TA : '';
  }

  filterICD(textSearch: any) {
    this.examinationService.filterICD(textSearch).subscribe(dataReturn => {
      if (dataReturn.status === true) {
        this.filteredICDs = this.receptionService.convertDM('service', dataReturn.results);
      }
    });
  }
  reset(title: string) {
    if (title === "TINH_HINH_TU_VONG"){
      if(this.tinh_trang_rv.KET_QUA_DIEU_TRI.ID === '5'){
        this.tinh_trang_rv.ngay_gio_tu_vong = null;
        this.tinh_trang_rv.NGAY_GIO_TU_VONG = new DateTime();
        this.tinh_trang_rv.LOAI_NGUYEN_NHAN_TU_VONG = new DM();
        this.tinh_trang_rv.KHOANG_THOI_GIAN_TU_VONG = new DM();
        this.chan_doan_tu_vong.CHAN_DOAN_NGUYEN_NHAN_TU_VONG = new DM();
        this.tinh_trang_rv.KHAM_NGHIEM = false;
        this.tinh_trang_rv.KHAM_NGHIEM_TU_THI = '';
        this.chan_doan_tu_vong.CHAN_DOAN_GIAI_PHAU_TU_THI = new DM();
      }
    }
  }
}
