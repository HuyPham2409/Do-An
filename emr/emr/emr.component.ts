import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ReceptionService } from '../../../services/reception.service';
import { SHARE_DATA_KEYS, ShareDataService } from '../../../services/share-data.service';
import { BehaviorSubject, EMPTY, Observable, Subscription } from 'rxjs';
import { EmrService } from '../../../services/emr.service';
import * as moment from 'moment';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ToastrTranslateService } from '@shared/services/toastr-translate-service';
import { LaboratoryService } from '../../laboratory/laboratory.service';
import { TongKetBenhAn, TTRV } from '../../../model/emr/tong_ket_benh_an';
import { ServiceService } from '../../../services/service.service';
import { KhamBenh } from '../../../model/emr/kham_benh';
import { Patient_EMR } from '../../../model/Patient_EMR';
import { DataSource } from '@angular/cdk/table';
import { QLNB } from '../../../model/emr/quan_ly_nguoi_benh';
import { PPTTTE } from '../../../model/giay_to_dinh_kem_emr/phieu_phau_thuat_thu_thuat_emr';
import { LocalStorageService } from '@shared';
import { HoiBenh } from '../../../model/emr/hoi_benh';
import { LyDo } from '../../../model/emr/benh_an';
import { Chan_doan } from '../../../model/emr/chan_doan';
import { PrintService } from '../../../services/print.service';
import { DataPaperByCategory } from '../../../model/giay_to_dinh_kem_emr/giay_to_dinh_kem';
import { ComponentUtils } from '../../laboratory/utils/component-utils';
import { LabratoryMenuService } from '../../../services/laboratory/labratory-menu.service';
import { SpermFormDefault } from '../../../model/laboratory/form';
import { Globals } from '../../../app.globals';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmActionComponent } from '../../components/confirm-action/confirm-action.component';
import { ActiveType, EmrPatientInfo, HisPatientInfo, InpatientFile } from '../../../model/emr/patient/patient-info';
import { TypeViewEMR } from '../../../model/emr/type-view';
import { SexEnum } from '../../../model/patient';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { CategoryGenaralService } from '../../../services/category-genaral.service';
import { HttpClient } from '@angular/common/http';
import { DocumentExam, DocumentType, TypeCreate, UploadFile } from '../../../model/emr/document-exam/document-exam';
import { benhan_YHCT_noi_tru } from '../../../model/emr/benh-an-YHCT-noitru';
import {
  SearchReceptionQueueComponent,
  SearchReceptionQueueDataChangeEvent,
} from '@shared/components/search-reception-queue/search-reception-queue.component';
import { TitleService } from '../../../services/title/title.service';
import { EmrComponentBase } from '../abstract/emr.component.base';
import { PrintResultXN } from '../../../model/print/print_xn';
import { Service } from '../../../model/service';
import { IPrint } from '../../../model/print';
import { Results } from '../../../model/results';
import { SelectionModel } from '@angular/cdk/collections';
import { FrontendConfigService } from '../../../services/frontend-config/frontend-config.service';
import { PatientFamily } from '../../../model/patient/patient-family';
import { GetServiceUsedResponseResults } from '../../../model/service/response';
import { Query } from '../../../model/api/query';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-emr',
  templateUrl: './emr.component.html',
  styleUrls: ['./emr.component.scss'],
  providers: [ReceptionService, EmrService],
})
export class EmrComponent extends EmrComponentBase implements OnInit, AfterViewInit, OnDestroy {
  searchText="";
  private readonly _shareDataKeys = SHARE_DATA_KEYS;

  @ViewChild('ingredientInput') ingredientInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('foodInput') foodInput: ElementRef<HTMLInputElement> | undefined;

  @ViewChild(SearchReceptionQueueComponent) search!: SearchReceptionQueueComponent;

  isTreeWidthExpanded = false;

  isLoadingGetBA = false;
  isLoadingGetLoaiGiayTo: boolean[] = [];
  isLoadingGetGiayTo: Record<string, boolean> = {};
  listRQI = [];
  public optionLoaiGiayToSelect = new SelectionModel<number>(false, []);
  public optionGiayToSelect = new SelectionModel<Service>(false, [], false,
    (s1, s2) =>
      (s1.id !== undefined && s2.id !== undefined && s1.id === s2.id) ||
      (s1._id !== undefined && s2._id !== undefined && s1._id.$id === s2._id.$id));

  dataSubmiss : any = {};

  documentCountByFormId: Record<string, {count: number}> = {};

  constructor(private receptionService: ReceptionService,
              private shareDataService: ShareDataService,
              private emrService: EmrService,
              private http: HttpClient,
              private menuService: LabratoryMenuService,
              private localStorageService: LocalStorageService,
              private serviceService: ServiceService,
              private printService: PrintService,
              private toastrTranslateService: ToastrTranslateService,
              private laboratoryService: LaboratoryService,
              private globals: Globals,
              private categoryService: CategoryGenaralService,
              public dialog: MatDialog,
              title: TitleService,
              private proxy: FrontendConfigService,
              private cookieService: CookieService
  ) {
    super();
    this.pullSubscriptions = this._shareDataKeys.reduce<Record<string, Subscription>>((output, key) => {
      output[key] = new Subscription();
      return output;
    }, {});
    this.dataSubmiss = {
      token: this.cookieService.get('access_token'),
      api_domain: this.globals.API_DOMAIN,
      hc: this.patientInfo
    }
    title.setTitle('menu.emr.emr');
  }

  initPatientInfo(): EmrPatientInfo {
    return {
      actives: [],
      patient_health_insurance_selected : {insurance_number: ""}
    };
  }

  separatorKeysCodes: number[] = [ENTER, COMMA];
  patientInfo: EmrPatientInfo = this.initPatientInfo();
  quanLyNguoiBenh: QLNB = new QLNB();

  listPatient : any;
  LIST_BLOOD_TYPES = [
    {id: 0, name: "Không xác định"},
    {id: 1, name: "A"},
    {id: 2, name: "B"},
    {id: 3, name: "AB"},
    {id: 4, name: "O"}
  ];
  LIST_RHESUS_FACTOR = [
    {id: 0, name: "Không xác định"},
    {id: 1, name: "Dương tính"},
    {id: 2, name: "Âm tính"}
  ];
  protected subscriptions = new Subscription();
  semenForm = SpermFormDefault;
  public isCreatingNew: boolean = true;

  totalRow: number = 0; //todo: tổng row tìm kiềm đc
  pageSize: number = 10; //todo: mặc định tìm kiếm 10 row trên 1 page
  currentPage:number = 0; //todo: page hiện tại

  /**
   * Danh sách loại giấy tờ
   */
  listLoaiGiayTo: DocumentExam[] = [];

  listHisResults :any = []; //todo: list các phiếu kết quả từ /geh
  listLoaiGiayToCreate: any = []; //todo: loại giấy tờ có chức năng tạo mới
  patientInfoHis: HisPatientInfo = {}; //todo: thông tin bệnh nhân gốc của his
  LIST_ADVANCE_SEARCH : any = [];
  //todo: bệnh án

  //#region Form ID bệnh án
  ID_BENH_AN_NOI_KHOA: number = 0;
  ID_BENH_AN_IUI = 0;
  ID_BENH_AN_SAN_PHU_KHOA = 0;
  ID_BENH_AN_NGOAI_KHOA: number = 0;
  ID_BENH_AN_NGOAI_TRU_CHUNG: number = 27;
  ID_BENH_AN_NGOAI_TRU_RMH: number = 0;
  ID_BENH_AN_NGOAI_TRU_TMH: number = 0;
  ID_BENH_AN_NGOAI_TRU_PHCN: number = 0;
  ID_BENH_AN_IVF: number = 0;
  ID_BENH_AN_TAI_MUI_HONG: number = 0;
  ID_BENH_AN_RANG_HAM_MAT: number = 0;
  ID_BENH_AN_DA_LIEU: number = 0;
  ID_BENH_AN_NHI_KHOA: number = 0;
  ID_BENH_AN_SAN_KHOA = 0;
  ID_BENH_AN_SO_SINH: number = 0;
  ID_BENH_AN_DIEU_DUONG_PHCN: number = 0;
  ID_BENH_AN_PHU_KHOA = 0;
  ID_BENH_AN_TRUYEN_NHIEM: number = 0;
  ID_BENH_AN_UNG_BUOU: number = 0;
  ID_BENH_AN_HUYET_HOC_TRUYEN_MAU: number = 0;
  ID_BENH_AN_BONG: number = 0;
  ID_BENH_AN_MAT_DAY_MAT: number = 0;
  ID_BENH_AN_YHCT_NOI_TRU: number = 0;
  ID_BENH_AN_MAT_LAC_SUP_MI: number = 0;
  ID_BENH_AN_CHAN_TAY_MIENG: number = 0;
  ID_BENH_AN_NAO_PHA_THAI: number = 0;
  ID_BENH_AN_TAM_THAN: number = 0;
  ID_BENH_AN_PHACO = 0;
  ID_BENH_AN_MAT: number =0;
  ID_BENH_AN_XA_PHUONG: number = 0;
  ID_BENH_AN_PHAU_THUAT_KHUC_XA: number = 0;
  ID_BENH_AN_MAT_CHAN_THUONG: number = 0;
  ID_BENH_AN_MAT_TRE_EM: number = 0;
  ID_BENH_AN_NGOAI_TRU_THAN_NHAN_TAO: number = 0;
  ID_BENH_AN_NGOAI_TRU_HAM_MAT = 0;
  ID_BENH_AN_NGOAI_TRU_RANG = 0;
  ID_BENH_AN_MAT_GLOCOM: number = 0;
  //#endregion

  //#region Bệnh án subscriptions
  ketquaCLS: TongKetBenhAn = new TongKetBenhAn(); //todo: các kết quả cls lấy từ geh -> component tong ket ba
  ketquakb: KhamBenh = new KhamBenh(); //todo: các kết quả khám bệnh lấy từ geh -> component khám bệnh
  hoibenhNgoaiTru : HoiBenh = new HoiBenh(); //todo: kết quả khám bệnh RHM ngoại trú lấy từ geh -> component hỏi bệnh
  lyDoVaoVienNgoaiTru : LyDo = new LyDo();// todo: lý do vào viện của ngoại trú -> component ly-do-vao-vien
  chanDoan : Chan_doan = new Chan_doan();// todo: chẩn đoán từ his -> component chan-doan
  subsHC: Subscription = new Subscription();//todo: hành chính
  subsKB: Subscription = new Subscription();//todo: khám bệnh
  subsHB: Subscription = new Subscription();//todo: hỏi bệnh
  subsQLNB: Subscription = new Subscription();//todo: quản lý người bệnh
  subsChanDoan: Subscription = new Subscription();//todo: chẩn đoán
  subsTTRV : Subscription = new Subscription();//todo: tình trạng ra viện
  subsCDTV : Subscription = new Subscription(); //todo: Chan đoán tử vong
  subsLyDoVV: Subscription = new Subscription(); //todo: Lý do vào viện
  subsCDKDT : Subscription = new Subscription(); //todo: Chan đoán khi vào khoa điều trị
  subsTienLuong: Subscription = new Subscription(); //todo: Tiên lượng
  subsKhamMat: Subscription = new Subscription(); //todo: Tiên lượng
  subsYHCTNoiTru: Subscription = new Subscription();
  subsTongKetBA: Subscription = new Subscription(); //todo: Tổng kết BA
  subsBSDieuTri: Subscription = new Subscription(); //todo: Bác sĩ điều trị
  subsEmrIui: Subscription = new Subscription(); //todo: Benh an IUI
  subsEmrHBSoSinh: Subscription = new Subscription(); //todo: Hỏi bệnh So Sinh
  subsKBSoSinh: Subscription = new Subscription(); //todo: Khám bệnh So Sinh
  subsTNMGiaiDoan: Subscription = new Subscription(); //todo: T N M Giai đoạn
  subsTienSuBenh: Subscription = new Subscription(); //todo: Tiền sử bệnh
  subsThiLuc: Subscription = new Subscription(); //todo: Thị lực
  subsThiLucRaVien: Subscription = new Subscription(); //todo: Thị lực
  subsKhamMatTreEm: Subscription = new Subscription(); //todo: Khám mắt trẻ em
  subsKhamMatGlocom: Subscription = new Subscription(); //todo: Khám mắt Glocom
  subsChanDoanMat: Subscription = new Subscription(); //todo: Chẩn đoán mắt
  subsHoiBenhGlocom: Subscription = new Subscription(); //todo: Hỏi bệnh mắt Glocom
  subsDienBienBenhYLenh: Subscription = new Subscription(); //todo: Khám mắt trẻ em
  subsKhamMatChanThuong: Subscription = new Subscription(); //todo: Khám mắt chấn thương
  subsNgoaiTruThanNhanTao: Subscription = new Subscription(); //todo: Ngoại trú thận nhân tạo
  //#endregion

