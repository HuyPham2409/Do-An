import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DataChangeEvent } from '../../../model/data-change/event';
import * as moment from 'moment';
import { LocalStorageService } from '@shared';
import { DoctorService } from '../../../services/doctor.service';
import { ShareDataService } from '../../../services/share-data.service';
import { GiayToLienQuanComponent } from '../benh-an-emr/giay-to-lien-quan.component';
import { EmrService } from 'app/services/emr.service';
import { AssignmentService } from 'app/services/assignment.service';

class PHIEU_DANH_GIA_DD_TRE_EM {
  dieu_duong_tao_phieu_info = {
    full_name: '',
    user_signature: '',
    user_signature_image: ''
  };
  CHIEU_CAO = 0;
  CAN_NANG = 0;
  BMI = 0;
  CHAN_DOAN = "";
  danh_gia = [
    {
      id: 1,
      name: "Cân nặng theo chiều cao/ chiều dài hoặc chỉ số cơ thể(BMI)",
      datas: [
        { id: 1, name: '> -1 SD', so_diem: 0 },
        { id: 2, name: '-1 SD đến > -2 SD', so_diem: 1 },
        { id: 3, name: '≤ -2 SD', so_diem: 2 }
      ],
      value: -1
    },
    {
      id: 2,
      name: "Sụt cân trong 1 tháng qua",
      datas: [
        { id: 5, name: 'Không sụt cân', so_diem: 0 },
        { id: 1, name: 'Tăng cân < 50% so với chuẩn ở trẻ < 2 tuổi', so_diem: 1 },
        { id: 2, name: 'Tăng cân < 25% so với chuẩn ở trẻ < 2 tuổi', so_diem: 2 },
        { id: 3, name: 'Sụt cân 7.5% trọng lượng ở trẻ ≥ 2 tuổi', so_diem: 1 },
        { id: 4, name: 'Sụt cân 10% trọng lượng ở trẻ ≥ 2 tuổi', so_diem: 2 }
      ],
      value: -1
    },
    {
      id: 3,
      name: "Lượng ăn/bú trong 1 tuần qua",
      datas: [
        { id: 1, name: 'Không giảm hoặc giảm nhẹ', so_diem: 0 },
        { id: 2, name: 'Giảm ≥ 50% trong tuần qua', so_diem: 1 },
        { id: 3, name: 'Giảm 75% trong tuần qua', so_diem: 2 }
      ],
      value: -1
    }
  ];
  ket_luan = {
    id: 4,
    name: "Kết luận",
    datas: [
      { id: 1, name: '< 2 điểm: Không suy dinh dưỡng', mota: 'Bình thường' },
      { id: 2, name: '≥ 2 điểm: Suy dinh dưỡng', mota: 'Suy dinh dưỡng' }
    ],
    value: 0
  };
  ke_hoach = [
    {
      id: 1,
      name: "Chế độ ăn",
      datas: [
        { id: 1, name: 'Mã số' }
      ]
    },
    {
      id: 2,
      name: "Đường nuôi dưỡng",
      datas: [
        { id: 2, name: 'Đường miệng' },
        { id: 3, name: 'Ống thông' },
        { id: 4, name: 'Tĩnh mạch' }
      ],
      value: 0
    },
    {
      id: 3,
      name: "Mời hội chẩn dinh dưỡng",
      datas: [
        { id: 1, name: 'Có' },
        { id: 2, name: 'Không' }
      ],
      value: 0
    },
    {
      id: 4,
      name: "Tái đánh giá",
      datas: [
        { id: 1, name: 'Sau 7 ngày (ở người bệnh không suy dinh dưỡng)' },
        { id: 2, name: 'Sau 3 ngày (ở người bệnh suy dinh dưỡng)' }
      ],
      value: 0
    }
  ];
  tong_diem = 0;
  che_do_dinh_duong = {};
  so_phieu_bo_cau_hoi = {};
  ma_so_che_do_an = "";
  created_at = moment().unix();
}

