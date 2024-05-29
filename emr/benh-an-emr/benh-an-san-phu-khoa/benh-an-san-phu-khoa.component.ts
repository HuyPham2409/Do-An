import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DM, Patient_EMR } from '../../../../model/Patient_EMR';
import * as moment from 'moment';
import { ReceptionService } from '../../../../services/reception.service';
import { CanBoYTe, KhoaDieuTri, QLNB } from '../../../../model/emr/quan_ly_nguoi_benh';
import { EmrService } from '../../../../services/emr.service';
import { CD_Tuvong, Chan_doan } from '../../../../model/emr/chan_doan';
import { ExaminationService } from '../../../../services/examination.service';
import { ShareDataService } from '../../../../services/share-data.service';
import { BASPK, DB } from '../../../../model/emr/benh_an_san_phu_khoa';
import { TongKetBenhAn, TTRV } from '../../../../model/emr/tong_ket_benh_an';
import { KhamBenh } from '../../../../model/emr/kham_benh';
import { DoctorService } from '../../../../services/doctor.service';
import { Name } from '../../../../model/emr/global';
import { HoiBenh } from '../../../../model/emr/hoi_benh';
import { BenhAn } from '../../../../model/emr/benh_an';
import { BenhAnComponent } from '../benh-an.component';

@Component({
  selector: 'app-benh-an-san-phu-khoa',
  templateUrl: './benh-an-san-phu-khoa.component.html',
  styleUrls: ['./benh-an-san-phu-khoa.component.scss'],
})
export class BenhAnSanPhuKhoaComponent extends BenhAnComponent {
  @Input() selectGiayToLienQuan: any;

  // @Input() tinh_trang_rv: any;
  patientHanhChinh: Patient_EMR = new Patient_EMR();
  filteredPositions: any[] = [];
  filteredEthnics: any[] = [];
  filteredCountrys: any[] = [];
  filteredTowns: any[] = [];
  resetDM: DM = new DM();
  filteredDistricts: any[] = [];
  user_logged: any;
  filteredProvinces: any[] = [];
  showField: any;
  filteredRooms: any = [];
  listNoiGioiThieu: Array<DM> = new Array<DM>();
  listNoiVaoVien: Array<DM> = new Array<DM>();
  qlnb: QLNB = new QLNB(); //quan ly nguoi benh
  resetKDT: KhoaDieuTri = new KhoaDieuTri();
  filteredHospitals: any = [];
  chandoan: Chan_doan = new Chan_doan();
  filteredICDs: any = [];
  // tienLuong : tienLuong = new  tien()
  benhAnSPK: BASPK = new BASPK();
  benhAn: BenhAn = new BenhAn();
  hoiBenh: HoiBenh = new HoiBenh();
  tinh_trang_rv: TTRV = new TTRV();
  resetDB: DB = new DB();
  chan_doan_tu_vong: CD_Tuvong = new CD_Tuvong();
  khamBenh: KhamBenh = new KhamBenh();
  tongKetBenhAn: TongKetBenhAn = new TongKetBenhAn();
  filteredUserCBYTs: any = [];
  filteredUsers: any = [];
  resetUser: Name = new Name();
  resetCanBoYTe: CanBoYTe = new CanBoYTe();

  constructor(private receptionService: ReceptionService,
              private emrService: EmrService,
              private examinationService: ExaminationService,
              private shareDataService: ShareDataService,
              private doctorService: DoctorService) {
    super();
  }