  pullSubscriptions: Record<string, Subscription>;

  //#region Form ID giấy tờ liên quan
  ID_KHAM_VAO_VIEN: number = 1;
  ID_GIAY_CHUYEN_VIEN: number = 0;
  ID_KHAM_THEO_YEU_CAU: number = 5;
  ID_THEO_DOI_DI_UNG_THUOC: number = 5078;
  ID_KHAM_CHUYEN_KHOA: number = 12;
  ID_BIEN_BAN_HOI_CHAN: number = 0;
  ID_BIEN_BAN_HC_KHANG_SINH: number = 5080;
  ID_PHIEU_XQUANG: number = 0;
  ID_DIEU_TRI_NOI_TRU: number = 0;
  ID_DIEU_TRI_NG_TRU: number = 0;
  ID_FORM_GIAY_CHUNG_NHAN_THUONG_TICH: number = 0;
  ID_FORM_KIEM_DIEM_TU_VONG: number = 0;
  ID_CHUNG_NHAN_PHAU_THUAT : number = 0;
  ID_FORM_PHIEU_LINH_PHAT_MAU : number = 15;
  ID_FORM_THANH_TOAN : number = 36;
  ID_PHIEU_CHAM_SOC: number = 0;
  ID_TRUYEN_DICH: number = 5022;
  ID_PHIEU_MRI: number = 0;
  ID_FORM_CT_SCANNER : number = 0;
  ID_FORM_SIEU_AM : number = 0;
  ID_FORM_DIEN_TIM: number = 0;
  ID_FORM_DIEN_NAO: number = 0;
  ID_FORM_NOI_SOI: number = 0;
  ID_FOMR_XN_HUYET_HOC: number = 0;
  ID_FORM_XN_NUOC_TIEU_PHAN_CHOC_DO: number = 0;
  ID_FORM_ID_XN_SINH_HOA: number = 0;
  ID_FORM_ID_XN_MIEN_DICH: number = 0;
  ID_FORM_ID_XN_VI_SINH: number = 0;
  ID_DEM_GAC = 0;
  ID_PHIEU_GAY_ME_HOI_SUC = 0;
  ID_PHIEU_LOC_MAU_LIEN_TUC = 0;
  //#endregion

  isCDHA: boolean  = false;
  isCreateGiayToLienQuan : boolean = false;//todo trangh thái tạo mới giấy tờ

  /**
   * Danh sách các giấy tờ cùng loại
   * @property results - Mảng
   * @property _id.$id - ???
   */
  listGiayTo: any = {};

  subsBienBanHoiChan: Subscription = new Subscription(); //todo: form biên bản hội chẩn
  listPPTTTE: Array<PPTTTE> = new Array<PPTTTE>(); //todo: lấy ds các phiếu phẫu thuật thủ thuật từ geh -> đổ xuống component;
  subsPPTTTE: Subscription = new Subscription();
  //todo: end loại giấy tờ

  /**
   * ID bệnh án
   */
  benhAnSelect : number = 0;

  listGiayToLienQuan: DataPaperByCategory = new DataPaperByCategory();
  idEMR = "";
  listCategory: any = {};
  filterEMR: any = {txtSearchPatient: "", dateSearch:{start: moment().subtract(1, 'month'), end: moment()}};
  displayedColumns: string[] = [];
  displayedColumnsCNPTTT : string[] = ["Ngày", "Kết quả", "Bác sĩ khám"];

  /**
   * Nếu không xem bệnh án và không tạo mới giấy tờ, có thể xem PDF
   * @property viewBenhAn - Cho phép xem, tạo và sửa bệnh án
   * @property createGiayTo - Cho phép tạo và sửa giấy tờ
   */
  stateEMR = {
    viewBenhAn: false,
    createGiayTo: false,
    editGiayTo: false,
    print: false,
    save: false
  }
  selectGiayToLienQuan: any;
  loaiGiayToUpload: DocumentExam = {};
  dataEMR:any = {};
  dataGiayToLienQuan: any = {};
  listTypeViewEMR: any  = [
    {
    id:0,
    name: "Tạo mới bệnh án"
  },
    {
      id:1,
      name: "Xem các bệnh án chưa ký"
    },
    {
      id:2,
      name: "Xem các bệnh án đã ký"
    }
  ];
  listBA: any = [];
  listIngredient = new Array<ActiveType>();

  isPatientExpanded: boolean = false;
  isAllergyExpanded: boolean = false;
  isFamilyExpanded = false;

  relationships: PatientFamily[] = [];

