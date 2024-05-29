import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BAIVF, DMA, DMB, DMC, DMD, DME, DMF, DMG, DMH, DMI, TienSuSinhSan } from '../../../../model/emr/benh_an_ivf';
import * as moment from 'moment';
import { ShareDataService } from '../../../../services/share-data.service';
import { BenhAnComponent } from '../benh-an.component';
import { EmrPatientInfo, HisPatientInfo } from '../../../../model/emr/patient/patient-info';
import { SexEnum } from '../../../../model/patient';
import { ReceptionService } from '../../../../services/reception.service';
import { ServiceService } from '../../../../services/service.service';
import { LocalStorageService } from '@shared';
import { IvfMedicalHistory } from '../../../../model/ivf/ivf-medical-history';
import { EmrService } from '../../../../services/emr.service';

enum PPDTriVoSinh {
  Khong, IUI, IVF, Khac, Co
}

enum BooleanEnum {
  Khong = 1, Co
}

interface RelationshipsIndexMap {
  wife_husband: number;
  donate_receive: number;
}

@Component({
  selector: 'app-benh-an-ivf',
  templateUrl: './benh-an-ivf.component.html',
  styleUrls: ['./benh-an-ivf.component.scss'],
})
export class BenhAnIvfComponent extends BenhAnComponent implements OnInit, OnChanges {
  @Input() selectGiayToLienQuan: any;
  @Input() patientInfo!: EmrPatientInfo;
  @Input() patientInfoHis!: HisPatientInfo;

  benhAnIVF: BAIVF = new BAIVF();

  constructor(private shareDataService: ShareDataService,
              private receptionService: ReceptionService,
              private serviceService: ServiceService,
              private localStorageService: LocalStorageService,
              private emrService: EmrService) {
    super();
  }

