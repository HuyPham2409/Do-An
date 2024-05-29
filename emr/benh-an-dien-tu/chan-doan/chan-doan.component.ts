import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Chan_doan } from '../../../../model/emr/chan_doan';
import { DM } from '../../../../model/Patient_EMR';
import { ExaminationService } from '../../../../services/examination.service';
import { ReceptionService } from '../../../../services/reception.service';
import { ShareDataService } from '../../../../services/share-data.service';
import { EmrService } from '../../../../services/emr.service';
import { TreSS } from '../../../../model/emr/san_khoa';
import { benhan_YHCT_noi_tru } from '../../../../model/emr/benh-an-YHCT-noitru';
import { dienBienBenh } from '../../../../model/emr/dien_bien_benh';
import { TS_SK_Lan } from '../../../../model/emr/san_khoa';

@Component({
  selector: 'app-chan-doan',
  templateUrl: './chan-doan.component.html',
  styleUrls: ['./chan-doan.component.scss']
})
export class ChanDoanComponent implements OnInit {
  benh_an_YHCT_Noi_tru: benhan_YHCT_noi_tru[] = [];
  @Input() patientInfo: any;
  @Input() patientOutData: any;
  @Input() chanDoan: any;
  @Input() ID_BENH_AN: any;
  @Input() formType: any;
  @Input() isCreatingNew: any;
  @Input() isBenhAnNoiKhoa: any;
  @Input() thongTinChanDoan: any

  /**
   * TODO: Dùng tên bệnh án thay vì ID bệnh án
   */
  @Input() tenBenhAn = '';
  private readonly componentName = 'chan_doan';