  ngOnInit(): void {
    this.idEMR = "";
    this.filterEMR.typeViewEMR = this.listTypeViewEMR[0];
    this.variableGlobal = this.proxy.getFrontendConfig();
    this.init();
    this.ID_BENH_AN_IUI = this.variableGlobal["EMR_BENH_AN_IUI"] ? Number(this.variableGlobal["EMR_BENH_AN_IUI"].value) : 0;
    this.ID_BENH_AN_SAN_PHU_KHOA = this.variableGlobal["EMR_BENH_AN_SAN_PHU_KHOA"] ? Number(this.variableGlobal["EMR_BENH_AN_SAN_PHU_KHOA"].value) : 0;
    this.ID_BENH_AN_NOI_KHOA = this.variableGlobal["EMR_BENH_AN_NOI_KHOA"] ? Number(this.variableGlobal["EMR_BENH_AN_NOI_KHOA"].value) : 0;
    this.ID_BENH_AN_NGOAI_KHOA = this.variableGlobal["EMR_BENH_AN_NGOAI_KHOA"] ? Number(this.variableGlobal["EMR_BENH_AN_NGOAI_KHOA"].value) : 0;
    this.ID_BENH_AN_NGOAI_TRU_CHUNG = this.variableGlobal["EMR_BENH_AN_NGOAI_TRU_CHUNG"] ? Number(this.variableGlobal["EMR_BENH_AN_NGOAI_TRU_CHUNG"].value) : 27;
    this.ID_BENH_AN_NGOAI_TRU_RMH = this.variableGlobal["EMR_BENH_AN_NGOAI_TRU_RHM"] ? Number(this.variableGlobal["EMR_BENH_AN_NGOAI_TRU_RHM"].value) : 0;
    this.ID_BENH_AN_NGOAI_TRU_TMH = this.variableGlobal["EMR_BENH_AN_NGOAI_TRU_TMH"] ? Number(this.variableGlobal["EMR_BENH_AN_NGOAI_TRU_TMH"].value) : 0;
    this.ID_BENH_AN_TAI_MUI_HONG = this.variableGlobal["EMR_BENH_AN_TAI_MUI_HONG"] ? Number(this.variableGlobal["EMR_BENH_AN_TAI_MUI_HONG"].value) : 0;
    this.ID_BENH_AN_RANG_HAM_MAT = this.variableGlobal["EMR_BENH_AN_RANG_HAM_MAT"] ? Number(this.variableGlobal["EMR_BENH_AN_RANG_HAM_MAT"].value) : 0;
    this.ID_BENH_AN_NHI_KHOA = this.variableGlobal["EMR_BENH_AN_NHI_KHOA"] ? Number(this.variableGlobal["EMR_BENH_AN_NHI_KHOA"].value) : 0;
    this.ID_BENH_AN_DA_LIEU = this.variableGlobal["EMR_BENH_AN_DA_LIEU"] ? Number(this.variableGlobal["EMR_BENH_AN_DA_LIEU"].value) : 0;
    this.ID_BENH_AN_IVF = this.variableGlobal["EMR_BENH_AN_IVF"] ? Number(this.variableGlobal["EMR_BENH_AN_IVF"].value) : 0;
    this.ID_BENH_AN_SO_SINH = this.variableGlobal["EMR_BENH_AN_SO_SINH"] ? Number(this.variableGlobal["EMR_BENH_AN_SO_SINH"].value) : 0;
    this.ID_BENH_AN_SAN_KHOA = this.variableGlobal["EMR_BENH_AN_SAN_KHOA"] ? Number(this.variableGlobal["EMR_BENH_AN_SAN_KHOA"].value) : 0;
    this.ID_BENH_AN_PHU_KHOA = this.variableGlobal["EMR_BENH_AN_PHU_KHOA"] ? Number(this.variableGlobal["EMR_BENH_AN_PHU_KHOA"].value) : 0;
    this.ID_BENH_AN_TRUYEN_NHIEM = this.variableGlobal["EMR_BENH_AN_TRUYEN_NHIEM"] ? Number(this.variableGlobal["EMR_BENH_AN_TRUYEN_NHIEM"].value) : 0;
    this.ID_BENH_AN_HUYET_HOC_TRUYEN_MAU = this.variableGlobal["EMR_BENH_AN_HUYET_HOC_TRUYEN_MAU"] ? Number(this.variableGlobal["EMR_BENH_AN_HUYET_HOC_TRUYEN_MAU"].value) : 0;
    this.ID_BENH_AN_TAM_THAN = this.variableGlobal["EMR_BENH_AN_TAM_THAN"] ? Number(this.variableGlobal["EMR_BENH_AN_TAM_THAN"].value) : 0;
    this.ID_BENH_AN_DIEU_DUONG_PHCN = this.variableGlobal["EMR_BENH_AN_DIEU_DUONG_PHCN"] ? Number(this.variableGlobal["EMR_BENH_AN_DIEU_DUONG_PHCN"].value) : 0;
    this.ID_BENH_AN_BONG = this.variableGlobal["EMR_BENH_AN_BONG"] ? Number(this.variableGlobal["EMR_BENH_AN_BONG"].value) : 0;
    this.ID_BENH_AN_PHACO = this.variableGlobal["EMR_BENH_AN_PHACO"] ? Number(this.variableGlobal["EMR_BENH_AN_PHACO"].value) : 0;
    this.ID_BENH_AN_UNG_BUOU = this.variableGlobal["EMR_BENH_AN_UNG_BUOU"] ? Number(this.variableGlobal["EMR_BENH_AN_UNG_BUOU"].value) : 0;
    this.ID_BENH_AN_MAT_DAY_MAT = this.variableGlobal["EMR_BENH_AN_MAT_DAY_MAT"] ? Number(this.variableGlobal["EMR_BENH_AN_MAT_DAY_MAT"].value) : 0;
    this.ID_BENH_AN_YHCT_NOI_TRU = this.variableGlobal["EMR_BENH_AN_YHCT_NOI_TRU"] ? Number(this.variableGlobal["EMR_BENH_AN_YHCT_NOI_TRU"].value) : 0;
    this.ID_BENH_AN_MAT_LAC_SUP_MI = this.variableGlobal["EMR_BENH_AN_MAT_LAC_SUP_MI"] ? Number(this.variableGlobal["EMR_BENH_AN_MAT_LAC_SUP_MI"].value) : 0;
    this.ID_BENH_AN_CHAN_TAY_MIENG = this.variableGlobal["EMR_BENH_AN_CHAN_TAY_MIENG"] ? Number(this.variableGlobal["EMR_BENH_AN_CHAN_TAY_MIENG"].value) : 0;
    this.ID_BENH_AN_MAT = this.variableGlobal["EMR_BENH_AN_MAT"] ? Number(this.variableGlobal["EMR_BENH_AN_MAT"].value) : 0;
    this.ID_BENH_AN_XA_PHUONG = this.variableGlobal["EMR_BENH_AN_XA_PHUONG"] ? Number(this.variableGlobal["EMR_BENH_AN_XA_PHUONG"].value) : 0;
    this.ID_BENH_AN_PHAU_THUAT_KHUC_XA = this.variableGlobal["EMR_BENH_AN_PHAU_THUAT_KHUC_XA"] ? Number(this.variableGlobal["EMR_BENH_AN_PHAU_THUAT_KHUC_XA"].value) : 0;
    this.ID_BENH_AN_MAT_CHAN_THUONG = this.variableGlobal["EMR_BENH_AN_MAT_CHAN_THUONG"] ? Number(this.variableGlobal["EMR_BENH_AN_MAT_CHAN_THUONG"].value) : 0;
    this.ID_BENH_AN_MAT_TRE_EM = this.variableGlobal["EMR_BENH_AN_MAT_TRE_EM"] ? Number(this.variableGlobal["EMR_BENH_AN_MAT_TRE_EM"].value) : 0;
    this.ID_BENH_AN_NAO_PHA_THAI= this.variableGlobal["EMR_BENH_AN_NAO_PHA_THAI"] ? Number(this.variableGlobal["EMR_BENH_AN_NAO_PHA_THAI"].value) : 0;
    this.ID_BENH_AN_NGOAI_TRU_THAN_NHAN_TAO= this.variableGlobal["EMR_BENH_AN_NGOAI_TRU_THAN_NHAN_TAO"] ? Number(this.variableGlobal["EMR_BENH_AN_NGOAI_TRU_THAN_NHAN_TAO"].value) : 0;
    this.ID_BENH_AN_NGOAI_TRU_HAM_MAT = this.getFrontendConfigValue('EMR_BENH_AN_NGOAI_TRU_HAM_MAT');
    this.ID_BENH_AN_NGOAI_TRU_RANG = this.getFrontendConfigValue('EMR_BENH_AN_NGOAI_TRU_RANG');
    this.ID_BENH_AN_NGOAI_TRU_PHCN = this.getFrontendConfigValue('EMR_BENH_AN_NGOAI_TRU_PHUC_HOI_CHUC_NANG');
    this.ID_BENH_AN_MAT_GLOCOM = this.variableGlobal["EMR_BENH_AN_MAT_GLOCOM"] ? Number(this.variableGlobal["EMR_BENH_AN_MAT_GLOCOM"].value) : 0;


    this.ID_BIEN_BAN_HOI_CHAN = this.variableGlobal["FORM_BIEN_BAN_HOI_CHAN"] ? Number(this.variableGlobal["FORM_BIEN_BAN_HOI_CHAN"].value) : 0;
    this.ID_BIEN_BAN_HC_KHANG_SINH = this.variableGlobal["FORM_ID_BIEN_BAN_HC_KHANG_SINH"] ? Number(this.variableGlobal["FORM_ID_BIEN_BAN_HC_KHANG_SINH"].value) : 5080;
    this.ID_CHUNG_NHAN_PHAU_THUAT = this.variableGlobal["FORM_CHUNG_NHAN_PHAU_THUAT"] ? Number(this.variableGlobal["FORM_CHUNG_NHAN_PHAU_THUAT"].value) : 0;
    this.ID_THU_PHAN_UNG_THUOC = this.variableGlobal["FORM_THU_PHAN_UNG_THUOC"] ? Number(this.variableGlobal["FORM_THU_PHAN_UNG_THUOC"].value) : 0;
    this.ID_TRUYEN_DICH = this.variableGlobal["FORM_PHIEU_TRUYEN_DICH"] ? Number(this.variableGlobal["FORM_PHIEU_TRUYEN_DICH"].value) : 0;
    this.ID_THEO_DOI_DI_UNG_THUOC = this.variableGlobal["FORM_THEO_DOI_DI_UNG_THUOC"] ? Number(this.variableGlobal["FORM_THEO_DOI_DI_UNG_THUOC"].value) : 5078;
    this.ID_GIAY_CHUYEN_VIEN = this.variableGlobal["FORM_GIAY_CHUYEN_VIEN"] ? Number(this.variableGlobal["FORM_GIAY_CHUYEN_VIEN"].value) : 0;
    this.ID_PHIEU_CHAM_SOC = this.variableGlobal["FORM_PHIEU_CHAM_SOC"] ? Number(this.variableGlobal["FORM_PHIEU_CHAM_SOC"].value) : 0;
    this.ID_PHIEU_XQUANG = this.variableGlobal["FORM_PHIEU_XQUANG"] ? Number(this.variableGlobal["FORM_PHIEU_XQUANG"].value) : 0;
    this.ID_PHIEU_MRI = this.variableGlobal["FORM_PHIEU_MRI"] ? Number(this.variableGlobal["FORM_PHIEU_MRI"].value) : 0;
    this.ID_DIEU_TRI_NOI_TRU = this.variableGlobal["FORM_DIEU_TRI_NOI_TRU"] ? Number(this.variableGlobal["FORM_DIEU_TRI_NOI_TRU"].value) : 0;
    this.ID_DIEU_TRI_NG_TRU = this.variableGlobal["FORM_DIEUTRI_NT"] ? Number(this.variableGlobal["FORM_DIEUTRI_NT"].value) : 0;
    this.ID_FORM_GIAY_CHUNG_NHAN_THUONG_TICH = this.variableGlobal["FORM_GIAY_CHUNG_NHAN_THUONG_TICH"] ? Number(this.variableGlobal["FORM_GIAY_CHUNG_NHAN_THUONG_TICH"].value) : 0;
    this.ID_FORM_KIEM_DIEM_TU_VONG = this.variableGlobal["FORM_KIEM_DIEM_TU_VONG"] ? Number(this.variableGlobal["FORM_KIEM_DIEM_TU_VONG"].value) : 0;
    this.ID_FORM_CT_SCANNER = this.variableGlobal["FORM_PHIEU_CT_SCANNER"] ? Number(this.variableGlobal["FORM_PHIEU_CT_SCANNER"].value) : 0;
    this.ID_FORM_SIEU_AM = this.variableGlobal["FORM_PHIEU_SIEU_AM"] ? Number(this.variableGlobal["FORM_PHIEU_SIEU_AM"].value) : 0;
    this.ID_FORM_DIEN_TIM = this.variableGlobal["FORM_DIEN_TIM"] ? Number(this.variableGlobal["FORM_DIEN_TIM"].value) : 0;
    this.ID_FORM_NOI_SOI = this.variableGlobal["FORM_NOI_SOI"] ? Number(this.variableGlobal["FORM_NOI_SOI"].value) : 0;
    this.ID_FORM_DIEN_NAO = this.variableGlobal["FORM_DIEN_NAO"] ? Number(this.variableGlobal["FORM_DIEN_NAO"].value) : 0;
    this.ID_FOMR_XN_HUYET_HOC = this.variableGlobal["FOMR_XN_HUYET_HOC"] ? Number(this.variableGlobal["FOMR_XN_HUYET_HOC"].value) : 0;
    this.ID_FORM_XN_NUOC_TIEU_PHAN_CHOC_DO = this.variableGlobal["FORM_XN_NUOC_TIEU_PHAN_CHOC_DO"] ? Number(this.variableGlobal["FORM_XN_NUOC_TIEU_PHAN_CHOC_DO"].value) : 0;
    this.ID_FORM_ID_XN_SINH_HOA = this.variableGlobal["FORM_ID_XN_SINH_HOA"] ? Number(this.variableGlobal["FORM_ID_XN_SINH_HOA"].value) : 0;
    this.ID_FORM_ID_XN_MIEN_DICH = this.variableGlobal["FORM_ID_XN_MIEN_DICH"] ? Number(this.variableGlobal["FORM_ID_XN_MIEN_DICH"].value) : 0;
    this.ID_FORM_ID_XN_VI_SINH = this.variableGlobal["FORM_ID_XN_VI_SINH"] ? Number(this.variableGlobal["FORM_ID_XN_VI_SINH"].value) : 0;
    this.ID_PHIEU_GAY_ME_HOI_SUC = this.variableGlobal["ID_PHIEU_GAY_ME_HOI_SUC"] ? Number(this.variableGlobal["ID_PHIEU_GAY_ME_HOI_SUC"].value) : 5082;
    this.ID_DEM_GAC = this.variableGlobal["FORM_DEM_GAC"] ? Number(this.variableGlobal["FORM_DEM_GAC"].value) : 0;

    this.LIST_ADVANCE_SEARCH = this.variableGlobal["LIST_ADVANCE_SEARCH"] ? this.variableGlobal["LIST_ADVANCE_SEARCH"].value : 0;

    this.filterEMR.typeSearch = this.LIST_ADVANCE_SEARCH[0];
    this.emrService.getCategoryPapersConfig().subscribe((data: DocumentExam[]) => {
      data = data.filter(d => d.IS_EMR !== 0);
      this.listLoaiGiayTo = data;
      this.listLoaiGiayToCreate = this.getLoaiGiayToIsCreate(data);
    });

    ComponentUtils.initWithFormAndMenu(
      [this.semenForm], this.menuService, this.subscriptions,
      {
        onCreate: () => {
          this.resetForm();
          this.menuService.viewAsCreatingNew();
          this.isCreatingNew = true;
        },
        afterCreate: () => {
          this.enableForm();
        },
        onEdit: () => {
          this.isCreatingNew = false;
        },
        afterEdit: () => {
          this.enableForm();
        },
        // onSave: () => this.formDirective.ngSubmit.emit(),
        onSave: () => {
          this.saveDocumet();
          this.isCreatingNew = false;
        },
        onBack: () => this.actionRestoreGiayTo(),
        onPrint: async () => {
          if(this.stateEMR.createGiayTo){
            this.printGiayToLienQuan(
              undefined,
              this.optionGiayToSelect.selected[0],
              this.listGiayTo._id.$id);
          }
          if(this.stateEMR.viewBenhAn){
            this.printEMR();
          }
        },
        onDelete: () => {

        }
      }
    );
  }

  ngAfterViewInit() {
    let inpatientLinkData = localStorage.getItem('inpatient_linked_info');
    if(inpatientLinkData) {
      let parsedInpatientData = JSON.parse(inpatientLinkData)
      this.getPatientFromInpatientManagement(parsedInpatientData);
    }
    this.filterEMR = this.search.filterPatient;

  }

  getPatientFromInpatientManagement(data: any) {
    this.search.searchText(data.reception_queue_id, {showTableOnChange: false, getFirstWhenInputChange: true});
  }

  private enableForm() {
    this.semenForm.enable();
    // this.semenForm.get('sample').disable();
  }
  resetForm = () => {
    this.semenForm.reset();
  };

  isSuccessGetBA: boolean = false;

