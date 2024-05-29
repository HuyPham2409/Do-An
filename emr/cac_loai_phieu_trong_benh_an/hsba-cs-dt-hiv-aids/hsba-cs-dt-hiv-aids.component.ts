import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ExaminationService } from '../../../../services/examination.service';
import { ReceptionService } from '../../../../services/reception.service';
import { ShareDataService } from '../../../../services/share-data.service';
import { GiayToLienQuanComponent } from '../../benh-an-emr/giay-to-lien-quan.component';
import moment, { Moment } from 'moment';
import { DateTime } from '../../../../model/emr/global';
import { DM } from '../../../../model/Patient_EMR';
import { MultiSelectModel } from '../../components/multi-select/multi-select.component';
import { CommonService } from '../../../../services/common.service';
import { LabratoryMenuService } from '../../../../services/laboratory/labratory-menu.service';
import { EhosResponse } from '../../../../model/api/response';
import { LocalStorageService } from '@shared';
import { ToastrTranslateService } from '@shared/services/toastr-translate-service';
import { EmrService } from '../../../../services/emr.service';
import { GiayToBhytSearchHeaderComponent } from '../../../giay-to-bhyt/components/giay-to-bhyt-search-header/giay-to-bhyt-search-header.component';

export class CS_DT_HIV {
  MA_LK = '';
  MA_THE_BHYT: string[15] = "";
  SO_CCCD = '';
  NGAYKD_HIV = new DateTime();
  ngaykd_hiv: Moment | null = null;
  BDDT_ARV = new DateTime();
  bddt_arv: Moment | null = null;
  MA_PHAC_DO_DIEU_TRI_BD = '';
  MA_BAC_PHAC_DO_BD = '';
  MA_LYDO_DTRI = '';
  LOAI_DTRI_LAO = '';
  PHACDO_DTRI_LAO = '';
  NGAYBD_DTRI_LAO = new DateTime();
  ngaybd_dtri_lao: Moment | null = null;
  NGAYKT_DTRI_LAO = new DateTime();
  ngaykt_dtri_lao: Moment | null = null;
  MA_LYDO_XNTL_VR = '';
  NGAY_XN_TLVR = new DateTime();
  ngay_xn_tlvr: Moment | null = null;
  KQ_XNTL_VR = '';
  NGAY_KQ_XN_TLVR = new DateTime();
  ngay_kq_xn_tlvr: Moment | null = null;
  MA_LOAI_BN = '';
  MA_TINH_TRANG_DK: DM[] = [];
  MA_XU_TRI: DM[] = [];
  LAN_XN_PCR = '';
  NGAY_XN_PCR = new DateTime();
  ngay_xn_pcr: Moment | null = null;
  NGAY_KQ_XN_PCR = new DateTime();
  ngay_kq_xn_pcr: Moment | null = null;
  MA_KQ_XN_PCR = '';
  NGAY_NHAN_TT_MANG_THAI = new DateTime();
  ngay_nhan_tt_mang_thai: Moment | null = null;
  NGAY_BAT_DAU_DT_CTX = new DateTime();
  ngay_bat_dau_dt_ctx: Moment | null = null;
  NGAY_BAT_DAU_XU_TRI = new DateTime();
  ngay_bat_dau_xu_tri: Moment | null = null;
  NGAY_KET_THUC_XU_TRI = new DateTime();
  ngay_ket_thuc_xu_tri: Moment | null = null;
  MA_PHAC_DO_DIEU_TRI = '';
  MA_BAC_PHAC_DO = '';
  SO_NGAY_CAP_THUOC_ARV = 0;
  DU_PHONG = '';
  xmlBhyt = "";
}
@Component({
  selector: 'app-hsba-cs-dt-hiv-aids',
  templateUrl: './hsba-cs-dt-hiv-aids.component.html',
  styleUrls: ['./hsba-cs-dt-hiv-aids.component.scss'],
})
export class HsbaCsDtHivAidsComponent extends GiayToLienQuanComponent implements OnInit {
  chamSocDieuTriHIV : any = {};
  readonly FORM_NAME = 'FORM_HSBA_CHAM_SOC_DIEU_TRI_HIV_AIDS';
  chamSocDieuTriHIVDataBoSung: any = {};
  chamSocDieuTriHIVData: any = {};
  @Input() patientInfo: any;
  @Input() selectGiayToLienQuan: any;
  @Input() isCreateGiayToLienQuan: any;
  @Input() idGiayTo = 5091;
  @Input() items: MultiSelectModel[] = [];
  @Input() patient?: any;
  recordId?: string;
  isDisabled = true;
  constructor(private examinationService: ExaminationService,
              private receptionService: ReceptionService,
              private shareDataService: ShareDataService,
              private commonService: CommonService,
              private menuService: LabratoryMenuService,
              private messageService: ToastrTranslateService,
              protected storage: LocalStorageService,
              private emrService: EmrService,
              private toastrTranslateService: ToastrTranslateService) {
    super();
  }
  genDataBHYT(kmd:boolean =  true) {
    this.chamSocDieuTriHIVData = this.chamSocDieuTriHIV;
    let chamSocDieuTriHIV = Object.assign({}, this.chamSocDieuTriHIVData);
    chamSocDieuTriHIV.MA_LK = this.patientInfo.reception_queue_id;
    chamSocDieuTriHIV.MA_THE_BHYT = this.chamSocDieuTriHIVData.MA_THE_BHYT;
    chamSocDieuTriHIV.SO_CCCD = this.chamSocDieuTriHIVData.SO_CCCD || "";
    chamSocDieuTriHIV.NGAYKD_HIV = this.chamSocDieuTriHIVData.NGAYKD_HIV ? moment(this.chamSocDieuTriHIVData.NGAYKD_HIV).format("YYYYMMDD") : "";
    chamSocDieuTriHIV.ngaykd_hiv = this.chamSocDieuTriHIVData.NGAYKD_HIV ? moment(this.chamSocDieuTriHIVData.NGAYKD_HIV).format("YYYYMMDD") : "";
    chamSocDieuTriHIV.BDDT_ARV = this.chamSocDieuTriHIVData.BDDT_ARV  ? moment(this.chamSocDieuTriHIVData.BDDT_ARV).format("YYYYMMDD") : "";
    chamSocDieuTriHIV.bddt_arv = this.chamSocDieuTriHIVData.BDDT_ARV ? moment(this.chamSocDieuTriHIVData.BDDT_ARV).format("YYYYMMDD") : "";
    chamSocDieuTriHIV.MA_PHAC_DO_DIEU_TRI_BD = this.chamSocDieuTriHIVData.MA_PHAC_DO_DIEU_TRI_BD || "";
    chamSocDieuTriHIV.MA_BAC_PHAC_DO_BD = this.chamSocDieuTriHIVData.MA_BAC_PHAC_DO_BD ? this.chamSocDieuTriHIVData.MA_BAC_PHAC_DO_BD.ID : "";
    chamSocDieuTriHIV.MA_LYDO_DTRI = this.chamSocDieuTriHIVData.MA_LYDO_DTRI ? this.chamSocDieuTriHIVData.MA_LYDO_DTRI.ID : "";
    chamSocDieuTriHIV.LOAI_DTRI_LAO = this.chamSocDieuTriHIVData.LOAI_DTRI_LAO ? this.chamSocDieuTriHIVData.LOAI_DTRI_LAO.ID : "";
    chamSocDieuTriHIV.PHACDO_DTRI_LAO = this.chamSocDieuTriHIVData.PHACDO_DTRI_LAO ? this.chamSocDieuTriHIVData.PHACDO_DTRI_LAO.ID : "";
    chamSocDieuTriHIV.NGAYBD_DTRI_LAO = this.chamSocDieuTriHIVData.NGAYBD_DTRI_LAO ? moment(this.chamSocDieuTriHIVData.NGAYBD_DTRI_LAO).format("YYYYMMDD") : "";    chamSocDieuTriHIV.ngaybd_dtri_lao = moment(this.chamSocDieuTriHIVData.NGAYBD_DTRI_LAO).format("YYYYMMDD");
    chamSocDieuTriHIV.NGAYKT_DTRI_LAO = this.chamSocDieuTriHIVData.NGAYKT_DTRI_LAO ? moment(this.chamSocDieuTriHIVData.NGAYKT_DTRI_LAO).format("YYYYMMDD") : "";
    chamSocDieuTriHIV.MA_LYDO_XNTL_VR = this.chamSocDieuTriHIVData.MA_LYDO_XNTL_VR ? this.chamSocDieuTriHIVData.MA_LYDO_XNTL_VR.ID : "";
    chamSocDieuTriHIV.NGAY_XN_TLVR = this.chamSocDieuTriHIVData.NGAY_XN_TLVR ? moment(this.chamSocDieuTriHIVData.NGAY_XN_TLVR).format("YYYYMMDD") : "";
    chamSocDieuTriHIV.KQ_XNTL_VR = this.chamSocDieuTriHIVData.KQ_XNTL_VR ? this.chamSocDieuTriHIVData.KQ_XNTL_VR.ID : "";
    chamSocDieuTriHIV.NGAY_KQ_XN_TLVR = this.chamSocDieuTriHIVData.NGAY_KQ_XN_TLVR ? moment(this.chamSocDieuTriHIVData.NGAY_KQ_XN_TLVR).format("YYYYMMDD") : "";
    chamSocDieuTriHIV.MA_LOAI_BN = this.chamSocDieuTriHIVData.MA_LOAI_BN ? this.chamSocDieuTriHIVData.MA_LOAI_BN.ID : "";
    chamSocDieuTriHIV.MA_TINH_TRANG_DK = this.chamSocDieuTriHIVData.MA_TINH_TRANG_DK || "";
    chamSocDieuTriHIV.MA_XU_TRI = this.chamSocDieuTriHIVData.MA_XU_TRI && this.chamSocDieuTriHIVData.MA_XU_TRI.ID ? this.chamSocDieuTriHIVData.MA_XU_TRI.ID : ";";
    chamSocDieuTriHIV.LAN_XN_PCR = this.chamSocDieuTriHIVData.LAN_XN_PCR ? this.chamSocDieuTriHIVData.LAN_XN_PCR.ID : "";
    chamSocDieuTriHIV.NGAY_XN_PCR = this.chamSocDieuTriHIVData.NGAY_XN_PCR ? moment(this.chamSocDieuTriHIVData.NGAY_XN_PCR).format("YYYYMMDD") : "";
    chamSocDieuTriHIV.NGAY_KQ_XN_PCR = this.chamSocDieuTriHIVData.NGAY_KQ_XN_PCR ? moment(this.chamSocDieuTriHIVData.NGAY_KQ_XN_PCR).format("YYYYMMDD") : "";
    chamSocDieuTriHIV.MA_KQ_XN_PCR = this.chamSocDieuTriHIVData.MA_KQ_XN_PCR ? this.chamSocDieuTriHIVData.MA_KQ_XN_PCR.ID : "";
    chamSocDieuTriHIV.NGAY_NHAN_TT_MANG_THAI = this.chamSocDieuTriHIVData.NGAY_NHAN_TT_MANG_THAI  ? moment(this.chamSocDieuTriHIVData.NGAY_NHAN_TT_MANG_THAI).format("YYYYMMDD") : "";
    chamSocDieuTriHIV.NGAY_BAT_DAU_DT_CTX = this.chamSocDieuTriHIVData.NGAY_BAT_DAU_DT_CTX ? moment(this.chamSocDieuTriHIVData.NGAY_BAT_DAU_DT_CTX).format("YYYYMMDD") : "";
    chamSocDieuTriHIV.NGAY_BAT_DAU_XU_TRI = this.chamSocDieuTriHIVData.NGAY_BAT_DAU_XU_TRI ? moment(this.chamSocDieuTriHIVData.NGAY_BAT_DAU_XU_TRI).format("YYYYMMDD") : "";
    chamSocDieuTriHIV.NGAY_KET_THUC_XU_TRI = this.chamSocDieuTriHIVData.NGAY_KET_THUC_XU_TRI ? moment(this.chamSocDieuTriHIVData.NGAY_KET_THUC_XU_TRI).format("YYYYMMDD") : "";
    chamSocDieuTriHIV.MA_PHAC_DO_DIEU_TRI = this.chamSocDieuTriHIVData.MA_PHAC_DO_DIEU_TRI || "";
    chamSocDieuTriHIV.MA_BAC_PHAC_DO = this.chamSocDieuTriHIVData.MA_BAC_PHAC_DO ? this.chamSocDieuTriHIVData.MA_BAC_PHAC_DO.ID : "";
    chamSocDieuTriHIV.SO_NGAY_CAP_THUOC_ARV = this.chamSocDieuTriHIVData.SO_NGAY_CAP_THUOC_ARV || "";
    chamSocDieuTriHIV.DU_PHONG = this.chamSocDieuTriHIVData.DU_PHONG || "";

    const jsonData = [{
      'type': 'CT00',
      'content': chamSocDieuTriHIV,
    }];

    return this.commonService.GenDataGiayToBHYT(jsonData,kmd);
  }
  genDataBoSungBHYT(e = '') {
    this.chamSocDieuTriHIVDataBoSung = {}
    if (e == '06') {
      const jsonData = {
        'HSDLGBT Id="SigningData"': {
          "CHAMSOCDIEUTRI": this.chamSocDieuTriHIVDataBoSung,
          "CHUKYDONVI": {}
        }
      }
      return this.commonService.OBJtoXML(jsonData);
    } else {
      const jsonData = [{
        'type': 'CT09',
        'content': this.chamSocDieuTriHIVDataBoSung,
      }];

      return this.commonService.GenDataGiayToBHYT(jsonData);
    }
  }
  @ViewChild(GiayToBhytSearchHeaderComponent) private giayToBhytSearch!: GiayToBhytSearchHeaderComponent;
  documentId: any;

