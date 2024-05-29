import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PhauThuat, TongKetBenhAn } from '../../../../model/emr/tong_ket_benh_an';
import { DoctorService } from '../../../../services/doctor.service';
import { Name, TaiLieu } from '../../../../model/emr/global';
import { ShareDataService } from '../../../../services/share-data.service';
import { CanBoYTe } from '../../../../model/emr/quan_ly_nguoi_benh';
import { ServiceService } from '../../../../services/service.service';
import { DM } from '../../../../model/Patient_EMR';
import { ReceptionService } from '../../../../services/reception.service';
import { EmrService } from '../../../../services/emr.service';
import { EmrAdapterService } from '../../../../services/emr/emr-adapter.service';
import { EmrPatientInfo } from '../../../../model/emr/patient/patient-info';
import { BenhAnNaoPhaThai } from '../../../../model/emr/benh-an-nao-pha-thai';
import * as moment from 'moment';
import { Moment } from 'moment';
import { TreSS } from '../../../../model/emr/san_khoa';
import { ExaminationService } from '../../../../services/examination.service';
import { MatDialog } from '@angular/material/dialog';
import { FieldTemplateDialogComponent } from '../../../templates/field-template-dialog/field-template-dialog.component';
import { SyntheticClsComponent } from '../../components/synthetic-cls/synthetic-cls.component';

@Component({
  selector: 'app-tong-ket-benh-an',
  templateUrl: './tong-ket-benh-an.component.html',
  styleUrls: ['./tong-ket-benh-an.component.scss'],
})
export class TongKetBenhAnComponent implements OnInit, OnChanges {
  @Input() patientInfo: any;
  @Input() ketquaCLS: any;
  @Input() formType: any;
  @Input() ID_BENH_AN: any;
  @Input() thongTinKhamBenh: any;
  @Input() isCreatingNew: any;