  /**
   * Chọn bệnh án đã lưu
   * @param id
   */
  choiceBA(id: { _id: { $id: any }, in_patient_file?: any }){
    this.isLoadingGetBA = true;

    this.optionLoaiGiayToSelect.clear();
    this.optionGiayToSelect.clear();

    this.loaiGiayToLienQuan = {};
    this.loaiGiayToUpload = {};
    this.listGiayToLienQuan = new DataPaperByCategory();
    //todo: xử lý khi chọn 1 bệnh án để xem detail.
    this.emrService.getInfoBA(this.filterEMR.typeViewEMR.id, id._id.$id).subscribe(dataReturn => {
      if (dataReturn.status === true) {
        this.patientInfo = dataReturn.results;
        // this.patientInfo = this.emrService.convertObjPatientHisToEMR(dataReturn.results.results.patientInfoHis);
        this.patientInfo.HO_TEN = this.patientInfo.results?.hc.HO_TEN;
        this.patientInfo.GIOI_TINH = this.patientInfo.results?.hc.GIOI_TINH;
        this.patientInfo.phone_number = this.patientInfo.results?.hc.phone_number;
        this.patientInfo.NGAY_SINH = this.patientInfo.results?.hc.NGAY_SINH;
        this.patientInfo.address1 = this.patientInfo.results?.hc.address1;
        this.patientInfo.patient_health_insurance_selected = this.patientInfo.results?.hc.patient_health_insurance_selected;
        this.patientInfo.parent_name = this.patientInfo.results?.hc.parent_name;
        this.patientInfo.room_name = this.patientInfo.results?.hc.room_name;
        this.patientInfo.in_patient_bed_name = this.patientInfo.results?.hc.in_patient_bed_name || '';
        this.patientInfo.in_patient_room_name = this.patientInfo.results?.hc.in_patient_room_name || '';

        id.in_patient_file = dataReturn.results.results.in_patient_file;
        this.patientInfo.idEMR = id._id.$id;
        this.patientInfoHis = dataReturn.results.results.patientInfoHis;
        this.patientInfo.in_patient_file = dataReturn.results.results.in_patient_file;
        this.patientInfo.in_patient = dataReturn.results.results.in_patient;
        this.getServiceUsed(undefined, undefined, undefined);
        this.benhAnSelect = dataReturn.results.results.in_patient_file.in_patient_file_id;

        if (this.patientInfo.in_patient_file?.in_patient_file_id === this.ID_BENH_AN_IVF) {
          this.patientInfo.HO_TEN = this.patientInfoHis.patient_fullname;
          this.patientInfo.GIOI_TINH = {
            ID: this.patientInfoHis.sex + "",
            MA: this.patientInfoHis.sex + "",
            MO_TA: this.patientInfoHis.sex === SexEnum.Male ? "Nam" : (this.patientInfoHis.sex === SexEnum.Female ? "Nữ" : "")
          };
          this.patientInfo.phone_number = this.patientInfoHis.phone_number;
          this.patientInfo.NGAY_SINH = this.patientInfoHis.birthday ? moment.unix(this.patientInfoHis.birthday).format('DD/MM/YYYY') : '';
          this.patientInfo.parent_name = this.patientInfoHis.parent_name;
        }
      }
      // this.patientInfo.in_patient_file = {
      //   in_patient_file_id: 42, //biến này đang tạo dữ liệu ảo để show loại bệnh án -> cần a hiệu trả về khi lấy bệnh án
      //   in_patient_file_name: "Bệnh án nội khoa"
      // }
      this.idEMR = id._id.$id;
      this.isSuccessGetBA = true;

      this.isLoadingGetBA = false;
    });

    //#region hieulm - Đếm số lượng giấy tờ của bệnh án
    if (this.patientInfo.patient_id && this.patientInfo.reception_queue_id) {
      this.emrService.getCountDocumentsByForm(
        this.patientInfo.patient_id,
        this.patientInfo.reception_queue_id,
      ).subscribe((res) => {
        if (res.status) {
          this.documentCountByFormId = res.results;
        } else {
          this.documentCountByFormId = {};
        }
      })
    }
    //#endregion
  }

  /**
   * Chọn loại bệnh án
   * @param in_patient_file
   */
  choiceInpatientFile(in_patient_file: InpatientFile){
    this.benhAnSelect = in_patient_file.in_patient_file_id;
    if(this.filterEMR.typeViewEMR.id === 0){
      //todo: tạo mới emr mới cho sửa
      this.isSuccessGetBA = true;
      this.stateEMR.viewBenhAn = true;
      this.stateEMR.createGiayTo = false;
    }
  }
  displayIngredient(value: any): string {
    return value && value.ingredient_id ? value.ingredient_name : '';
  }

  displayTypeView(value: any): string {
    return value && value.name ? value.name : '';
  }

  displayTypeSearch(value: any): string {
    return value && value.name_search ? value.name_search : '';
  }
  displayPatientSearch(value: any): string {
    return value && value.reception_queue_id ? value.reception_queue_id : '';
  }

  /**
   * Lưu bệnh án
   * @param is_lock
   */
  saveEMR(is_lock: number, callback = () => {}){
    if(!this.dataEMR){
      return;
    }
    this.subsHC = this.shareDataService.pullData("hc").subscribe(data => {
      this.dataEMR["hc"] = data;
    })
    this.subsEmrIui = this.shareDataService.pullData("emr_iui").subscribe(data => {
      this.dataEMR["emr_iui"] = data;
    })
    this.subsKB = this.shareDataService.pullData("kb").subscribe(data => this.dataEMR["kb"] = data);
    this.subsKBSoSinh = this.shareDataService.pullData("kb_so_sinh").subscribe(data => {
      this.dataEMR['kb_so_sinh'] = data;
    });
    this.subsHB = this.shareDataService.pullData("hb").subscribe(data => this.dataEMR["hb"] = data);
    this.subsEmrHBSoSinh = this.shareDataService.pullData("hb_so_sinh").subscribe(data => {
      this.dataEMR["hb_so_sinh"] = data;
    })
    this.subsQLNB = this.shareDataService.pullData("qlnb").subscribe(data => this.dataEMR["qlnb"] = data);
    this.subsChanDoan = this.shareDataService.pullData("chan_doan").subscribe(data => this.dataEMR["chan_doan"] = data)
    this.subsCDKDT = this.shareDataService.pullData("chan_doan_kdt").subscribe(data => {
      if (data) {
        this.dataEMR["chan_doan_kdt"] = data;
      }
    });
    this.subsTTRV = this.shareDataService.pullData("tinh_trang_ra_vien").subscribe(data => this.dataEMR["tinh_trang_ra_vien"] = data);
    this.subsPPTTTE = this.shareDataService.pullData("phieu_phau_thuat_thu_thuat_emr").subscribe(data => this.dataEMR["phieu_phau_thuat_thu_thuat_emr"] = data);
    this.subsCDTV = this.shareDataService.pullData("chan_doan_tu_vong").subscribe(data => {
      if (typeof this.dataEMR["chan_doan"] === 'object') {
        this.dataEMR["chan_doan"].CHAN_DOAN_TU_VONG = data;
      } else {
        this.dataEMR["chan_doan"] = {
          ...new Chan_doan(),
          CHAN_DOAN_TU_VONG: data
        };
      }
    });
    this.subsTienLuong = this.shareDataService.pullData("tien_luong").subscribe(data => {this.dataEMR["tien_luong"] = data});
    this.subsKhamMat = this.shareDataService.pullData("kham_mat").subscribe(data => {this.dataEMR["kham_mat"] = data});
    this.subsTongKetBA = this.shareDataService.pullData("tong_ket_ba").subscribe(data => {
      // if(!this.dataEMR["tinh_trang_ra_vien"]){
      //   this.dataEMR["tinh_trang_ra_vien"] = {};
      // }
      // if(!this.dataEMR["tinh_trang_ra_vien"]["TONG_KET_TINH_TRANG_RA_VIEN"]){
      //   this.dataEMR["tinh_trang_ra_vien"]["TONG_KET_TINH_TRANG_RA_VIEN"] = new TTRV();
      // }
      // this.dataEMR["tinh_trang_ra_vien"]["TONG_KET_TINH_TRANG_RA_VIEN"]["TINH_TRANG_RA_VIEN"] = data.TONG_KET_TINH_TRANG_RA_VIEN?.TINH_TRANG_RA_VIEN;
      this.dataEMR["tong_ket_ba"] = data;
    });
    this.subsBSDieuTri = this.shareDataService.pullData("bs_dieu_tri").subscribe(data => {
      if (this.dataEMR["qlnb"].DIEU_TRI) {
        this.dataEMR["qlnb"].DIEU_TRI.BAC_SI_DIEU_TRI = data;
      }
    });
    this.subsLyDoVV = this.shareDataService.pullData("ldvv").subscribe(data => {
      this.dataEMR["ldvv"] = data
    });

    this._shareDataKeys.forEach(key => {
      this.pullSubscriptions[key] = this.shareDataService.pullData(key).subscribe(data => {
        switch (key) {
          case 'kham_mat_day_mat': {
            if (!this.dataEMR.kb) {
              this.dataEMR.kb = new KhamBenh();
            }
            this.dataEMR.kb.KHAM_MAT_DAY_MAT = data;
            break;
          }
          case 'yhct_noi_tru': {
            if (!this.dataEMR.yhct) {
              this.dataEMR.yhct = new benhan_YHCT_noi_tru();
            }
            this.dataEMR.yhct = data;
            break;
          }
          default: {
            this.dataEMR[key] = data;
          }
        }
      });
    });
    this.subsTNMGiaiDoan = this.shareDataService.pullData("tnm_giai_doan").subscribe(data => {
      this.dataEMR["tnm_giai_doan"] = data;
    });
    this.subsTienSuBenh = this.shareDataService.pullData("tien_su_benh").subscribe(data => {
      this.dataEMR["tien_su_benh"] = data;
    });
    this.subsThiLuc = this.shareDataService.pullData("thi_luc").subscribe(data => {
      this.dataEMR["thi_luc"] = data;
    });
    this.subsThiLucRaVien = this.shareDataService.pullData("thi_luc_ra_vien").subscribe(data => {
      this.dataEMR["thi_luc_ra_vien"] = data;
    });
    this.subsKhamMatTreEm = this.shareDataService.pullData("kham_mat_tre_em").subscribe(data => {
      this.dataEMR["kham_mat_tre_em"] = data;
    });
    this.subsKhamMatGlocom = this.shareDataService.pullData("kham_mat_glocom").subscribe(data => {
      this.dataEMR["kham_mat_glocom"] = data;
    });
    this.subsHoiBenhGlocom = this.shareDataService.pullData("hoi_benh_glocom").subscribe(data => {
      this.dataEMR["hoi_benh_glocom"] = data;
    });
    this.subsChanDoanMat = this.shareDataService.pullData("chan_doan_mat").subscribe(data => {
      this.dataEMR["chan_doan_mat"] = data;
    });
    this.subsDienBienBenhYLenh = this.shareDataService.pullData("dien_bien_benh_y_lenh").subscribe(data => {
      this.dataEMR["dien_bien_benh_y_lenh"] = data;
    });
    this.subsKhamMatChanThuong = this.shareDataService.pullData("kham_mat_chan_thuong").subscribe(data => {
      this.dataEMR["kham_mat_chan_thuong"] = data;
    });
    this.dataEMR.is_lock = is_lock;
    this.dataEMR.in_patient = this.patientInfo.in_patient;
    this.dataEMR.patientInfoHis = this.patientInfoHis;
    delete this.dataEMR.patientInfoHis._id;
    delete this.dataEMR.patientInfoHis.time_lime;
    this.dataEMR.in_patient_file = this.patientInfo.in_patient_file;
    this.emrService.saveEMR(this.dataEMR, this.patientInfo.patient_id || 0,
      this.patientInfo.reception_queue_id, this.idEMR, this.patientInfo.in_patient,
      "FORM_HOI_KHAM_BENH", 1, this.patientInfo.medical_record_no).subscribe(data => {
      if(data.status === true){
        this.toastrTranslateService.success(
          'Lưu thành công',
          'Lưu'
        );
        callback();
      } else {
        this.toastrTranslateService.error(
          data.results,
          'toast.error_generic'
        );
      }
    })
  }

