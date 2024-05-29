import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmrService } from '../../../services/emr.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FrontendConfigs, LocalStorageService } from '@shared';
import { Patient_EMR } from '../../../model/Patient_EMR';
import { SHARE_DATA_KEYS, ShareDataService } from 'app/services/share-data.service';
import { of, Subject, Subscription } from 'rxjs';
import { PPTTTE } from '../../../model/giay_to_dinh_kem_emr/phieu_phau_thuat_thu_thuat_emr';
import { ToastrTranslateService } from '@shared/services/toastr-translate-service';
import { ComponentUtils } from '../../laboratory/utils/component-utils';
import { LabratoryMenuService, MenuViewModeEnum } from '../../../services/laboratory/labratory-menu.service';
import { DocumentFormDefault } from '../../../model/emr/document-exam/form';
import { TranslateService } from '@ngx-translate/core';
import { Globals } from '../../../app.globals';
import { LaboratoryService } from 'app/modules/laboratory/laboratory.service';
import { DocumentExam, DocumentType, LayoutCreatedType } from '../../../model/emr/document-exam/document-exam';
import { TitleService } from '../../../services/title/title.service';
import { EmrComponentBase } from '../abstract/emr.component.base';
import { SearchReceptionQueueDataChangeEvent } from '@shared/components/search-reception-queue/search-reception-queue.component';
import { ServiceService } from '../../../services/service.service';
import { FrontendConfigService } from '../../../services/frontend-config/frontend-config.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TemplateExameService } from '../../../services/template/template-exam.service';
import { TemplateExam } from '../../../model/examination/template-exam';
import { ReceptionService } from '../../../services/reception.service';
import * as moment from 'moment';
import { CommonService } from '../../../services/common.service';
import { SignatureService } from '../../../services/signature/signature.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { TopMenuButton } from '@shared/components/menu-v3/menu-v3.component';
import { takeUntil } from 'rxjs/operators';
import { ConfirmActionComponent } from '../../components/confirm-action/confirm-action.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '@shared/components/dialog-confirm/dialog-confirm.component';
import { PharmaService } from 'app/services/medicament/pharma.service';

type ObjectId = string;

export type DocumentExamResult = {
  id: DocumentId
  code: string
  created_at: Unix
  created_by: Username
  updated_at: Unix
  real_created_date: any
};

type DocumentId = number;
type Unix = number;
type Username = string;

@Component({
  selector: 'app-document-exam',
  templateUrl: './document-exam.component.html',
  styleUrls: ['./document-exam.component.scss']
})
export class DocumentExamComponent extends EmrComponentBase implements OnInit, OnDestroy {
  isEdit: boolean = false
  documentExamForm:any;
  patientHis: any;
  YEUCAU_SDKS_UTQL: any;
  patientInfo: Patient_EMR = new Patient_EMR();
  listLoaiGiayToSave: DocumentExamResult[] = []; //todo: loại giấy tờ được lưu
  listYLenh: any = []; //todo: loại giấy tờ được lưu
  isSuccessGetBA: boolean = false;
  isCreateGiayToLienQuan : boolean = false;
  saveTemplate : boolean = false;
  stateEMR = {
    viewBenhAn: false,
    createGiayTo: false,
    editGiayTo: false,
    print: false,
    save: false
  }
  listInpatientFile: any = {};
  selectGiayToLienQuan: Partial<DocumentExamResult> = {};
  dataGiayToLienQuan: any = {};
  idDocumentExam: ObjectId = '';
  idDocumentExamCode: string = '';
  dataTemplate: any = {
    examination_template_code: '',
    examination_template_name : '',
  };
  selectDataTemplate: TemplateExam = new TemplateExam();

  subsBienBanHoiChan: Subscription = new Subscription(); //todo: form biên bản hội chẩn
  listPPTTTE: Array<PPTTTE> = new Array<PPTTTE>(); //todo: lấy ds các phiếu phẫu thuật thủ thuật từ geh -> đổ xuống component;
  subsPPTTTE: Subscription = new Subscription();

  pullSubscriptions: Record<string, Subscription>;

  semenForm = DocumentFormDefault;
  protected subscriptions = new Subscription();
  protected isCreatingNew: boolean = true;

  //todo: giấy tờ liên quan
  ID_THEO_DOI_DI_UNG_THUOC: number = 5078;
  ID_BIEN_BAN_HOI_CHAN: number = 0;
  ID_FORM_GIAY_CHUNG_NHAN_THUONG_TICH: number = 0;
  ID_FORM_KIEM_DIEM_TU_VONG: number = 0;
  ID_CHUNG_NHAN_PHAU_THUAT : number = 0;
  ID_DIEU_TRI_NOI_TRU : number = 0;
  ID_FORM_PHIEU_LINH_PHAT_MAU : number = 15;
  ID_PHIEU_CHAM_SOC: number = 0;
  ID_TRUYEN_DICH: number = 0;
  ID_GIAY_CHUYEN_VIEN: number = 0;
  ID_DIEU_TRI_NG_TRU: number = 0;
  ID_BIEN_BAN_HC_KHANG_SINH: number = 5080;
  ID_PHIEU_GAY_ME_HOI_SUC: number = 0;
  ID_DEM_GAC = 0;
  ID_PDM = 0;
  ID_PDNKCBTYC = 0; //phiếu đề nghị khám chữa bệnh theo yêu cầu.
  ID_CAM_KET_NB_NOI_TRU : number = 5097;
  ID_PHIEU_CHAM_SOC_Y_TA : number = 0;
  ID_PHIEU_LAP_KE_HOACH_CHAM_SOC : number = 6054;
  ID_GIAY_KHAM_TIEN_ME : number = 6067;
  IS_PORTAL : number = 0;
  DOMAIN_XN : string = "";
  protected variableGlobal: FrontendConfigs = {};

  protected getFrontendConfigValue(formName: string, defaultValue = 0) {
    return this.variableGlobal[formName] ? Number(this.variableGlobal[formName]?.value) : defaultValue;
  }

  disabled= true;
  template= false;
  upperSave = false
  statusSaveTemplate= false;
  indexOfElementInTable = -1;
  LAYOUT_CREATED = 1;

  document_exam_form_id = 0;
  user_logged: any;

  medicalOrders: any;

  listIdEnableOnParent: number[] = [];
  isEnabledOnParent = false

  public checkedMultiPrintByOid: Record<ObjectId, (Record<DocumentId, boolean> | undefined)> = {};

  public formIdToSortKey: Record<any, string> = {};
  public readonly defaultSortKey = 'created_at';

  listLoaiGiayToSaveChecked: any[] = [] //Mảng để lưu các phiếu đã checked
  isCheckAll = false; //Biến để lưu trạng thái ô check all

