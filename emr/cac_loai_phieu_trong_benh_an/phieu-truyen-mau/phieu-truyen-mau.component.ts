import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PTM } from '../../../../model/giay_to_dinh_kem_emr/phieu_truyen_mau';
import { ReceptionService } from '../../../../services/reception.service';
import { KhoaDieuTri } from '../../../../model/emr/quan_ly_nguoi_benh';
import * as moment from 'moment';
import { DoctorService } from '../../../../services/doctor.service';
import { DM } from '../../../../model/Patient_EMR';
import { ShareDataService } from '../../../../services/share-data.service';
import { GiayToLienQuanComponent } from '../../benh-an-emr/giay-to-lien-quan.component';
import { ServiceService } from '../../../../services/service.service';
import { GetServiceUsedResponseResults } from '../../../../model/service/response';
import { EmrService } from '../../../../services/emr.service';
import { SiteName } from '../../../../model/site/site-name';
import { filter } from 'rxjs/operators';
import {
  LaboratoryBloodService,
  RecommendationBloodBag,
} from '../../../../services/laboratory/laboratory-blood.service';
import { FrontendConfigService } from '../../../../services/frontend-config/frontend-config.service';

@Component({
  selector: 'app-phieu-truyen-mau',
  templateUrl: './phieu-truyen-mau.component.html',
  styleUrls: ['./phieu-truyen-mau.component.scss'],
  providers: [LaboratoryBloodService]
})
export class PhieuTruyenMauComponent extends GiayToLienQuanComponent implements OnInit, OnChanges {
  ptm!: PTM;
  filteredRooms: any = [];
  resetKDT: KhoaDieuTri = new KhoaDieuTri();
  phieu_truyen_mau: any;
  filteredUserCBYTs: any;
  resetDM: DM = new DM();
  Dienbien: any = {
    DATE_DIEN_BIEN: moment().format("HH:mm"),
    DATE_DIEN_BIEN_MOMENT: moment(),
    SAC_MAT: "",
    NHIP_THO: "",
    NHIET_DO: "",
    HUYET_AP: "",
    MACH: "",
    DIEN_BIEN_TRONG_KHI_TRUYEN: ""
  }

  private patientHisData: Record<string, any> = {};

  private readonly DOMAIN_XN;

  showFields: Record<string, any> = {};
  siteName: SiteName = 'default';

  public recommendationBloodBags: RecommendationBloodBag[] = [];
  public isLoadingRecommendationBloodBags = false;

  constructor(private receptionService: ReceptionService,
              private shareDataService: ShareDataService,
              private doctorService: DoctorService,
              private serviceService: ServiceService,
              private emrService: EmrService,
              private laboratoryBloodService: LaboratoryBloodService,
              frontendConfigService: FrontendConfigService) {
    super();
    this.DOMAIN_XN = frontendConfigService.getFrontendConfig()["DOMAIN_XN"]?.value;
  }