  /**
   * Lưu giấy tờ
   * @param callback
   */
  saveGiayToLienQuan(callback = () => {}){
    if(!this.dataGiayToLienQuan){
      return;
    }

    let patientInfoToKeep = {};

    switch (this.loaiGiayToLienQuan.ID){
      case this.ID_BIEN_BAN_HOI_CHAN:
      case this.ID_BIEN_BAN_HC_KHANG_SINH:
        //todo: phiếu biên bản hội chẩn và hội chẩn kháng sinh
        this.subsBienBanHoiChan = this.shareDataService.pullData("bien_ban_hoi_chan").subscribe(data => {
          this.dataGiayToLienQuan = data;
          patientInfoToKeep = {...patientInfoToKeep, ...data.patient_info};
        });
      break;
      case this.ID_PHAU_THUAT_THU_THUAT:
        //todo: phiếu pttt
        this.subsPPTTTE = this.shareDataService.pullData("pttt").subscribe(data => {this.dataGiayToLienQuan = data});
      break;
      case this.ID_LUONG_GIA_CHUC_NANG:
        this.subsPPTTTE = this.shareDataService.pullData("plgcn").subscribe(data => {this.dataGiayToLienQuan = data});
        break;
      case this.ID_CHI_DINH_DIEU_TRI_PHCN:
      case this.ID_THUC_HIEN_KY_THUAT_PHCN:
        this.subsPPTTTE = this.shareDataService.pullData("phieu_thuc_hien_ky_thuat_phcn").subscribe(data => {
          this.dataGiayToLienQuan = data;
          this.dataGiayToLienQuan.THUC_HIEN.shift();
          });
        break;
      // case this.ID_CHI_DINH_DIEU_TRI_PHCN:
      //   //todo: phiếu chỉ định điều trị phục hồi chức năng
      //   this.subsPPTTTE = this.shareDataService.onData("pcdphcn").subscribe(data => {this.dataGiayToLienQuan = data});
      //   break;
      // case this.ID_THUC_HIEN_KY_THUAT_PHCN:
      //   //todo: phiếu thực hiện kỹ thuật phục hồi chức năng
      //   this.subsPPTTTE = this.shareDataService.onData("pthphcn").subscribe(data => {this.dataGiayToLienQuan = data});
      //   break;
      case this.ID_CHUNG_NHAN_PHAU_THUAT:
        //todo: phiếu cnpttt
        this.subsPPTTTE = this.shareDataService.pullData("chung_nhan_phau_thuat").subscribe(data => {this.dataGiayToLienQuan = data});
      break;
      case this.ID_GIAY_CHUYEN_VIEN:
        //todo: giấy chuyển viện
        this.subsPPTTTE = this.shareDataService.pullData("giay_chuyen_vien").subscribe(data => {this.dataGiayToLienQuan = data});
      break;
      case this.ID_PHIEU_CHAM_SOC:
        //todo: phiếu chăm sóc
        this.subsPPTTTE = this.shareDataService.pullData("phieu_cham_soc").subscribe(data => {
          this.dataGiayToLienQuan = data
          this.dataGiayToLienQuan.emr = this.emrService.mapPCSHisToEMR(data);
        });
      break;
      case this.ID_PHIEU_TRUYEN_MAU:
        //todo: phiếu truyền máu
        this.subsPPTTTE = this.shareDataService.pullData("phieu_truyen_mau").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      case this.ID_PHIEU_XQUANG:
      case this.ID_PHIEU_MRI:
      case this.ID_FORM_CT_SCANNER:
      case this.ID_FORM_SIEU_AM:
      case this.ID_FORM_DIEN_TIM:
      case this.ID_FORM_DIEN_NAO:
      case this.ID_FOMR_XN_HUYET_HOC:
      case this.ID_FORM_XN_NUOC_TIEU_PHAN_CHOC_DO:
      case this.ID_FORM_ID_XN_SINH_HOA:
      case this.ID_FORM_ID_XN_MIEN_DICH:
      case this.ID_FORM_ID_XN_VI_SINH:
      case this.ID_FORM_NOI_SOI:
      case this.ID_THU_PHAN_UNG_THUOC:
        //todo: phiếu cls || phiếu thăm dò chức năng
        this.subsPPTTTE = this.shareDataService.pullData("phieu_cls").subscribe(data => {
          this.dataGiayToLienQuan["emr"] = data;
        });
        break;
      case this.ID_THEO_DOI_DI_UNG_THUOC:
        //todo: THEO DÕI DỊ TỨNG THUỐC
        this.subsPPTTTE = this.shareDataService.pullData("td_di_ung_thuoc").subscribe(data => {
          this.dataGiayToLienQuan= data;
        });
        break;
      case this.ID_TRUYEN_DICH:
        //todo: truyền dịch
        this.subsPPTTTE = this.shareDataService.pullData("td_truyen_dich").subscribe(data => {
          this.dataGiayToLienQuan= data;
        });
        break;
      case this.ID_THEO_DOI_TRUYEN_DICH:
        //todo: Theo dõi truyền dịch
        this.subsPPTTTE = this.shareDataService.pullData("phieu_theo_doi_truyen_dich").subscribe(data => {
          this.dataGiayToLienQuan= data;
        });
        break;
      case this.ID_BIEN_BAN_HOI_CHAN_PHAU_THUAT:
        //todo: Biên bản hội chẩn phẫu thuật
        this.subsPPTTTE = this.shareDataService.pullData("bien_ban_hoi_chan_phau_thuat").subscribe(data => {
          this.dataGiayToLienQuan= data;
        });
        break;
      case this.ID_HSBA_CS_DT_HIV:
        //todo: Chăm sóc điều trị HIV/AIDS
        this.subsPPTTTE = this.shareDataService.pullData("hsba_cs_dt_hiv").subscribe(data => {
          this.dataGiayToLienQuan= data;
        });
        break;
      case this.ID_TU_CHOI_DIEU_TRI:
        //todo: Giấy đề nghị được từ chối điều trị
        this.subsPPTTTE = this.shareDataService.pullData("tu_choi_dieu_tri").subscribe(data => {
          this.dataGiayToLienQuan= data;
        });
        break;
      case this.ID_THEO_DOI_GIAM_DAU_SAU_MO:
        //todo: Phiếu theo dõi giảm đau sau mổ
        this.subsPPTTTE = this.shareDataService.pullData("td_giam_dau_sau_mo").subscribe(data => {
          this.dataGiayToLienQuan= data;
        });
        break;
      case this.ID_PDM:
        this.subsPPTTTE = this.shareDataService.pullData("phieu_duyet_mo").subscribe(data => {
          this.dataGiayToLienQuan= data;
        });
        break;
      case this.ID_CAM_KET_NB_NOI_TRU:
        this.subsPPTTTE = this.shareDataService.pullData("GIAY_CAM_KET_NGUOI_BENH_NAM_NOI_CHU").subscribe(data => {
          this.dataGiayToLienQuan= data;
        });
        break;
      case this.ID_SOKET_DIEUTRI:
        //todo: phiếu sơ kết điều trị
        this.subsPPTTTE = this.shareDataService.pullData("so_ket_dt").subscribe(data => {
          this.dataGiayToLienQuan= data;
        });
        break;
      case this.ID_DIEU_TRI_NG_TRU:
      case this.ID_DIEU_TRI_NOI_TRU:
        //todo: phiếu điều trị ngoại trú
        this.subsPPTTTE = this.shareDataService.pullData("phieu_dieu_tri").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      // case this.ID_DIEU_TRI_NOI_TRU:
      //   //todo: phiếu điều trị nội trú
      //   this.subsPPTTTE = this.shareDataService.pullData("phieu_dieu_tri").subscribe(data => {
      //     this.dataGiayToLienQuan = data;
      //   });
      //   break;
      case this.ID_FORM_GIAY_CHUNG_NHAN_THUONG_TICH:
        //todo: giấy chứng nhận thương tích
        this.subsPPTTTE = this.shareDataService.pullData("gcntt").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      case this.ID_FORM_KIEM_DIEM_TU_VONG:
        //todo: kiểm điểm tử vong
        this.subsPPTTTE = this.shareDataService.pullData("kdtv").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      case this.ID_DEM_GAC: {
        this.pullSubscriptions['dem_gac'] = this.shareDataService.pullData("dem_gac").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      }
      case this.ID_BANG_KIEM_AN_TOAN_PT: {
        this.pullSubscriptions['bang_kiem_an_toan_pt'] = this.shareDataService.pullData("bang_kiem_an_toan_pt").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      }
      case this.ID_GIAY_DONG_Y_PTTT: {
        this.pullSubscriptions['giay_dong_y_thuc_hien_pttt'] = this.shareDataService.pullData("giay_dong_y_thuc_hien_pttt").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      }
      case this.ID_ADR: {
        this.pullSubscriptions['adr'] = this.shareDataService.pullData("adr").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      }
      case this.ID_PHIEU_GAY_ME_HOI_SUC: {
        this.pullSubscriptions['phieu_gay_me_hoi_suc'] = this.shareDataService.pullData("phieu_gay_me_hoi_suc").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      }
      case this.ID_PHIEU_GDSK_NGUOI_BENH: {
        this.pullSubscriptions['phieu_giao_duc_suc_khoe_cho_nguoi_benh'] = this.shareDataService.pullData("phieu_giao_duc_suc_khoe_cho_nguoi_benh").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      }
      case this.ID_PHIEU_LOC_MAU_LIEN_TUC: {
        this.pullSubscriptions['phieu_loc_mau_lien_tuc'] = this.shareDataService.pullData("phieu_loc_mau_lien_tuc").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      }
      case this.ID_YEU_CAU_QUAN_LY_KHANG_SINH: {
        this.pullSubscriptions['yeu_cau_sd_ks_ql'] = this.shareDataService.pullData("yeu_cau_sd_ks_ql").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      }
      case this.ID_PHIEU_DANH_GIA_DD_TRE_EM: {
        this.pullSubscriptions['phieu_danh_gia_dinh_duong_TE'] = this.shareDataService.pullData("phieu_danh_gia_dinh_duong_TE").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      }
      case this.ID_PHIEU_THEO_DOI_CHUC_NANG_SONG: {
        this.pullSubscriptions['phieu_theo_doi_chuc_nang_song'] = this.shareDataService.pullData("phieu_theo_doi_chuc_nang_song").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      }
      case this.ID_GIAY_CAM_DOAN_CHAP_NHAN_PHAU_THUAT_THU_THUAT: {
        this.pullSubscriptions['giay-cam-doan-chap-nhan-phau-thuat-thu-thuat'] = this.shareDataService.pullData("giay-cam-doan-chap-nhan-phau-thuat-thu-thuat").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      }
      case this.ID_PHIEU_CHAM_SOC_SO_SINH:
        //todo: Phiếu chăm sóc sơ sinh
        this.subsPPTTTE = this.shareDataService.pullData("phieu_cham_soc_so_sinh").subscribe(data => {
          this.dataGiayToLienQuan= data;
        });
        break;
      default:
        break;
    }

    if (this.isCreateGiayToLienQuan && this.dataGiayToLienQuan?.id) {
      delete this.dataGiayToLienQuan?.id;
    }

    this.dataGiayToLienQuan.patient_info = { ...this.patientInfoHis, ...patientInfoToKeep };

    delete this.dataGiayToLienQuan.patient_info._id;
    delete this.dataGiayToLienQuan.patient_info.time_lime;
    this.emrService.saveEMR(this.dataGiayToLienQuan, this.patientInfo.patient_id || 0,
      this.patientInfo.reception_queue_id, this.loaiGiayToLienQuan.ID,
      this.patientInfo.in_patient, this.loaiGiayToLienQuan.MA, this.loaiGiayToLienQuan.DOCUMENT_TYPE, this.patientInfo.medical_record_no).subscribe(data => {
      if(data.status === true){
        this.toastrTranslateService.success(
          'Lưu thành công',
          'Lưu'
        );
        callback();
      } else {
        this.toastrTranslateService.error(
          data.results,
          'toast.error_generic'
        );
      }
    })
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.subsHC.unsubscribe();
    this.subsKB.unsubscribe();
    this.subsHB.unsubscribe();
    this.subsQLNB.unsubscribe();
    this.subsChanDoan.unsubscribe();//todo: chẩn đoán
    this.subsTTRV.unsubscribe();//todo: tình trạng ra viện
    this.subsCDTV.unsubscribe(); //todo: Chan đoán tử vong
    this.subsCDKDT.unsubscribe(); //todo: Chan đoán khi vào khoa điều trị
    this.subsTienLuong.unsubscribe(); //todo: Tiên lượng
    this.subsTongKetBA.unsubscribe(); //todo: Tiên lượng
    this.subsBSDieuTri.unsubscribe(); //todo: Bác sĩ điều trị
    this.subsLyDoVV.unsubscribe(); //todo: lý do vào viện
    //todo: giấy tờ liên quan
    this.subsBienBanHoiChan.unsubscribe(); //todo: form biên bản hội chẩn
    this.subsPPTTTE.unsubscribe();
  }

  selectRQI: any;
  choiceTypeSearch(){
    this.filterEMR.txtSearchAdvance = undefined;
    this.filterEMR.dateSearch = {start: moment().subtract(30, 'days'), end: moment()};
  }

  getRQIBySelect(){
    this.patientInfo.reception_queue_id = this.selectRQI.reception_queue_id;
  }