  private destroy$ = new Subject<void>();

  constructor(private emrService: EmrService,
              private localStorageService: LocalStorageService,
              private translate: TranslateService,
              private shareDataService: ShareDataService,
              private toastr: ToastrTranslateService,
              private menuService: LabratoryMenuService,
              private laboratoryService: LaboratoryService,
              private globals: Globals,
              private serviceService: ServiceService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private title: TitleService,
              private receptionService: ReceptionService,
              proxy: FrontendConfigService,
              private templateExameService: TemplateExameService,
              private commonService: CommonService,
              private signatureService: SignatureService,
              private toastrTranslateService: ToastrTranslateService,
              private dialog: MatDialog,
              private pharmaService: PharmaService

  ) {
    super();
    this.variableGlobal = proxy.getFrontendConfig();

    this.pullSubscriptions = SHARE_DATA_KEYS.reduce<Record<string, Subscription>>((output, key) => {
      output[key] = new Subscription();
      return output;
    }, {});

    const params = activatedRoute.snapshot.queryParams;
    if (params.rqi) {
      this.receptionService.getPatients({query: params.rqi}, 1, 0).subscribe(data => {
        if (data.status == true &&
          data.results?.[0]?.reception_queue_id.trim() === params.rqi.trim()) {
          this.patientChange(data.results[0]);
        }
      });
    }

    activatedRoute.queryParams.subscribe((params) => {
      if (params.form_id) {
        this.document_exam_form_id = params.form_id;
      }
    })

    title.setTitle('menu.emr.document_exam');
    this.user_logged = this.localStorageService.get("user_logged");
  }

