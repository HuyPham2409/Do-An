import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { HoiBenh } from '../../../../model/emr/hoi_benh';
import { ShareDataService } from '../../../../services/share-data.service';
import { EmrService } from '../../../../services/emr.service';
import { DM, Patient_EMR } from '../../../../model/Patient_EMR';
import { TS_SK_Lan } from '../../../../model/emr/san_khoa';
import { BenhAnComponent } from '../../benh-an-emr/benh-an.component';
import { EmrPatientInfo } from '../../../../model/emr/patient/patient-info';
import * as moment from 'moment';
import { Query } from '../../../../model/api/query';
import { EMPTY } from 'rxjs';
import { EhosResponse } from '../../../../model/api/response';
import { ServiceService } from '../../../../services/service.service';
import { GetServiceUsedResponseResults } from '../../../../model/service/response';
import { NNDU } from 'app/model/emr/qt_benh_ly';

@Component({
  selector: 'app-hoi-benh',
  templateUrl: './hoi-benh.component.html',
  styleUrls: ['./hoi-benh.component.scss']
})

export class HoiBenhComponent extends BenhAnComponent implements OnInit {
  @Input() formType: any;
  @Input() patientInfo: any;
  @Input() thongTinKhamBenh: any;
  @Input() isCreatingNew: any;
  showField: any;
  hoiBenh: HoiBenh = new HoiBenh()
  patientHanhChinh: Patient_EMR = new Patient_EMR();

  thoiDiemDauBung = [
    {
      ID: "1",
      MA: "01",
      MO_TA: "1. Trước"
    },
    {
      ID: "2",
      MA: "02",
      MO_TA: "2. Trong"
    },
    {
      ID: "3",
      MA: "03",
      MO_TA: "3. Sau"
    }
  ];
  listNguyenNhan = [
    {
      ID: "1",
      MA: "01",
      MO_TA: "Bẩm sinh"
    },
    {
      ID: "2",
      MA: "02",
      MO_TA: "Mắc phải"
    }
  ];
  listKetQua = [
    {
      ID: "1",
      MA: "01",
      MO_TA: "Tốt"
    },
    {
      ID: "2",
      MA: "02",
      MO_TA: "Trung bình"
    },
    {
      ID: "3",
      MA: "03",
      MO_TA: "Kém"
    }
  ];
  listKetQua2 = [
    {
      ID: "1",
      MA: "01",
      MO_TA: "Tốt"
    },
    {
      ID: "2",
      MA: "02",
      MO_TA: "Mổ non"
    },
    {
      ID: "3",
      MA: "03",
      MO_TA: "Mổ già"
    }

  ];
  listTienSuBanThan = [
    {
      ID: "1",
      MA: "01",
      MO_TA: "Bình thường"
    },
    {
      ID: "2",
      MA: "02",
      MO_TA: "Bệnh lý"
    }
  ];
  listTienSuGiaDinh = [
    {
      ID: "1",
      MA: "01",
      MO_TA: "Không"
    },
    {
      ID: "2",
      MA: "02",
      MO_TA: "Có"
    }
  ];
  listTenXetNghiem = [
    {
      'TEN': 'FSH',
      'SO_LUONG': 0,
      'DON_VI': 'IU/l',
    },
    {
      'TEN': 'LH',
      'SO_LUONG': 0,
      'DON_VI': 'IU/l',

    },
    {
      'TEN': 'Prolactine',
      'SO_LUONG': 0,
      'DON_VI': 'mIU/l',
    },
    {
      'TEN': 'HCG-BETA',
      'SO_LUONG': 0,
      'DON_VI': 'IU/l',
    },
    {
      'TEN': 'Testosterone',
      'SO_LUONG': 0,
      'DON_VI': 'nmol/l',
    },
    {
      'TEN': 'Estradiol',
      'SO_LUONG': 0,
      'DON_VI': 'pg/ml',
    },
    {
      'TEN': 'Progesterol',
      'SO_LUONG': 0,
      'DON_VI': 'nmol/l',
    },
    {
      'TEN': 'AMH',
      'SO_LUONG': 0,
      'DON_VI': 'ng/ml',
    }
  ];
  /**
   * TODO: Dùng tên bệnh án thay vì ID bệnh án
   */
  private readonly componentName = 'hoi_benh';

