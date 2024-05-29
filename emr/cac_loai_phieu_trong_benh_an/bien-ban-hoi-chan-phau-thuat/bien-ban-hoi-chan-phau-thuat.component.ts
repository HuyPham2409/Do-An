import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { BIEN_BAN_HOI_CHAN_PHAU_THUAT } from '../../../../model/giay_to_dinh_kem_emr/bien_ban_hoi_chan_phau_thuat';
import { ExaminationService } from '../../../../services/examination.service';
import { ReceptionService } from '../../../../services/reception.service';
import { ShareDataService } from '../../../../services/share-data.service';
import { GiayToLienQuanComponent } from '../../benh-an-emr/giay-to-lien-quan.component';
import { EmrService } from '../../../../services/emr.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Globals } from 'app/app.globals';
import { ComponentUtils } from 'app/modules/laboratory/utils/component-utils';
import { LabratoryMenuService } from 'app/services/laboratory/labratory-menu.service';
import { firstValueFrom, Subscription } from 'rxjs';
import { ToastrTranslateService } from '@shared/services/toastr-translate-service';
import { ServiceService } from '../../../../services/service.service';
import { Service } from '../../../quan-ly-tiem-chung/quan_ly_goi_tiem_chung';

class inforPharma {
  THUOC: any;
  DUONG_DUNG: string = "";
  LY_DO: string = "";
}

@Component({
  selector: 'app-bien-ban-hoi-chan-phau-thuat',
  templateUrl: './bien-ban-hoi-chan-phau-thuat.component.html',
  styleUrls: ['./bien-ban-hoi-chan-phau-thuat.component.scss']
})
export class BienBanHoiChanPhauThuatComponent extends GiayToLienQuanComponent implements OnInit, OnChanges, OnDestroy {
  bienBanHoiChanPhauThuat!: BIEN_BAN_HOI_CHAN_PHAU_THUAT;
  newPharma = new inforPharma()
  listThuMoi: any= [];
  selectedThuMoi: any = null;
  isSelectedThuMoi: boolean = false;
  service = new Service();
  user_logged: any = {};
  khoaLocal: any = {};
  chiNhanh: any = {};
  @Input() patientInfo: any;
  @Input() patientInfoHis: any;

  @Output() save = new EventEmitter();