  tongKetBenhAn!: TongKetBenhAn;
  BENH_AN_NAO_PHA_THAI: BenhAnNaoPhaThai = new BenhAnNaoPhaThai();
  newXN: any;
  canBoYTe: CanBoYTe = new CanBoYTe();
  filteredUsers: any = [];
  filteredUserCBYTs: any = [];
  listXN: any = [];
  listTDCN: any = [];
  categoryDichKetQuaXN: any = [];
  listLoaiXN: any = [];
  listCLS = [];
  resetUser: Name = new Name();
  resetCanBoYTe: CanBoYTe = new CanBoYTe();
  resetDM: DM = new DM();
  listTaiLieuDinhKem = [
    {
      'TEN': 'X - quang',
      'SO_LUONG': 0,
      TOM_TAT: '',
      NOI_DUNG: '',
    },
    {
      'TEN': 'CT Scanner',
      'SO_LUONG': 0,
      TOM_TAT: '',
      NOI_DUNG: '',
    },
    {
      'TEN': 'Siêu âm',
      'SO_LUONG': 0,
      TOM_TAT: '',
      NOI_DUNG: '',
    },
    {
      'TEN': 'Xét nghiệm',
      'SO_LUONG': 0,
      TOM_TAT: '',
      NOI_DUNG: '',
    },
  ];
  loaiDieuTri = [
    {
      ID: "1",
      MA: "01",
      MO_TA: "1. Điều trị triệt để"
    },
    {
      ID: "2",
      MA: "02",
      MO_TA: "2. Điều trị triệu chứng"
    }
  ];
  listKQDT = [
    {
      ID: "1",
      MA: "01",
      MO_TA: "1. Khỏi"
    },
    {
      ID: "2",
      MA: "02",
      MO_TA: "2. Đỡ"
    },
    {
      ID: "3",
      MA: "03",
      MO_TA: "3. Không đỡ"
    },
    {
      ID: "4",
      MA: "04",
      MO_TA: "4. Chuyển viện"
    },
    {
      ID: "5",
      MA: "05",
      MO_TA: "5. Tử vong"
    },
    {
      ID: "6",
      MA: "06",
      MO_TA: "6. Tiên lượng nặng gia đình xin về"
    }
  ];
  loaiDapUng = [
    {
      ID: "1",
      MA: "01",
      MO_TA: "1. Không đáp ứng"
    },
    {
      ID: "2",
      MA: "02",
      MO_TA: "2. Bán phần"
    },
    {
      ID: "3",
      MA: "03",
      MO_TA: "3. Hoàn toàn"
    }
  ];
  listPhuongPhapPhaThai = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Bằng Phương pháp hút chân không"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Bằng thuốc"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Nong và gắp"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4. Phương pháp khác"
    }
  ];
  listTinhTrangSauKhiPhaThai = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Tốt"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Chưa tốt"
    }
  ];
  listTaiBien = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Không"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Có"
    }
  ];
  listDiChuyen = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Ra về"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Nhập viện"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Chuyển tuyến"
    }
  ];
  listBienPhapTranhThaiSauPhaThai = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. DCTC"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Thuốc tiêm"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Thuốc uống"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4. Que cấy"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "5. Bao cao su"
    },
    {
      ID:"6",
      MA: "6",
      MO_TA: "6. Thuốc tránh thai khẩn cấp"
    },
    {
      ID:"7",
      MA: "7",
      MO_TA: "7. Biện pháp khác"
    },
    {
      ID:"8",
      MA: "8",
      MO_TA: "8. Không dùng biện pháp nào"
    }
  ];
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
  newPtHis = new PhauThuat();
  ptHisList: PhauThuat[] = [];
  showField: any;

  /**
   * TODO: Dùng tên bệnh án thay vì ID bệnh án
   */
  @Input() tenBenhAn = '';
  private readonly componentName = 'tong_ket_benh_an';

  list_GIOI_TINH: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Trai',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Gái',
    },
  ];

  list_HINH_THUC_SO_RAU: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Bóc',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Sổ',
    },
  ];

  list_PHUONG_PHAP_DE: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Đẻ thường',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Forceps',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Giác hút',
    },
    {
      ID: '4',
      MA: '4',
      MO_TA: 'PT',
    },
    {
      ID: '5',
      MA: '5',
      MO_TA: 'Đẻ chỉ huy',
    },
    {
      ID: '6',
      MA: '6',
      MO_TA: 'Khác',
    },
  ];

  list_TANG_SINH_MON: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Không rách',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Rách',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Cắt',
    },
  ];

  list_TINH_TRANG_CO_TU_CUNG: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Không rách',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Rách',
    },
  ];

  list_NGUYEN_NHAN_TAI_BIEN_BIEN_CHUNG: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Do PT',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Do gây mê',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Do nhiễm khuẩn',
    },
    {
      ID: '4',
      MA: '4',
      MO_TA: 'Khác',
    },
  ];

  constructor(private doctorService: DoctorService,
              private examinationService: ExaminationService,
              private shareDataService: ShareDataService,
              private serviceService: ServiceService,
              private receptionService: ReceptionService,
              private emrService: EmrService,
              private adapterService: EmrAdapterService,
              private dialog: MatDialog) {
  }
  onDate(event: any, title: string): void{
    if (title === 'luc') {
      this.tongKetBenhAn.BENH_AN_NAO_PHA_THAI.TIME.DATE = moment(event).format('DD/MM/YYYY');
      this.tongKetBenhAn.BENH_AN_NAO_PHA_THAI.TIME.TIME = moment(event).format('HH:mm');
    }
  }
  ngOnInit(): void {
    if (this.patientInfo && this.patientInfo.results && this.patientInfo.results.tong_ket_ba) {
      //todo: lấy kết quả CLS khi xem lại bệnh án
      this.tongKetBenhAn = this.patientInfo.results.tong_ket_ba;
    }

    this.shareDataService.pushData(this.canBoYTe, 'bs_dieu_tri');

    this.emrService.getDMDichKetQuaXN().subscribe(dataReturn => {
      this.categoryDichKetQuaXN = dataReturn;
    });
  }

  filterUser(query: any, isCBYT: number) {
    this.doctorService.getDoctors(query, 'query').subscribe(dataReturn => {
      if (dataReturn.status === true) {
        if (isCBYT === 1) {
          this.filteredUserCBYTs = this.doctorService.convertUserCBYT('user', dataReturn.results);
        } else {
          this.filteredUsers = this.doctorService.convertUserEMR('user', dataReturn.results);
        }
      }
    });
  }

  displayDMICD(value: any): string {
    return value && value.TEN ? value.TEN : '';
  }

  displayCBYT(value: any): string {
    return value && value.HO_TEN ? value.MA_NHAN_VIEN + ' - ' + value.HO_TEN : '';
  }

  displayDM(value: any): string {
    return value && value.MO_TA ? value.MA + ' -' + value.MO_TA : '';
  }

  changeBenhChinh(){
    this.shareDataService.pushData(this.tongKetBenhAn, "tong_ket_ba");
  }

  ngOnChanges(changes: SimpleChanges) {
    /**
     * TODO: Nếu dùng name thì không dùng ID_BENH_AN
     */
    if (this.tenBenhAn) {
      this.emrService.getShowFieldComponentByConfig_new(this.componentName, this.tenBenhAn).then((dataReturn: any) => this.showField = dataReturn);
    } else {
      this.emrService.getShowFieldComponentByConfig(this.componentName, this.ID_BENH_AN.toString()).then((dataReturn: any) => this.showField = dataReturn);
    }
    if (this.patientInfo && !this.patientInfo.idEMR) {
      //todo: lấy kết quả CLS từ api GEH khi tạo mới
      console.log("test " + this.ketquaCLS)
      this.tongKetBenhAn = this.ketquaCLS;
    }
    if (!this.tongKetBenhAn) {
      this.tongKetBenhAn = new TongKetBenhAn();
    }

    if (changes.patientInfo?.currentValue) {
      const patientInfo = changes.patientInfo.currentValue as EmrPatientInfo;

      if (patientInfo.results?.tong_ket_ba) {
        // Load dữ liệu đã lưu
        this.tongKetBenhAn = patientInfo.results?.tong_ket_ba;

        this.ptHisList = this.tongKetBenhAn.LICH_SU_PHAU_THUAT.map((item) => {
          return {
            time: moment(`${item.THOI_GIAN.DATE} ${item.THOI_GIAN.TIME}`, 'DD/MM/YYYY HH:mm'),
            description: item.PHUONG_PHAP_THUC_HIEN,
            surgeon: item.BAC_SI_PHAU_THUAT.TEN,
            anesthesiologist: item.BAC_SI_GAY_ME.TEN,
          };
        });

        // Backwards compatibility
        if (Array.isArray(this.tongKetBenhAn.TAI_LIEU_DINH_KEM)) {
          this.listTaiLieuDinhKem = [...this.tongKetBenhAn.TAI_LIEU_DINH_KEM];
        }
      }
    }

    if(changes.thongTinKhamBenh && this.thongTinKhamBenh && this.isCreatingNew === true) {
      let tempStr = ""
      if(this.thongTinKhamBenh.ly_do_vao_vien) {
        tempStr += this.thongTinKhamBenh.ly_do_vao_vien + "\n"
      }
      if(this.thongTinKhamBenh.benh_su) {
        tempStr += this.thongTinKhamBenh.benh_su + "\n";
      }
      if(this.thongTinKhamBenh.thongTinKhamBenh.tien_su_benh) {
        tempStr += this.thongTinKhamBenh.tien_su_benh
      }
      this.tongKetBenhAn.DIEN_BIEN_LAM_SANG = tempStr
    }

    this.tongKetBenhAn.TAI_LIEU_DINH_KEM = this.listTaiLieuDinhKem;

    this.shareDataService.pushData(this.tongKetBenhAn, 'tong_ket_ba');
  }

  private static convertDataToServer(data: any, key: 'time' | 'name' | 'description') {
    switch (key) {
      case 'time': {
        return {
          DATE: data ? (<Moment>data).format('DD/MM/YYYY') : '',
          TIME: data ? (<Moment>data).format('HH:mm') : '',
          TIME_ZONE: data,
        };
      }
      case 'name': {
        return {
          HO: data,
          TEN: data,
          CHUC_DANH: data,
        };
      }
      case 'description': {
        return data;
      }
    }
  }

  addPtHis() {
    this.ptHisList.push({ ...this.newPtHis });
    this.tongKetBenhAn.LICH_SU_PHAU_THUAT.push({
      THOI_GIAN: TongKetBenhAnComponent.convertDataToServer(this.newPtHis.time, 'time'),
      BAC_SI_GAY_ME: TongKetBenhAnComponent.convertDataToServer(this.newPtHis.anesthesiologist, 'name'),
      BAC_SI_PHAU_THUAT: TongKetBenhAnComponent.convertDataToServer(this.newPtHis.surgeon, 'name'),
      PHUONG_PHAP_THUC_HIEN: TongKetBenhAnComponent.convertDataToServer(this.newPtHis.description, 'description'),
    });
    this.newPtHis = new PhauThuat();
  }

  removePtHis(index: any) {
    this.ptHisList.splice(index, 1);
    this.tongKetBenhAn.LICH_SU_PHAU_THUAT.splice(index, 1);
  }

  handleChange = (data: any, key: string, index: number) => {
    switch (key) {
      case 'time': {
        this.tongKetBenhAn.LICH_SU_PHAU_THUAT[index].THOI_GIAN = TongKetBenhAnComponent.convertDataToServer(data, key);
        break;
      }
      case 'anesthesiologist': {
        this.tongKetBenhAn.LICH_SU_PHAU_THUAT[index].BAC_SI_GAY_ME = TongKetBenhAnComponent.convertDataToServer(data, 'name');
        break;
      }
      case 'surgeon': {
        this.tongKetBenhAn.LICH_SU_PHAU_THUAT[index].BAC_SI_PHAU_THUAT = TongKetBenhAnComponent.convertDataToServer(data, 'name');
        break;
      }
      case 'description': {
        this.tongKetBenhAn.LICH_SU_PHAU_THUAT[index].PHUONG_PHAP_THUC_HIEN = TongKetBenhAnComponent.convertDataToServer(data, key);
        break;
      }
    }
  };

  handleChangeFileCount() {
    this.tongKetBenhAn.TOAN_BO_HO_SO = this.listTaiLieuDinhKem.reduce<number>((total, item) => {
      return total + item.SO_LUONG;
    }, 0) + this.tongKetBenhAn.SO_HO_SO_KHAC;
  }

  //#region Bệnh án sản khoa
  addTreSoSinh() {
    if (!this.tongKetBenhAn.THEO_DOI_TAI_BUONG_DE.DAC_DIEM_TRE_SO_SINH) {
      this.tongKetBenhAn.THEO_DOI_TAI_BUONG_DE.DAC_DIEM_TRE_SO_SINH = [];
    }
    this.tongKetBenhAn.THEO_DOI_TAI_BUONG_DE.DAC_DIEM_TRE_SO_SINH.push(new TreSS());
  }

  reset_TANG_SINH_MON() {
    this.tongKetBenhAn.THEO_DOI_TAI_BUONG_DE.TINH_TRANG_SAN_PHU_SAU_DE.PHUONG_PHAP_KHAU = "";
    this.tongKetBenhAn.THEO_DOI_TAI_BUONG_DE.TINH_TRANG_SAN_PHU_SAU_DE.SO_MUI_KHAU = 0;
  }
  //#endregion
  reset(title: string) {
    if (title === "DI_CHUYEN") {
      if (this.tongKetBenhAn.BENH_AN_NAO_PHA_THAI.LIST_DI_CHUYEN.ID === "1" || this.tongKetBenhAn.BENH_AN_NAO_PHA_THAI.LIST_DI_CHUYEN.ID === "3") {
        this.tongKetBenhAn.BENH_AN_NAO_PHA_THAI.LY_DO_NHAP_VIEN = "";
      }
      if (this.tongKetBenhAn.BENH_AN_NAO_PHA_THAI.LIST_DI_CHUYEN.ID === "1" || this.tongKetBenhAn.BENH_AN_NAO_PHA_THAI.LIST_DI_CHUYEN.ID === "2") {
        this.tongKetBenhAn.BENH_AN_NAO_PHA_THAI.LY_DO_CHUYEN_TUYEN = "";
      }
    }
  }

  openSyntheticCls() {
    const dialogRef = this.dialog.open(SyntheticClsComponent, {
      panelClass: 'confirm-dialog',
      width: '60vw',
      data: {
        patient_id: this.patientInfo.patient_id,
        reception_queue_id: this.patientInfo.reception_queue_id
      }
    })
    dialogRef.afterClosed().subscribe((value)=>{
      if (value) {
        this.tongKetBenhAn.TOM_TAT_KQ_XN_CLS += value;
      }
    })
  }
}
