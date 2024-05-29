import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DM, Patient_EMR } from '../../../../model/Patient_EMR';
import { DoctorService } from '../../../../services/doctor.service';
import { ReceptionService } from '../../../../services/reception.service';
import { ShareDataService } from '../../../../services/share-data.service';

@Component({
  selector: 'app-ho-so-cham-soc-nguoi-benh-cua-dieu-duong',
  templateUrl: './ho-so-cham-soc-nguoi-benh-cua-dieu-duong.component.html',
  styleUrls: ['./ho-so-cham-soc-nguoi-benh-cua-dieu-duong.component.scss']
})
export class HoSoChamSocNguoiBenhCuaDieuDuongComponent implements OnInit, OnChanges {
  @Input() patientInfo: any;
  @Input() isCreateGiayToLienQuan: any;
  @Input() selectGiayToLienQuan: any;
  patientPCS: Patient_EMR = new Patient_EMR();
  selectPCS: any = {
    patient_info: {},
    results: {}
  };
  resetDM: DM = new DM();
  pcs: any;
  newChamSoc: any = {
    date_start: new Date(),
    date_end: new Date(),
    theodoi: "",
    ylenh:"",
  }
  YLenh: any = {
    date_khamlai: new Date(),
    ketqua: "",
    theodoi: "",
    ylenh: ""
  };
  constructor(private doctorService: DoctorService,
              private receptionService: ReceptionService,
              private shareDataService: ShareDataService
  ) { }
  listNoiDieuTri = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Trạm xá xã"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "BV huyện"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "BV tỉnh"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "Đến thẳng bệnh viện."
    }
  ];
  listPhuongTienDenBenhVien = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Taxi"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Xe cứu thương"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Xe riêng"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "Khác"
    }
  ];
  listBSCho = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Về nhà"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Chuyển viện tỉnh"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Nặng xin về"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "Người bệnh chết"
    }
  ];
  listVanChuyen = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "NB tự đi lại"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "NB ngồi xe đẩy"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "NB nằm cáng"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "NB có người dắt"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "NB cần Oxy đi theo"
    }
  ];
  listKhaiThacLienQuan = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Đái đường"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Cao huyết áp"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Bệnh tim mạch"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "Hen suyễn"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "Bệnh phổi"
    },
    {
      ID:"6",
      MA: "6",
      MO_TA: "Đau dạ dày"
    },
    {
      ID:"7",
      MA: "7",
      MO_TA: "Khác"
    }
  ];
  listBNVanChuyen = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Ngồi xe đẩy"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Nằm cáng"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Tự đi lại"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "Có người dìu"
    }
  ];
  listPhuongTienVe = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Taxi"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Xe riêng"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Xe cứu thương"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "Khác"
    }
  ];
  listTheNguoiNgheo = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Có"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Không"
    }
  ];
  filteredUserCBYTs: any;
  listKinhTeGiaDinh = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Khá"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Trung bình"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Nghèo"
    }
  ];
  listGiaDinh = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Khỏe mạnh"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Có người bệnh tật"
    }
  ];
  listDiUngThuocKhangSinh = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Có"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Không"
    }
  ];
  listTinhTaoGiaoTiep = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Tốt"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Mê"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Lơ mơ"
    }
  ];
  listTinhTrangNguoiBenh = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Tỉnh táo"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Mê"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Lơ mơ"
    }
  ];
  ngOnInit(): void {
    if (!this.pcs) {
      this.pcs = this.initPCS();
    }
  }
  filterUser(query: any){
    this.doctorService.getDoctors(query, "query").subscribe(dataReturn => {
      if(dataReturn.status === true){
        this.filteredUserCBYTs = dataReturn.results;
      }
    });
  }
  displayCBYT(value: any): string {
    return value && value.user_name ? value.user_code + " - " + value.user_name : '';
  }
  createYLenh(objCreate: any){
    this.pcs.list_re_exam.push(objCreate);
  }

  removeYLenh(indexOfelement: number){
    this.pcs.list_re_exam.splice(indexOfelement, 1);
  }

  displayDMKDT(value: any): string{
    return value && value.room_name ? value.room_name : '';
  };
  onDate(event: any, title: string, obj: any): void{
    if(title === "DATE"){
      this.pcs.date = moment(event).unix();
    }
    if(title === "DATE_VAO_VIEN"){
      this.pcs.date_start = moment(event).unix();
    }
    if(title === "DATE_CHAM_SOC"){
      this.newChamSoc.date_start = moment(event).unix();
    }
    if(title === "DATE_Y_LENH" && obj){
      obj.date_chamsoc = moment(event).unix();
    }
  }
  ngOnChanges() {
    if(this.isCreateGiayToLienQuan === true){
      this.pcs = this.initPCS();
      delete this.patientInfo._id;
      delete this.patientInfo.time_lime;
      this.pcs.patient_info = this.patientInfo;
      if(!this.pcs.patient_info.from_date_moment){
        this.pcs.patient_info.from_date_moment = moment(this.patientInfo.created_at * 1000);
        this.pcs.patient_info.from_date = this.patientInfo.created_at;
      }
      this.pcs.patient_info.to_date = moment();
      this.pcs.patient_info.patient_fullname = this.patientInfo.results.hc.HO_TEN;
      this.pcs.patient_info.address1 = this.patientInfo.address1;
    }
    if(this.isCreateGiayToLienQuan !== true && this.selectGiayToLienQuan ){
      this.pcs = this.selectGiayToLienQuan;
      if(!this.pcs.list_re_exam){
        this.pcs.list_re_exam = [];
      }
      if (!this.pcs.results) {
        this.pcs.results = {
          kinh_te_gia_dinh: DM,
          hien_tai: {
            an_uong: "",
            hen_den_kham_lai: "",
            huong_dan_ve_sinh: "",
            tap_luyen: ""
          }
        };
      }
    }
    this.shareDataService.pushData(this.pcs, "phieu_cham_soc");
  }
  initPCS(){
    return {
      patient_info: {},
      results: {
        kinh_te_gia_dinh: DM,
        hien_tai: {
          an_uong: "",
          hen_den_kham_lai: "",
          huong_dan_ve_sinh: "",
          tap_luyen: ""
        }
      },
      list_re_exam: [],
    }
  }
}