  editEMR(){
    // this.stateEMR.createGiayTo = false;
    // this.stateEMR.viewBenhAn = true;
    // this.stateEMR.save = true;
  }
  // newEMR(){
  //   this.idEMR = "";
  //   this.stateEMR.createGiayTo = true;
  //   this.stateEMR.viewBenhAn = false;
  //   this.stateEMR.save = true;
  // }
  printEMR(options?: {isEmr: boolean}){
    if (options?.isEmr === false || !this.emrService.shouldPrintEMR(this.loaiGiayToLienQuan)) {
      return;
    }

    let printModel: any = {
      reception_queue_id: this.patientInfo.reception_queue_id,
      in_patient_file_id: this.patientInfo.in_patient_file?.in_patient_file_id,
      in_patient_file_code: "BANK",
      object_id: this.patientInfo.idEMR,
      form_id: 5045, //todo: hard code form id : form bệnh án
      in_patient: this.patientInfo.in_patient,
      patient_id: this.patientInfo.patient_id,
      domain: "https://test-v1-ws.smarthos.vn",
      company_name: "Hệ thống y tế thông minh",
      ministry_of_health: "Sở y tế Hà Nội"
    }
    this.emrService.getRouterPrint(this.emrService.tenBenhAn || this.patientInfo.in_patient_file?.in_patient_file_id || 0, 1).then((data: any) => {
      printModel.report_router = data;
      this.laboratoryService.printRouter(data, printModel,false)
    })
  }

  /**
   * TODO: Bỏ hardcode dịch vụ xét nghiệm vi sinh
   * TODO: Bỏ hardcode form id phiếu điều trị bệnh sử
   * @private
   */
  private switchPrintId(giayto: Service): string | number {
    // Hardcode dịch vụ xét nghiệm vi sinh
    if (giayto.service_category_id === 13) {
      return this.ID_FORM_ID_XN_VI_SINH;
    }
    // Hardcode form id phiếu điều trị bệnh sử
    if (giayto.form_id === 3000) {
      return 3000;
    }
    return this.loaiGiayToLienQuan.ID;
  }

  printGiayToLienQuan(clickEvent: Event | undefined, giayto: any, id: any){
    clickEvent?.stopPropagation();

    let printModel = {
      report_router: "",
      patient_id: this.patientInfo.patient_id,
      reception_queue_id: this.patientInfo.reception_queue_id,
      domain: this.globals.API_DOMAIN,
      created_at: "{$match:{" + "results.created_at: " + giayto.created_at + "}},",
      object_id: "",
      form_id: this.loaiGiayToLienQuan.ID,
      list_id: "",
      id : Number(giayto.id)|| "",
      list_examination_prescription_code: ""
    }
    if(giayto.emr){
        printModel.object_id =((giayto.emr._id) ? giayto.emr._id : id);
        printModel.list_id = "{$oid:'" + ((giayto.emr._id) ? giayto.emr._id : id) + "'}";
    }else{
      if(this.loaiGiayToLienQuan.CLS === 3){
        printModel.object_id = ((giayto.emr._id) ? giayto.emr._id : id);
        printModel.list_id = "{$oid:'" + ((giayto.emr._id) ? giayto.emr._id : id) + "'}";
      }else {
        if(this.loaiGiayToLienQuan.TYPE_CREATE === 0){
          //todo: hardcode -> với loại phiếu lĩnh -> không tạo mà chỉ view
          printModel.list_id = (giayto._id && giayto._id.$id) ? "{$oid:'" + giayto._id.$id + "'}" : id;
          printModel.object_id =  (giayto._id && giayto._id.$id) ? giayto._id.$id: id;
        }else{
          printModel.list_id = "{$oid:'" + ((this.listGiayTo._id.$id) ? this.listGiayTo._id.$id : id) + "'}";
          printModel.object_id = ((this.listGiayTo._id.$id) ? this.listGiayTo._id.$id : id);
        }
      }
    }

    if(this.listGiayTo.form_id === this.ID_PHIEU_CHAM_SOC){
      printModel.object_id = this.listGiayTo._id.$id;
    }
    if(this.loaiGiayToLienQuan.ID === this.ID_FORM_PHIEU_LINH_PHAT_MAU){
      //todo: form phiếu lĩnh và phát máu ->  do không có tạo mới
      if(giayto.results && giayto.results.length > 0){
        let tmpCode = "";
        giayto.results.forEach((gt: any, index: number) =>{
           tmpCode += gt.examination_prescription_code + (index < giayto.results.length - 1 ? "," : "");
        })
        printModel.list_examination_prescription_code = tmpCode;
      }
    }

    this.emrService.getRouterPrint(this.switchPrintId(giayto), 0).then(async (data: any) => {
      printModel.report_router = data;
      await this.emrService.modifyPrintDataByDocument(printModel, this);
      this.laboratoryService.printRouter(data, printModel,false)
    })
  }

  /**
   * Lấy dịch vụ đã thực hiện có kết quả của bệnh nhân
   * @param cls_cat_id query (filter_more) (VD. loại dịch vụ).
   * Nếu có, sẽ không xem được bệnh án mà chỉ tạo được giấy tờ liên quan tới dịch vụ.
   * Nếu không có, dữ liệu dịch vụ sẽ đổ sang bệnh án
   *
   * @param query_key_level key_level_1
   *
   * @param exam_low_level (VD: EXMAM_LOW_LEVEL) Nếu có, sẽ thêm thông tin ngày tìm từ - ngày tìm đến,
   * chỉ tìm lần khám có hướng giải quyết "Nhập viện"
   */
  getServiceUsed(cls_cat_id: any, query_key_level: any, exam_low_level: any){
    this.serviceService.getServiceUsed(this.patientInfo.patient_id || 0,
      this.patientInfo.reception_queue_id,
      this.patientInfo.in_patient,
      cls_cat_id,
      query_key_level, exam_low_level,
      this.patientInfo.medical_record_no).subscribe(dataReturn => {
      if(dataReturn.status === true && dataReturn.results && dataReturn.results.length > 0){
        if(cls_cat_id){
          //todo: giấy tờ liên quan cls
          this.stateEMR.createGiayTo = true;
          this.stateEMR.viewBenhAn = false;
          this.listHisResults = [];
        }else{
          //todo: bệnh án lấy dữ liệu cls từ his
          this.stateEMR.viewBenhAn = true;
          this.stateEMR.createGiayTo = false;
        }
        // if(this.loaiGiayToLienQuan.ID === this.ID_DIEU_TRI_NOI_TRU) {
        //   // this.selectGiayToLienQuan = this.emrService.mapPDieutriToGTLQ(dataReturn.results, 1);
        //   this.isLoadingGetGiayTo[this.loaiGiayToUpload.ID] = false;
        //   return;
        // }
        dataReturn.results.forEach((cap1: any) => {
          cap1.data.forEach((cap2: any )=> {
            cap2.exams.forEach((cap3: any ) => {
              cap3.services.forEach((sv: any) =>{
                if(cls_cat_id !== undefined){
                  //todo: giấy tờ liên quan cls
                  if(sv.services.service_category_parent_id === 6){
                    //todo: lấy phiếu dv khám bệnh
                    if(this.loaiGiayToLienQuan.ID === this.ID_FORM_PHIEU_LINH_PHAT_MAU){
                      //todo: hardcode phiếu lĩnh và phát máu -> lấy từ geh dv khám -> lấy y lệnh thay cho phiếu lĩnh
                      if(sv.services.results && sv.services.results.length > 0){
                        if(sv.services.results.some((service: any) => {return service.pharma_request_parent_in})){
                          this.listGiayTo.results.push(sv.services)
                        }
                      }
                    }else{
                      this.listGiayToLienQuan.listPhieuKhamVaoVien.push(sv.services);
                    }
                    if(this.loaiGiayToLienQuan.ID === this.ID_DIEU_TRI_NOI_TRU) {
                      this.listGiayTo.results.push(sv.services);
                    }
                  }
                  if(this.loaiGiayToLienQuan.ID === this.ID_KHAM_VAO_VIEN
                    || this.loaiGiayToLienQuan.ID === this.ID_KHAM_THEO_YEU_CAU
                    || this.loaiGiayToLienQuan.ID === this.ID_KHAM_CHUYEN_KHOA){
                    this.listGiayTo.results.push(sv.services)
                  }
                  if(sv.services.service_category_parent_id === 7 || sv.services.service_category_parent_id === 8){
                    this.listGiayTo.results.push(sv.services);
                    // this.listPPTTTE = [];
                    // sv.services.results.forEach((service: any) => {
                    //   this.listPPTTTE.push(this.emrService.mapCategoryPPTTTEMR(service, sv.services._id.$id, sv.services));
                    // });
                  }
                  if(sv.services.service_category_parent_id === 4 || sv.services.service_category_parent_id === 5){
                    this.listHisResults.push(sv.services);
                    this.listGiayTo.results.push(sv.services);
                  }
                  if(sv.services.service_category_parent_id === 3){
                    //todo: lấy dv xn
                    if(cls_cat_id){
                      this.listHisResults.push(sv.services);
                      this.listGiayTo.results.push(sv.services);
                    }else{
                      this.ketquaCLS.KQ_CLS.XN.push(this.emrService.mapServiceXNEMR(sv.services, this.listCategory["loai_xet_nghiem"]));
                    }
                  }
                }else{
                  //todo: bệnh án lấy dữ liệu cls từ his
                  if(sv.services.service_category_parent_id === 3){
                    //todo: lấy dv xn
                    this.ketquaCLS.KQ_CLS.XN.push(this.emrService.mapServiceXNEMR(sv.services, this.listCategory["loai_xet_nghiem"]));
                  }
                  // if(sv.services.service_category_parent_id === 5){
                  //   //todo: lấy dv thăm dò chức năng
                  //   this.tongKetBenhAn.KQ_CLS.TDCN.push(this.emrService.mapCategoryTDCNEMR(sv.services));
                  //   console.log(this.tongKetBenhAn.KQ_CLS.TDCN)
                  // }

                  // if(sv.services.service_category_parent_id === 4){
                  //   //todo: lấy dv chẩn đoán hình ảnh
                  //   this.ketquaCLS.KQ_CLS.CDHA.push(this.emrService.mapCategoryCDHAEMR(sv.services));
                  //   switch (sv.services.service_category_id){
                  //     case 4:
                  //       this.listHisResults.push(sv.services)
                  //       console.log(this.listHisResults)
                  //       break;
                  //     case 17:
                  //       this.listHisResults.push(sv.services)
                  //       break;
                  //     case 77:
                  //       this.listHisResults.push(sv.services)
                  //       break;
                  //     case 19:
                  //       this.listHisResults.push(sv.services)
                  //       break;
                  //     default:
                  //       this.listHisResults.push(sv.services)
                  //       break;
                  //   }
                  // }
                  if(this.patientInfo.in_patient === 1 && sv.services.service_category_parent_id === 6 && sv.services.results.ket_qua_ksk &&
                    (sv.services.results.ket_qua_ksk.noi_tiet ||
                      sv.services.results.ket_qua_ksk.than_kinh ||
                      sv.services.results.ket_qua_ksk.tuan_hoan ||
                      sv.services.results.ket_qua_ksk.ho_hap ||
                      sv.services.results.ket_qua_ksk.tieu_hoa ||
                      sv.services.results.ket_qua_ksk.than_tiet_nieu ||
                      sv.services.results.ket_qua_ksk.co_xuong_khop ||
                      sv.services.results.ket_qua_ksk.tam_than
                    )){
                    //todo: lấy dv khám theo thông tư 14
                    this.ketquakb = this.emrService.mapCategoryKBEMR(sv.services, 1);
                  }
                  if(this.patientInfo.in_patient !== 1 && sv.services.service_category_parent_id === 6){
                    //todo: đang hardcode dv khám răng hàm mặt => dùng cho bệnh án ngoại trú
                    this.ketquakb = this.emrService.mapCategoryKBEMR(sv.services, 0);
                    this.hoibenhNgoaiTru = this.emrService.mapHoiBenh(sv.services, 0);
                    this.lyDoVaoVienNgoaiTru = this.emrService.mapLDVV(sv.services);
                    this.quanLyNguoiBenh.DIEU_TRI.LICH_SU_KHOA_DIEU_TRI[0].thoi_diem_vao_khoa =  moment(sv.services.used_at * 1000);
                    this.quanLyNguoiBenh.DIEU_TRI.LICH_SU_KHOA_DIEU_TRI[0].THOI_DIEM_BAT_DAU.DATE = moment(sv.services.used_at * 1000).format("DD/MM/YYYY");
                    this.quanLyNguoiBenh.DIEU_TRI.LICH_SU_KHOA_DIEU_TRI[0].THOI_DIEM_BAT_DAU.TIME = moment(sv.services.used_at * 1000).format("HH:mm");
                  }
                }
              })
            })
          })
        })
      }else{
        if (this.loaiGiayToUpload.TYPE_CREATE === TypeCreate.ViewOnly) {
          this.stateEMR.viewBenhAn = false;
        }
        if (this.isSuccessGetBA && !this.loaiGiayToLienQuan.ID) {
          this.stateEMR.createGiayTo = false;
          this.stateEMR.viewBenhAn = true;
        } else {
          this.stateEMR.createGiayTo = true;
          this.stateEMR.viewBenhAn = false;
        }

        this.toastrTranslateService.warning(
          'toast.warn_no_data',
          'toast.warn_get_services'
        );
      }

      this.isLoadingGetLoaiGiayTo[this.loaiGiayToUpload.ID] = false;
      this.scrollToLoaiGiayTo(this.loaiGiayToUpload);
    });
  }

