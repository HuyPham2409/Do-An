import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { EmrService } from '../../../../services/emr.service';
import { ShareDataService } from '../../../../services/share-data.service';
import { ReceptionService } from '../../../../services/reception.service';
import { firstValueFrom, Subscription } from 'rxjs';
import { GiayToLienQuanComponent } from '../../benh-an-emr/giay-to-lien-quan.component';
import { DM } from '../../../../model/Patient_EMR';
import { ThuMoiHoiChuan } from '../../../danh-muc/thu-moi-hoi-chan/thu-moi-hoi-chan.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Globals } from '../../../../app.globals';
import { ComponentUtils } from '../../../laboratory/utils/component-utils';
import { LabratoryMenuService } from '../../../../services/laboratory/labratory-menu.service';
import { ToastrTranslateService } from '@shared/services/toastr-translate-service';
import { SiteName } from '../../../../model/site/site-name';
import { MatDialog } from '@angular/material/dialog';
import { SyntheticClsComponent } from '../../components/synthetic-cls/synthetic-cls.component';
import { ServiceService } from '../../../../services/service.service';
import { GetServiceUsedResponseResults } from '../../../../model/service/response';
import { DoctorService } from '../../../../services/doctor.service';
import { FrontendConfigService } from '../../../../services/frontend-config/frontend-config.service';

@Component({
  selector: 'app-bien-ban-hoi-chan',
  templateUrl: './bien-ban-hoi-chan.component.html',
  styleUrls: ['./bien-ban-hoi-chan.component.scss']
})

export class BienBanHoiChanComponent extends GiayToLienQuanComponent implements OnInit, OnChanges, OnDestroy {
  @Input() loaiGiayToLienQuan: any;

  ID_FORM_BBHC: number = 5008;
  ID_FORM_BBHCKS: number = 5080;

  selectBBHC: any = {
    _id: "",
    hoi_chan_luc_moment: moment(),
    from_date_moment: moment(),
    to_date_moment: moment(),
    patient_info: {},
    results: {},
    LOAI_HOI_CHAN: '',
  };

  thongTinChanDoan: any = {}
  listThuMoi: any = [];
  selectedThuMoi: any = null;
  isSelectedThuMoi: boolean = false;
  bacSiDieuTri: string = '';
  variableGlobal = {};
  protected subscriptions = new Subscription();

  public showFields: Record<string, any> = {};
  public siteName: SiteName = 'default';

  constructor(private shareDataService: ShareDataService,
              private emrService: EmrService,
              private receptionService: ReceptionService,
              private http: HttpClient,
              private globals: Globals,
              private serviceService: ServiceService,
              private menuService: LabratoryMenuService,
              private doctorService: DoctorService,
              private proxyService: FrontendConfigService,
              private dialog: MatDialog,
              private toastr: ToastrTranslateService) {
    super();
    this.siteName = this.emrService.getSite()?.name || 'default';
    this.variableGlobal = this.proxyService.getFrontendConfig();
  }

  ngOnInit(): void {
    ComponentUtils.initWithFormAndMenu(
      [], this.menuService, this.subscriptions,
      {
        onSave: async () => {
          if (this.isSelectedThuMoi) {
            setTimeout(() => {
              this.updateConsultation();
            }, 10000)
          }
        }
      }
    )
    this.emrService.getShowFieldComponentBySite(this.loaiGiayToLienQuan.MA).subscribe((res) => {
      this.showFields = res;
    });
  }

  LOAI_HOI_CHAN: DM[] = [{
    ID: '1',
    MA: '1',
    MO_TA: 'BIÊN BẢN HỘI CHẨN KHOA'
  }, {
    ID: '2',
    MA: '2',
    MO_TA: 'BIÊN BẢN HỘI CHẨN LIÊN KHOA'
  }, {
    ID: '3',
    MA: '3',
    MO_TA: 'BIÊN BẢN HỘI CHẨN TOÀN VIỆN'
  }, {
    ID: '4',
    MA: '4',
    MO_TA: 'BIÊN BẢN HỘI CHẨN LIÊN BỆNH VIỆN'
  },
    {
      ID: '5',
      MA: '5',
      MO_TA: 'BIÊN BẢN HỘI CHẨN THUỐC'
    }
  ];

