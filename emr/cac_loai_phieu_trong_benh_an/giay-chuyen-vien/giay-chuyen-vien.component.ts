import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import * as moment from "moment";
import {Patient_EMR} from "../../../../model/Patient_EMR";
import {ReceptionService} from "../../../../services/reception.service";
import {ShareDataService} from "../../../../services/share-data.service";
import { ExaminationService } from '../../../../services/examination.service';
import { DoctorService } from '../../../../services/doctor.service';

@Component({
  selector: 'app-giay-chuyen-vien',
  templateUrl: './giay-chuyen-vien.component.html',
  styleUrls: ['./giay-chuyen-vien.component.scss']
})
export class GiayChuyenVienComponent implements OnInit, OnChanges {
  @Input() patientInfo: any;
  @Input() isCreateGiayToLienQuan: any;
  @Input() selectGiayToLienQuan: any;
  patientGCV : Patient_EMR = new Patient_EMR();
  filteredHospitals: any = [];
  filteredUsers: any = [];
  selectGCV: any = {
    patient_info: {},
    results: {}
  };
  filteredICDs: any = [];
  gcv: any = {
    parent_id_in: 0,
    parent_id_in_moment: new Date(),
    exam_done_time: 0,
    exam_done_time_moment: new Date(),
    date_chuyen_vien: 0,
    date_chuyen_vien_moment: new Date(),
    code: '',
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
    results: {
      dau_hieu_lam_sang: "",
      cac_xet_nghiem: "",
      thuoc_da_dung: "",
      tinh_trang_luc_chuyen_vien: "",
      diagnosis: "",
      service_icd: [],
      huong_dieu_tri: '',
      chuyen_den_vien: {
        medical_facility_address: '',
        medical_facility_code: '',
        medical_facility_name: '',
      },
      ly_do_chuyen_vien: '',
      ly_do_chuyen_vien_txt: '',
      phuong_phap_van_chuyen: '',
      nguoi_dua_di: {},
      examining_by_fullname:'',
      examining_by_signature_image_url:''
    },
  };
  constructor(private receptionService: ReceptionService,
              private doctorService: DoctorService,
              private examinationService: ExaminationService,
              private shareDataService: ShareDataService) { }

  listLyDoChuyenVien = [
    {
      ID:"0",
      MA: "0",
      MO_TA: "1. Đủ điều kiện chuyển tuyến"
    },
    {
      ID:"1",
      MA: "1",
      MO_TA: "2. Theo yêu cầu của người bệnh hoặc đại diện hợp pháp của người bệnh"
    }
  ];
  listPhuongPhapVanChuyen = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Xe cấp cứu bệnh viện"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Xe cấp cứu ngoại viện"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Tự túc"
    }

  ];

  ngOnInit(): void {
    this.gcv.results.examining_by_fullname = this.patientInfo.examining_by_fullname;
    this.gcv.results.examining_by_signature_image_url = this.patientInfo.examining_by_signature_image_url;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.selectGiayToLienQuan?.results) {
      console.log(this.selectGiayToLienQuan);
      this.gcv = this.selectGiayToLienQuan;
      // this.gcv.date_chuyen_vien = moment(this.selectGiayToLienQuan.date_chuyen_vien * 1000)
      // this.gcv.parent_id_in = moment(this.selectGiayToLienQuan.parent_id_in * 1000);
      // this.gcv.exam_done_time = moment(this.selectGiayToLienQuan.exam_done_time * 1000);
    }
    if(this.patientInfo)
      console.log(this.patientInfo);
      this.gcv.patient_info = this.patientInfo;
    this.shareDataService.pushData(this.gcv,'giay_chuyen_vien');
  }

  changeRadioSex(event: any) {
    this.patientGCV.GIOI_TINH = {
      ID: event + "",
      MA: event + "",
      MO_TA: event === '1' ? "Nam" : (event === '2' ? "Nữ" : "")
    }
  }
  filterHospital(value: any){
    this.receptionService.filterHospital(value).subscribe(dataReturn => {
      if (dataReturn.status === true) {
        this.filteredHospitals = dataReturn.results;
      }else{
        this.filteredHospitals = [];
      }
    })
  }
  displayDM(value: any): string {
    return value && value.MO_TA ? value.MO_TA : '';
  }
  onDate(event: any, title: string): void {
    // if(title === "DATE_CHUYEN_VIEN"){
    //   this.gcv.date_chuyen_vien = moment(event).unix();
    // }
    // if(title === "DATE_VAO_VIEN"){
    //   this.gcv.parent_id_in = moment(event).unix();
    // }
    // if(title === "DATE_RA_VIEN"){
    //   this.gcv.exam_done_time = moment(event).unix();
    // }
  }
  displayDMICD(value: any): string {
    return value && value.service_name ? value.service_code + " - " + value.service_name : '';
  }
  filterICD(textSearch: any) {
    this.examinationService.filterICD(textSearch).subscribe(dataReturn => {
      if(dataReturn.status === true){
        this.filteredICDs = dataReturn.results;
      }
    });
  }

  filterUser(query: any){
    this.doctorService.getDoctors(query, "query").subscribe(dataReturn => {
      if(dataReturn.status === true){
        this.filteredUsers = dataReturn.results;
      }
    });
  }
  displayCBYT(value: any): string {
    return value && value.user_name ? value.user_code + " - " + value.user_name : '';
  }
}