  ngOnInit(): void {
  }
  MA_BAC_PHAC_DO: DM[] = [{
    ID: '1',
    MA: '1',
    MO_TA: '1. Phác đồ bậc 1'
  }, {
    ID: '2',
    MA: '2',
    MO_TA: '2. Phác đồ bậc 2'
  }, {
    ID: '3',
    MA: '3',
    MO_TA: '3. Phác đồ bậc 3'
  }];
  MA_LYDO_DTRI: DM[] = [{
    ID: '1',
    MA: '1',
    MO_TA: '1. Bệnh nhân HIV mới đăng ký lần đầu'
  }, {
    ID: '2',
    MA: '2',
    MO_TA: '2. Bệnh nhân HIV chưa điều trị ARV chuyển tới'
  }, {
    ID: '3',
    MA: '3',
    MO_TA: '3. Bệnh nhân HIV đã điều trị ARV chuyển tới'
  }, {
    ID: '4',
    MA: '4',
    MO_TA: '4. Bệnh nhân HIV chưa điều trị ARV nay điều trị lại'
  }, {
    ID: '3',
    MA: '3',
    MO_TA: '5. Bệnh nhân HIV chưa điều trị ARV đăng ký lại'
  }];
  LOAI_DTRI_LAO: DM[] = [{
    ID: '1',
    MA: '1',
    MO_TA: '0. Không điều trị lao'
  }, {
    ID: '2',
    MA: '2',
    MO_TA: '1. Điều trị lao tiềm ẩn'
  }, {
    ID: '3',
    MA: '3',
    MO_TA: '2. Điều trị lao'
  }, {
    ID: '4',
    MA: '4',
    MO_TA: '3. Điều trị lao kháng thuốc'
  }];
  PHACDO_DTRI_LAO: DM[] = [{
    ID: '1',
    MA: '1',
    MO_TA: '1. Phác đồ 2RHZE/4RHE'
  }, {
    ID: '2',
    MA: '2',
    MO_TA: '2. Phác đồ 2RHZE/4RH'
  }, {
    ID: '3',
    MA: '3',
    MO_TA: '3. Phác đồ 2RHZE/10RHE'
  }, {
    ID: '4',
    MA: '4',
    MO_TA: '4. Phác đồ 2RHZE/10RH'
  }, {
    ID: '5',
    MA: '5',
    MO_TA: '5. Phác đồ INH'
  }, {
    ID: '6',
    MA: '6',
    MO_TA: '6. Phác đồ 3HP'
  }, {
    ID: '7',
    MA: '7',
    MO_TA: '7. Phác đồ 1HP'
  }, {
    ID: '8',
    MA: '8',
    MO_TA: '8. Phác đồ 3HR'
  }, {
    ID: '9',
    MA: '9',
    MO_TA: '9. Phác đồ 4R'
  }, {
    ID: '10',
    MA: '10',
    MO_TA: '10. Phác đồ 6L'
  }, {
    ID: '11',
    MA: '11',
    MO_TA: '11. Phác đồ khác'
  }
  ];
  MA_LYDO_XNTL_VR: DM[] = [{
    ID: '1',
    MA: '1',
    MO_TA: '1. Thường quy'
  }, {
    ID: '2',
    MA: '2',
    MO_TA: '2. Nghi ngờ thất bại điều trị'
  }, {
    ID: '3',
    MA: '3',
    MO_TA: '3. Khác'
  }];
  KQ_XNTL_VR: DM[] = [{
    ID: '1',
    MA: '1',
    MO_TA: '1. Không phát hiện'
  }, {
    ID: '2',
    MA: '2',
    MO_TA: '2. Dưới 50 bản sao/ml'
  }, {
    ID: '3',
    MA: '3',
    MO_TA: '3. Từ 50 đến dưới 200 bản sao/ml'
  }, {
    ID: '4',
    MA: '4',
    MO_TA: '4. Từ 200 đến 1000 bản sao/ml'
  }, {
    ID: '5',
    MA: '5',
    MO_TA: '5. Trên 1000 bản sao/ml'
  }];
  MA_LOAI_BN: DM[] = [{
    ID: '1',
    MA: '1',
    MO_TA: '1. Người nhiễm HIV'
  }, {
    ID: '2',
    MA: '2',
    MO_TA: '2. Trẻ phơi nhiễm với HIV'
  }, {
    ID: '3',
    MA: '3',
    MO_TA: '3. Điều trị dự phòng trước phơi nhiễm'
  }, {
    ID: '4',
    MA: '4',
    MO_TA: '4. Điều trị dự phòng sau phơi nhiễm'
  }, {
    ID: '5',
    MA: '5',
    MO_TA: '5. Khác'
  }];
  MA_TINH_TRANG_DK: DM[] = [{
    ID: '1',
    MA: '1',
    MO_TA: '1. Trẻ dưới 18 tháng sinh ra từ mẹ nhiễm HIV'
  }, {
    ID: '2',
    MA: '2',
    MO_TA: '2. Phơi nhiễm'
  }, {
    ID: '3',
    MA: '3',
    MO_TA: '3. Đang điều trị lao'
  }, {
    ID: '4',
    MA: '4',
    MO_TA: '4. Có bầu'
  }, {
    ID: '5',
    MA: '5',
    MO_TA: '5. Chuyển dạ'
  }, {
    ID: '6',
    MA: '6',
    MO_TA: '6. Sau sinh'
  }, {
    ID: '7',
    MA: '7',
    MO_TA: '7. Viêm gan'
  }, {
    ID: '8',
    MA: '8',
    MO_TA: '8. Nghiện chích ma túy'
  }, {
    ID: '9',
    MA: '9',
    MO_TA: '9. Khác'
  }];
  LAN_XN_PCR: DM[] = [{
    ID: '1',
    MA: '1',
    MO_TA: '1. Lần 1'
  }, {
    ID: '2',
    MA: '2',
    MO_TA: '2. Lần 2'
  }, {
    ID: '3',
    MA: '3',
    MO_TA: '3. Lần 3 (chỉ áp dụng trong lần 1 âm tính và lần 2 dương tính)'
  }];
  MA_KQ_XN_PCR: DM[] = [{
    ID: '1',
    MA: '1',
    MO_TA: '0. Âm tính'
  }, {
    ID: '2',
    MA: '2',
    MO_TA: '1. Dương tính'
  }];
  MA_XU_TRI: DM[] = [{
    ID: '1',
    MA: '1',
    MO_TA: '1. Điều trị ARV'
  }, {
    ID: '2',
    MA: '2',
    MO_TA: '2. Điều trị lao'
  }, {
    ID: '3',
    MA: '3',
    MO_TA: '3. Dự phòng lao'
  }, {
    ID: '4',
    MA: '4',
    MO_TA: '4. Cotrimoxazol'
  }, {
    ID: '5',
    MA: '5',
    MO_TA: '5. PLTMC'
  }, {
    ID: '6',
    MA: '6',
    MO_TA: '6. Điều trị viêm gan'
  }, {
    ID: '7',
    MA: '7',
    MO_TA: '7. Khác'
  }];
  ngOnChanges() {
    let dataReturn = this.chamSocDieuTriHIV;
    if(this.selectGiayToLienQuan && ! this.isCreateGiayToLienQuan) {
      dataReturn = Object.assign(dataReturn, this.selectGiayToLienQuan);
    }
    if(dataReturn){
      dataReturn.MA_LK = this.patientInfo.reception_queue_id
    }
    this.shareDataService.pushData(dataReturn, 'hsba_cs_dt_hiv');
  }
  handleSavePushXml06 = async () => {
    await this.saveData("pushXml06");
  };
  saveData(type = '') {
    try {
      if (!this.patient) {
        this.messageService.error(
          'Vui lòng chọn bệnh nhân',
          'home.error',
        );
        return ;
      }

      this.chamSocDieuTriHIVData.xmlBhyt = this.genDataBHYT();
      this.chamSocDieuTriHIVData.xmlFileBoSung = this.genDataBoSungBHYT();
      this.chamSocDieuTriHIVData.xmlDeAn06 = this.genDataBoSungBHYT("06");
      this.chamSocDieuTriHIVData.branch_id = this.storage.getBranch().branch_id;
      this.chamSocDieuTriHIVData.patient_info = this.patient;
      this.chamSocDieuTriHIVData.NGAY_TV_UNIX = moment(this.chamSocDieuTriHIVData.NGAY_TV).unix();
      this.chamSocDieuTriHIVData.TINH_TRANG_TV = (this.chamSocDieuTriHIVData.TINH_TRANG_TV) ? this.chamSocDieuTriHIVData.TINH_TRANG_TV : false,
        this.chamSocDieuTriHIVData.branch_id = this.storage.getBranch().branch_id;
    } catch (e) {
      this.isDisabled = false;
      this.chamSocDieuTriHIVData.error(
        'Vui lòng nhập đầy đủ thông tin!',
        'home.error',
      );
      return;
    }
    this.menuService.viewAsProcessed();
  }
  save(data: Record<string, any>, type: string = '') {
    if (this.patient) {
      //todo: neu day bhxy -> luu ma ket noi voi bhxh vao data
      if (type != '' && (type == 'pushXml' || type == 'pushXml06')) {
        const obj = {
          'xml': (type == 'pushXml06') ? data.xmlDeAn06 : data.xmlFileBoSung,
          'act': (type == 'pushXml06') ? '06' : '',
          'branch_id': this.storage.getBranch().branch_id,
        };

        const patient = this.patient;
        this.emrService.pushGiayTo2Bhyt(obj).subscribe(res => {
          if (res.MaKetQua == '200' && res.MaGD != null) {
            if (type == 'pushXml06') {
              data.id_ket_noi_de_an_06 = res.MaGD;
            } else {
              data.id_ket_noi_bhxh = res.MaGD;
            }

            this.emrService.saveEMR(
              data,
              patient.patient_id,
              patient.reception_queue_id,
              this.recordId || '',
              patient.in_patient,
              this.FORM_NAME,
              1,
              patient.medical_record_no//todo: type:1 là object -> chỉ 1 phiếu, type:2 là array -> tạo nhiều phiếu
            ).subscribe((data: Partial<EhosResponse<boolean>>) => {
              if (data.status === true) {
                this.toastrTranslateService.success(
                  'toast.successfully_save_information',
                  'nav.save',
                );
                this.getAfterSaveSuccessful();
              } else {
                this.toastrTranslateService.error(
                  data.results + '',
                  'home.error',
                );
              }
            });
          } else {
            this.toastrTranslateService.error(
              res.results + '',
              'home.error',
            );
          }
        });
      } else {
        //todo: Luu du lieu thong thuong
        this.emrService.saveEMR(
          data,
          this.patient.patient_id,
          this.patient.reception_queue_id,
          this.recordId || '',
          this.patient.in_patient,
          this.FORM_NAME,
          1, //todo: type:1 là object -> chỉ 1 phiếu, type:2 là array -> tạo nhiều phiếu
          this.patient.medical_record_no
        ).subscribe((data: Partial<EhosResponse<boolean>>) => {
          if (data.status === true) {
            this.toastrTranslateService.success(
              'toast.successfully_save_information',
              'nav.save',
            );
            this.getAfterSaveSuccessful();
          } else {
            this.toastrTranslateService.error(
              data.results + '',
              'home.error',
            );
          }
        });
      }
    } else {
      this.toastrTranslateService.error(
        'Vui lòng chọn bệnh nhân',
        'home.error',
      );
    }
  }
  private getAfterSaveSuccessful() {
    this.giayToBhytSearch.getPatientBySearch(this.patient);
  }
  downloadXml = async () => {
    const data = this.genDataBHYT(false);
    const filename = moment().unix() + '.xml';
    await this.commonService.downloadFileXml(data, filename);
  }
  genMaXuTri() {
    let maXuTri = "";

    maXuTri += (this.chamSocDieuTriHIVData.MA_XU_TRI.ID && this.chamSocDieuTriHIVData.MA_XU_TRI.ID) ? this.chamSocDieuTriHIVData.MA_XU_TRI.ID : "_";
    maXuTri += ":" + ((this.chamSocDieuTriHIVData.MA_XU_TRI.ID && this.chamSocDieuTriHIVData.MA_XU_TRI.ID) ? this.chamSocDieuTriHIVData.MA_XU_TRI.ID : "_");
    maXuTri += ":" + ((this.chamSocDieuTriHIVData.MA_XU_TRI.ID && this.chamSocDieuTriHIVData.MA_XU_TRI.ID) ? this.chamSocDieuTriHIVData.MA_XU_TRI.ID : "_");

    this.chamSocDieuTriHIVData.MA_XU_TRI = maXuTri;
  }