  listSex = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Nam"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Nữ"
    }
  ];

  listLoaiMo = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Mổ phiên"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Mổ cấp cứu"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "Mổ trong ngày"
    },
    {
      ID: "4",
      MA: "4",
      MO_TA: "Mổ theo yêu cầu"
    },
  ]
  protected subscriptions = new Subscription();
  constructor(private examinationService: ExaminationService,
              private receptionService: ReceptionService,
              private shareDataService: ShareDataService,
              private emrService: EmrService,
              private http: HttpClient,
              private menuService:LabratoryMenuService,
              private globals:Globals,
              private serviceService: ServiceService,
              private toastr:ToastrTranslateService) {
    super();
  }
  ngOnInit(): void {
    this.user_logged = this.getItemInLocal('user_logged');
    this.khoaLocal = this.getItemInLocal('cache_phongban');
    this.chiNhanh = this.getItemInLocal('cache_chinhanh');

    ComponentUtils.initWithFormAndMenu(
      [], this.menuService, this.subscriptions,
      {
        onSave: async () => {
          if (this.isSelectedThuMoi) {
            setTimeout(()=>{
              this.updateConsultation();
            }, 10000) //tránh bị lỗi ERR_CLICK_SIMULTANEOUSLY
          }
        }
      }
    )
  }

  private getApiConsultation(recep_id: any = undefined, isCon: number = 0){
    let params = new HttpParams().set('is_consultation', isCon);
    if (recep_id) params = params.set('reception_queue_id', recep_id);
    this.http.get<any>(this.globals.API_DOMAIN_EX_2 + '/diagnosis/invites', {params}).subscribe({
      next:(dataReturn)=>{
        if (dataReturn.status === true){
          this.listThuMoi = dataReturn.results;
        } else{
          this.listThuMoi = [];
        }
      },
      error: (err)=>{
        this.listThuMoi = [];
      }
    });
  }

  private getItemInLocal(key:string){
    let item = localStorage.getItem(key);
    if (item) return JSON.parse(item);
    return null;
  }

  selectConsultation(event: any) {
    this.selectedThuMoi = event;
    this.selectedThuMoi.results.is_consultation = 1;
    this.isSelectedThuMoi = true;
    this.bienBanHoiChanPhauThuat.THU_MOI_HC = this.selectedThuMoi;
  }

  updateConsultation(){
    this.emrService.saveEMR(this.selectedThuMoi.results, this.selectedThuMoi.results.ma_yt||0,
      this.selectedThuMoi.reception_queue_id.toString(),'', 1, 'FORM_THU_MOI_HC', 2, this.selectedThuMoi.medical_record_no).subscribe({
      next:(data)=>{
        if (data.status){
          this.toastr.success('Thư mời hội chẩn được liên kết với biên bản thành công!');
        }else{
          this.toastr.error('Thư mời hội chẩn chưa được liên kết với biên bản thành công!');
        }
      }
    });
  }

  ngOnChanges() {
    if(this.patientInfo){
      this.getApiConsultation(this.patientInfo.reception_queue_id)
    }
    if (!this.isCreateGiayToLienQuan && this.checkNonEmpty(this.selectGiayToLienQuan)) {
      this.bienBanHoiChanPhauThuat = this.selectGiayToLienQuan;
    }
    if(this.isCreateGiayToLienQuan || !this.bienBanHoiChanPhauThuat){
      this.bienBanHoiChanPhauThuat = new BIEN_BAN_HOI_CHAN_PHAU_THUAT();
    }
    this.initOrKeepValues(this.bienBanHoiChanPhauThuat, [
      {
        key: 'SO_NHAP_VIEN',
        defaultValueFactory: () => this.patientInfoHis.reception_queue_id
      },
    ]);

    this.shareDataService.pushData(this.bienBanHoiChanPhauThuat, 'bien_ban_hoi_chan_phau_thuat');
  }

  getPharma(pharmaInfo: any) {
    this.newPharma.THUOC = pharmaInfo;
    this.newPharma.DUONG_DUNG = pharmaInfo.pharma_way_to_use[0].way_to_use_name;
    this.newPharma.LY_DO = "";
  }

  createChonThuoc(objCreate: any) {
    this.bienBanHoiChanPhauThuat.pharmas.push(objCreate);
    this.newPharma = new inforPharma();
  }

  removeChonThuoc(indexOfelement: number) {
    this.bienBanHoiChanPhauThuat.pharmas.splice(indexOfelement, 1);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  chuyenKhamMe(): void{
    if(this.service?.service_id){
      this.orderService()
    }else {
      this.toastr.error("Vui lòng chỉ định dịch vụ trước khi chuyển khám mê");
    }

  }

  checkServicePrice() {
    const receptionQueueId = this.patientInfo.reception_queue_id;
    this.serviceService.checkServicePrice(receptionQueueId, {
      results: {
        room_id: this.khoaLocal.room_id,
        room_name: this.khoaLocal.room_name,
        branch_id: this.chiNhanh.branch_id,
        branch_name: this.chiNhanh.branch_name,
        is_ordered: 1,
        check_price: 1,
        company_id: this.user_logged.company_id,
        note: '',
        service_id: this.service.service_id,
        have_to_pay: 1,
        patient_id: this.patientInfo.patient_id,
        multi_payment: 0,
        multi_usage: 0,
        price: 0,
        quantity: 1,
        quantity_cancelled: 0,
        quantity_used: 0,
        re_examinate: 0,
        room_id_to_do: this.service.room_id,
        room_name_to_do: this.service.room_name,
        stay_in: 0,
        urgent: 0,
        want_buy_more: 0,
      },
    })
  }

  private async orderService() {
    let res: any;
    const receptionQueueId = this.patientInfo.reception_queue_id;

    try {
      //#region Kiểm tra bảng giá dịch vụ
      if (this.service?.service_id) {
        res = await firstValueFrom(this.serviceService.checkServicePrice(receptionQueueId, {
          results: {
            room_id: this.khoaLocal.room_id,
            room_name: this.khoaLocal.room_name,
            branch_id: this.chiNhanh.branch_id,
            branch_name: this.chiNhanh.branch_name,
            is_ordered: 1,
            check_price: 1,
            company_id: this.user_logged.company_id,
            note: '',
            service_id: this.service.service_id,
            have_to_pay: 1,
            patient_id: this.patientInfo.patient_id,
            multi_payment: 0,
            multi_usage: 0,
            price: 0,
            quantity: 1,
            quantity_cancelled: 0,
            quantity_used: 0,
            re_examinate: 0,
            room_id_to_do: this.service.room_id,
            room_name_to_do: this.service.room_name,
            stay_in: 0,
            urgent: 0,
            want_buy_more: 0,
            patient_type_id: this.patientInfoHis.patient_type.patient_type_id,
            patient_type_name: this.patientInfoHis.patient_type.patient_type_name,
          },
        }));

        if (!res.status) {
          throw res.results;
        }
        //#endregion

        //#region Chỉ định dịch vụ
        res = await firstValueFrom(this.serviceService.orderService(receptionQueueId, {
          results: {
            room_id: this.khoaLocal.room_id,
            room_name: this.khoaLocal.room_name,
            branch_id: this.chiNhanh.branch_id,
            branch_name: this.chiNhanh.branch_name,
            company_id: this.user_logged.company_id,
            patient_id: this.patientInfo.patient_id,
            price: res.results.service_price,
            room_id_to_do: this.service.room_id,
            room_name_to_do: this.service.room_name,
            service_id: this.service.service_id,
            is_ordered: 1,
            note: '',
            have_to_pay: 1,
            multi_payment: 0,
            multi_usage: 0,
            quantity: 1,
            quantity_cancelled: 0,
            quantity_used: 0,
            re_examinate: 0,
            stay_in: 0,
            urgent: 0,
            want_buy_more: 0,
          },
        }));
        if (!res.status) {
          throw res.results;
        }
        //#endregion

        //#region Lưu chỉ định
        res = await firstValueFrom(this.serviceService.saveService(receptionQueueId, {
          results: {
            room_id: this.khoaLocal.room_id,
            room_name: this.khoaLocal.room_name,
            branch_id: this.chiNhanh.branch_id,
            branch_name: this.chiNhanh.branch_name,
            diagnosis_content: '',
            reception_queue_id: receptionQueueId,
          },
        }));
        if (!res.status) {
          throw res.results;
        }
        //#endregion

      }
    }catch (err) {
      this.toastr.error("Chuyển khám mê thất bại");
      this.bienBanHoiChanPhauThuat.chuyen_kham_me = false;
      this.bienBanHoiChanPhauThuat.chuyen_kham_me_tai = this.service.room_name;
      this.shareDataService.pushData(this.bienBanHoiChanPhauThuat, 'bien_ban_hoi_chan_phau_thuat');
      this.save.emit();
    }finally {
      if (res.status) {
        this.toastr.success("Chuyển khám mê thành công");
        this.bienBanHoiChanPhauThuat.chuyen_kham_me = true;
        this.bienBanHoiChanPhauThuat.chuyen_kham_me_tai = this.service.room_name;
        this.shareDataService.pushData(this.bienBanHoiChanPhauThuat, 'bien_ban_hoi_chan_phau_thuat');
        this.save.emit();
      }
    }
  }
}