@Component({
  selector: 'app-phieu-danh-gia-dinh-duong-tre-em',
  templateUrl: './phieu-danh-gia-dinh-duong-tre-em.component.html',
  styleUrls: ['./phieu-danh-gia-dinh-duong-tre-em.component.scss']
})
export class PhieuDanhGiaDinhDuongTreEmComponent extends GiayToLienQuanComponent implements OnInit, OnChanges{
  @Input() patientInfo: any;
  @Input() isCreateGiayToLienQuan: any;
  @Input() selectGiayToLienQuan: any;
  @Output() pharmaChange = new EventEmitter<DataChangeEvent | null>();

  user_logged: any = localStorage.getItem('user_logged');
  user_logged_JSON: any = JSON.parse(this.user_logged)
  phieuDanhGiaDinhDuongTE = new PHIEU_DANH_GIA_DD_TRE_EM()
  TongHopDanhGiaDDTreEm: any = [];
  che_do_dinh_duong:  any  = {};

  list_so_phieu_bo_cau_hoi: any = [];
  selectedPhieuCauHoi: any = {};
  constructor(private localStorageService : LocalStorageService,
              private doctorService: DoctorService,
              private shareDataService: ShareDataService,
              private emrService: EmrService,
              private assignmentService: AssignmentService
              )
               {
    super()
  }
  ngOnInit(): void {
    // Lấy danh sách phiếu câu trả lời bộ câu hỏi trẻ em đã lưu của bệnh nhân
    this.emrService.getListKidQuestion(1, this.patientInfo.patient_id, "FORM_BO_CAU_HOI_TRE_EM").subscribe(data => {
      if(data.status === true){
        this.list_so_phieu_bo_cau_hoi = data.results[0].results;
      }else {
      }
    });
    this.phieuDanhGiaDinhDuongTE.dieu_duong_tao_phieu_info.full_name = this.user_logged_JSON.full_name
    this.phieuDanhGiaDinhDuongTE.dieu_duong_tao_phieu_info.user_signature = this.user_logged_JSON.user_signature
    this.phieuDanhGiaDinhDuongTE.dieu_duong_tao_phieu_info.user_signature_image = this.user_logged_JSON.user_signature_image
  }

  private getPatientInfoFromExamination () {
     this.assignmentService.searchMedicalWaiting(
        {reception_queue_id: this.patientInfo.patient_id}, {}, this.patientInfo.room_id, 1, 5,0,500,0).subscribe(
        (data: any) => {
            if(data.status) {
              data.results.forEach((result: any) => {
                if(result.status === 1) {
                  let recommendationId = result.data[0].recommendation_id;
                  if(recommendationId) {
                    this.assignmentService.getResultsExam(recommendationId).subscribe((dataReturn: any) =>{
                      if(dataReturn.status === true){
                        this.phieuDanhGiaDinhDuongTE.CHIEU_CAO = dataReturn.results[0].results.chieu_cao;
                        this.phieuDanhGiaDinhDuongTE.CAN_NANG = dataReturn.results[0].results.can_nang;
                      }
                    })
                  }
                }
              })

            }
        }
      )
  }
  resetDinhDuong (){
    this.phieuDanhGiaDinhDuongTE.CHAN_DOAN = (this.patientInfo.examining_diagnosis) ? this.patientInfo.examining_diagnosis : this.patientInfo.exam_done_diagnosis;
    this.phieuDanhGiaDinhDuongTE.CAN_NANG = (this.patientInfo.CAN_NANG) ? this.patientInfo.CAN_NANG :0;
    this.phieuDanhGiaDinhDuongTE.CHIEU_CAO = (this.patientInfo.CHIEU_CAO) ? this.patientInfo.CAN_NANG :0;
    this.phieuDanhGiaDinhDuongTE.BMI = 0;
  }

