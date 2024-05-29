import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { ShareDataService } from '../../../../services/share-data.service';
import { LDT, PDT } from '../../../../model/emr/phieu_dieu_tri';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { KhoaDieuTri} from '../../../../model/emr/quan_ly_nguoi_benh';
import { ReceptionService } from '../../../../services/reception.service';
import {EhosResponse} from "../../../../model/api/response";
import {DoctorService} from "../../../../services/doctor.service";
import {Name} from "../../../../model/emr/global";
import { firstValueFrom } from 'rxjs';
import {
  PatientVaccine,
  Template,
  TemplateType, VaccineTemplate,
} from '../../../quan-ly-tiem-chung/quan-ly-tiem-chung-template/quan-ly-tiem-chung-template.component';
import { TemplateService } from '../../../../services/template/template.service';
import { LabratoryMenuService } from '../../../../services/laboratory/labratory-menu.service';
import { ServiceService } from '../../../../services/service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FrontendConfigs } from '@shared';
import { GiayToLienQuanComponent } from '../../benh-an-emr/giay-to-lien-quan.component';
import { EmrService } from '../../../../services/emr.service';
import { GetServiceUsedResponseResults } from '../../../../model/service/response';

class THONG_TIN_CHI_SO_SONG {
  MACH = 0;
  NHIET_DO = 0;
  HUYET_AP_TAM_THU = 0;
  HUYET_AP_TAM_TRUONG = 0;
  NHIP_THO = 0;
  CHIEU_CAO = 0;
  CAN_NANG = 0;
  BMI = 0;
  SPO2 = 0;
  CHAN_DOAN = '';
}
@Component({
  selector: 'app-phieu-cham-soc-y-ta',
  templateUrl: './phieu-cham-soc-y-ta.component.html',
  styleUrls: ['./phieu-cham-soc-y-ta.component.scss']
})
export class PhieuChamSocYTaComponent extends GiayToLienQuanComponent implements OnInit, OnChanges {
  templates: Template[] = [];
  chiSo: THONG_TIN_CHI_SO_SONG = new THONG_TIN_CHI_SO_SONG();
  site = this.getSite() ?  this.getSite() : "ehos";
  @Input() patientInfo: any;
  @Input() selectGiayToLienQuan: any;
  @Input() isCreateGiayToLienQuan: any;
  @Input() is_template: boolean = false;
  public editor = ClassicEditor;
  filteredRooms: any = [];
  resetKDT: KhoaDieuTri = new KhoaDieuTri();
  newKhoaDieuTri: KhoaDieuTri = new KhoaDieuTri()
  phieuDieuTri: LDT = new LDT();
  listYLenh: any = [];
  phieuCSYT: any = {
    result: {
      schedule: []
    },

    patient_info: {
      parent_name: '',
      giuong: '',
      patient_id: '',
      room: '',
      job: '',
      date_chuyen_vien_moment: moment(),
      parent_id_in_moment: moment(),
      exam_done_time_moment: moment(),
    },
    chiSo: new THONG_TIN_CHI_SO_SONG(),
  };
  query = '';
  newTemplate = new VaccineTemplate();
  newVaccine = new PatientVaccine();
  vaccines: PatientVaccine[] = [];
  pdt: any = {
    emr: new Array<PDT>()
  };
  isDisabled = false;
  newFieldControl: any = {
    THOI_GIAN : new Date()
  };
  ylenh: any = {};
  reportSchedule: any = [];
  doctors: Name[] = [];
  ID_HIS_PDT = 5003;
  protected variableGlobal: FrontendConfigs = {};
  calBMI(weight: number, height: number){
    this.phieuCSYT.chiSo.BMI = Number(GiayToLienQuanComponent.calcBMI(weight, height));
  }
  isShowThongSo = false;
  protected getFrontendConfigValue(formName: string, defaultValue = 0) {
    return this.variableGlobal[formName] ? Number(this.variableGlobal[formName]?.value) : defaultValue;
  }
  constructor(private sanitizer: DomSanitizer,private shareDataService: ShareDataService, private doctorService: DoctorService,
              private receptionService: ReceptionService, private template: TemplateService,
              private menu: LabratoryMenuService,private serviceService:ServiceService,private emrService: EmrService,) {
    super();
  }