  ngOnChanges() {
    if (this.isCreateGiayToLienQuan) {
      const nowUnix = moment().unix();
      this.selectBBHC = {
        _id: "",
        hoi_chan_luc_moment: moment(),
        hoi_chan_luc: nowUnix,
        newPharma: {},
        patient_info: {
          in_patient_bed_name: "",
          in_patient_room_name: "",
          parent_name: "",
        },
        results: {
          bien_ban_hoi_chan: '',
          chan_doan: "",
          chu_toa: "",
          thanh_vien_tham_gia: [],
          thu_moi_hc: {
            results: new ThuMoiHoiChuan()
          }
        },
        from_date_moment: moment.unix(this.patientInfoHis ? this.patientInfoHis.parent_id_in : moment().unix()).format(),
        from_date: this.patientInfoHis ? this.patientInfoHis.parent_id_in : nowUnix,
        to_date_moment: moment(),
        to_date: nowUnix,
        date_ky_moment: null,
        date_ky: nowUnix,
        pharmas: []
      };
    }
    if (this.isCreateGiayToLienQuan === false && this.checkNonEmpty(this.selectGiayToLienQuan)) {
      this.selectBBHC = this.selectGiayToLienQuan;
    }
    if(this.isCreateGiayToLienQuan && this.patientInfo) {
      if(this.loaiGiayToLienQuan.ID !== this.ID_FORM_BBHCKS) {
        // Biên bản hội chẩn thuốc thì lấy theo geh
        this.getChanDoanNoiTru()
      }
    }
    // let outPatientResults: any = {};
    // let outPatientIsGetting = false;
    // const outPatientProxy = new Proxy(outPatientResults, {
    //   get: (target: any, key: string | symbol, receiver: any) => {
    //     if (!outPatientIsGetting && !target[key]) {
    //       outPatientIsGetting = true;
    //       return new Promise((resolve, reject) => {
    //         this.receptionService
    //           .getPatientOut<HisPatientInfo[]>(this.patientInfo.reception_queue_id || '')
    //           .subscribe(dataReturn => {
    //             if (dataReturn.status && dataReturn.results.length) {
    //               outPatientResults = dataReturn.results[0];
    //               resolve(outPatientResults[key]);
    //             } else {
    //               reject(dataReturn.results);
    //             }
    //             outPatientIsGetting = false;
    //           });
    //       });
    //     } else if (target[key]) {
    //       return target[key];
    //     }
    //   }
    // });
    this.initOrKeepValues(this.selectBBHC, [
      //#region Show trên HIS
      {
        key: 'txtSearch',
        defaultValueFactory: () => this.patientInfoHis.reception_queue_id
      },
      {
        key: 'gioitinh',
        defaultValueFactory: () => firstValueFrom(this.receptionService.getSexString(this.patientInfoHis.sex)),
        isEmptyChecker: () => true
      },
      {
        key: 'patient_fullname',
        defaultValueFactory: () => this.patientInfoHis.patient_fullname
      },
      {
        key: 'tuoi',
        defaultValueFactory: () => this.emrService.getAge(this.patientInfoHis.birthday, this.selectBBHC.created_at, true),
        isEmptyChecker: () => true
      },
      {
        key: 'address1',
        defaultValueFactory: () => this.patientInfoHis.address1
      },
      {
        key: 'patient_info.in_patient_bed_name',
        defaultValueFactory: () => this.patientInfoHis.in_patient_bed_name
        // || outPatientProxy.in_patient_bed_name
      },
      {
        key: 'patient_info.in_patient_room_name',
        defaultValueFactory: () => this.patientInfoHis.in_patient_room_name
      },
      {
        key: 'patient_info.parent_name',
        defaultValueFactory: () => this.patientInfoHis.parent_name
      },
      //#endregion
      {
        key: 'results',
        defaultValueFactory: () => ({})
      },
      {
        key: 'patient_info.in_patient_bed_name',
        defaultValueFactory: () => this.patientInfoHis.in_patient_bed_name
        // || outPatientProxy.in_patient_bed_name
      },

    ]);
    if (this.patientInfoHis) {
      this.getApiConsultation(this.patientInfoHis.reception_queue_id);
    } else {
      this.getApiConsultation();
    }

    /**
     * BVKCG-2155: Khi chọn loại giấy tờ Biên bản hội chẩn thuốc
     * thì mặc định chọn Biên bản hội chẩn thuốc và không được chọn biên bản khác
     */
    if (this.loaiGiayToLienQuan.ID === this.ID_FORM_BBHCKS) {
      this.selectBBHC.LOAI_HOI_CHAN = this.LOAI_HOI_CHAN[4];

      //Lấy danh sách thuốc dấu *
      if (this.isCreateGiayToLienQuan) {
        this.getAsteriskPharma();
      }
    }

    this.shareDataService.pushData(this.selectBBHC, "bien_ban_hoi_chan");
  }

  displayDMICD(value: any): string {
    return value && value.TEN ? value.TEN : '';
  }