  ngOnInit(): void {
    this.siteName = this.emrService.getSite()?.name || 'default';
    this.emrService.getShowFieldComponentBySite(this.loaiGiayToLienQuan.MA).subscribe((res) => {
      this.showFields = res;
    });
  }
  ngOnChanges(changes: SimpleChanges){
    if(!this.isCreateGiayToLienQuan && this.selectGiayToLienQuan){
      this.ptm = this.selectGiayToLienQuan;
      this.Dienbien.DATE_DIEN_BIEN_MOMENT = moment();
    }
    if (!this.ptm) {
      this.ptm = new PTM();
    }

    //#region BVKCG-1066 - hieulm: Khi tạo mới phiếu sau sẽ lấy Phần 3 từ phiếu trước
    if (this.isCreateGiayToLienQuan && this.listLoaiGiayToSave.length) {
      const previousPTM: PTM = this.listLoaiGiayToSave[this.listLoaiGiayToSave.length - 1];
      this.ptm.LOAI_CHE_PHAM_MAU = previousPTM.LOAI_CHE_PHAM_MAU;
      this.ptm.MA_SO = previousPTM.MA_SO;
      this.ptm.HAN_DUNG_MOMENT = previousPTM.HAN_DUNG_MOMENT;
      this.ptm.LAN_TRUYEN_THU = previousPTM.LAN_TRUYEN_THU;
      this.ptm.BS_CHI_DINH = { ...previousPTM.BS_CHI_DINH };
      this.ptm.TIME_BAT_DAU_MOMENT = previousPTM.TIME_BAT_DAU_MOMENT;
      this.ptm.NHOM_MAU_NGUOI_CHO = typeof previousPTM.NHOM_MAU_NGUOI_CHO === 'string' ? previousPTM.NHOM_MAU_NGUOI_CHO : { ...previousPTM.NHOM_MAU_NGUOI_CHO as any };
      this.ptm.NHOM_MAU_BENH_NHAN = typeof previousPTM.NHOM_MAU_BENH_NHAN === 'string' ? previousPTM.NHOM_MAU_BENH_NHAN : { ...previousPTM.NHOM_MAU_BENH_NHAN as any };
      this.ptm.PHAN_UNG_HOA_HOP_TAI_GIUONG = previousPTM.PHAN_UNG_HOA_HOP_TAI_GIUONG;
      this.ptm.LUONG_MAU_VA_CHE_PHAM_MAU_TRUYEN = previousPTM.LUONG_MAU_VA_CHE_PHAM_MAU_TRUYEN;
      this.ptm.LIST_DIEN_BIEN = previousPTM.LIST_DIEN_BIEN.map(dienbien => ({...dienbien}));
      this.ptm.TIME_KET_THUC_MOMENT = previousPTM.TIME_KET_THUC_MOMENT;
      this.ptm.SO_LUONG_MAU_TRUYEN_THUC_TE = previousPTM.SO_LUONG_MAU_TRUYEN_THUC_TE;
      this.ptm.BS_THUC_HIEN = { ...previousPTM.BS_THUC_HIEN };
      this.ptm.Y_TA_THUC_HIEN = { ...previousPTM.Y_TA_THUC_HIEN };
    }
    //#endregion

    //#region BVKCG-1670 - hieulm: Trường chẩn đoán link thông tin
    if (!this.ptm.CHAN_DOAN && changes.patientInfo) {
      if (changes.patientInfo) {
        // Nếu là Ngoại trú:  Từ Mã ICD chính của Khám bệnh
        if (changes.patientInfo?.currentValue?.in_patient === 0) {
          this.serviceService.getServiceUsed<GetServiceUsedResponseResults<'_id'>>(
            this.patientInfo.patient_id,
            this.patientInfo.reception_queue_id,
            this.patientInfo.in_patient,
            [
              {service_category_id: 6},
              {service_category_parent_id: 6},
            ],
            {key_level_1: '_id'},
            undefined,
            this.patientInfo.medical_record_no,
            {
              // examining_diagnosis: '$examining_diagnosis', // Phiếu điều trị
              results: '$results',
            }
          )
            .pipe(filter(res => res.status))
            .subscribe((res)=>{
              this.ptm.CHAN_DOAN = this.patientHisData.CHAN_DOAN = (() => {
                for (const cap1 of res.results) {
                  for (const cap2 of cap1.data) {
                    for (const cap3 of cap2.exams) {
                      for (const cap4 of cap3.services) {
                        const service: any = cap4.services;
                        if (service?.results?.service_icd_so_bo) {
                          return service?.results?.service_icd_so_bo.service_name;
                        }
                      }
                    }
                  }
                }
                return '';
              })();
            });
        }
        // Nếu là Nội trú:    Từ Chẩn đoán khoa điều trị
        else {
          this.receptionService.getPatientOut<{examining_diagnosis: string}[]>(this.patientInfo.reception_queue_id)
            .pipe(filter(res => res.status))
            .subscribe((res) => {
              if (res.results[0].examining_diagnosis) {
                this.ptm.CHAN_DOAN = this.patientHisData.CHAN_DOAN = res.results[0].examining_diagnosis;
              }
            });
        }
      }
      this.ptm.CHAN_DOAN = this.patientHisData.CHAN_DOAN;
    }
    //#endregion

    //#region BVKCG-1066 - hieulm: Nhóm máu bệnh nhân link thông tin từ màn hình quản lý nội trú
    if (!this.ptm.NHOM_MAU_NGUOI_CHO || !this.ptm.NHOM_MAU_BENH_NHAN) {
      if (changes.patientInfo?.currentValue?.patient_id) {
        this.emrService.getDiUngNhomMauRh(this.patientInfo.patient_id || 0).subscribe(dataReturn => {
          if(dataReturn.status) {
            const blood_type = dataReturn.results[0].blood_types;
            if (!this.ptm.NHOM_MAU_NGUOI_CHO) {
              this.ptm.NHOM_MAU_NGUOI_CHO = this.patientHisData.NHOM_MAU_NGUOI_CHO = blood_type;
            }
            if (!this.ptm.NHOM_MAU_BENH_NHAN) {
              this.ptm.NHOM_MAU_BENH_NHAN = this.patientHisData.NHOM_MAU_BENH_NHAN = blood_type;
            }
          }
        });
      }
    }
    //#endregion

    this.shareDataService.pushData(this.ptm, "phieu_truyen_mau");
  }
  filterRoom(value: any){
    var objParam = {
      active: 1,
      query: value,
      room_type_id: 568
    }
    this.receptionService.filterRoom(objParam).subscribe(dataReturn =>{
      if(dataReturn.status === true){
        this.filteredRooms = this.receptionService.convertKDT(dataReturn.results);
      }else{
        this.filteredRooms = [];
      }
    })
  }
  displayDMKDT(value: any): string {
    return value && value.TEN_KHOA_PHONG ? value.TEN_KHOA_PHONG : '';
  }
  displayCBYT(value: any): string {
    return value && value.user_name ? value.user_code + " - " + value.user_name : '';
  }