  async ngOnInit(): Promise<void> {
    await this.getExdocument();
    this.phieuCSYT.chiSo.SPO2 = '';
    this.phieuCSYT.chiSo.CHIEU_CAO = '';
    this.phieuCSYT.chiSo.BMI = '';
    this.ID_HIS_PDT = this.getFrontendConfigValue("ID_HIS_PDT", 5003);
    if(this.patientInfo && this.patientInfo.patient_id){
      this.getYlenh();
    }
    this.filterDoctor('');
    if (this.selectGiayToLienQuan?.result) {
      this.phieuCSYT.result = this.selectGiayToLienQuan.result;
      this.phieuCSYT.result = this.selectGiayToLienQuan.result;
      this.phieuCSYT.code = (this.selectGiayToLienQuan.code) ? this.selectGiayToLienQuan.code: undefined;
      this.phieuCSYT.created_at= (this.selectGiayToLienQuan.created_at) ? this.selectGiayToLienQuan.created_at: undefined;
      this.phieuCSYT.created_by = (this.selectGiayToLienQuan.created_by) ? this.selectGiayToLienQuan.created_by: undefined;
      this.phieuCSYT.id = (this.selectGiayToLienQuan.id) ? this.selectGiayToLienQuan.id: undefined;
    }
  }
  ngOnChanges(changes:SimpleChanges) {
    if(this.isCreateGiayToLienQuan && !this.selectGiayToLienQuan) {
      this.phieuCSYT.patient_info = this.patientInfo;
      this.phieuCSYT.result.schedule = [];
    }
    if (this.selectGiayToLienQuan?.result) {
      this.phieuCSYT.result = this.selectGiayToLienQuan.result;
      this.phieuCSYT.result = this.selectGiayToLienQuan.result;
      this.phieuCSYT.code = (this.selectGiayToLienQuan.code) ? this.selectGiayToLienQuan.code: undefined;
      this.phieuCSYT.created_at= (this.selectGiayToLienQuan.created_at) ? this.selectGiayToLienQuan.created_at: undefined;
      this.phieuCSYT.created_by = (this.selectGiayToLienQuan.created_by) ? this.selectGiayToLienQuan.created_by: undefined;
      this.phieuCSYT.id = (this.selectGiayToLienQuan.id) ? this.selectGiayToLienQuan.id: undefined;
      this.phieuCSYT.chiSo = this.selectGiayToLienQuan ? this.selectGiayToLienQuan.chiSo : new THONG_TIN_CHI_SO_SONG();
    }
    if(this.is_template){
      if(this.selectGiayToLienQuan && this.selectGiayToLienQuan?.result){
        this.phieuCSYT.patient_info = this.patientInfo
        this.phieuCSYT.result = this.selectGiayToLienQuan.result
      }else {
        this.phieuCSYT.result.schedule = [];
      }
    }

    // Link chẩn đoán khi nhập viện từ ngoại trú -> Ô chẩn đoán ở Phiếu chăm sóc của điều dưỡng
    if (!this.patientInfo.examining_diagnosis) {
      this.serviceService.getServiceUsed<GetServiceUsedResponseResults>(
        this.patientInfo.patient_id,
        this.patientInfo.reception_queue_id,
        0,
        undefined,
        undefined,
        {
          from: moment().startOf('day').unix(),
          to: moment().endOf('day').unix()
        },
        undefined,
        {
          _id: '$_id',
          results: '$results'
        }
      ).subscribe(res => {
        if (!res.status) {
          return;
        }
        const service = res.results[0].data[0].exams[0].services[0].services;
        this.patientInfo.examining_diagnosis = service?.results?.chan_doan || '';
      })
    }

    this.shareDataService.pushData(this.phieuCSYT, "phieu_cham_soc_y_ta");
  }