  createPharma(newPharma: any) {
    this.selectBBHC.pharmas.push(newPharma);
    this.selectBBHC.newPharma = null;
  }

  removePharma(index: number) {
    this.selectBBHC.pharmas.splice(index, 1);
  }

  private getApiConsultation(recep_id: any = undefined, isCon: number = 0) {
    let params = new HttpParams().set('is_consultation', isCon);
    if (recep_id) params = params.set('reception_queue_id', recep_id);
    this.http.get<any>(this.globals.API_DOMAIN_EX_2 + '/diagnosis/invites', { params }).subscribe({
      next: (dataReturn) => {
        if (dataReturn.status === true) {
          this.listThuMoi = dataReturn.results;
        } else {
          this.listThuMoi = [];
        }
      },
      error: (err) => {
        this.listThuMoi = [];
      }
    });
  }

  private getChanDoanNoiTru() {
    this.receptionService.getPatientOut(this.patientInfo.reception_queue_id).subscribe(dataReturn => {
      if (dataReturn.status === true && dataReturn.results.length > 0) {
        this.selectBBHC.results.chan_doan = []
        this.selectBBHC.results.ket_luan = []
        this.thongTinChanDoan = dataReturn.results[0]
        if (dataReturn.results[0].examining_service_icd?.length > 0) {
          dataReturn.results[0].examining_service_icd.forEach((icd: any) => {
            let tempICD = {
              MA: icd.service_code,
              ID: icd.service_id,
              MO_TA: icd.service_name
            }
            this.selectBBHC.results.chan_doan.push(tempICD)
            this.selectBBHC.results.ket_luan.push(tempICD)
          })
        }
        this.handleChangeListChanDoan()
        this.handleChangeListKetLuan()
      } else {
        this.thongTinChanDoan = {}
      }
    });
  }

  handleChangeListChanDoan() {
    this.selectBBHC.results.chan_doan = this.removeDuplicatedICD(this.selectBBHC.results.chan_doan)
    let ketLuan = ''
    if (this.selectBBHC.results.chan_doan && this.selectBBHC.results.chan_doan.length > 0) {
      this.selectBBHC.results.chan_doan.forEach((icd: any, index: number) => {
        if (index < this.selectBBHC.results.chan_doan.length - 1) {
          ketLuan += icd.MA + " - " + icd.MO_TA + "; "
        } else {
          ketLuan += icd.MA + " - " + icd.MO_TA + '.'
        }
      })
    }
    this.selectBBHC.results.chan_doan_text = ketLuan
  }

  handleChangeListKetLuan() {
    this.selectBBHC.results.ket_luan = this.removeDuplicatedICD(this.selectBBHC.results.ket_luan)
    let ketLuan = ''
    if (this.selectBBHC.results.ket_luan && this.selectBBHC.results.ket_luan.length > 0) {
      this.selectBBHC.results.ket_luan.forEach((icd: any, index: number) => {
        if (index < this.selectBBHC.results.ket_luan.length - 1) {
          ketLuan += icd.MA + " - " + icd.MO_TA + "; "
        } else {
          ketLuan += icd.MA + " - " + icd.MO_TA + '.'
        }
      })
    }
    this.selectBBHC.results.ket_luan_text = ketLuan
  }

  private removeDuplicatedICD(array: any[]) {
    const seen = new Set<number>();
    const result: any[] = []
    array.forEach((icd: any) => {
      if (!seen.has(icd.ID)) {
        seen.add(icd.ID)
        result.push(icd);
      } else {
        this.toastr.warning(`Trùng mã ICD ${icd.MA}.`);
      }
    })
    return result
  }

  selectConsultation(event: any) {
    this.selectedThuMoi = event;
    this.selectedThuMoi.results.is_consultation = 1;
    this.isSelectedThuMoi = true;
    this.selectBBHC.results.thu_moi_hc = this.selectedThuMoi;
  }

