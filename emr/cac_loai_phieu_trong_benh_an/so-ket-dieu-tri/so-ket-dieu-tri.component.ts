import { Component, Input, OnInit, ViewChild } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AssignmentService } from '../../../../services/assignment.service';
import { EmrService } from '../../../../services/emr.service';
import { ShareDataService } from '../../../../services/share-data.service';
import { DoctorService } from '../../../../services/doctor.service';
import * as moment from 'moment';
import { IService } from '../../../../model/service';
import { ServiceCategoryEnum } from '../../../../model/service-category/enum';
import { ServiceService } from '../../../../services/service.service';
import { EmrPatientInfo } from '../../../../model/emr/patient/patient-info';
import { GetServiceUsedResponseResults } from '../../../../model/service/response';
import { NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { CategoryGenaralService } from '../../../../services/category-genaral.service';

@Component({
  selector: 'app-so-ket-dieu-tri',
  templateUrl: './so-ket-dieu-tri.component.html',
  styleUrls: ['./so-ket-dieu-tri.component.scss']
})
export class SoKetDieuTriComponent implements OnInit {
  public editor = ClassicEditor;
  @Input() patientInfo!: EmrPatientInfo;
  @Input() selectGiayToLienQuan: any;
  @Input() isCreateGiayToLienQuan: any;
  newPhauThuat: any = {
    date_phauthuat: new Date(),
    phuong_phap_phau_thuat: "",
    selected: undefined,
    selected2: undefined
  };
  filteredUserCBYTs: any;
  displayCBYT(value: any): string {
    return value && value.user_name ? value.user_code + " - " + value.user_name : '';
  }
  initSKDT() {
    return {
      list_re_exam: [],
      patient_info: {},
      results: {
        clinical_developments: "",
        laboratory_testing: "",
        treatment_process: "",
        tinh_trang_nguoi_benh_ravien: "",
        huong_dieu_tri_va_che_do_tieptheo: "",
        isPhauThuat: false,
        isThuThuat: false,
        bac_si_dieu_tri: "",
        chu_ky_bac_si: '',
        truong_khoa: []
      }
    }
  }

  skdt: any = {};

  @ViewChild('isPTTTForm', {static: true}) isPTTTForm!: NgForm;

  constructor(private assignmentService: AssignmentService,
              private emrService: EmrService,
              private shareDataService: ShareDataService,
              private doctorService: DoctorService,
              private serviceService: ServiceService,
              private categoryService: CategoryGenaralService,) { }

  ngOnInit(): void {
    this.isPTTTForm.form.valueChanges.pipe(debounceTime(0)).subscribe((value) => {
      this.getOrRemovePTTT(value.isPhauThuat, value.isThuThuat);
    });
    this.skdt.results.chu_ky_bac_si = this.convert()
  }

  createPhauThuat(objCreate: any){
    this.newPhauThuat = {
      date_phauthuat: new Date(),
      phuong_phap_phau_thuat: "",
    }
    this.skdt.list_re_exam.push(objCreate);
  }
  // removePhauThuat(indexOfelement: number){
  //   this.skdt.list_re_exam.splice(indexOfelement, 1);
  // }

  filterUser(query: any){
    this.doctorService.getDoctors(query, "query").subscribe(dataReturn => {
      if(dataReturn.status === true){
        this.filteredUserCBYTs = dataReturn.results;
      }
    });
  }
  onDate(event: any, title: string, obj: any): void{
    if(title === "DATE_PHAU_THUAT" && obj){
      obj.used_at_moment = moment(obj.used_at * 1000);
    }
  }

  ngOnChanges(){
    // if(this.selectGiayToLienQuan){
    //   this.skdt = this.selectGiayToLienQuan;
    // }else{
    //   this.skdt = this.initSKDT();
    // }
    if(this.isCreateGiayToLienQuan !== true && this.selectGiayToLienQuan ){
      this.skdt = this.selectGiayToLienQuan;
    }
    if (this.isCreateGiayToLienQuan) {
      this.skdt = this.initSKDT();
    }

    if (!this.skdt.results) {
      this.skdt.results = {
        clinical_developments: "",
        laboratory_testing: "",
        treatment_process: "",
        tinh_trang_nguoi_benh_ravien: "",
        huong_dieu_tri_va_che_do_tieptheo: "",
        isPhauThuat: false,
        isThuThuat: false,
        bac_si_dieu_tri: "",
        chu_ky_bac_si: '',
        truong_khoa: [],
        listFileImage: [
        {
          "file_name": "X - quang",
          "page_number": 0
        },
        {
          "file_name": "CT Scanner",
          "page_number": 0
        },
        {
          "file_name": "Siêu âm",
          "page_number": 0
        },
        {
          "file_name": "Xét nghiệm",
          "page_number": 0
        }, {
          "file_name": "Khác",
          "page_number": 0
        }, {
          "file_name": "Toàn bộ hồ sơ",
          "page_number": 0
        }
      ]
      };
    }
    if(this.patientInfo){
      this.skdt.results.bac_si_dieu_tri = this.patientInfo.examining_by_fullname;
    }
    this.categoryService.getCategoryGenaral(
      {user_id: this.patientInfo.examining_by_id}, 0, 0, 'user').subscribe(res => {
      if(res.status == true){
        this.skdt.results.chu_ky_bac_si = res.results[0]?.signature_image_url
      }
    })
    // Lọc các dịch vụ không phải PTTT từ HIS
    if (this.skdt.results.listPhauThuatThuThuat) {
      this.skdt.results.listPhauThuatThuThuat =
        (this.skdt.results.listPhauThuatThuThuat as IService[])
          .filter(s => [ServiceCategoryEnum.PhauThuat, ServiceCategoryEnum.ThuThuat].includes(s.service_category_id));
    }

    for (let ngayPt of this.skdt.results.listPhauThuatThuThuat || []){
      for (let pt of ngayPt.results){
        pt.used_at_moment = moment(pt.used_at * 1000)
      }
    }
    this.shareDataService.pushData(this.skdt, "so_ket_dt");
  }
  convert(){
    this.skdt.results.bac_si_dieu_tri = this.patientInfo.examining_by_fullname;
    return "";
  }
  getOrRemovePTTT(isPhauThuat: boolean, isThuThuat: boolean) {
    if (!this.skdt.results.listPhauThuatThuThuat) {
      this.skdt.results.listPhauThuatThuThuat = [];
    }

    const getServiceCategoryIds: ServiceCategoryEnum[] = [];
    const removeServiceCategoryIds: ServiceCategoryEnum[] = [];

    if (isPhauThuat) {
      getServiceCategoryIds.push(ServiceCategoryEnum.PhauThuat);
    } else {
      removeServiceCategoryIds.push(ServiceCategoryEnum.PhauThuat);
    }

    if (isThuThuat) {
      getServiceCategoryIds.push(ServiceCategoryEnum.ThuThuat);
    } else {
      removeServiceCategoryIds.push(ServiceCategoryEnum.ThuThuat);
    }

    if (getServiceCategoryIds.length) {
      this.serviceService.getServiceUsed<GetServiceUsedResponseResults<
        '_id', 'service_category_parent_id', 'service_category_id'>>(
        this.patientInfo.patient_id,
        this.patientInfo.reception_queue_id,
        this.patientInfo.in_patient,
        [
          {service_category_id: {$in: getServiceCategoryIds}},
          {service_category_parent_id: {$in: getServiceCategoryIds}},
        ],
        {key_level_1: '_id'},
        undefined,
         this.patientInfo.medical_record_no,
        {
          service_category_id: '$service_category_id',
          results: '$results'
        })
        .subscribe((res) => {
          if (!res.status) {
            return;
          }
          this.skdt.results.listPhauThuatThuThuat = [];
          res.results.forEach((cap1) => {
            cap1.data.forEach((cap2) => {
              cap2.exams.forEach((cap3) => {
                this.skdt.results.listPhauThuatThuThuat.push(...cap3.services.map(data => data.services));
              })
            })
          })
        });
    }
    if (removeServiceCategoryIds.length) {
      this.skdt.results.listPhauThuatThuThuat =
        (this.skdt.results.listPhauThuatThuThuat as IService[])
          .filter(s => !removeServiceCategoryIds.includes(s.service_category_id));
    }
  }
}