  listSoLan: TienSuSinhSan[] = [
    {
      'TEN': 'Số lần có thai',
      'SO_LUONG_1': 0,
      'SO_LUONG_2': 0,
    },
    {
      'TEN': 'Số con sống',
      'SO_LUONG_1': 0,
      'SO_LUONG_2': 0,
    },
    {
      'TEN': 'Sảy thai',
      'SO_LUONG_1': 0,
      'SO_LUONG_2': 0,
    },
    {
      'TEN': 'Nạo / hút',
      'SO_LUONG_1': 0,
      'SO_LUONG_2': 0,
    }, {
      'TEN': 'Thai lưu',
      'SO_LUONG_1': 0,
      'SO_LUONG_2': 0,
    },
  ];
  listPPDTriVoSinh = [
    {
      ID: PPDTriVoSinh.Khong + '',
      MA: PPDTriVoSinh.Khong + '',
      MO_TA: 'Không',
    },
    {
      ID: PPDTriVoSinh.IUI + '',
      MA: PPDTriVoSinh.IUI + '',
      MO_TA: 'IUI',
    },
    {
      ID: PPDTriVoSinh.IVF + '',
      MA: PPDTriVoSinh.IVF + '',
      MO_TA: 'IVF',
    },
    {
      ID: PPDTriVoSinh.Khac + '',
      MA: PPDTriVoSinh.Khac + '',
      MO_TA: 'Khác',
    },
    {
      ID: PPDTriVoSinh.Co + '',
      MA: PPDTriVoSinh.Co + '',
      MO_TA: 'Có',
    },
  ];
  listTuCung = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Tử cung đôi',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Tử cung 2 sừng',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Dính',
    },
    {
      ID: '4',
      MA: '4',
      MO_TA: 'Khác',
    },
  ];
  listSoLuongKinhNguyet = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Nhiều',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Trung bình',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Ít',
    },
  ];
  listVT = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Thông',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Thông hạn chế',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Tắc gần',
    },
    {
      ID: '4',
      MA: '4',
      MO_TA: 'Tắc xa',
    },
    {
      ID: '5',
      MA: '5',
      MO_TA: 'Ứ nước',
    },
    {
      ID: '6',
      MA: '6',
      MO_TA: 'Khác*',
    },
  ];
  listCoTuCung = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Viêm',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Lộ tuyến',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Sùi',
    },
    {
      ID: '4',
      MA: '4',
      MO_TA: 'Polyp',
    },
    {
      ID: '5',
      MA: '5',
      MO_TA: 'Hai cổ TC',
    },
  ];
  listChuKyKinhNguyet = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Đều',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Không đều',
    },
  ];
  resetDMA: DMA = new DMA();
  resetDMB: DMB = new DMB();
  resetDMC: DMC = new DMC();
  resetDME: DME = new DME();
  resetDMG: DMG = new DMG();
  resetDMH: DMH = new DMH();

  ngOnInit(): void {
    this.emrService.tenBenhAn = this.tenBenhAn;
  }

  /**
   * @param changes.patientInfo.currentValue Thông tin bệnh án đã lưu
   * @param changes.patientInfoHis.currentValue Thông tin bệnh nhân gốc của HIS
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.patientInfo?.currentValue) {
      const patientInfo = changes.patientInfo.currentValue as EmrPatientInfo;

      if (patientInfo.results?.baivf) {
        // Load dữ liệu đã lưu
        this.benhAnIVF = patientInfo.results?.baivf;
        this.listSoLan = [...this.benhAnIVF.TIEN_SU_SINH_SAN];
      }
    }

    if (changes.patientInfoHis?.currentValue) {
      const patientInfoHis = changes.patientInfoHis.currentValue as HisPatientInfo;

      // Load dữ liệu mặc định
      if (patientInfoHis.sex === SexEnum.Female) {
        this.initOrKeepValues(this.benhAnIVF, [
          {
            key: 'HO_TEN_VO' as keyof BAIVF,
            defaultValueFactory: () => patientInfoHis.patient_fullname,
          },
          {
            key: 'birthdayStringwife' as keyof BAIVF,
            defaultValueFactory: () => patientInfoHis.birthday ? moment.unix(patientInfoHis.birthday) : '',
          },
          {
            key: 'SDT_VO' as keyof BAIVF,
            defaultValueFactory: () => patientInfoHis.phone_number,
          },
          {
            key: 'DIA_CHI' as keyof BAIVF,
            defaultValueFactory: () => patientInfoHis.address1,
          },
        ]);

        const biographyServiceIDs = this.localStorageService.getVariableGlobal<string>()['IVF_SERVICE_ID_KTSBD']?.value.split(',').map(biographyServiceID => Number(biographyServiceID));

        // Lấy thông tin chồng
        this.receptionService.getFamiliesOfPatient(patientInfoHis.patient_id)
          ?.subscribe(res => {
            if (res.status) {
              const relationships = this.localStorageService.getVariableGlobal<string[]>()['RELATIONSHIPS']?.value;
              const map = this.localStorageService.getVariableGlobal<RelationshipsIndexMap>()['RELATIONSHIPS_INDEX_MAP']?.value;

              let husbandIndex: number | undefined = undefined;
              if (relationships && map) {
                husbandIndex = res.results.findIndex(p => p.relationship === relationships[map.wife_husband]);
              }
              if (husbandIndex === undefined || husbandIndex < 0) {
                return;
              }
              const husband = res.results[husbandIndex];

              this.initOrKeepValues(this.benhAnIVF, [
                {
                  key: 'HO_TEN_CHONG',
                  defaultValueFactory: () => husband.fullname
                },
                {
                  key: 'birthdayStringhusban',
                  defaultValueFactory: () => husband.birthday ? moment.unix(husband.birthday) : ''
                },
                {
                  key: 'SDT_CHONG',
                  defaultValueFactory: () => husband.phone_number
                },
              ]);

              // Lấy thông tin khám tiền sử ban đầu mới nhất của chồng
              this.serviceService.getServiceUsed(husband.patient_id, '', undefined, undefined, undefined, undefined)
                .subscribe((res) => {
                  if (!res.status) {
                    return;
                  }
                  for (const exam of res.results[0].data[0].exams) {
                    for (let i = exam.services.length - 1; i >= 0; i--) {
                      const service = exam.services[i];

                      if (biographyServiceIDs?.includes(service.services.service_id)) {
                        const results: IvfMedicalHistory = service.services.results;

                        this.initOrKeepValues(this.benhAnIVF, [
                          {
                            key: 'MUC_DO_SINH_HOAT_TD',
                            defaultValueFactory: () => Number(results.male.infertility.activities.frequency)
                          },
                          {
                            key: 'BENH_TOAN_THAN_CHONG',
                            defaultValueFactory: () => Object.values(results.male.personal).some((isDiseased => isDiseased)) ? BooleanEnum.Co : BooleanEnum.Khong
                          },
                          {
                            key: 'LIST_BENH_TOAN_THAN_VO.DAI_DUONG',
                            defaultValueFactory: () => results.male.personal.diabetes
                          },
                          {
                            key: 'LIST_BENH_TOAN_THAN_VO.BENH_KHAC',
                            defaultValueFactory: () => {
                              for (const [key, isDiseased] of Object.entries(results.male.personal)) {
                                if (!isDiseased) {
                                  continue;
                                }
                                if (!['diabetes'].includes(key)) {
                                  return true;
                                }
                              }
                              return false;
                            }
                          },
                          {
                            key: 'TIEN_SU_BENH_LAY_TRUYEN_QUA_DUONG_TINH_DUC',
                            defaultValueFactory: () => {
                              return results.std_checked ? BooleanEnum.Co : BooleanEnum.Khong;
                            }
                          },
                          {
                            key: 'CHIEU_CAO_CHONG',
                            defaultValueFactory: () => {
                              return results.height;
                            }
                          },
                          {
                            key: 'CAN_NANG_CHONG',
                            defaultValueFactory: () => {
                              return results.weight;
                            }
                          },
                        ]);

                        return;
                      }
                    }
                  }
                });
            }
          });

        // Lấy thông tin khám tiền sử ban đầu mới nhất của vợ
        if (patientInfoHis.patient_id) {
          this.serviceService.getServiceUsed(patientInfoHis.patient_id, patientInfoHis.reception_queue_id, patientInfoHis.in_patient, undefined, undefined, undefined)
            .subscribe((res) => {
              if (!res.status) {
                return;
              }
              for (const exam of res.results[0].data[0].exams) {
                for (let i = exam.services.length - 1; i >= 0; i--) {
                  const service = exam.services[i];

                  if (biographyServiceIDs?.includes(service.services.service_id)) {
                    const results: IvfMedicalHistory = service.services.results;

                    this.initOrKeepValues(this.benhAnIVF, [
                      {
                        key: 'SO_NGAY_CHU_KI_KINH_NGUYET',
                        defaultValueFactory: () => Number(results.female.reproduction.menstrualCycle),
                      },
                      {
                        key: 'SO_NGAY_CO_KINH',
                        defaultValueFactory: () => Number(results.female.reproduction.bleeding),
                      },
                      {
                        key: 'THOI_GIAN_VO_SINH_VO',
                        defaultValueFactory: () => results.female.reproduction.yearsTryConception,
                      },
                      {
                        key: 'PP_DIEU_TRI_VO_SINH',
                        defaultValueFactory: () => {
                          if (!results.female.art.iui.use && !results.female.art.ivf.use) {
                            return this.listPPDTriVoSinh[PPDTriVoSinh.Khong];
                          } else if (!results.female.art.iui.use && results.female.art.ivf.use) {
                            return this.listPPDTriVoSinh[PPDTriVoSinh.IVF];
                          } else if (results.female.art.iui.use && !results.female.art.ivf.use) {
                            return this.listPPDTriVoSinh[PPDTriVoSinh.IUI];
                          } else {
                            return this.listPPDTriVoSinh[PPDTriVoSinh.Co];
                          }
                        },
                      },
                      {
                        key: 'SO_LAN_IUI',
                        defaultValueFactory: () => Number(results.female.art.iui.times)
                      },
                      {
                        key: 'SO_LAN_IVF',
                        defaultValueFactory: () => Number(results.female.art.ivf.times)
                      },
                      {
                        key: 'CAC_THAM_DO_TRUOC_DO',
                        defaultValueFactory: () => {
                          return [
                            results.female.reproduction.ovaryScraping.use,
                            results.female.reproduction.hsgScan.use,
                            results.female.reproduction.hskScoping.use,
                            results.female.reproduction.lpsSurgery.use,
                            results.female.reproduction.openSurgery.use,
                          ].some(isUse => isUse) ? BooleanEnum.Co : BooleanEnum.Khong;
                        }
                      },
                      {
                        key: 'TIEN_SU_CAC_BENH_ANH_HUONG_SINH_SAN_VO',
                        defaultValueFactory: () => Object.values(results.female.personal).some((isDiseased => isDiseased)) ? BooleanEnum.Co : BooleanEnum.Khong
                      },
                      {
                        key: 'BENH_TOAN_THAN_VO',
                        defaultValueFactory: () => Object.values(results.female.personal).some((isDiseased => isDiseased)) ? BooleanEnum.Co : BooleanEnum.Khong
                      },
                      {
                        key: 'LIST_BENH_TOAN_THAN_VO.DAI_DUONG',
                        defaultValueFactory: () => results.female.personal.diabetes
                      },
                      {
                        key: 'LIST_BENH_TOAN_THAN_VO.BENH_TUYEN_GIAP',
                        defaultValueFactory: () => results.female.personal.hyperthyreosis || results.female.personal.hypothyreosis
                      },
                      {
                        key: 'LIST_BENH_TOAN_THAN_VO.BENH_KHAC',
                        defaultValueFactory: () => {
                          for (const [key, isDiseased] of Object.entries(results.female.personal)) {
                            if (!isDiseased) {
                              continue;
                            }
                            if (!['diabetes', 'hyperthyreosis', 'hypothyreosis'].includes(key)) {
                              return true;
                            }
                          }
                          return false;
                        }
                      },
                      {
                        key: 'TIEN_SU_NGOAI_KHOA',
                        defaultValueFactory: () => {
                          if (results.female.reproduction.ivf.geu || results.female.reproduction.ivf.cesareanSection) {
                            return BooleanEnum.Co;
                          }
                          return BooleanEnum.Khong;
                        }
                      },
                      {
                        key: 'GEU_2',
                        defaultValueFactory: () => {
                          return results.female.reproduction.ivf.geu;
                        }
                      },
                      {
                        key: 'MO_DE',
                        defaultValueFactory: () => {
                          return `${results.female.reproduction.ivf.cesareanSection.times} lần (${
                            results.female.reproduction.ivf.cesareanSection.years.map(csYear => csYear.year).join(', ')
                          })`;
                        }
                      },
                      {
                        key: 'BENH_LAY_QUA_DUONG_TD',
                        defaultValueFactory: () => {
                          return results.std_checked ? BooleanEnum.Co : BooleanEnum.Khong;
                        }
                      },
                      {
                        key: 'CHIEU_CAO_VO',
                        defaultValueFactory: () => {
                          return results.height;
                        }
                      },
                      {
                        key: 'CAN_NANG_VO',
                        defaultValueFactory: () => {
                          return results.weight;
                        }
                      },
                      {
                        key: 'THOI_GIAN_VO_SINH_CHONG',
                        defaultValueFactory: () => results.female.reproduction.yearsTryConception,
                      },
                    ]);

                    return;
                  }
                }
              }
            });
        }
      }
      // TODO: Không lấy dữ liệu mặc định nếu là bệnh nhân nam?
    }

    this.benhAnIVF.TIEN_SU_SINH_SAN = this.listSoLan;

    this.shareDataService.pushData(this.benhAnIVF, 'baivf');
  }

  onDate(event: any, title: string): void {
    if (title === 'NGAY_SINH_VO') {
      this.benhAnIVF.NGAY_SINH_VO = event ? moment(event).format('DD/MM/YYYY') : '';
    }
    if (title === 'NGAY_SINH_CHONG') {
      this.benhAnIVF.NGAY_SINH_CHONG = event ? moment(event).format('DD/MM/YYYY') : '';
    }
    if (title === 'NGAY_LAP_GIA_DINH') {
      this.benhAnIVF.NGAY_LAP_GIA_DINH = event ? moment(event).format('DD/MM/YYYY') : '';
    }
  }

  reset(title: string) {
    if (title === 'BENH_LAY_QUA_DUONG_TD') {
      if (this.benhAnIVF.BENH_LAY_QUA_DUONG_TD === 1) {
        this.benhAnIVF.LIST_BENH_LAY_TRUYEN_QUA_DUONG_TINH_DUC = new DMA();
      }
    }
    if (title === 'TU_CUNG_1') {
      if (this.benhAnIVF.TU_CUNG_1 === 1) {
        this.benhAnIVF.LIST_TU_CUNG_1 = new DMB();
      }
    }
    if (title === 'TU_CUNG_2') {
      if (this.benhAnIVF.TU_CUNG_2 === 1) {
        this.benhAnIVF.LIST_TU_CUNG_2 = new DMB();
      }
    }
    if (title === 'CO_TU_CUNG') {
      if (this.benhAnIVF.CO_TU_CUNG === 1) {
        this.benhAnIVF.LIST_CO_TU_CUNG = new DMC();
      }
    }
    if (title === 'BENH_TOAN_THAN_CHONG') {
      if (this.benhAnIVF.BENH_TOAN_THAN_CHONG === 1) {
        this.benhAnIVF.LIST_BENH_TOAN_THAN_CHONG = new DMD();
      }
    }
    if (title === 'TIEN_SU_PHAU_THUAT_CHONG') {
      if (this.benhAnIVF.TIEN_SU_PHAU_THUAT_CHONG === 1) {
        this.benhAnIVF.LIST_PHAU_THUAT_CHONG = new DME();
      }
    }
    if (title === 'TIEN_SU_BENH_LAY_TRUYEN_QUA_DUONG_TINH_DUC') {
      if (this.benhAnIVF.TIEN_SU_BENH_LAY_TRUYEN_QUA_DUONG_TINH_DUC === 1) {
        this.benhAnIVF.LIST_BENH_LAY_QUA_DUONG_TD = new DMF();
      }
    }
    if (title === 'DUONG_VAT') {
      if (this.benhAnIVF.DUONG_VAT === 1) {
        this.benhAnIVF.LIST_DUONG_VAT = new DMG();
      }
    }
    if (title === 'BENH_TOAN_THAN_VO') {
      if (this.benhAnIVF.BENH_TOAN_THAN_VO === 1) {
        this.benhAnIVF.LIST_BENH_TOAN_THAN_VO = new DMI();
      }
    }
    if (title === 'PP_DIEU_TRI_VO_SINH') {
      if (this.benhAnIVF.PP_DIEU_TRI_VO_SINH.ID !== '1') {
        this.benhAnIVF.SO_LAN_IUI = 0;
      }
      if (this.benhAnIVF.PP_DIEU_TRI_VO_SINH.ID !== '2') {
        this.benhAnIVF.SO_LAN_IVF = 0;
      }
    }
  }
}