  updateConsultation() {
    this.emrService.saveEMR(this.selectedThuMoi.results, this.selectedThuMoi.results.ma_yt || 0,
      this.selectedThuMoi.reception_queue_id.toString(), '', 1, 'FORM_THU_MOI_HC', 2, this.selectedThuMoi.medical_record_no).subscribe({
      next: (data) => {
        if (data.status) {
          this.toastr.success('Thư mời hội chẩn được liên kết với biên bản thành công!');
        } else {
          this.toastr.error('Thư mời hội chẩn chưa được liên kết với biên bản thành công!');
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  openSyntheticCls() {
    if (!this.patientInfoHis || !this.patientInfoHis.patient_id) {
      this.toastr.error("Chưa chọn bệnh nhân", "Lỗi tìm kiếm");
      return;
    }
    const dialogRef = this.dialog.open(SyntheticClsComponent, {
      panelClass: 'confirm-dialog',
      width: '60vw',
      data: {
        patient_id: this.patientInfoHis.patient_id,
        reception_queue_id: this.patientInfoHis.reception_queue_id
      }
    })
    dialogRef.afterClosed().subscribe((value: string) => {
      if (value) {
        this.selectBBHC.results.tom_tat_dbb = this.selectBBHC.results?.tom_tat_dbb ? this.selectBBHC.results.tom_tat_dbb : ""
        this.selectBBHC.results.tom_tat_dbb += value;
      }
    })
  }

  //todo: Gọi geh để tự động fill danh sách thuốc dấu sao.
  getAsteriskPharma() {
    if (!this.patientInfoHis || !this.patientInfoHis.patient_id) {
      return
    }
    var pharmaAsteriskList: any = [];
    this.serviceService.getServiceUsed<GetServiceUsedResponseResults<
      '_id', 'service_category_parent_id', 'service_category_id'>>
    (this.patientInfo.patient_id,
      this.patientInfo.reception_queue_id,
      this.patientInfo.in_patient,
      [
        { form_id: { $in: [3000] } }
      ],
      {
        key_level_1: '_id',
        key_level_2: 'created_at',
        key_level_3: 'service_category_id',
      },
      undefined,
      this.patientInfo.medical_record_no,
      {
        pharma_request_parent_in: "$pharma_request_parent_in",
        results: "$results",
        form_id: "$form_id",
        created_by: "$created_by"
      }
    ).subscribe(
      dataReturn => {
        if(!dataReturn.status){
          this.toastr.clear();
          this.toastr.error("Không lấy được danh sách y lệnh!");
          return;
        }

        // Lấy toa thuốc trong y lệnh mới nhất:
        try {
          const examination = dataReturn.results[0].data[0].exams[0].services;
          examination.forEach(
            (exam: any) => {
              this.selectBBHC.results.chan_doan = []
              this.selectBBHC.results.ket_luan = []
              if(exam.services.examining_service_icd?.length > 0) {
                exam.services.examining_service_icd.forEach((icd: any) => {
                  let tempICD = {
                    MA: icd.service_code,
                    ID: icd.service_id,
                    MO_TA: icd.service_name
                  }
                  this.selectBBHC.results.chan_doan.push(tempICD)
                  this.selectBBHC.results.ket_luan.push(tempICD)
                })
              }
              this.handleChangeListChanDoan()
              this.handleChangeListKetLuan()
              exam.services.results.forEach( //danh sách thuốc trong toa đó
                (listPharma: any) => {
                  listPharma.detail.forEach( //danh sách thuốc
                    (pharma: any) => {
                      if(pharma.is_asterisk == 1){
                        //phần này để cấu hình có đẩy mã toa thuốc vào thuốc đó hay không.
                        if(this.proxyService.getFrontendConfigValue(this.variableGlobal, "IS_PUSH_EXAMINATION_PRESCRIPTION") == 1){
                          pharma.examination_prescription_code = listPharma.examination_prescription_code;
                        }
                        pharmaAsteriskList.push(pharma);
                        if(this.selectBBHC.results && !this.selectBBHC.results.bac_si_dieu_tri) {
                          this.getDoctor(exam.services.created_by);
                        }
                      }
                    }
                  )
                }
              )
            }
          )
          this.selectBBHC.pharmas = pharmaAsteriskList.length ? [...pharmaAsteriskList] : [];
        } catch (err: any) {
          this.toastr.clear();
          this.toastr.error("Không lấy được danh sách thuốc trong y lệnh!");
        }
      })
  }

  //Lay thong tin bac si dieu tri
  getDoctor(doctorName?: string) {
    if(!doctorName || doctorName == ""){
      this.toastr.error("Không lấy được thông tin bác sĩ tạo y lệnh, vui lòng chọn bằng tay!");
    } else{
      this.doctorService.getDoctors(doctorName,"query").subscribe(
        (dataReturn)=> {
          if (dataReturn.results.length > 0) {
            this.selectBBHC.results.bac_si_dieu_tri = dataReturn.results[0];
            delete this.selectBBHC.results.bac_si_dieu_tri["titleId"];
          } else {
            this.toastr.clear();
            this.toastr.error("Không tìm thấy bác sĩ tạo y lệnh này");
          }
        },
        (err) => {
          this.toastr.clear();
          this.toastr.error("Không lấy được thông tin bác sĩ điều trị, vui lòng chọn bằng tay!");
        }
      )
    }
  }
}