  listDO = [
    {
      ID: '1',
      MA: '1',
      MO_TA: '1.Do phẫu thuật',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: '2.Do gây mê',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: '3.Do nhiễm khuẩn',
    },
    {
      ID: '4',
      MA: '4',
      MO_TA: '4.Khác',
    },
  ];
  listKQDT = [
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
  listVaoVien = [
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
  listTaiLieuDinhKem = [
    {
      'TEN': 'X - quang',
      'SO_LUONG': 0,
    },
    {
      'TEN': 'CT Scanner',
      'SO_LUONG': 0,
    },
    {
      'TEN': 'Siêu âm',
      'SO_LUONG': 0,
    },
    {
      'TEN': 'Xét nghiệm',
      'SO_LUONG': 0,
    }, {
      'TEN': 'Khác',
      'SO_LUONG': 0,
    }, {
      'TEN': 'Toàn bộ hồ sơ',
      'SO_LUONG': 0,
    },
  ];

  ngOnInit(): void {
    this.emrService.getDMNoiGioiThieu().subscribe(data => {
      this.listNoiGioiThieu = data;
    });
    this.emrService.getDMNoiVaoVien().subscribe(data => {
      this.listNoiVaoVien = data;
    });

    this.shareDataService.pushData(this.benhAnSPK, 'baspk');

    this.emrService.tenBenhAn = this.tenBenhAn;
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes.patientInfo?.currentValue) {
    //   const patientInfo = changes.patientInfo.currentValue as EmrPatientInfo;
    //
    //   if (patientInfo.results?.baspk) {
    //     // Load dữ liệu đã lưu
    //     this.benhAnSPK = patientInfo.results?.baspk;
    //   }
    // }
  }

  onDate(event: any, title: string): void {
    if (title === 'GT_THE_DEN') {
      this.patientHanhChinh.GT_THE_DEN = moment(event).format('DD/MM/YYYY');
    }
    if (title === 'NGAY_SINH') {
      this.patientHanhChinh.NGAY_SINH = moment(event).format('DD/MM/YYYY');
      this.patientHanhChinh.DO_TUOI = moment().diff(event, 'years');
    }
    if (title === 'BAT_DAU_THAY_KINH') {
      this.benhAnSPK.BAT_DAU_THAY_KINH = moment(event).format('DD/MM/YYYY');
      this.benhAnSPK.TUOI = moment().diff(event, 'years');
    }
    if (title === 'KINH_LAN_CUOI_NGAY') {
      this.benhAnSPK.KINH_LAN_CUOI_NGAY = moment(event).format('DD/MM/YYYY');
    }
  }

  changeRadioSex(event: any) {
    this.patientHanhChinh.GIOI_TINH = {
      ID: event + '',
      MA: event + '',
      MO_TA: event === '1' ? 'Nam' : (event === '2' ? 'Nữ' : ''),
    };
  }

  filterPosition(value: any): void {
    if (value || value === '') {
      this.receptionService.filterCategorySystem(value, 'position').subscribe(dataReturn => {
        if (dataReturn.status === true) {
          this.filteredPositions = this.receptionService.convertDM('position', dataReturn.results);
        } else {
          this.filteredPositions = [];
        }
      });
    }
  }

  displayDM(value: any): string {
    return value && value.MO_TA ? value.MO_TA : '';
  }

  filterEthnic(value: any): void {
    if (value || value === '') {
      this.receptionService.filterCategoryEthnic(value).subscribe(dataReturn => {
        if (dataReturn.status === true) {
          this.filteredEthnics = this.receptionService.convertDM('ethnic', dataReturn.results);
        } else {
          this.filteredEthnics = [];
        }
      });
    }
  }

  filterCountry(value: any): void {
    if (value || value === '') {
      this.receptionService.filterCategoryCountry(value).subscribe(dataReturn => {
        if (dataReturn.status === true) {
          this.filteredCountrys = this.receptionService.convertDM('country', dataReturn.results);
        } else {
          this.filteredCountrys = [];
        }
      });
    }
  }

  filterTown(value: any): void {
    if (value || value === '') {
      this.receptionService.filterCategoryTown(value, this.patientHanhChinh.QUAN_HUYEN.ID).subscribe(dataReturn => {
        if (dataReturn.status === true) {
          this.filteredTowns = this.receptionService.convertDM('town', dataReturn.results);
        } else {
          this.filteredTowns = [];
        }
      });
    }
  }

  filterDistrict(value: any): void {
    if (value || value === '') {
      this.receptionService.filterCategoryDistrict(value, this.patientHanhChinh.TINH_THANH ? this.patientHanhChinh.TINH_THANH.ID : this.user_logged.company_config.province[0].province_id).subscribe(dataReturn => {
        if (dataReturn.status === true) {
          this.filteredDistricts = this.receptionService.convertDM('district', dataReturn.results);
        } else {
          this.filteredDistricts = [];
        }
      });
    }
  }

  filterProvince(value: any): void {
    if (value || value === '') {
      this.receptionService.filterCategoryProvince(value, this.patientHanhChinh.QUOC_TICH ? this.patientHanhChinh.QUOC_TICH.ID : this.user_logged.company_config.country[0].country_id).subscribe(dataReturn => {
        if (dataReturn.status === true) {
          this.filteredProvinces = this.receptionService.convertDM('province', dataReturn.results);
        } else {
          this.filteredProvinces = [];
        }
      });
    }
  }

  filterRoom(value: any) {
    var objParam = {
      active: 1,
      query: value,
      room_type_id: 568,
    };
    this.receptionService.filterRoom(objParam).subscribe(dataReturn => {
      if (dataReturn.status === true) {
        this.filteredRooms = this.receptionService.convertKDT(dataReturn.results);
      } else {
        this.filteredRooms = [];
      }
    });
  }

  displayDMKDT(value: any): string {
    return value && value.TEN_KHOA_PHONG ? value.TEN_KHOA_PHONG : '';
  }

  filterHospital(value: any) {
    this.receptionService.filterHospital(value).subscribe(dataReturn => {
      if (dataReturn.status === true) {
        this.filteredHospitals = this.receptionService.convertDM('hospital', dataReturn.results);
      } else {
        this.filteredHospitals = [];
      }
    });
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
    this.changeBenhChinh();
  }

  changeBenhChinh() {
    this.shareDataService.pushData(this.chandoan, 'chan_doan');
  }

  reset(title: string) {
    if (title === 'DAU_BUNG') {
      if (this.benhAnSPK.DAU_BUNG === 1) {
        this.benhAnSPK.LIST_DAU_BUNG = new DB();
      }
    }
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

  displayCBYT(value: any): string {
    return value && value.HO_TEN ? value.MA_NHAN_VIEN + ' - ' + value.HO_TEN : '';
  }
}