  resetData(){
    this.ketquakb = new KhamBenh();
    this.patientInfo = new Patient_EMR();
    this.ketquaCLS = new TongKetBenhAn();
    this.listPPTTTE = new Array<PPTTTE>();
  }

  /**
   * Chọn bệnh nhân khi tìm kiếm
   * @param row
   */
  getPatientBySearch(row: EmrPatientInfo){
    if (!row?.patient_id) {
      this.listBA = [];
      this.relationships = [];
    }

    //todo: chon benh nhan khi tim kiem
    this.resetData();
    this.stateEMR.createGiayTo = false;

    if(this.filterEMR.typeViewEMR.id === TypeViewEMR.TaoMoi){
      this.patientInfo = this.emrService.convertObjPatientHisToEMR(row);
      this.patientInfoHis = row;
      if(this.patientInfo.in_patient !== 1){
        this.chanDoan = this.emrService.mapChanDoan(row);
      }
      this.quanLyNguoiBenh = this.emrService.mapQLNBHisToEMR(row);
      this.getServiceUsed(undefined, undefined, undefined);
      if(row.in_patient_file){
        this.choiceInpatientFile(row.in_patient_file);
        this.isSuccessGetBA = true;
        this.stateEMR.viewBenhAn = true;
        this.stateEMR.createGiayTo = false;
      }
    }
    else if(this.filterEMR.typeViewEMR.id === TypeViewEMR.XemBAChuaKy){
      this.patientInfo = this.emrService.convertObjPatientHisToEMR(row);
      this.patientInfoHis = row;
      if (row.patient_id) {
        this.emrService.getListBA(this.filterEMR.typeViewEMR.id, row.patient_id || 0, "", "FORM_HOI_KHAM_BENH", row.medical_record_no).subscribe(data => {
          if (data.status === true) {
            this.listBA = data.results;
          } else {
            this.listBA = [];
          }
        });
      }
    }
  }

  /**
   * Tạo mới giấy tờ theo bệnh án
   *
   * Nếu (giấy không tạo được hoặc không có query geh),
   * và không phải (Giấy chứng nhận phẫu thuật hoặc Phiếu sơ kết 15 ngày điều trị),
   * thì sẽ chọn lại giấy tờ này với chế độ Tạo mới
   */
  actionCreateGiayTo(giayTo: DocumentExam){
    this.menuService.viewAsWaiting();
    this.menuService.viewAsCreatingNew();
    this.isCreatingNew = true;

    this.isSuccessGetBA = true;
    this.isCreateGiayToLienQuan = true;
    this.loaiGiayToLienQuan = giayTo;
    this.selectGiayToLienQuan = undefined;
    // this.patientInfo.idEMR = undefined;
    // this.stateEMR.createGiayTo = true; //todo: comment lại -> lấy biên bản hôi chẩn xong -> mới gọi show view
    // this.stateEMR.viewBenhAn = false; //todo: comment lại -> lấy biên bản hôi chẩn xong -> mới gọi show view
    if((Number(giayTo.TYPE_CREATE) === 1 && giayTo.CLS_CAT_QUERY)
      || (giayTo.ID === this.ID_DIEU_TRI_NOI_TRU && this.patientInfo.in_patient === 1) ){
      this.getServiceUsed(giayTo.CLS_CAT_QUERY, giayTo.QUERY_KEY_LEVEL_GEH ? giayTo.QUERY_KEY_LEVEL_GEH : undefined,undefined);
      return;
    }
    if(this.loaiGiayToLienQuan.ID !== this.ID_CHUNG_NHAN_PHAU_THUAT &&
      this.loaiGiayToLienQuan.ID !== this.ID_SOKET_DIEUTRI
    ){
      this.choiceLoaiGiayTo(giayTo, 1);
    }else{
      //todo: những phiếu ko có trong emr.
      this.stateEMR.createGiayTo = true;
      this.stateEMR.viewBenhAn = false;
    }
  }

  actionRestoreGiayTo() {
    this.isCreatingNew = false;
    this.menuService.signalBackOrSave();
  }

  /**
   * Lưu bệnh án hoặc giấy tờ
   */
  saveDocumet(){
    if (!this.emrService.shouldSaveToEMR(this.loaiGiayToLienQuan)
      || !this.emrService.shouldSaveOrPrintInMain(this)) {
      return;
    }
    if(this.stateEMR.createGiayTo === true){
      this.saveGiayToLienQuan(() => {
        this.choiceLoaiGiayTo(this.loaiGiayToUpload, 0);
        this.menuService.signalBackOrSave();
      });
    }
    if(this.stateEMR.viewBenhAn === true){
      this.saveEMR(0, () => {
        if (this.idEMR) {
          this.choiceBA({ _id: { $id: this.idEMR } });
        }
        this.menuService.signalBackOrSave();
      });
    }
  }

