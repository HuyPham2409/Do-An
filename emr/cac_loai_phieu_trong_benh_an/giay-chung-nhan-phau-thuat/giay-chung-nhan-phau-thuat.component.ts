import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DoctorService } from '../../../../services/doctor.service';
import { ReceptionService } from '../../../../services/reception.service';
import * as moment from 'moment';

import { ServiceService } from 'app/services/service.service';
import { ShareDataService } from '../../../../services/share-data.service';
import { BloodType, EmrPatientInfo, HisPatientInfo } from '../../../../model/emr/patient/patient-info';
import { BenhAnComponent } from '../../benh-an-emr/benh-an.component';
import { EmrService } from '../../../../services/emr.service';
import { Moment } from 'moment';
import { FrontendConfigService } from '../../../../services/frontend-config/frontend-config.service';
import { FrontendConfigs } from '@shared';
import { Name } from 'app/model/emr/global';
import { EhosResponse } from 'app/model/api/response';

class ReExam {
  date_re_exam: any = new Date();
  doctor_exam = null;
  result_re_exam = '';
  location_re_exam = '';
  date_khamlai_moment: Moment | null = null;
}

@Component({
  selector: 'app-giay-chung-nhan-phau-thuat',
  templateUrl: './giay-chung-nhan-phau-thuat.component.html',
  styleUrls: ['./giay-chung-nhan-phau-thuat.component.scss']
})
export class GiayChungNhanPhauThuatComponent extends BenhAnComponent implements OnInit, OnChanges {
  @Input() selectGiayToLienQuan: any;
  @Input() isCreateGiayToLienQuan: any;
  doctors: Name[] = [];
  newKhamLai = new ReExam();
  newNhungLanVaoVienSau: any = {
    date_start: new Date(),
    date_end: new Date(),
    benhvien: ""
  }
  cnpttt: any = {
    parent_name:"",
    list_re_exam: [],
    list_hospital_next : [],
    date_phau_thuat: 0,
    date_phau_thuat_moment: '',
    bac_si_truong_khoa: null,
    thu_truong: null,
    code: "",
    date_ky: 0,
    examining_diagnosis: "",
    ket_qua_gpb: "",
    patient_info: {},
    storage_number: "",
    phau_thuat: "",
    blood_types: "",
    rhesus_factor: "",
    tinh_trang_luc_ra_vien: "",
    phuong_phap_vo_cam: "",
    phuong_phap_phau_thuat: "",
    phau_thuat_vien: "",
    PHIEU_PHAU_THUAT_THU_THUAT: {}
  };
  filteredRooms: any = [];
  variableGlobal: FrontendConfigs = {};
  is_show_re_exam = 0;
  constructor(private doctorService: DoctorService,
              private receptionService: ReceptionService,
              private serviceService: ServiceService,
              private shareDataService: ShareDataService,
              private emrService: EmrService,
              private proxy: FrontendConfigService) {
    super();
    this.variableGlobal = proxy.getFrontendConfig();
    this.is_show_re_exam = this.variableGlobal['EMR']?.value?.['IS_SHOW_RE_EXAM_FORM_5006'];
  }

  ngOnInit(): void {
  }
  createKhamLai(objCreate: any){
    this.newKhamLai = new ReExam();
    this.cnpttt.list_re_exam.push(objCreate);
  }

  removeKhamLai(indexOfelement: number){
    this.cnpttt.list_re_exam.splice(indexOfelement, 1);
    // this.listKhamLai.push(objCreate);
  }

  createVaoVienLanSau(objCreate: any){
    this.newNhungLanVaoVienSau = {
      date_start: moment(),
      date_end: moment(),
      benhvien: ""
    }
    this.cnpttt.list_hospital_next.push(objCreate);
  }
  filterDoctor(query = '', key: 'doctors') {
    this.doctorService.getDoctorsDean(query, 'query').subscribe((res: Partial<EhosResponse<any[]>>) => {
      if (res.status) {
        this[key] = this.doctorService.convertUserEMR('user', res.results);
      } else {
        this[key] = [];
      }
    });
  }
  removeVaoVienLanSau(indexOfelement: number){
    this.cnpttt.list_hospital_next.splice(indexOfelement, 1);
    // this.listKhamLai.push(objCreate);
  };

  filterRoom(value: any){
    var objParam = {
      active: 1,
      query: value,
      room_type_id: 568
    }
    this.receptionService.filterRoom(objParam).subscribe(dataReturn =>{
      if(dataReturn.status === true){
        this.filteredRooms = dataReturn.results;
      }else{
        this.filteredRooms = [];
      }
    })
  };

  displayDMKDT(value: any): string{
    return value && value.room_name ? value.room_name : '';
  };