  removeDienbien(indexOfelement: number){
    this.ptm.LIST_DIEN_BIEN.splice(indexOfelement, 1);
  }

  filterUser(query: any){
    this.doctorService.getDoctors(query, "query").subscribe(dataReturn => {
      if(dataReturn.status === true){
        this.filteredUserCBYTs = dataReturn.results;
      }
    });
  }
  onDate(event: any, title: string, obj: any): void{
    if(title === "DATE_LAY"){
      this.ptm.DATE_LAY = moment(event).unix();
    }
    if(title === "HAN_DUNG"){
      this.ptm.HAN_DUNG = moment(event).unix();
    }
    if(title === "DATE_XET_NGHIEM"){
      this.ptm.DATE_XET_NGHIEM = moment(event).unix();
    }
    if(title === "DATE"){
      this.ptm.DATE = moment(event).unix();
    }
    if(title === "DATE2"){
      this.ptm.DATE2 = moment(event).unix();
    }
    if(title === "TIME_BAT_DAU"){
      this.ptm.TIME_BAT_DAU = moment(event).unix();
    }
    if(title === "TIME_KET_THUC"){
      this.ptm.TIME_KET_THUC = moment(event).unix();
    }
  }
  createDienBien(objCreate: any){
    this.Dienbien = {
      DATE_DIEN_BIEN_MOMENT: moment(),
      date_dien_bien: new Date(),
      sac_mat: "",
      nhip_tho: "",
      nhiet_do: "",
      huyet_ap: "",
      mach: "",
      dien_bien_khac: "",
      benhvien: ""
    }
    if (!this.ptm.LIST_DIEN_BIEN) {
      this.ptm.LIST_DIEN_BIEN = [];
    }
    this.ptm.LIST_DIEN_BIEN.push({
      ...objCreate,
      DATE_DIEN_BIEN_MOMENT: moment(objCreate.DATE_DIEN_BIEN_MOMENT)
    });
    this.sortArrayByTimeUnix();
  }
  sortArrayByTimeUnix() {
    if (this.siteName == 'app_67' && this.ptm.LIST_DIEN_BIEN && this.ptm.LIST_DIEN_BIEN.length > 0){
      this.ptm.LIST_DIEN_BIEN.sort((a, b) => a.DATE_DIEN_BIEN - b.DATE_DIEN_BIEN);
    }
  }
  handleTimeChange() {
    this.sortArrayByTimeUnix();
  }

  getRecommendationBloodBags = () => {
    const req = this.laboratoryBloodService.getRecommendationBloodBags({
      patient_id: this.patientInfo.patient_id,
      reception_queue_id: this.patientInfo.reception_queue_id
    });
    if (this.isLoadingRecommendationBloodBags) {
      return req;
    }
    this.isLoadingRecommendationBloodBags = true;
    req.subscribe((recommendationBloodBags) => {
      this.recommendationBloodBags = recommendationBloodBags;
      this.isLoadingRecommendationBloodBags = false;
    })
    return req;
  }

  handleChangeRecommendationBloodBag(bag: RecommendationBloodBag) {
    this.ptm.MA_SO = bag.blood_bag_code;
  }

  // BVKCG-2270: Bổ sung thêm button xem file ký số do LIS gửi về
  openSignedFile() {
    const recommendationBloodBag: any = this.ptm.LOAI_CHE_PHAM_MAU;
    const fileNo = (typeof recommendationBloodBag === 'string') ? recommendationBloodBag : recommendationBloodBag.big_recommendation_no;
    const url = `${this.DOMAIN_XN}sign/${
      fileNo.substring(0,6)}/${
      parseInt(this.patientInfo.patient_id,10).toString(32)}/TuMau/${fileNo}.pdf`;
    window.open(url, '_blank');
  }
}