  private scrollToLoaiGiayTo(loaiGiayTo: DocumentExam) {
    const target = document
      .getElementById('loai-giay-to-' + loaiGiayTo.ID);

    const scrollContainer = document
      .getElementById('tree-container');

    if (scrollContainer && target) {
      scrollContainer.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Chọn phiếu giấy tờ liên quan cần xem
   * @param loaiGiayTo Loại giấy tờ
   * @param isCreateGiayTo Có tạo mới giấy tờ hay không
   */
  choiceLoaiGiayTo(loaiGiayTo: DocumentExam, isCreateGiayTo: number){
    this.pdfSrc = '';
    this.isLoadingGetLoaiGiayTo[loaiGiayTo.ID] = true;
    if (!isCreateGiayTo) {
      this.listGiayTo.results = [];
      this.isCreatingNew = false;
    }
    if(isCreateGiayTo){
      if(this.patientInfo.medical_record_no){
        this.receptionService.getPatients({query: this.patientInfo.patient_id, medical_record_no: this.patientInfo.medical_record_no}, 0, 0).subscribe((res) => {
          if (res.status) {
              this.listRQI = res.results;
              this.selectRQI = res.results[0];
          } else {
            this.listRQI = [];
          }
        })
      }
    }
    if(Number(loaiGiayTo.ID) != undefined){
      this.loaiGiayToUpload = loaiGiayTo;
    }
    if(Number(loaiGiayTo.TYPE_CREATE) === TypeCreate.ViewOnly){
      // Tìm dịch vụ đã thực hiện và có kết quả
      // * Query theo loại giấy tờ (VD. loại dịch vụ). Sẽ chỉ xem phiếu đã có và xem PDF.
      // * TODO: key_level_1 = ???
      // * Tìm từ trước ngày vào viện 1 tuần đến ngày vào viện
      if(loaiGiayTo.CLS_CAT_QUERY){
        this.listGiayTo.results = [];
        this.loaiGiayToLienQuan = loaiGiayTo;
        let exam_low_level_info = {
          from: moment(moment(new Date(this.patientInfoHis.parent_id_in*1000)).subtract(7, "days")).unix(),
          to: this.patientInfoHis.parent_id_in,
        }
        this.getServiceUsed(loaiGiayTo.CLS_CAT_QUERY, loaiGiayTo.QUERY_KEY_LEVEL_GEH ? loaiGiayTo.QUERY_KEY_LEVEL_GEH : undefined, (loaiGiayTo.EXMAM_LOW_LEVEL) ? exam_low_level_info: undefined);
        return;
      }else{
        if(loaiGiayTo.ID === this.ID_FORM_THANH_TOAN){
          this.emrService.getReceipt(this.patientInfoHis.patient_id, this.patientInfoHis.reception_queue_id, this.patientInfoHis.in_patient).subscribe(dataReturn => {
            if(dataReturn.status === true){
              this.listGiayTo.results = dataReturn.results;
              this.toastrTranslateService.success(
                'Thành công',
                'Lấy giấy tờ liên quan'
              );
            }else{
              this.toastrTranslateService.error(
                'Không thành công. ' + dataReturn.results,
                'Lấy giấy tờ liên quan'
              );
            }
            this.isLoadingGetLoaiGiayTo[loaiGiayTo.ID] = false;
          })
        }
        if(loaiGiayTo.NO_GEH && loaiGiayTo.UPLOAD_FILE !== UploadFile.CanUpload){
          this.listGiayTo.results = [{service_name: "Phiếu in", no_data: 1}];
        }else {
          this.listGiayTo.results = this.emrService.getDataGiayToLienQuanByLoaiPhieu(loaiGiayTo.ID, this.listGiayToLienQuan);
        }
        this.isLoadingGetLoaiGiayTo[loaiGiayTo.ID] = false;
        this.scrollToLoaiGiayTo(loaiGiayTo);
      }
      this.loaiGiayToLienQuan = loaiGiayTo;
      this.stateEMR.createGiayTo = false;
      this.stateEMR.viewBenhAn = false;
      return;
    }

    if(loaiGiayTo.ID === this.ID_DIEU_TRI_NOI_TRU && this.patientInfoHis.in_patient != 1){
      loaiGiayTo.ID = this.ID_DIEU_TRI_NG_TRU;
      loaiGiayTo.MA = this.variableGlobal["FORM_DIEUTRI_NT"] ? this.variableGlobal["FORM_DIEUTRI_NT"].name : "";
    }

    this.emrService.getListBA(this.filterEMR.typeViewEMR.id, this.patientInfo.patient_id || 0, this.patientInfo.reception_queue_id, loaiGiayTo.MA, this.patientInfo.medical_record_no).subscribe(data => {
      if(data.status === true){
        this.emrService.getInfoBA(this.filterEMR.typeViewEMR.id, data.results[0]._id.$id).subscribe(dataReturn => {
          if (dataReturn.status === true) {
            this.stateEMR.createGiayTo = true;
            this.stateEMR.viewBenhAn = false;

            if(loaiGiayTo.DOCUMENT_TYPE === DocumentType.Single) {
              dataReturn.results.results = [dataReturn.results.results];
            }
            this.listGiayTo = {...dataReturn.results};
            if(isCreateGiayTo === 1){
              if(Array.isArray(dataReturn.results.results)){
                dataReturn.results.results.forEach((data: any) =>{
                  // data._id = dataReturn.results._id;
                  data.date_ky_moment = moment(data.date_ky * 1000);
                  data.hoi_chan_luc_moment = moment(data.hoi_chan_luc * 1000);
                  data.patient_info.from_date_moment = moment(data.patient_info.from_date * 1000);
                  data.patient_info.to_date_moment = moment(data.patient_info.to_date * 1000);
                })
              }
              if(loaiGiayTo.ID === this.ID_DIEU_TRI_NG_TRU){
                // this.selectGiayToLienQuan = this.emrService.mapPDieutriToGTLQ(dataReturn.results.results, 0);
              }else{
                delete dataReturn.results._id;
                delete dataReturn.results.time_lime;
                delete dataReturn.results.results;
                this.selectGiayToLienQuan = dataReturn.results;
              }
            }

            this.documentCountByFormId[loaiGiayTo.ID] = {
              count: dataReturn.results.results?.length
            };
          }

          this.isLoadingGetLoaiGiayTo[loaiGiayTo.ID] = false;
          this.scrollToLoaiGiayTo(loaiGiayTo);
        });
        this.loaiGiayToLienQuan = loaiGiayTo;

        if (!isCreateGiayTo) {
          this.menuService.viewAsProcessed();
        }
      }else{
        this.stateEMR.createGiayTo = true;
        this.stateEMR.viewBenhAn = false;
        this.listGiayTo = {};

        /**
         * Các giấy không lưu ở EMR mà lưu riêng thì vẫn hiển thị, và không cảnh báo
         */
        if (!this.emrService.shouldSaveToEMR(loaiGiayTo)) {
          this.loaiGiayToLienQuan = loaiGiayTo;
        } else if (!isCreateGiayTo) {
          this.toastrTranslateService.warning(
            'toast.warn_no_list_exam_documents',
            'toast.warn_get_exam_documents'
          );
          this.loaiGiayToLienQuan = {};
        }

        this.isLoadingGetLoaiGiayTo[loaiGiayTo.ID] = false;
        this.scrollToLoaiGiayTo(loaiGiayTo);
      }
    })
  }

  pdfSrc: any = "";

  async showDetailGiayTo(giayTo: Service){
    this.menuService.viewAsProcessed();
    this.isCreatingNew = false;
    this.isCreateGiayToLienQuan = false;

    if (giayTo._id?.$id) {
      this.isLoadingGetGiayTo[giayTo._id.$id] = true;
      this.optionGiayToSelect.select(giayTo);
    }
    if (giayTo?.id) {
      this.optionGiayToSelect.select(giayTo);
    }

    if(this.loaiGiayToLienQuan.TYPE_CREATE === 0){
      //todo: các loại phiếu KHÔNG có chức năng tạo mới mà chỉ lấy từ his ra view
      this.stateEMR.createGiayTo = false;
      let printModel: Results<IPrint> = {
        "results":{
          is_portal: 1,
          format: "pdf",
          is_signature: 0,
          report_router: '',
          domain_kq: "https://test-v2-kq.smarthos.vn/",
          patient_id: this.patientInfo.patient_id,
          domain: "https://test-v1-ws.smarthos.vn",
          list_id: "{$oid:'" + giayTo._id?.$id + "'}",
          permission: "get_examination_data",
          object_id: giayTo._id?.$id,
          // created_at: "{$match:{" + "results.created_at: " + giayTo.created_at + "}},"
          hospital_name: this.localStorageService.getVariableGlobal<string>()['NAME_HOSPITAL']?.value,
          ministry_of_health: this.localStorageService.getVariableGlobal<string>()['MINISTRY_OF_HEALTH']?.value,
        }
      }

      // Các phiếu xét nghiệm
      if (this.loaiGiayToLienQuan.XET_NGHIEM) {
        printModel.results = <PrintResultXN>{
          ...printModel.results,
          is_signature: 1,
          is_ISO: 0
        };
      }

      printModel.results.report_router = await this.emrService
        .getRouterPrint(
          this.switchPrintId(giayTo),
          0);

      this.printService.viewReport2( printModel)
        .then(data => {
          this.pdfSrc = data;
        })
        .catch(() => {
          this.pdfSrc = '';
        })
        .finally(() => {
          this.isLoadingGetGiayTo[giayTo._id.$id] = false;
        })
    }
    else{
      //todo: các loại phiếu có chức năng tạo mới
      this.stateEMR.createGiayTo = true;
      this.selectGiayToLienQuan = giayTo;
      this.isSuccessGetBA = true;
      // if(this.loaiGiayToLienQuan.ID === this.ID_CHUNG_NHAN_PHAU_THUAT ||
      //   this.loaiGiayToLienQuan.ID === this.ID_GIAY_CHUYEN_VIEN ||
      //   this.loaiGiayToLienQuan.ID === this.ID_PHIEU_XQUANG){
        this.isCreateGiayToLienQuan = false;
      // }
      if (giayTo._id?.$id) {
        this.isLoadingGetGiayTo[giayTo._id.$id] = false;
      }
    }
  }

  getLoaiGiayToIsCreate(loaiGiayTo: any[]): any[] {
    //todo: filter lấy loại giấy tờ có thể tạo mới
    return loaiGiayTo.filter(p => p.TYPE_CREATE === 1);
  }

  heightPDF = "";
  stateLoadPDF(pdf: any){
    this.heightPDF = pdf._pdfInfo.numPages * 190 + "vh"
    // var elmnt = document.getElementsByClassName("page")[0].offsetHeight;
  }
  actionLockSummaryEMR(){
    this.emrService.lockEMR(this.patientInfo.reception_queue_id, "lock_emr").subscribe(dataReturn =>{
      if(dataReturn.status === true){
        this.saveEMR(1);
        this.toastrTranslateService.success(
          'Thành công',
          'Tổng kết bệnh án'
        );
      }else{
        this.toastrTranslateService.error(
          'Không thành công ' + dataReturn.results,
          'Tổng kết bệnh án'
        );
      }
    })
  }

  actionUnlockSummaryEMR(){
    this.emrService.lockEMR(this.patientInfo.reception_queue_id, "unlock_emr").subscribe(dataReturn =>{
      if(dataReturn.status === true){
        this.saveEMR(0);
        this.toastrTranslateService.success(
          'Thành công',
          'Mở khóa bệnh án'
        );
      }else{
        this.toastrTranslateService.error(
          'Không thành công ' + dataReturn.results,
          'Mở khóa bệnh án'
        );
      }
    })
  }

  openDialog(clickEvent: Event): void {
    clickEvent.stopPropagation();

    const dialogRef = this.dialog.open(ConfirmActionComponent, {data: {title: "Xác nhận mở khóa bệnh án", content: "Bạn có đồng ý mở khóa bệnh án không ?"}});
    dialogRef.afterClosed().subscribe(results => {
      if(results === true){
        this.actionUnlockSummaryEMR();
      }
    })
  }

  getInfoBlood(isPatientExpanded: boolean){
    if(isPatientExpanded !== true){
      return;
    }
    this.emrService.getDiUngNhomMauRh(this.patientInfo.patient_id || 0).subscribe(dataReturn => {
      if(dataReturn.status === true){
        this.patientInfo.blood_types = dataReturn.results[0].blood_types;
        this.patientInfo.rhesus_factor = dataReturn.results[0].rhesus_factor;
      }
    });
  }
  getInfoAllergy(isAllergyExpanded: boolean){
    if(isAllergyExpanded !== true){
      return;
    }
    this.emrService.getDiUngNhomMauRh(this.patientInfo.patient_id || 0).subscribe(dataReturn => {
      if(dataReturn.status === true){
        this.patientInfo.actives = dataReturn.results[0].actives;
        this.patientInfo.foods = dataReturn.results[0].foods;
        this.selectIngredients = dataReturn.results[0].actives;
      }
          });
  }
  getInfoFamily() {
    this.receptionService.getFamiliesOfPatient(this.patientInfo.patient_id).subscribe((res) => {
      if (res.status) {
        this.relationships = res.results;
      } else {
        this.relationships = [];
      }
    })
  }

  addChip(event: any, category: number): void {
        // Add our fruit
    if (event) {
      switch (category){
        case 0:
          if(!this.patientInfo.actives){
            this.patientInfo.actives = [];
          }
          this.patientInfo.actives.push(event);
          break;
        case 1:
          if(!this.patientInfo.foods){
            this.patientInfo.foods = [];
          }
          this.patientInfo.foods.push(event.value);
          break;
      }

    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeChip(chip: any, category: number): void {
    switch (category){
      case 0:
        const indexActive = this.patientInfo.actives ? this.patientInfo.actives.indexOf(chip) : 0;

        if (indexActive >= 0) {
          this.patientInfo.actives ? this.patientInfo.actives.splice(indexActive, 1) : "";
        }
        break;
      case 1:
        const indexFood =  this.patientInfo.foods ? this.patientInfo.foods.indexOf(chip) : 0;

        if (indexFood >= 0) {
          this.patientInfo.foods ? this.patientInfo.foods.splice(indexFood, 1) : "";
        }
        break;
    }

  }

  selectedChip(event: MatAutocompleteSelectedEvent, category: number): void {
    if(!this.patientInfo.actives){
      this.patientInfo.actives = [];
    }
    switch (category){
      case 0:
        this.patientInfo.actives?.push(event.option.value)
        this.ingredientInput ? this.ingredientInput.nativeElement.value = '' : "";
        break;
      case 1:
        this.patientInfo.foods?.push(event.option.value)
        this.foodInput ? this.foodInput.nativeElement.value = '' : "";
        break;
    }

    this.selectIngredients = null;
  }

  // selected(event: MatAutocompleteSelectedEvent): void {
  //   this.patientInfo.actives ? this.patientInfo.actives.push(event.option.value) : "";
  //   this.fruitInput ? this.fruitInput.nativeElement.value = '' : "";
  //   this.fruitCtrl.setValue(null);
  // }
  selectIngredients : any = "";
  selectFood : any = "";
  getCategoryIngredient (query: any){
    this.categoryService.getCategoryGenaral({ query: query, active: true }, 0, 10, 'ingredient').subscribe(dataReturn => {
      if(dataReturn.status === true){
        this.listIngredient = dataReturn.results;
        return dataReturn.results;
      }
    })
    return EMPTY ;
  }

  handleDataChange(event: SearchReceptionQueueDataChangeEvent | null) {
    if (event) {
      const {
        stateEMR_createGiayTo,
        stateEMR_viewBenhAn,
        idEMR,
        listBA,
        listGiayTo,
        listCategory,
        benhAnSelect,
        isSuccessGetBA
      } = event.data;
      if (stateEMR_createGiayTo !== undefined) {
        this.stateEMR.createGiayTo = stateEMR_createGiayTo;
      }
      if (stateEMR_viewBenhAn !== undefined) {
        this.stateEMR.viewBenhAn = stateEMR_viewBenhAn;
      }
      if (stateEMR_createGiayTo !== undefined) {
        this.stateEMR.createGiayTo = stateEMR_createGiayTo;
      }
      if (idEMR !== undefined) {
        this.idEMR = idEMR;
      }
      if (listBA !== undefined) {
        this.listBA = listBA;
      }
      if (listGiayTo !== undefined) {
        this.listGiayTo = listGiayTo;
      }
      if (listCategory !== undefined) {
        this.listCategory = listCategory;
      }
      if (benhAnSelect !== undefined) {
        this.benhAnSelect = benhAnSelect;
      }
      if (isSuccessGetBA !== undefined) {
        this.isSuccessGetBA = isSuccessGetBA;
      }
    }
  }
  searchDocument: string = '';
  searchDocumentResults: string[] = [];
  listTenLoaiGiayTo: string[] = [];
  seacrchDocument (event: string){
    if (this.searchDocument) {
      this.searchDocumentResults = this.performSearch(this.searchDocument);
    } else {
      this.searchDocumentResults = [];
    }
  }
  performSearch(query: string): any[] {
    if (!query) {
      return [];
  }

  query = query.toLowerCase(); // Chuyển query về chữ thường để so sánh
  for (let item of this.listLoaiGiayTo){
    if (item.MO_TA) {
      this.listTenLoaiGiayTo.push(item.MO_TA);
    }
  }
  const filteredResults = this.listTenLoaiGiayTo.filter(item =>
    item.toLowerCase().includes(query)
  );

  return filteredResults;
  }
  navigateToDocument(item: string) {
  }

  onChange(event: any) {
    if (event && event.data) {
      event.data.token = this.cookieService.get('access_token');
    }
  }
}
export class ExampleDataSource extends DataSource<any> {
  /** Stream of data that is provided to the table. */

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any[]> {
    return this.data;
  }
  data: any;
  constructor(arr: []) {
    super();
    this.data = new BehaviorSubject<Patient_EMR[]>(arr);
  }


  disconnect() {}
}