  ngOnChanges(changes:SimpleChanges) {
    if(this.isCreateGiayToLienQuan !== true && this.selectGiayToLienQuan ){
      this.cnpttt = this.selectGiayToLienQuan;
    }
    this.filterDoctor("" , "doctors")
    this.receptionService
      .getPatientOut<HisPatientInfo[]>(this.patientInfo.reception_queue_id || '')
      .subscribe(dataReturn => {
        if (dataReturn.status && dataReturn.results.length) {
          const patientInfoHis = dataReturn.results[0];
          this.cnpttt.from_date = patientInfoHis.parent_id_in;
          this.initOrKeepValues(this.cnpttt, [
            {
              key: 'parent_name',
              defaultValueFactory: () => patientInfoHis.parent_name
            },
            {
              key: 'patient_fullname',
              defaultValueFactory: () => patientInfoHis.patient_fullname
            },
            {
              key: 'address1',
              defaultValueFactory: () => patientInfoHis.address1
            },
            {
              key: 'examining_diagnosis',
              defaultValueFactory: () => patientInfoHis.exam_done_diagnosis
            },
            {
              key: 'from_date_moment',
              defaultValueFactory: () => new Date(patientInfoHis.parent_id_in * 1000)
            },
            {
              key: 'storage_number',
              defaultValueFactory: () => patientInfoHis.archive_id
            },
          ]);
        }
      });

    this.emrService.getDiUngNhomMauRh<EmrPatientInfo[]>(this.patientInfo.patient_id).subscribe((dataReturn) => {
      this.initOrKeepValues(this.cnpttt, [
        {
          key: 'blood_types',
          defaultValueFactory: () => dataReturn.results[0].blood_types
        },
        {
          key: 'rhesus_factor',
          defaultValueFactory: () => dataReturn.results[0].rhesus_factor
        },
      ]);
    })

    this.shareDataService.pushData(this.cnpttt, "chung_nhan_phau_thuat")
  }

  onDate(event: any, title: string, obj: any): void{
    if(title === "DATE_KY"){
      this.cnpttt.date_ky = moment(event).unix();
    }
    if(title === "FROM_DATE"){
      this.cnpttt.patient_info.from_date = moment(event).unix();
    }
    if(title === "TO_DATE"){
      this.cnpttt.patient_info.to_date = moment(event).unix();
    }
    if(title === "DATE_PHAU_THUAT"){
      this.cnpttt.date_phau_thuat = moment(event).unix();
    }
    if(title === "DATE_KHAM_LAI"){
      this.newKhamLai.date_re_exam = moment(event).unix();
    }
    if(title === "DATE_VAO_VIEN"){
      this.newNhungLanVaoVienSau.date_start = moment(event).unix();
    }
    if(title === "DATE_VAO_VIEN" && obj){
      obj.date_start = moment(event).unix();
    }
    if(title === "DATE_RA_VIEN"){
      this.newNhungLanVaoVienSau.date_end = moment(event).unix();
    }
    if(title === "DATE_RA_VIEN" && obj){
      obj.date_end = moment(event).unix();
    }
  }
  //region-kienkv
  public loadDataFromSelectedPttt(value:any) {
    const { supply_id,operate_from, operate_staff, operate_info ,operate_no} = value;
    if (Object.keys(value).length > 0) {
      this.cnpttt.PHIEU_PHAU_THUAT_THU_THUAT = value;
      if (operate_from) {
        this.cnpttt.date_phau_thuat = operate_from;
        this.cnpttt.date_phau_thuat_moment = new Date(operate_from * 1000);
      }

      if (operate_staff && operate_staff.length > 0) {
        this.cnpttt.phau_thuat_vien = operate_staff[0].user;
      }

      if (operate_info && operate_info.operate_method) {
        this.cnpttt.phuong_phap_vo_cam = operate_info.operate_method.anesthetic_method_name;
      }
      if (operate_info && operate_info.examining_surgery) {
        this.cnpttt.phuong_phap_phau_thuat = operate_info.examining_surgery;
      }
      if(operate_info && operate_info.recommendations){
        this.cnpttt.phau_thuat = operate_info.recommendations[0].service_name;
      }
      this.cnpttt.bac_si_truong_khoa= "";
      this.cnpttt.code= "";
      this.cnpttt.date_ky= 0;
      this.cnpttt.ket_qua_gpb= "";
      if (operate_info && operate_info.room_name_to_do) this.cnpttt.parent_name=operate_info.room_name_to_do;
      if (operate_info && operate_info.classify && operate_info.classify.operate_category_name) this.cnpttt.phuong_phap_phau_thuat= operate_info.classify.operate_category_name;
    }
  }
}