  addReport(){
    this.newFieldControl.TIME_TAO = moment(this.newFieldControl.THOI_GIAN).unix();
    this.phieuCSYT.result.schedule.push(this.newFieldControl);
    this.newFieldControl = {
      THOI_GIAN: new Date(),
      DIEN_BIEN: null,
      Y_LENH: null,
      NGUOI_THUC_HIEN: null,
    };
  }
  // addVaccine() {
  //   this.vaccines.push({...this.newVaccine});
  //   this.newTemplateVaccineType.nativeElement.focus();
  // }
  deleteReport(index:any) {
    this.phieuCSYT.result.schedule.splice(index,1)
  }
  queryGet = async (query: string, isReset: boolean, pageNumber = 1) => {
    this.query = query;

    if (isReset) {
      pageNumber = 1;
      this.templates = [];
    }

    const res = await firstValueFrom(this.template.getTemplates(query, TemplateType.Vaccines, 5, pageNumber));
    if (res.results) {
      this.templates = [...this.templates, ...res.results];
    }

  };
  selectTemplate(template: VaccineTemplate) {
    this.newTemplate = template;
    this.newVaccine = new PatientVaccine();
    this.vaccines = template.content.vaccines;
    this.menu.viewAsProcessed();
  }
  filterDoctor(query = '') {
    this.doctorService.getDoctors(query, 'query').subscribe((res: Partial<EhosResponse<any[]>>) => {
      if (res.status) {
        this.doctors = this.doctorService.convertUserEMR('user', res.results);
      } else {
        this.doctors = [];
      }
    });
  }
  //todo: lấy danh sách y lệnh
  getYlenh(){
    this.serviceService.getServiceUsed(
      this.patientInfo.patient_id,
      this.patientInfo.reception_queue_id,
      this.patientInfo.in_patient,
      {"service_category_parent_id": 6},
      {"key_level_1": "current_day_time"},
      null
    ).subscribe((dataReturn:any) => {
      if(dataReturn.status == true){
        const results = dataReturn.results;
        if(results.length > 0){
          results.forEach((data: any)=>{
            if(data.data && data.data.length > 0){
              data.data.forEach((exams: any) =>{
                if(exams && exams.exams.length > 0){
                  exams.exams.forEach((services: any) =>{
                    if(services.services && services.services.length > 0){
                      services.services.forEach((sv: any)=>{
                        if(sv.services.form_id == this.ID_HIS_PDT || sv.services.form_id == 3000){
                          this.listYLenh = this.listYLenh.concat(sv.services.results);
                        }
                      })
                    }
                  })
                }
              })
            }

          })
        }
      }
    })
  }
  //todo: chọn y lênh
  changeGetYLenh(event: any){
    if(event){
      this.newFieldControl.DIEN_BIEN = this.decodeEntities(event.pharmas_note);
      this.newFieldControl.THOI_GIAN = moment.unix(event.used_at_action).format();
    }
  }
  decodeEntities(str: string = '') {
    // this prevents any overhead from creating the object each time
    const element = document.createElement('div');
    if(str) {
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
      element.innerHTML = str;
      element.textContent = '';
    }
    return str;
  }
  getExdocument() {
    return new Promise<void>(resolve => {
      this.emrService.getExDocument(5084, this.patientInfo.patient_id,
        this.patientInfo.reception_queue_id.toString()).subscribe(
        (data) => {
          // this.object_id = data.results[0]._id;
          if(data.status){
            Object.assign(this.phieuCSYT, data.results[0].results[data.results[0].results.length - 1]) //Lấy kết quả giấy tờ mới nhất.
          }
          resolve()
        }
      )
    })
  }

  getSite() {
    return this.emrService.getSite();
  }
  convert(){this.phieuCSYT.chiSo.CHAN_DOAN = this.patientInfo.examining_diagnosis
  }
}