  genXML() {
    let obj = {
      'HSDLGCS Id="SigningData"': {
        HSBA_CS_DT_HIV_AIDS: {
          'MA_LK': this.patientInfo.reception_queue_id,
          'MA_THE_BHYT': this.chamSocDieuTriHIVData.MA_THE_BHYT,
          'SO_CCCD': this.chamSocDieuTriHIVData.SO_CCCD,
          'NGAYKD_HIV': moment(this.chamSocDieuTriHIVData.NGAYKD_HIV).format("YYYYMMDD"),
          'BDDT_ARV': moment(this.chamSocDieuTriHIVData.BDDT_ARV).format("YYYYMMDD"),
          'MA_PHAC_DO_DIEU_TRI_BD': this.chamSocDieuTriHIVData.MA_PHAC_DO_DIEU_TRI_BD,
          'MA_BAC_PHAC_DO_BD': this.chamSocDieuTriHIVData.MA_BAC_PHAC_DO_BD.ID,
          'MA_LYDO_DTRI': this.chamSocDieuTriHIVData.MA_LYDO_DTRI.ID,
          'LOAI_DTRI_LAO': this.chamSocDieuTriHIVData.LOAI_DTRI_LAO.ID,
          'PHACDO_DTRI_LAO': this.chamSocDieuTriHIVData.PHACDO_DTRI_LAO.ID,
          'NGAYBD_DTRI_LAO': moment(this.chamSocDieuTriHIVData.NGAYBD_DTRI_LAO).format("YYYYMMDD"),
          'NGAYKT_DTRI_LAO':  moment(this.chamSocDieuTriHIVData.NGAYKT_DTRI_LAO).format("YYYYMMDD"),
          'MA_LYDO_XNTL_VR': this.chamSocDieuTriHIVData.MA_LYDO_XNTL_VR.ID,
          'NGAY_XN_TLVR': moment(this.chamSocDieuTriHIVData.NGAY_XN_TLVR).format("YYYYMMDD"),
          'KQ_XNTL_VR': this.chamSocDieuTriHIVData.KQ_XNTL_VR.ID,
          'NGAY_KQ_XN_TLVR': moment(this.chamSocDieuTriHIVData.NGAY_KQ_XN_TLVR).format("YYYYMMDD"),
          'MA_LOAI_BN': this.chamSocDieuTriHIVData.MA_LOAI_BN.ID,
          'MA_TINH_TRANG_DK': this.chamSocDieuTriHIVData.MA_TINH_TRANG_DK,
          'LAN_XN_PCR': this.chamSocDieuTriHIVData.LAN_XN_PCR.ID,
          'NGAY_XN_PCR': moment(this.chamSocDieuTriHIVData.NGAY_XN_PCR).format("YYYYMMDD"),
          'NGAY_KQ_XN_PCR': moment(this.chamSocDieuTriHIVData.NGAY_KQ_XN_PCR).format("YYYYMMDD"),
          'MA_KQ_XN_PCR': this.chamSocDieuTriHIVData.MA_KQ_XN_PCR.ID,
          'NGAY_NHAN_TT_MANG_THAI': moment(this.chamSocDieuTriHIVData.NGAY_NHAN_TT_MANG_THAI).format("YYYYMMDD"),
          'NGAY_BAT_DAU_DT_CTX': moment(this.chamSocDieuTriHIVData.NGAY_BAT_DAU_DT_CTX).format("YYYYMMDD"),
          'MA_XU_TRI': this.chamSocDieuTriHIVData.MA_XU_TRI.ID && this.chamSocDieuTriHIVData.MA_XU_TRI.ID ? this.chamSocDieuTriHIVData.MA_XU_TRI.ID : ";",
          'NGAY_BAT_DAU_XU_TRI': moment(this.chamSocDieuTriHIVData.NGAY_KET_THUC_XU_TRI).format("YYYYMMDD"),
          'NGAY_KET_THUC_XU_TRI': moment(this.chamSocDieuTriHIVData.NGAY_KET_THUC_XU_TRI).format("YYYYMMDD"),
          'MA_PHAC_DO_DIEU_TRI': this.chamSocDieuTriHIVData.MA_PHAC_DO_DIEU_TRI,
          'MA_BAC_PHAC_DO': this.chamSocDieuTriHIVData.MA_BAC_PHAC_DO.ID,
          'SO_NGAY_CAP_THUOC_ARV': this.chamSocDieuTriHIVData.SO_NGAY_CAP_THUOC_ARV,
          'DU_PHONG': this.chamSocDieuTriHIVData.DU_PHONG,
        },
        CHUKYDONVI: ""
      }
    }

    return this.commonService.OBJtoXML(obj);

  }
}