  //#region Bệnh án nhi khoa
  list_PHUONG_PHAP_DE: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: '1. Đẻ thường',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: '2. Forceps',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: '3. Giác hút',
    },
    {
      ID: '4',
      MA: '4',
      MO_TA: '4. PT',
    },
    {
      ID: '5',
      MA: '5',
      MO_TA: '5. Đẻ chỉ huy',
    },
    {
      ID: '6',
      MA: '6',
      MO_TA: '6. Khác',
    },
  ];
  list_NUOI_DUONG: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: '1. Sữa mẹ',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: '2. Nuôi nhân tạo',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: '3. Hỗn hợp',
    },
  ];
  list_HINH_THUC_CHAM_SOC_LUC_NHO: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: '1. Tại vườn trẻ',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: '2. Tại nhà',
    },
  ];
  //#endregion

  //#region Tiền sử sản khoa
  newTienSuSanKhoa = new TS_SK_Lan();
  listTssk: TS_SK_Lan[] = [];
  @ViewChild('newTsskYear') newTsskYear!: ElementRef;
  //#endregion

  resetDM = new DM();

  constructor(private shareDataService: ShareDataService,
              private serviceService : ServiceService,
              private emrService: EmrService) {
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
    // this.getPatientResult();
  }

  reset(title: string) {
    if (title === "LIST_NGUYEN_NHAN") {
      if (this.hoiBenh.BENH_AN_MAT.LIST_NGUYEN_NHAN.ID === "1") {
        this.hoiBenh.BENH_AN_MAT.TU_BAO_GIO = "";
      }
    }
    if (title === "TRIEU_CHUNG_CHINH_KHAC") {
      if (!this.hoiBenh.BENH_AN_MAT.KHAC) {
        this.hoiBenh.BENH_AN_MAT.TRIEU_CHUNG_CHINH_KHAC = "";
      }
    }
    if (title === "LIST_KET_QUA_2") {
      if (this.hoiBenh.BENH_AN_MAT.LIST_KET_QUA_2.ID === "1") {
        this.hoiBenh.BENH_AN_MAT.MO_NON = "";
      }
    }
    if (title === "LIST_KET_QUA_2") {
      if (this.hoiBenh.BENH_AN_MAT.LIST_KET_QUA_2.ID === "1") {
        this.hoiBenh.BENH_AN_MAT.MO_GIA = "";
      }
    }
    if (title === "LIST_KET_QUA_2") {
      if (this.hoiBenh.BENH_AN_MAT.LIST_KET_QUA_2.ID === "2") {
        this.hoiBenh.BENH_AN_MAT.MO_GIA = "";
      }
    }
    if (title === "LIST_KET_QUA_2") {
      if (this.hoiBenh.BENH_AN_MAT.LIST_KET_QUA_2.ID === "3") {
        this.hoiBenh.BENH_AN_MAT.MO_NON = "";
      }
    }
    if (title === "TIEN_SU_BAN_THAN") {
      if (this.hoiBenh.BENH_AN_MAT.TIEN_SU_BAN_THAN.ID === "1") {
        this.hoiBenh.BENH_AN_MAT.BENH_LY = "";
      }
    }
    if (title === "TIEN_SU_GIA_DINH") {
      if (this.hoiBenh.BENH_AN_MAT.TIEN_SU_GIA_DINH.ID === "1") {
        this.hoiBenh.BENH_AN_MAT.TEXT_TIEN_SU_GIA_DINH = "";
      }
    }
    if (title === "GIAT_MINH") {
      if (!this.hoiBenh.BENH_AN_CHAN_TAY_MIENG.GIAT_MINH) {
        this.hoiBenh.BENH_AN_CHAN_TAY_MIENG.SO_LAN = 0;
      }
    }
    if (title === "DI_HOC") {
      if (!this.hoiBenh.BENH_AN_CHAN_TAY_MIENG.DI_HOC) {
        this.hoiBenh.BENH_AN_CHAN_TAY_MIENG.DIA_CHI_TRUONG = "";
      }
    }
    if (title === "DI_TAT_BAM_SINH") {
      if (!this.hoiBenh.QUA_TRINH_SINH_TRUONG_TRE_EM.DI_TAT_BAM_SINH) {
        this.hoiBenh.QUA_TRINH_SINH_TRUONG_TRE_EM.MO_TA_DI_TAT_BAM_SINH = "";
      }
    }
  }

  handleLinkKhamBenhData () {
    if(this.thongTinKhamBenh.tien_su_benh) {
      const splitTienSu = this.thongTinKhamBenh.tien_su_benh.split('\n')
      this.hoiBenh.TIEN_SU_BENH.TIEN_SU_BAN_THAN = splitTienSu[0]
      this.hoiBenh.TIEN_SU_BENH.TIEN_SU_GIA_DINH = splitTienSu[1]
    }
    if(this.thongTinKhamBenh.benh_su) {
      this.hoiBenh.QUA_TRINH_BENH_LY.QUA_TRINH_BENH_LY = this.thongTinKhamBenh.benh_su
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    // Link thông tin bệnh sử và tiền sử bản thân từ thông tin phiếu khám bệnh
    if(changes.thongTinKhamBenh && this.isCreatingNew === true) {
      if(this.thongTinKhamBenh) {
        this.handleLinkKhamBenhData()
      }
    }
    if (this.patientInfo.results && this.patientInfo.results.hb && this.patientInfo.idEMR) {
      this.hoiBenh = this.patientInfo.results.hb;
      if(!this.patientInfo.results.hb.TIEN_SU_BENH.NGUYEN_NHAN_DI_UNG) {
        this.hoiBenh.TIEN_SU_BENH.NGUYEN_NHAN_DI_UNG = new NNDU()
      }
    }
    if (this.patientInfo.in_patient != 1 && !this.patientInfo.idEMR && this.hoibenhNgoaiTru) {
      this.hoiBenh = this.hoibenhNgoaiTru
    }

    if (changes.patientInfo?.currentValue) {
      const patientInfo = changes.patientInfo.currentValue as EmrPatientInfo;

      // Backwards compatibility
      if (Array.isArray(patientInfo.results?.hb.TIEN_SU_SAN_KHOA?.LIST_LICH_SU_THAI_SAN)) {
        this.listTssk = [...(patientInfo.results?.hb.TIEN_SU_SAN_KHOA.LIST_LICH_SU_THAI_SAN || [])];
      }

      if (patientInfo.results?.hb.BENH_AN_MAT) {
        // Load dữ liệu đã lưu
        this.hoiBenh.BENH_AN_MAT = patientInfo.results?.hb.BENH_AN_MAT;
      }

      if (patientInfo.results?.hb.BENH_AN_IUI) {

        this.hoiBenh.BENH_AN_IUI = patientInfo.results?.hb.BENH_AN_IUI;

        if (Array.isArray(this.hoiBenh.BENH_AN_IUI.XET_NGHIEM)) {
          this.listTenXetNghiem = [...this.hoiBenh.BENH_AN_IUI.XET_NGHIEM];
        }
      }
    }

    if (this.hoiBenh.BENH_AN_IUI?.XET_NGHIEM) {
      this.hoiBenh.BENH_AN_IUI.XET_NGHIEM = this.listTenXetNghiem;
    }
    this.hoiBenh.TIEN_SU_SAN_KHOA.LIST_LICH_SU_THAI_SAN = this.listTssk;

    this.shareDataService.pushData(this.hoiBenh, "hb");
  }

  addTienSuSinhSan() {
    // this.listTssk.push({...this.newTienSuSanKhoa});
    this.listTssk.push(new TS_SK_Lan());
    // this.newTsskYear.nativeElement.focus();
    // this.newTienSuSanKhoa = {
    //   ...new TS_SK_Lan(),
    //   SO_LAN: this.newTienSuSanKhoa.SO_LAN + 1
    // };
  }

  deleteTienSuSinhSan(index: number) {
    this.listTssk.splice(index, 1);
  }

  displayDMICD(value: DM): string {
    return value && value.MO_TA ? value.MA + " - " + value.MO_TA : '';
  }

  // resetCacDacDiemLienQuan(checked: boolean, key: String) {
  //   switch (key) {
  //     case 'TIEN_SU_DI_UNG':
  //       checked == true
  //         ? this.hoiBenh.TIEN_SU_BENH.TIEN_SU_DI_UNG = this.hoiBenh.TIEN_SU_BENH.TIEN_SU_DI_UNG
  //         : this.hoiBenh.TIEN_SU_BENH.TIEN_SU_DI_UNG = '';
  //       break;
  //     case 'THUOC_LA':
  //       checked == true
  //         ? this.hoiBenh.TIEN_SU_BENH.DAC_DIEM_LIEN_QUAN_BENH.LICH_SU_HUT_THUOC_LA = this.hoiBenh.TIEN_SU_BENH.DAC_DIEM_LIEN_QUAN_BENH.LICH_SU_HUT_THUOC_LA
  //         : this.hoiBenh.TIEN_SU_BENH.DAC_DIEM_LIEN_QUAN_BENH.LICH_SU_HUT_THUOC_LA = '';
  //       break;
  //     case 'THUOC_LAO':
  //       checked == true
  //         ? this.hoiBenh.TIEN_SU_BENH.DAC_DIEM_LIEN_QUAN_BENH.LICH_SU_HUT_THUOC_LAO = this.hoiBenh.TIEN_SU_BENH.DAC_DIEM_LIEN_QUAN_BENH.LICH_SU_HUT_THUOC_LAO
  //         : this.hoiBenh.TIEN_SU_BENH.DAC_DIEM_LIEN_QUAN_BENH.LICH_SU_HUT_THUOC_LAO = '';
  //       break;
  //     case 'MA_TUY':
  //       checked == true
  //         ? this.hoiBenh.TIEN_SU_BENH.DAC_DIEM_LIEN_QUAN_BENH.LICH_SU_SU_DUNG_MA_TUY = this.hoiBenh.TIEN_SU_BENH.DAC_DIEM_LIEN_QUAN_BENH.LICH_SU_SU_DUNG_MA_TUY
  //         : this.hoiBenh.TIEN_SU_BENH.DAC_DIEM_LIEN_QUAN_BENH.LICH_SU_SU_DUNG_MA_TUY = '';
  //       break;
  //     case 'RUOU_BIA':
  //       checked == true
  //         ? this.hoiBenh.TIEN_SU_BENH.DAC_DIEM_LIEN_QUAN_BENH.LICH_SU_SU_DUNG_RUOU_BIA = this.hoiBenh.TIEN_SU_BENH.DAC_DIEM_LIEN_QUAN_BENH.LICH_SU_SU_DUNG_RUOU_BIA
  //         : this.hoiBenh.TIEN_SU_BENH.DAC_DIEM_LIEN_QUAN_BENH.LICH_SU_SU_DUNG_RUOU_BIA = '';
  //       break;
  //     case 'KHAC':
  //       checked == true
  //         ? this.hoiBenh.TIEN_SU_BENH.DAC_DIEM_LIEN_QUAN_BENH.DAC_DIEM_XH_KHAC = this.hoiBenh.TIEN_SU_BENH.DAC_DIEM_LIEN_QUAN_BENH.DAC_DIEM_XH_KHAC
  //         : this.hoiBenh.TIEN_SU_BENH.DAC_DIEM_LIEN_QUAN_BENH.DAC_DIEM_XH_KHAC = '';
  //   }
  // }

  //   getPatientResult(): void { //Link kết quả từ màn hình khám bệnh sang EMR
  //     this.serviceService.getServiceUsed<GetServiceUsedResponseResults<
  //     '_id', 'service_category_parent_id', 'service_category_id'>>(
  //       this.patientInfo.patient_id,
  //       this.patientInfo.used_at,
  //     {$in: [0,1]},
  //     [
  //       {service_category_id: {$in: [6]}},
  //       {service_category_parent_id: {$in: [6]}},
  //     ],
  //     {
  //       key_level_1: 'reception_queue_id',
  //       key_level_2: 'used_at',
  //       key_level_3: 'service_category_id',
  //     },
  //     undefined,
  //     this.patientInfo.medical_record_no,
  //     {
  //       service_category_id: '$service_category_id',
  //       results: '$results'
  //     }
  //   ).subscribe((res)=>{
  //     if (!res.status) {
  //       return;
  //     }
  //     //Lấy thông tin phiếu khám bệnh gần nhất là data[]
  //     let data: any = {};
  //     var length = res.results[0].data[0].exams[0].services.length;
  //     data = res.results[0].data[0].exams[0].services[length - 1].services
  //     this.hoiBenh.QUA_TRINH_BENH_LY.QUA_TRINH_BENH_LY  = data.results.benh_su;
  //   })
  // }


}