  showField: any;
  chandoan: Chan_doan = new Chan_doan();
  filteredICDs: any = [];
  resetDM: DM = new DM();
  dataBenhAn: any;
  listTangPhu = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "1.Tâm"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "2.Can"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "3.Tỳ"
    },
    {
      ID: "4",
      MA: "4",
      MO_TA: "4.Phế"
    },
    {
      ID: "5",
      MA: "5",
      MO_TA: "5.Thận"
    },
    {
      ID: "6",
      MA: "6",
      MO_TA: "6.Tâm bào"
    },
    {
      ID: "7",
      MA: "7",
      MO_TA: "7.Vị"
    },
    {
      ID: "8",
      MA: "8",
      MO_TA: "8.Đởm"
    },
    {
      ID: "9",
      MA: "9",
      MO_TA: "9.Tiểu trường"
    },
    {
      ID: "10",
      MA: "10",
      MO_TA: "10.Đại tràng"
    },
    {
      ID: "11",
      MA: "11",
      MO_TA: "11.Bàng quang"
    },
    {
      ID: "12",
      MA: "12",
      MO_TA: "12.Tam tiêu"
    },
    {
      ID: "13",
      MA: "13",
      MO_TA: "13.Phủ kỳ hằng"
    },
  ];
  listKinhMach = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "1.Tâm"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "2.Can"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "3.Tỳ"
    },
    {
      ID: "4",
      MA: "4",
      MO_TA: "4.Phế"
    },
    {
      ID: "5",
      MA: "5",
      MO_TA: "5.Thận"
    },
    {
      ID: "6",
      MA: "6",
      MO_TA: "6.Vị"
    },
    {
      ID: "7",
      MA: "7",
      MO_TA: "7.Đại trường"
    },
    {
      ID: "8",
      MA: "8",
      MO_TA: "8.Tiểu trường"
    },
    {
      ID: "9",
      MA: "9",
      MO_TA: "9.Tâm bào lạc"
    },
    {
      ID: "10",
      MA: "10",
      MO_TA: "10.Tam tiêu"
    },
    {
      ID: "11",
      MA: "11",
      MO_TA: "11.Đởm"
    },
    {
      ID: "12",
      MA: "12",
      MO_TA: "12.Bàng quang"
    },
    {
      ID: "13",
      MA: "13",
      MO_TA: "13.Mạch đốc"
    },
    {
      ID: "14",
      MA: "14",
      MO_TA: "14.Mạch nhâm"
    }
  ];
  listBatCuong = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "1.Biểu"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "2.Lý"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "3.Hư"
    },
    {
      ID: "4",
      MA: "4",
      MO_TA: "4.Thực"
    },
    {
      ID: "5",
      MA: "5",
      MO_TA: "5.Hàn"
    },
    {
      ID: "6",
      MA: "6",
      MO_TA: "6.Nhiệt"
    },
    {
      ID: "7",
      MA: "7",
      MO_TA: "7.Âm"
    },
    {
      ID: "8",
      MA: "8",
      MO_TA: "8.Dương"
    },
  ];
  listDinhViBenhTheo = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "1. Dinh"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "2. Vệ"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "3. Khí"
    },
    {
      ID: "4",
      MA: "4",
      MO_TA: "4. Huyết"
    }
  ];
  listNguyenNhan = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "1. Nội nhân"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "2. Ngoại nhân"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "3. Bất nội ngoại nhân"
    },
  ];
  listKetQuaDieuTri = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "1.Khỏi"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "2.Đỡ"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "3.Nặng hơn"
    },
    {
      ID: "4",
      MA: "4",
      MO_TA: "4.Chuyển viện"
    },
    {
      ID: "5",
      MA: "5",
      MO_TA: "5.Tử vong"
    },
    {
      ID: "6",
      MA: "6",
      MO_TA: "6.Tiên lượng nặng gia đình xin về"
    },
  ];
  list_TINH_HINH_PHAU_THUAT: DM[] = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Cấp cứu"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Chủ động"
    },
  ];

  constructor(private examinationService: ExaminationService,
    private receptionService: ReceptionService,
    private emrService: EmrService,
    private shareDataService: ShareDataService
  ) { }
  listDO = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "1.Do phẫu thuật"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "2.Do gây mê"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "3.Do nhiễm khuẩn"
    },
    {
      ID: "4",
      MA: "4",
      MO_TA: "4.Khác"
    }
  ];

  getChanDoanNoiTru(patientOutData: any) {
    // Link Chan doan khoa kham benh - cap cuu
    if (patientOutData.examined_service_icd && patientOutData.examined_service_icd.length > 0) {
      let chan_doan_kkb_cc: DM[] = [];
      patientOutData.examined_service_icd.forEach((item: any, index: number) => {
        if(index === 0) {
          this.chandoan.CHAN_DOAN_VAO_VIEN = {
            ID: item.service_id.toString() || '',
            MA: item.service_code.toString() || '',
            MO_TA: item.service_name
          }
        }
        chan_doan_kkb_cc.push({
          ID: item.service_id.toString() || '',
          MA: item.service_code.toString() || '',
          MO_TA: item.service_name
        })
      })
      this.chandoan.CHAN_DOAN_VAO_VIEN_LIST = chan_doan_kkb_cc
      this.createChanDoanString(this.chandoan.CHAN_DOAN_VAO_VIEN_LIST , "chanDoanVaoVien")
    }
    // Link chan doan khoa dieu tri
    if (patientOutData.examining_service_icd && patientOutData.examining_service_icd.length > 0) {
      let cdkdt: DM[] = [];
      patientOutData.examining_service_icd.forEach((item: any) => {
        cdkdt.push({
          ID: item.service_id.toString() || '',
          MA: item.service_code.toString() || '',
          MO_TA: item.service_name
        })
      })
      this.chandoan.CHAN_DOAN_DIEU_TRI.CHAN_DOAN_BENH_CHINH_LIST = cdkdt
      this.createChanDoanString(this.chandoan.CHAN_DOAN_DIEU_TRI.CHAN_DOAN_BENH_CHINH_LIST, "chanDoanDieuTri")
    }

    // Link ra vien Benh chinh
    if (patientOutData.exam_done_service_icd && patientOutData.exam_done_service_icd.length > 0) {
      let benhChinh: DM = new DM()
      benhChinh.ID = patientOutData.exam_done_service_icd[0].service_id.toString() || '';
      benhChinh.MA = patientOutData.exam_done_service_icd[0].service_code.toString() || '';
      benhChinh.MO_TA = patientOutData.exam_done_service_icd[0].service_name;
      this.chandoan.CHAN_DOAN_RA_VIEN.CHAN_DOAN_BENH_CHINH = benhChinh
    }
    // Link ra vien Benh phu
    if (patientOutData.exam_done_service_icd) {
      let benhPhu: DM[] = [];
      for (let i: number = 1; i < patientOutData.exam_done_service_icd.length; i++) {
        benhPhu.push({
          ID: patientOutData.exam_done_service_icd[i].service_id.toString() || '',
          MA: patientOutData.exam_done_service_icd[i].service_code.toString() || '',
          MO_TA: patientOutData.exam_done_service_icd[i].service_name
        })
      }
      this.chandoan.CHAN_DOAN_RA_VIEN.CHAN_DOAN_BENH_PHU = benhPhu
      this.createChanDoanString(this.chandoan.CHAN_DOAN_RA_VIEN.CHAN_DOAN_BENH_PHU , "chanDoanBenhPhuRaVien")
    }

    this.chandoan.tai_bien = !!(patientOutData.extra_info &&
      patientOutData.extra_info.khi_vao_khoa_dt &&
      patientOutData.extra_info.khi_vao_khoa_dt.id == 0);
    this.chandoan.bien_chung = !!(patientOutData.extra_info && patientOutData.extra_info.khi_vao_khoa_dt && this.patientOutData.extra_info.khi_vao_khoa_dt.id == 1);
    this.chandoan.phau_thuat = !!(patientOutData.exam_done_info && patientOutData.exam_done_info.surgery)
    this.chandoan.thu_thuat = !!(patientOutData.exam_done_info && patientOutData.exam_done_info.tips);
  }

  ngOnInit() {
    /**
     * TODO: Nếu dùng name thì không dùng ID_BENH_AN
     */
    if (this.tenBenhAn) {
      this.emrService.getShowFieldComponentByConfig_new(this.componentName, this.tenBenhAn).then((dataReturn: any) => this.showField = dataReturn);
    } else {
      this.emrService.getShowFieldComponentByConfig(this.componentName, this.ID_BENH_AN.toString()).then((dataReturn: any) => this.showField = dataReturn);
    }
    if (this.patientInfo.results && this.patientInfo.results.chan_doan && this.patientInfo.idEMR) {
      this.chandoan = this.patientInfo.results.chan_doan;
    }
    this.shareDataService.pushData(this.chandoan, "chan_doan");
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.patientInfo.in_patient === 1) {
      //todo: nội trú -> lấy thông tin chẩn đoán ở gfri
      // only run when property "data" changed
      if(changes.thongTinChanDoan && this.thongTinChanDoan && this.isCreatingNew === true) {
        this.getChanDoanNoiTru(this.thongTinChanDoan)
      }
    } else {
      //todo: ngoại trú -> lấy thông tin chẩn đoán ở reception_queue_index
      if (this.patientInfo && !this.patientInfo.idEMR && this.patientInfo.in_patient != 1) {
        this.chandoan = this.chanDoan;
      }
    }

    if (this.chandoan.BENH_AN_YHCT_NOI_TRU) {
      this.chandoan.BENH_AN_YHCT_NOI_TRU.benh_an_YHCT_Noi_Tru = this.benh_an_YHCT_Noi_tru;
    }

    this.shareDataService.pushData(this.chandoan, "chan_doan");
  }

  createChanDoanString(listChanDoan: any[], type: string): void {
    switch (type) {
      case "chanDoanVaoVien":
        if (listChanDoan && listChanDoan.length > 0) {
          this.chandoan.text_khoa_kb_cc = listChanDoan.map(item => item.MO_TA).join(', ');
          this.chandoan.text_ma_icd_khoa_kb_cc = listChanDoan.map(item => item.MA).join(', ');
        }
        break;
      case "chanDoanDieuTri":
        if (listChanDoan && listChanDoan.length > 0) {
          this.chandoan.CHAN_DOAN_DIEU_TRI.text_chan_doan_kdt = listChanDoan.map(item => item.MO_TA).join(', ');
          this.chandoan.CHAN_DOAN_DIEU_TRI.text_ma_icd_chan_doan_kdt = listChanDoan.map(item => item.MA).join(', ');
        }
        break;
      case "chanDoanBenhPhuRaVien":
        if (listChanDoan && listChanDoan.length > 0) {
          this.chandoan.CHAN_DOAN_RA_VIEN.text_benh_phu = listChanDoan.map(item => item.MO_TA).join(', ');
          this.chandoan.CHAN_DOAN_RA_VIEN.text_ma_icd_benh_phu  = listChanDoan.map(item => item.MA).join(', ');
        }
        break;
      default:
        break;
    }
  }
  handleChangeListChanDoan ($event: any) {
    const {items, label} = $event
    switch (label) {
      case "Khi vào khoa điều trị":
        if(items.length > 0) {
          this.chandoan.CHAN_DOAN_DIEU_TRI.CHAN_DOAN_BENH_CHINH = new DM()
          this.chandoan.CHAN_DOAN_DIEU_TRI.CHAN_DOAN_BENH_KEM_THEO = []
          this.chandoan.CHAN_DOAN_DIEU_TRI.CHAN_DOAN_BENH_CHINH = {
            ID: items[0].service_id.toString() || '',
            MA: items[0].service_code.toString() || '',
            MO_TA: items[0].service_name
          }
          items.forEach((item: any, index: number) => {
            if(index > 0) {
              this.chandoan.CHAN_DOAN_DIEU_TRI.CHAN_DOAN_BENH_KEM_THEO.push({
                ID: item.service_id.toString() || '',
                MA: item.service_code.toString() || '',
                MO_TA: item.service_name
              })
            }
          })
        } else {
          this.chandoan.CHAN_DOAN_DIEU_TRI.CHAN_DOAN_BENH_CHINH = new DM()
          this.chandoan.CHAN_DOAN_DIEU_TRI.CHAN_DOAN_BENH_KEM_THEO = []
        }
        this.createChanDoanString(this.chandoan.CHAN_DOAN_DIEU_TRI.CHAN_DOAN_BENH_CHINH_LIST, 'chanDoanDieuTri')
        break;
      case 'Bệnh kèm theo (nếu có)':
        this.createChanDoanString(this.chandoan.CHAN_DOAN_RA_VIEN.CHAN_DOAN_BENH_PHU, 'chanDoanBenhPhuRaVien')
        break;
      case 'KKB, Cấp cứu':
        this.createChanDoanString(this.chandoan.CHAN_DOAN_VAO_VIEN_LIST, 'chanDoanVaoVien')
        break;
      default:
        break;
    }
  }

  displayDMICD(value: DM): string {
    return value && value.MO_TA ? value.MA + " - " + value.MO_TA : '';
  }
  filterICD(textSearch: any) {
    this.examinationService.filterICD(textSearch).subscribe(dataReturn => {
      if (dataReturn.status === true) {
        this.filteredICDs = this.receptionService.convertDM("service", dataReturn.results);
      }
    });
    this.changeBenhChinh()
  }
  changeBenhChinh() {
    this.shareDataService.pushData(this.chandoan, "chan_doan");
  }

  //#region Bệnh án sản khoa
  list_GIOI_TINH: DM[] = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Trai"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Gái"
    },
  ];

  list_TINH_TRANG_TRE: DM[] = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Sống"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Chết"
    },
  ];

  addTreSoSinh() {
    if (!this.chandoan.TRE_SO_SINH) {
      this.chandoan.TRE_SO_SINH = [];
    }
    this.chandoan.TRE_SO_SINH.push(new TreSS());
  }
  //#endregion
}