  resetDinhDuongFromPhieuCauHoi(so_phieu_bo_cau_hoi: string){
    this.phieuDanhGiaDinhDuongTE.so_phieu_bo_cau_hoi = so_phieu_bo_cau_hoi;
    this.phieuDanhGiaDinhDuongTE.CAN_NANG = (this.selectedPhieuCauHoi.CAN_NANG_HIEN_TAI) ? this.selectedPhieuCauHoi.CAN_NANG_HIEN_TAI :0;
    this.phieuDanhGiaDinhDuongTE.CHIEU_CAO = (this.selectedPhieuCauHoi.CHIEU_CAO_HIEN_TAI) ? this.selectedPhieuCauHoi.CHIEU_CAO_HIEN_TAI :0;
    this.phieuDanhGiaDinhDuongTE.BMI = (this.selectedPhieuCauHoi.BMI_HIEN_TAI) ? this.selectedPhieuCauHoi.BMI_HIEN_TAI :0;

    this.phieuDanhGiaDinhDuongTE.danh_gia[0].datas.forEach((data: any) => {
      if(data.id == this.selectedPhieuCauHoi.CAN_NANG_THEO_CHIEU_CAO.ID){
        this.phieuDanhGiaDinhDuongTE.danh_gia[0].value = data.id;
      }
    })

    switch(true) {
      case this.selectedPhieuCauHoi.NHO_HON_2_TUOI.ID == 1:
        this.phieuDanhGiaDinhDuongTE.danh_gia[1].value = 1;
        break;
      case this.selectedPhieuCauHoi.NHO_HON_2_TUOI.ID == 2:
        this.phieuDanhGiaDinhDuongTE.danh_gia[1].value = 2;
        break;
      case this.selectedPhieuCauHoi.LON_HON_2_TUOI.ID == 1:
        this.phieuDanhGiaDinhDuongTE.danh_gia[1].value = 3;
        break;
      case this.selectedPhieuCauHoi.LON_HON_2_TUOI.ID == 2:
        this.phieuDanhGiaDinhDuongTE.danh_gia[1].value = 4;
        break;
      case this.selectedPhieuCauHoi.CAN_NANG_1_THANG_TRUOC == 2:
        this.phieuDanhGiaDinhDuongTE.danh_gia[1].value = 5;
        break;
      default:
        break;
    }

    this.phieuDanhGiaDinhDuongTE.danh_gia[2].datas.forEach((data: any) => {
      if(data.id == this.selectedPhieuCauHoi.LUONG_AN_TRONG_1_TUAN.ID){
        this.phieuDanhGiaDinhDuongTE.danh_gia[2].value = data.id;
      }
    })

  }

  calcTongDiem(){
    this.phieuDanhGiaDinhDuongTE.tong_diem = 0;
    this.phieuDanhGiaDinhDuongTE.danh_gia.forEach((danh_gia: any) => {
      danh_gia.datas.forEach((item: any) => {
        if (item.id === danh_gia.value) {
          this.phieuDanhGiaDinhDuongTE.tong_diem += item.so_diem;
        }
      });
    });


    if(this.phieuDanhGiaDinhDuongTE.tong_diem < 2){
      this.phieuDanhGiaDinhDuongTE.ket_luan.value = 1;
    }else{
      this.phieuDanhGiaDinhDuongTE.ket_luan.value = 2;
    }
  }

  calcBMI(weight: number, height: number, index:number){
    switch (index){
      case 0:
        this.phieuDanhGiaDinhDuongTE.BMI = parseFloat(GiayToLienQuanComponent.calcBMI(weight, height));
        break;
      default: break;
    }
  }

  onChangeSoPhieuBoCauHoi(phieu_cau_hoi:  any){
    this.selectedPhieuCauHoi = phieu_cau_hoi;
    this.resetDinhDuongFromPhieuCauHoi(phieu_cau_hoi);
    this.calcTongDiem()
  }

  ngOnChanges(changes:SimpleChanges) {
    if (!this.isCreateGiayToLienQuan && this.checkNonEmpty(this.selectGiayToLienQuan)) {
      this.phieuDanhGiaDinhDuongTE = this.selectGiayToLienQuan
    }
    if (this.isCreateGiayToLienQuan || !this.phieuDanhGiaDinhDuongTE) {
      this.phieuDanhGiaDinhDuongTE = new PHIEU_DANH_GIA_DD_TRE_EM();
    }

    if(this.isCreateGiayToLienQuan && this.patientInfo) {
      this.getPatientInfoFromExamination()
    }
    this.shareDataService.pushData(this.phieuDanhGiaDinhDuongTE, 'phieu_danh_gia_dinh_duong_TE');
  }
}