  ngOnInit(): void {
    this.init();
    this.ID_BIEN_BAN_HOI_CHAN = this.variableGlobal["FORM_BIEN_BAN_HOI_CHAN"] ? Number(this.variableGlobal["FORM_BIEN_BAN_HOI_CHAN"].value) : 0;
    this.ID_BIEN_BAN_HC_KHANG_SINH = this.variableGlobal["FORM_ID_BIEN_BAN_HC_KHANG_SINH"] ? Number(this.variableGlobal["FORM_ID_BIEN_BAN_HC_KHANG_SINH"].value) : 5080;
    this.ID_CHUNG_NHAN_PHAU_THUAT = this.variableGlobal["FORM_CHUNG_NHAN_PHAU_THUAT"] ? Number(this.variableGlobal["FORM_CHUNG_NHAN_PHAU_THUAT"].value) : 0;
    this.ID_TRUYEN_DICH = this.variableGlobal["FORM_PHIEU_TRUYEN_DICH"] ? Number(this.variableGlobal["FORM_PHIEU_TRUYEN_DICH"].value) : 0;
    this.ID_THEO_DOI_DI_UNG_THUOC = this.variableGlobal["FORM_THEO_DOI_DI_UNG_THUOC"] ? Number(this.variableGlobal["FORM_THEO_DOI_DI_UNG_THUOC"].value) : 5078;
    this.ID_GIAY_CHUYEN_VIEN = this.variableGlobal["FORM_GIAY_CHUYEN_VIEN"] ? Number(this.variableGlobal["FORM_GIAY_CHUYEN_VIEN"].value) : 0;
    this.ID_PHIEU_CHAM_SOC = this.variableGlobal["FORM_PHIEU_CHAM_SOC"] ? Number(this.variableGlobal["FORM_PHIEU_CHAM_SOC"].value) : 0;
    this.ID_FORM_GIAY_CHUNG_NHAN_THUONG_TICH = this.variableGlobal["FORM_GIAY_CHUNG_NHAN_THUONG_TICH"] ? Number(this.variableGlobal["FORM_GIAY_CHUNG_NHAN_THUONG_TICH"].value) : 0;
    this.ID_FORM_KIEM_DIEM_TU_VONG = this.variableGlobal["FORM_KIEM_DIEM_TU_VONG"] ? Number(this.variableGlobal["FORM_KIEM_DIEM_TU_VONG"].value) : 0;
    this.ID_DEM_GAC = this.variableGlobal["FORM_ID_DEM_GAC"] ? Number(this.variableGlobal["FORM_ID_DEM_GAC"].value) : 5027;
    this.ID_PHIEU_GAY_ME_HOI_SUC = this.variableGlobal["ID_PHIEU_GAY_ME_HOI_SUC"] ? Number(this.variableGlobal["ID_PHIEU_GAY_ME_HOI_SUC"].value) : 0;
    this.ID_PHIEU_CHAM_SOC_Y_TA = this.getFrontendConfigValue("FORM_PHIEU_CHAM_SOC_Y_TA");
    this.ID_GIAY_KHAM_TIEN_ME = this.getFrontendConfigValue("FORM_GIAY_KHAM_TIEN_ME");
    this.IS_PORTAL = this.getFrontendConfigValue("IS_PORTAL");
    this.DOMAIN_XN = this.variableGlobal["DOMAIN_XN"]?.value;

    this.formIdToSortKey["default"] = "created_at";
    this.formIdToSortKey[this.ID_TRUYEN_DICH] = "ngay_thuc_hien_unix";

    this.documentExamForm = new FormGroup({
      document_exam_id: new FormControl(null, {updateOn: 'change'}),
    });

    this.listIdEnableOnParent = [
      this.ID_PHIEU_LAP_KE_HOACH_CHAM_SOC
    ]

    ComponentUtils.initWithFormAndMenu(
      [this.semenForm], this.menuService, this.subscriptions,
      {
        onCreate: () => {
          this.resetForm();
          this.isCreateGiayToLienQuan = true;
          this.menuService.viewAsCreatingNew();
          this.disabled = false;
        },
        onCreateTemplate: () => {
          this.resetForm();
          this.menuService.viewAsCreatingNew();
          this.template = true;
          this.disabled = false;
        },
        afterCreate: () => {
          this.enableForm();
        },
        onEdit: () => {
          this.isEdit = true
          this.disabled = false;
        },
        afterEdit: () => {
          this.enableForm();
        },
        // onSave: () => this.formDirective.ngSubmit.emit(),
        onSave: () => {
          if(this.loaiGiayToLienQuan.ID === this.ID_PHIEU_THEO_DOI_CHUC_NANG_SONG) {
            this.disabled = false
            this.isEdit = false
            this.upperSave = true
          } else {
            this.disabled = true;
          }
          this.saveDocument();
        },
        onBack: async () => {
          this.disabled = true;
          this.isEdit = false;
          this.isCreateGiayToLienQuan = false;
          if(this.loaiGiayToLienQuan.ID === this.ID_PHIEU_THEO_DOI_CHUC_NANG_SONG) {
            this.isEdit = false
            this.menuService.changeViewMode(MenuViewModeEnum.CNSDisabledNew);
          }
          this.template = false;
        },
        onPrint: async () => {
          this.printDocument();
        },
        onSignature: async () => {
          this.printDocument(1);
        },
        onViewSignature: async () => {
          this.getLinkSign();
        },
        onDelete: () => {
          this.deleteDocument();
        }
      }
    );

    this.menuService.on('print_all')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.printDocument(0, {is_print_all: true}));
  }

  handleChangeDisabledStatus(value: boolean):void {
    this.disabled = value
  }
  /**
   * Chọn loại giấy tờ
   * @param loaiGiayTo
   */
  chooseDocumetExam(loaiGiayTo?: DocumentExam){
    if(loaiGiayTo){
      if (loaiGiayTo.MO_TA) {
        this.title.setTitle(loaiGiayTo.MO_TA.split(/^\d+. /)[1]);
      }

      this.loaiGiayToLienQuan = loaiGiayTo;

      /*
        - Mục đích: Tuỳ chỉnh disabled form dưới component con
        - Cách dùng: Thêm ID của document vào array listIdEnableOnParent
        - Created by: namdp
       */
      if(this.listIdEnableOnParent.includes(this.loaiGiayToLienQuan.ID)) {
        this.isEnabledOnParent = true
      }

      this.selectGiayToLienQuan = {};

      this.router.navigate(
        [],
        {
          relativeTo: this.activatedRoute,
          queryParams: <Params>{form_id: this.loaiGiayToLienQuan.ID},
          queryParamsHandling: 'merge'
        }
      );

      if (!this.patientInfo.patient_id) {
        return;
      }

      // Lấy danh sách phiếu đã lưu
      this.emrService.getListBA(1, this.patientInfo.patient_id, this.patientHis.reception_queue_id, this.loaiGiayToLienQuan.MA, this.patientInfo.medical_record_no).subscribe(data => {
        if(data.status === true){
          if((this.loaiGiayToLienQuan as DocumentExam).DOCUMENT_TYPE == DocumentType.Single){
            this.menuService.viewAsProcessed()
          }
          const documentSelect = data.results[0];
          this.idDocumentExam = documentSelect._id.$id;
          this.getResultInDocument(this.idDocumentExam);
        }else {
          this.listLoaiGiayToSave = [];
        }
      });

      /**
       * Lấy danh sách các phiếu có lấy dữ liệu từ HIS
       * * Phiếu phẫu thuật thủ thuật
       */
      //
      if (this.loaiGiayToLienQuan.CLS_CAT_QUERY) {
        this.serviceService.getServiceUsed(
          this.patientInfo.patient_id,
          this.patientInfo.reception_queue_id,
          this.patientInfo.in_patient,
          this.loaiGiayToLienQuan.CLS_CAT_QUERY,
          this.loaiGiayToLienQuan.QUERY_KEY_LEVEL_GEH,
          null
        ).subscribe((dataReturn) => {
          if (dataReturn.status && dataReturn.results?.length > 0) {
            this.stateEMR.createGiayTo = true;
            this.stateEMR.viewBenhAn = false;
          }
          dataReturn.results.forEach((cap1: any) => {
            cap1.data.forEach((cap2: any )=> {
              cap2.exams.forEach((cap3: any ) => {
                cap3.services.forEach((sv: any) =>{
                  if(sv.services.service_category_parent_id === 7 || sv.services.service_category_parent_id === 8){
                    this.listPPTTTE = [];
                    sv.services.results.forEach((service: any) => {
                      this.listPPTTTE.push(this.emrService.mapCategoryPPTTTEMR(service, sv.services._id.$id, sv.services));
                    });
                  }
                });
              });
            });
          });
        });
      }

      // BVKCG-1164: Thêm nút "In phiếu tổng hợp"
      const printAllButton: TopMenuButton = {
        type: 'print_all',
        icon: 'print',
        label: of('In phiếu tổng hợp'),
        after: 'print'
      };
      if (this.loaiGiayToLienQuan.IS_MULTI_PRINT) {
        this.menuService.addButton(printAllButton);
      } else {
        this.menuService.removeButton(printAllButton);
      }

      if(this.loaiGiayToLienQuan.LAYOUT_CREATED){
        this.LAYOUT_CREATED = this.loaiGiayToLienQuan.LAYOUT_CREATED //TODO: Khi chuyển phiếu sẽ về cấu hình của phiếu đó
      }else {
        this.LAYOUT_CREATED = 1; //TODO: Khi chuyển phiếu sẽ về cấu hình của phiếu đó
      }

    }else {
      this.loaiGiayToLienQuan = {};
      this.listLoaiGiayToSave = [];
    }
  }

  getResultInDocument(_id: string){
    if(this.patientInfo.patient_id){
      this.emrService.getInfoBA(1, _id).subscribe(dataReturn => {
        if (dataReturn.status === true) {
          if(this.loaiGiayToLienQuan.DOCUMENT_TYPE === DocumentType.Multiple){
            const sortKey = this.formIdToSortKey[this.loaiGiayToLienQuan.ID] || this.defaultSortKey;
            this.listLoaiGiayToSave = dataReturn.results.results
              .sort((d1: any, d2: any) => d1[sortKey] - d2[sortKey]);
          } else if (this.loaiGiayToLienQuan.DOCUMENT_TYPE === DocumentType.Single) {
            this.selectGiayToLienQuan = dataReturn.results.results;
            if(this.loaiGiayToLienQuan.ID === this.ID_PHIEU_THEO_DOI_CHUC_NANG_SONG) {
              if(dataReturn.results.results.result.blood_pressure.length > 0) {
                if(!this.isEdit) {
                  this.menuService.changeViewMode(MenuViewModeEnum.CNSDisabledNew)
                }
              }
            }
            this.isCreateGiayToLienQuan = false;
          }
          if (this.idDocumentExamCode) {
            this.selectDocumentExam(this.idDocumentExamCode);
          }
        } else {
          this.toastr.error('document_exam.toast.error.generic', '');
        }
      });
    }
  }

  /**
   * Chọn phiếu đã lưu
   * @param idDocumentExam
   */
  selectDocumentExam(idDocumentExam: string, indexOfElement?: number){
    if(indexOfElement != undefined){
      this.indexOfElementInTable = indexOfElement;
    }
    if(idDocumentExam){
      this.isCreateGiayToLienQuan = false;
      this.selectGiayToLienQuan = this.listLoaiGiayToSave.filter((x: any) => x.code === idDocumentExam)[0];
      this.menuService.viewAsProcessed()
    }
  }

  handleDataChange(event: SearchReceptionQueueDataChangeEvent | null) {
    if (event) {
      const {
        document_exam
      } = event.data;
      if (document_exam !== undefined) {
        this.chooseDocumetExam(document_exam);
      } else {
        this.idDocumentExamCode = '';
      }
    }
  }

  patientChange(patient: Patient_EMR) {
    this.isCreateGiayToLienQuan = false;
    this.listLoaiGiayToSave = [];
    if(patient?.patient_id){
      this.patientInfo = this.emrService.convertObjPatientHisToEMR(patient);
      this.patientHis = patient;
      if(this.loaiGiayToLienQuan && this.loaiGiayToLienQuan.ID){
        this.chooseDocumetExam(this.loaiGiayToLienQuan);
      }
      this.router.navigate(
        [],
        {
          relativeTo: this.activatedRoute,
          queryParams: <Params>{rqi: patient.reception_queue_id},
          queryParamsHandling: 'merge'
        }
      );
    }else {
      this.resetForm();
      this.disabled = true;
      this.menuService.viewAsWaiting();
    }
  }

  handleOpenConfirmMedicament() {
    let dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '400px',
      panelClass: 'confirm-dialog',
      data: {
        title: "Tạo yêu cầu sử dụng kháng sinh",
        description: "Bạn có muốn tạo yêu cầu sử dụng kháng sinh không?",
      },
    });

    dialogRef.afterClosed().subscribe((results: any) => {
      if(results) {
        let url = this.globals.APP_DOMAIN + "v3/medicament/thuoc-duyet"
        window.open(url, "_blank")
      }
    })
  }

  getMedicalOrders() {
    let filter = {
      date_start: moment().format("DD-MM-y"),
      date_end: moment().format("DD-MM-y"),
      pharma_category_id: 0,
      pharma_health_insurance: 0,
      supply_id: 1,
      is_required_to_approve_status: "1, 3, 4",
      form_id: 5079
    }

    this.pharmaService.getMedicalOrderPrescription(filter).subscribe((res: any) => {
      if(res.status) {
        if(res.results.length === 0) {
          this.handleOpenConfirmMedicament()
        }
      } else {
        this.handleOpenConfirmMedicament()
      }
    })
  }

  checkRequiredToApprovePharma (listPharma: any) {
    let isCheck = false;
    listPharma.forEach((pharma: any) => {
        if (pharma.is_required_to_approve === 1) {
            isCheck = true;
            return;
        }
    });
    return isCheck;
  }
  saveDocument(){
    if(!this.patientInfo.patient_id && !this.template){
      this.toastr.error("Hãy chọn bệnh nhân để lưu!", "Có lỗi");
      return;
    }
    if (!this.emrService.shouldSaveToEMR(this.loaiGiayToLienQuan)
      || !this.emrService.shouldSaveOrPrintInMain(this)) {
      return;
    }
    let patientInfoToKeep = {};

    switch (this.loaiGiayToLienQuan.ID){
      case this.ID_BIEN_BAN_HOI_CHAN:
      case this.ID_BIEN_BAN_HC_KHANG_SINH:
        //todo: phiếu biên bản hội chẩn
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
        //todo: phiếu lượng giá chúc năng
        this.subsPPTTTE = this.shareDataService.pullData("plgcn").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      case this.ID_CHI_DINH_DIEU_TRI_PHCN:
      case this.ID_THUC_HIEN_KY_THUAT_PHCN:
        //todo: phiếu lượng giá chức năng và sự tham gia
        this.subsPPTTTE = this.shareDataService.pullData("phieu_thuc_hien_ky_thuat_phcn").subscribe(data => {
          this.dataGiayToLienQuan = data;
          if(this.ID_THUC_HIEN_KY_THUAT_PHCN){
            this.dataGiayToLienQuan.THUC_HIEN.shift();
          }
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
        this.subsPPTTTE = this.shareDataService.pullData("giay_chuyen_vien").subscribe(data => {
          // let o1 = {
          //   exam_done_time: moment(data.exam_done_time).unix(),
          //   date_chuyen_vien: moment(data.date_chuyen_vien).unix(),
          //   parent_id_in:  moment(data.parent_id_in).unix(),
          // }
          // let pushObj = Object.assign({}, data, o1);
          this.dataGiayToLienQuan = data;
        });
        break;
      case this.ID_PHIEU_CHAM_SOC:
        //todo: phiếu chăm sóc
        this.subsPPTTTE = this.shareDataService.pullData("phieu_cham_soc").subscribe(data => {
          this.dataGiayToLienQuan = data
          this.dataGiayToLienQuan.emr = this.emrService.mapPCSHisToEMR(data);
        });
        break;
      case this.ID_PHIEU_LAP_KE_HOACH_CHAM_SOC:
        //todo: phiếu lập kế hoạch chăm sóc
        this.subsPPTTTE = this.shareDataService.pullData("phieu_lap_ke_hoach_cham_soc").subscribe(data => {
          this.dataGiayToLienQuan = data
          this.dataGiayToLienQuan.emr = this.emrService.mapPCSHisToEMR(data);
        });
        break;
      case this.ID_GIAY_KHAM_TIEN_ME:
        //todo: phiếu khám tiền mê
        this.subsPPTTTE = this.shareDataService.pullData("giay_kham_tien_me").subscribe(data => {
          this.dataGiayToLienQuan = data
        });
        break;
      case this.ID_PHIEU_TRUYEN_MAU:
        //todo: phiếu truyền máu
        this.subsPPTTTE = this.shareDataService.pullData("phieu_truyen_mau").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      case this.ID_PDM:
        //todo: phiếu duyệt mổ
        this.subsPPTTTE = this.shareDataService.pullData("phieu_duyet_mo").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      case this.ID_PDNKCBTYC:
        //todo: phiếu đề nghị khám chữa bệnh theo yêu cầu.
        this.subsPPTTTE = this.shareDataService.pullData("phieu_de_nghi_kcbtyc").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      case this.ID_BO_CAU_HOI_NRS:
        //todo: phiếu đề nghị khám chữa bệnh theo yêu cầu.
        this.subsPPTTTE = this.shareDataService.pullData("bo_cau_hoi_nrs").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      case this.ID_CAM_KET_NB_NOI_TRU:
        //todo: giấy cam kết nằm nội trú
        this.subsPPTTTE = this.shareDataService.pullData("GIAY_CAM_KET_NGUOI_BENH_NAM_NOI_CHU").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      case this.ID_THU_PHAN_UNG_THUOC:
        //todo: phiếu cls || phiếu thăm dò chức năng
        this.subsPPTTTE = this.shareDataService.pullData("phieu_cls").subscribe(data => {
          this.dataGiayToLienQuan["emr"] = data;
        });
        break;
      case this.ID_THEO_DOI_DI_UNG_THUOC:
        //todo: THEO DÕI DỊ ỨNG THUỐC
        this.subsPPTTTE = this.shareDataService.pullData("td_di_ung_thuoc").subscribe(data => {
          this.dataGiayToLienQuan= data;
        });
        break;
      case this.ID_THEO_DOI_TRUYEN_DICH:
        //todo: Theo dõi truyền dịch
        this.subsPPTTTE = this.shareDataService.pullData("phieu_theo_doi_truyen_dich").subscribe(data => {
          this.dataGiayToLienQuan= data;
        });
        break;
      case this.ID_TRUYEN_DICH:
        //todo:  Truyền dịch
        this.subsPPTTTE = this.shareDataService.pullData("td_truyen_dich").subscribe(data => {
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
      //   this.subsPPTTTE = this.shareDataService.onData("phieu_dieu_tri").subscribe(data => {
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
      case this.ID_YEU_CAU_QUAN_LY_KHANG_SINH:
        //todo: yêu cầu sử dụng kháng sinh
        this.subsPPTTTE = this.shareDataService.pullData("yeu_cau_sd_ks_ql").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      case this.ID_KHAI_THAC_TIEN_SU_DUNG_THUOC:
        //todo: khai thác tiền sử thuốc
        this.subsPPTTTE = this.shareDataService.pullData("khai_thac_tien_su_di_ung_thuoc").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      case this.ID_DEM_GAC: {
        this.pullSubscriptions['dem_gac'] = this.shareDataService.pullData("dem_gac").subscribe(data => {
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
      case this.ID_PHIEU_THEO_DOI_CHUC_NANG_SONG: {
        if(!this.upperSave) {
          this.disabled = false
          this.isEdit = true
        }
        this.pullSubscriptions['phieu_theo_doi_chuc_nang_song'] = this.shareDataService.pullData("phieu_theo_doi_chuc_nang_song").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      }
      case this.ID_PHIEU_CHAM_SOC_Y_TA: {
        this.pullSubscriptions['phieu_cham_soc_y_ta'] = this.shareDataService.pullData("phieu_cham_soc_y_ta").subscribe(data => {
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
      case this.ID_BIEN_BAN_HOI_CHAN_PHAU_THUAT: {
        this.pullSubscriptions['bien_ban_hoi_chan_phau_thuat'] = this.shareDataService.pullData("bien_ban_hoi_chan_phau_thuat").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      }
      case this.ID_HSBA_CS_DT_HIV: {
        this.pullSubscriptions['hsba_cs_dt_hiv'] = this.shareDataService.pullData("hsba_cs_dt_hiv").subscribe(data => {
          data.xmlBhyt = this.genXMLDieuTriHIV(data);
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
      case this.ID_TU_CHOI_DIEU_TRI: {
        this.pullSubscriptions['tu_choi_dieu_tri'] = this.shareDataService.pullData("tu_choi_dieu_tri").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      }
      case this.ID_THEO_DOI_GIAM_DAU_SAU_MO: {
        this.pullSubscriptions['td_giam_dau_sau_mo'] = this.shareDataService.pullData("td_giam_dau_sau_mo").subscribe(data => {
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
      case this.ID_PHIEU_GDSK_NGUOI_BENH: {
        this.pullSubscriptions['phieu_giao_duc_suc_khoe_cho_nguoi_benh'] = this.shareDataService.pullData("phieu_giao_duc_suc_khoe_cho_nguoi_benh").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      }
      case this.ID_PHIEU_CHAM_SOC_SO_SINH: {
        this.pullSubscriptions['phieu_cham_soc_so_sinh'] = this.shareDataService.pullData("phieu_cham_soc_so_sinh").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      }
      case this.ID_BANG_DANH_GIA_THANG_DIEM_GLASGOW: {
        this.pullSubscriptions['bang_danh_gia_thang_diem_glasgow'] = this.shareDataService.pullData("bang_danh_gia_thang_diem_glasgow").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      }
      case this.ID_BANG_THEO_DOI_BENH_NHAN_ECMO: {
        this.pullSubscriptions['bang_theo_doi_benh_nhan_ecmo'] = this.shareDataService.pullData("bang_theo_doi_benh_nhan_ecmo").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      }
      case this.ID_BANG_KIEM_CHUAN_BI_VA_BAN_GIAO_NGUOI_BENH: {
        this.pullSubscriptions['bang_kiem_chuan_bi_va_ban_giao_nguoi_benh'] = this.shareDataService.pullData("bang_kiem_chuan_bi_va_ban_giao_nguoi_benh").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      }
      case this.ID_PHIEU_THEO_DOI_BENH_NHAN_LOC_MAU_LIEN_TUC: {
        this.pullSubscriptions['phieu_theo_doi_benh_nhan_loc_mau_lien_tuc'] = this.shareDataService.pullData("phieu_theo_doi_benh_nhan_loc_mau_lien_tuc").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      } case this.ID_PHIEU_LOC_MAU_LIEN_TUC: {
        this.pullSubscriptions['phieu_loc_mau_lien_tuc'] = this.shareDataService.pullData("phieu_loc_mau_lien_tuc").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      }
      case this.ID_TOM_TAT_HO_SO_BENH_AN: {
        this.pullSubscriptions['tom_tat_hsba'] = this.shareDataService.pullData("tom_tat_hsba").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      }
      case this.ID_PHIEU_THEO_DOI_TIEN_SU_DI_UNG: {
        this.pullSubscriptions['phieu_theo_doi_tien_su_di_ung'] = this.shareDataService.pullData("phieu_theo_doi_tien_su_di_ung").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      }
      case this.ID_PHIEU_TU_NGUYEN: {
        this.pullSubscriptions['phieu_tu_nguyen'] = this.shareDataService.pullData("phieu_tu_nguyen").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      }
      case this.ID_PHIEU_NHAN_DINH_NGUOI_BENH_VAO_VIEN: {
        this.pullSubscriptions['phieu_nhan_dinh_nguoi_benh_vao_vien'] = this.shareDataService.pullData("phieu_nhan_dinh_nguoi_benh_vao_vien").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      }
      case this.ID_THONG_TIN_TU_VAN: {
        this.pullSubscriptions['phieu_thong_tin_tu_van'] = this.shareDataService.pullData("phieu_thong_tin_tu_van").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      }
      case this.ID_BO_CAU_HOI_TRE_EM: {
        this.pullSubscriptions['bo_cau_hoi_tre_em'] = this.shareDataService.pullData("bo_cau_hoi_tre_em").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      }
      case this.ID_PHIEU_DANH_GIA_DINH_DUONG_PHU_NU_MANG_THAI: {
        this.pullSubscriptions['phieu_danh_gia-dinh_duong_phu_nu_mang_thai'] = this.shareDataService.pullData("phieu_danh_gia-dinh_duong_phu_nu_mang_thai").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      }
      case this.ID_PDNKCBTYC_KSAN: {
        this.pullSubscriptions['phieu_de_nghi_kcbtyc_ksan'] = this.shareDataService.pullData("phieu_de_nghi_kcbtyc_ksan").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      }
      case this.ID_GIAY_KHAM_SUC_KHOE_LAI_XE: {
        this.pullSubscriptions['giay_kham_suc_khoe_lai_xe'] = this.shareDataService.pullData("giay_kham_suc_khoe_lai_xe").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      }
      case this.ID_PHIEU_LAP_KE_HOACH_CHAM_SOC: {
        this.pullSubscriptions['phieu_lap_ke_hoach_cham_soc'] = this.shareDataService.pullData("phieu_lap_ke_hoach_cham_soc").subscribe(data => {
          this.dataGiayToLienQuan = data;
        });
        break;
      }
      case this.ID_GIAY_KHAM_TIEN_ME: {
        this.pullSubscriptions['giay_kham_tien_me'] = this.shareDataService.pullData("giay_kham_tien_me").subscribe(data => {
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
      default:
        break;
    }

    if (this.isCreateGiayToLienQuan && this.dataGiayToLienQuan?.id) {
      delete this.dataGiayToLienQuan?.id;
    }

    if(this.statusSaveTemplate == false){
      this.statusSaveTemplate = true;
      if(this.template){
        this.dataGiayToLienQuan.patient_info = undefined;
        this.saveTemplate = false;
        let dataTempate : any = {
          examination_template_code: this.dataTemplate.examination_template_code,
          examination_template_name: this.dataTemplate.examination_template_name,
          examination_template_content: '',
          form_id: parseInt(this.loaiGiayToLienQuan.ID),
          results: this.dataGiayToLienQuan
        }
        if(this.dataTemplate._id){
          dataTempate._id = this.dataTemplate._id;
        }
        this.templateExameService.createTemplate(dataTempate).subscribe((dataCreate: any) => {
          if(dataCreate.status == true){
            if(this.dataTemplate._id){
              this.toastr.success('','document_exam.toast.success.update');
            }else {
              this.toastr.success('','document_exam.toast.success.create');
            }
            this.saveTemplate = true;
            this.resetForm();
            this.menuService.signalBackOrSaveTemplate();
          }else {
            this.toastr.error(dataCreate.results, 'document_exam.toast.error.generic');
          }
          this.statusSaveTemplate = false;
        })
      }else {
        this.dataGiayToLienQuan.patient_info = { ...this.patientHis, ...patientInfoToKeep };
        delete this.dataGiayToLienQuan.patient_info._id;
        delete this.dataGiayToLienQuan.patient_info.time_lime;
        this.dataGiayToLienQuan.patient_info = this.emrService.ObjPatientHis(this.dataGiayToLienQuan.patient_info);
        this.emrService.saveEMR(this.dataGiayToLienQuan, this.patientInfo.patient_id || 0,
          this.patientInfo.reception_queue_id, this.loaiGiayToLienQuan.ID,
          this.patientInfo.in_patient, this.loaiGiayToLienQuan.MA, this.loaiGiayToLienQuan.DOCUMENT_TYPE, this.patientInfo.medical_record_no).subscribe(data => {
          if(data.status === true){
            this.menuService.signalBackOrSave();
            this.chooseDocumetExam(this.loaiGiayToLienQuan);
            if(this.idDocumentExamCode === ''){
              if(this.loaiGiayToLienQuan.ID === this.ID_BIEN_BAN_HC_KHANG_SINH) {
                if(this.dataGiayToLienQuan.pharmas !== undefined && this.dataGiayToLienQuan.pharmas.length > 0) {
                  if(this.checkRequiredToApprovePharma(this.dataGiayToLienQuan.pharmas)) {
                    this.handleOpenConfirmMedicament()
                  }
                }
              }
              if(!this.isEdit) {
                this.resetForm();
              } else {
                this.isEdit = false;
              }
              this.toastr.success('document_exam.toast.success.create','');
            }else {
              if(this.loaiGiayToLienQuan.ID === this.ID_BIEN_BAN_HC_KHANG_SINH) {
                if(this.dataGiayToLienQuan.pharmas !== undefined && this.dataGiayToLienQuan.pharmas.length > 0) {
                  if(this.checkRequiredToApprovePharma(this.dataGiayToLienQuan.pharmas)) {
                    this.getMedicalOrders()
                  }
                }
              }
              this.toastr.success('document_exam.toast.success.update','');
            }
          }else {
            this.toastr.error(data.results, 'document_exam.toast.error.generic');
          }
          this.statusSaveTemplate = false;
        })
      }
    }
  }

  ngOnDestroy() {
    Object.values(this.pullSubscriptions).forEach((s) => s.unsubscribe());
    this.subscriptions.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  private enableForm() {
    this.semenForm.enable();
  }
  resetForm = () => {
    // this.idDocumentExam = '';
    this.idDocumentExamCode = '';
    this.dataGiayToLienQuan = {};
    this.selectGiayToLienQuan = {};
    this.dataTemplate = {};
    this.isEdit = false
    if(this.isEnabledOnParent) {
      this.isCreateGiayToLienQuan = false;
    } else {
      this.isCreateGiayToLienQuan = true;
    }
    this.indexOfElementInTable = -1;
    this.listLoaiGiayToSaveChecked = []
    this.checkedMultiPrintByOid[this.idDocumentExam] = {};

    if (this.emrService.shouldWipeWhenCreate(this)) {
      const loaiGiayToLienQuan = this.loaiGiayToLienQuan;
      this.loaiGiayToLienQuan = {};
      setTimeout(() => {
        this.loaiGiayToLienQuan = loaiGiayToLienQuan;
      });
    }
  };
  createDocument(){
    this.resetForm();
    this.menuService.viewAsCreatingNew();
    this.disabled = false;
  }
  printDocument(is_signature = 0, options = {is_print_all: false}){
    if(this.idDocumentExam != ''){
      let printModel = {
        report_router: "",
        patient_id: this.patientInfo.patient_id,
        reception_queue_id: this.patientInfo.reception_queue_id,
        domain: this.globals.API_DOMAIN,
        created_at: "{$match:{" + `"results.created_at" :` + this.selectGiayToLienQuan.created_at + "}},",
        object_id: this.idDocumentExam,
        form_id: this.loaiGiayToLienQuan.ID,
        list_id: "{$oid:'" + this.idDocumentExam + "'}",
        id : (Number(this.selectGiayToLienQuan.id)|| "") as any,
        list_examination_prescription_code: "",
        format:"pdf"
      }

      // BVKCG-1164
      if (this.loaiGiayToLienQuan.IS_MULTI_PRINT) {
        let ids = '';
        if (options.is_print_all) {
          ids = this.listLoaiGiayToSave.map(r => r.id).join(',');
        } else {
          ids = Object.entries(this.checkedMultiPrintByOid[this.idDocumentExam] || {})
            .reduce<DocumentId[]>((_ids, [id, checked]) => ([..._ids, ...(checked ? [Number(id)] : [])]), [])
            .join(',');
        }
        printModel.id = ids;
      }

      this.emrService.getRouterPrint(Number(this.loaiGiayToLienQuan.ID), 0).then(async (data: any) => {
        printModel.report_router = data.replace('/ehos/', ((this.globals.prefix_report) ? '/' + this.globals.prefix_report + '/' : '/ehos/'));
        if(is_signature){
          this.signatureService.getResultsFileSignature(printModel,0).then((result: any) =>{
            let arrPost: any = {
              "result": {
                "otp": '',
                "token": "",
                "patient_id":this.signatureService.base_convert(this.patientInfo.patient_id*1, 10, 32),
                "file_name": (moment.unix(this.patientHis?.created_at).format("YYMMDD") + "_" + this.idDocumentExam +"_"+(Number(this.selectGiayToLienQuan.id)|| "")),
                "path":  moment.unix(this.patientHis?.created_at).format("YYMMDD") + "/" + this.signatureService.base_convert(this.patientInfo.patient_id*1, 10, 32)+ "/GiayToLienQuan",
                "data": result,
                "user_name": this.user_logged.user_name,
                "toadoX": 400,
                "toadoY": 0
              }
            }
            if(Number(this.IS_PORTAL) === 1){
              setTimeout(()=>{
                let postReportQRCODE:  any = printModel;
                postReportQRCODE.qr_code_file_only = 1;
                postReportQRCODE.only_view = 1;
                this.signatureService.getResultsFileSignature(postReportQRCODE,1).then((result: any) =>{
                  const token = result.results.split("/")[(result.results.split("/").length - 1)];
                  arrPost.token =token;
                  const url = result.results;
                  if(url){
                    arrPost.file_name = url.replace(this.user_logged.url_e_doc, "").split("/")[0] + "_" + token;
                    arrPost.path = url.replace(this.user_logged.url_e_doc, "").replace("/" + token, "");
                    this.signatureService.signatureByDoctor(arrPost).then((result: any) =>{
                      this.toastr.success('','document_exam.toast.success.remove');
                      this.getLinkSign(url);
                      }, (error: any) =>{
                      this.toastr.error(error, 'document_exam.toast.error.generic');
                    })
                  }
                })
              }, 2000)
            }else {
              this.signatureService.signatureByDoctor(arrPost).then((result: any) =>{
                this.toastr.success('','document_exam.toast.success.remove');
                  this.getLinkSign();
                }, (error: any) =>{
                  this.toastr.error(error, 'document_exam.toast.error.generic');
              })
            }
          })
        }else {
          await this.emrService.modifyPrintDataByDocument(printModel, this);
          this.laboratoryService.printRouter(data, printModel,false)
        }
      })
    }
  }
  getLinkSign(url:string = ""){
    if(this.patientHis?.patient_id){
      if(Number(this.IS_PORTAL) === 1){
        let link_url = this.DOMAIN_XN + "sign/" + url.replace(this.user_logged.url_e_doc, "");
        window.open(link_url);
      }else {
        const file_name = (moment.unix(this.patientHis?.created_at).format("YYMMDD") + "_" + this.idDocumentExam +"_"+(Number(this.selectGiayToLienQuan.id)|| ""));
        const path =  moment.unix(this.patientHis?.created_at).format("YYMMDD") + "/" + this.signatureService.base_convert(this.patientInfo.patient_id*1, 10, 32)+ "/GiayToLienQuan";
        let link_url = this.DOMAIN_XN + "sign/" +path + "/" + file_name + ".pdf";
        window.open(link_url);
      }
    }
  }
  removeGiayTo(document: any, indexOfelement?: number){
    this.dialog.open<ConfirmActionComponent, { title: string, contentClass: string, content: string }>(ConfirmActionComponent, {
      data: {
        title: 'Bạn có chắc chắn muốn xoá phiếu đã tạo không?',
        content: '',
        contentClass: 'text-left',
      },
      panelClass: ['dialog-v3', 'confirm'],
    }).afterClosed().subscribe((isConfirm: boolean) => {
      if (!isConfirm) {
        return;
      } else {
        if(this.idDocumentExam && document.id){
          this.emrService.deleteInDocument(this.idDocumentExam, document.id).subscribe(res => {
            if (res.status) {
              this.toastrTranslateService.success('Xóa dữ liệu thành công', 'home.success',);
              if(indexOfelement !== undefined &&  indexOfelement !== -1) {
                this.listLoaiGiayToSave.splice(indexOfelement,1);
              }
              if(this.listLoaiGiayToSave.length > 0){
                this.selectDocumentExam(this.listLoaiGiayToSave[0].code, 0)
              }
              this.resetForm()
              this.isCreateGiayToLienQuan = false
              if(this.loaiGiayToLienQuan.ID === this.ID_PHIEU_THEO_DOI_CHUC_NANG_SONG) {
                this.menuService.changeViewMode(MenuViewModeEnum.Processed)
              }
            } else {
              this.toastrTranslateService.error('Lỗi xóa dữ liệu', 'home.error',);
            }
          });
        }
      }
    });
  }
  templategGetValue(dataTemplate: any){
    if(this.template){
      this.dataTemplate.examination_template_code = dataTemplate.examination_template_code;
      this.dataTemplate.examination_template_name = dataTemplate.examination_template_name;
      this.dataTemplate.examination_template_content = dataTemplate.examination_template_content;
      this.dataTemplate._id = dataTemplate._id.$id;
      this.dataGiayToLienQuan = dataTemplate.results;
      this.selectGiayToLienQuan = dataTemplate.results;
    }else {
      this.dataGiayToLienQuan = dataTemplate.results;
      this.selectGiayToLienQuan = dataTemplate.results;
    }
  }
  deleteDocument(){
    if(this.template && this.dataTemplate._id){
      this.templateExameService.deleteTemplate({results: {_id: this.dataTemplate._id}}).subscribe((dataCreate: any) => {
        if(dataCreate.status == true){
          this.saveTemplate = true;
          this.resetForm();
          this.toastr.success('','document_exam.toast.success.remove');
          this.menuService.signalBackOrSaveTemplate();
        }else {
          this.toastr.error(dataCreate.results, 'document_exam.toast.error.generic');
        }
      })
    }else {
      if(this.selectGiayToLienQuan && this.indexOfElementInTable !== -1) {
        this.removeGiayTo(this.selectGiayToLienQuan, this.indexOfElementInTable)
      } else {
        if(this.loaiGiayToLienQuan.ID === this.ID_PHIEU_THEO_DOI_CHUC_NANG_SONG) {
           this.removeGiayTo(this.selectGiayToLienQuan)
        }
      }
    }
  }
  genXMLDieuTriHIV(data: any) {
    let obj = {

      'MA_LK': data.MA_LK,
      'MA_THE_BHYT': data.MA_THE_BHYT || "",
      'SO_CCCD': data.SO_CCCD || "",
      'NGAYKD_HIV': data.ngaykd_hiv ? moment(data.ngaykd_hiv).format("YYYYMMDD") : "",
      'BDDT_ARV': data.bddt_arv ? moment(data.bddt_arv).format("YYYYMMDD") : "",
      'MA_PHAC_DO_DIEU_TRI_BD': data.MA_PHAC_DO_DIEU_TRI_BD || "",
      'MA_BAC_PHAC_DO_BD': data.MA_BAC_PHAC_DO_BD ? data.MA_BAC_PHAC_DO_BD.ID : "",
      'MA_LYDO_DTRI': data.MA_LYDO_DTRI ? data.MA_LYDO_DTRI.ID : "",
      'LOAI_DTRI_LAO': data.LOAI_DTRI_LAO ? data.LOAI_DTRI_LAO.ID : "",
      'PHACDO_DTRI_LAO': data.PHACDO_DTRI_LAO ? data.PHACDO_DTRI_LAO.ID : "",
      'NGAYBD_DTRI_LAO': data.NGAYBD_DTRI_LAO ? moment(data.NGAYBD_DTRI_LAO).format("YYYYMMDD") : "",
      'NGAYKT_DTRI_LAO':  data.NGAYKT_DTRI_LAO ? moment(data.NGAYKT_DTRI_LAO).format("YYYYMMDD") : "",
      'MA_LYDO_XNTL_VR': data.MA_LYDO_XNTL_VR ? data.MA_LYDO_XNTL_VR.ID : "",
      'NGAY_XN_TLVR': data.NGAY_XN_TLVR ? moment(data.NGAY_XN_TLVR).format("YYYYMMDD") : "",
      'KQ_XNTL_VR': data.KQ_XNTL_VR ? data.KQ_XNTL_VR.ID : "",
      'NGAY_KQ_XN_TLVR': data.NGAY_KQ_XN_TLVR ? moment(data.NGAY_KQ_XN_TLVR).format("YYYYMMDD") : "",
      'MA_LOAI_BN': data.MA_LOAI_BN ? data.MA_LOAI_BN.ID : "",
      'MA_TINH_TRANG_DK': data.MA_TINH_TRANG_DK || "",
      'LAN_XN_PCR': data.LAN_XN_PCR ? data.LAN_XN_PCR.ID : "",
      'NGAY_XN_PCR': data.NGAY_XN_PCR ? moment(data.NGAY_XN_PCR).format("YYYYMMDD") : "",
      'NGAY_KQ_XN_PCR': data.NGAY_KQ_XN_PCR ? moment(data.NGAY_KQ_XN_PCR).format("YYYYMMDD") : "",
      'MA_KQ_XN_PCR': data.MA_KQ_XN_PCR ? data.MA_KQ_XN_PCR.ID : "",
      'NGAY_NHAN_TT_MANG_THAI': data.NGAY_NHAN_TT_MANG_THAI ? moment(data.NGAY_NHAN_TT_MANG_THAI).format("YYYYMMDD") : "",
      'NGAY_BAT_DAU_DT_CTX': data.NGAY_BAT_DAU_DT_CTX ? moment(data.NGAY_BAT_DAU_DT_CTX).format("YYYYMMDD") : "",
      'MA_XU_TRI': data.MA_XU_TRI && data.MA_XU_TRI.ID ? data.MA_XU_TRI.ID : ";",
      'NGAY_BAT_DAU_XU_TRI': data.NGAY_KET_THUC_XU_TRI ? moment(data.NGAY_KET_THUC_XU_TRI).format("YYYYMMDD") : "",
      'NGAY_KET_THUC_XU_TRI': data.NGAY_KET_THUC_XU_TRI ? moment(data.NGAY_KET_THUC_XU_TRI).format("YYYYMMDD") : "",
      'MA_PHAC_DO_DIEU_TRI': data.MA_PHAC_DO_DIEU_TRI || "",
      'MA_BAC_PHAC_DO': data.MA_BAC_PHAC_DO ? data.MA_BAC_PHAC_DO.ID : "",
      'SO_NGAY_CAP_THUOC_ARV': data.SO_NGAY_CAP_THUOC_ARV || "",
      'DU_PHONG': data.DU_PHONG || "",
    }
    return this.commonService.OBJtoXML(obj);

  }

  // BVKCG-1164
  handleChangeMultiPrintCheckbox(change: MatCheckboxChange, document: DocumentExamResult) {
    if (!this.checkedMultiPrintByOid[this.idDocumentExam]) {
      this.checkedMultiPrintByOid[this.idDocumentExam] = {};
    }
    const mapDocumentIdToCheckbox = this.checkedMultiPrintByOid[this.idDocumentExam];
    if (mapDocumentIdToCheckbox) {
      mapDocumentIdToCheckbox[document.id] = change.checked;
    }
    if (change.checked) {
      this.idDocumentExamCode = document.code;
      this.selectDocumentExam(this.idDocumentExamCode);
      this.listLoaiGiayToSaveChecked.push(document)
    }else{
      let index = this.listLoaiGiayToSaveChecked.indexOf(document);
      this.listLoaiGiayToSaveChecked.splice(index, 1);
    }
  }

  handleChangeMultiPrintCheckAll(change: MatCheckboxChange){
    if(change.checked){
      this.listLoaiGiayToSaveChecked = [...this.listLoaiGiayToSave];
      if (!this.checkedMultiPrintByOid[this.idDocumentExam]) {
        this.checkedMultiPrintByOid[this.idDocumentExam] = {};
      }
      const mapDocumentIdToCheckbox = this.checkedMultiPrintByOid[this.idDocumentExam];
      if (mapDocumentIdToCheckbox) {
        this.listLoaiGiayToSaveChecked.forEach((document: any) => {
          mapDocumentIdToCheckbox[document.id] = change.checked;
        })
      }
    }else{
      this.listLoaiGiayToSaveChecked = []
      this.checkedMultiPrintByOid[this.idDocumentExam] = {};
    }
  }
}
