import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BenhPham, PhieuYeuCauQLKhangSinh } from '../../../model/emr/phieu_yeu_cau_quan_ly_khang_sinh';
import { LocalStorageService } from '@shared';
import { PharmaService } from '../../../services/medicament/pharma.service';
import { Pharma } from '../../../model/medicament/pharma';
import { Name } from '../../../model/emr/global';
import { DoctorService } from '../../../services/doctor.service';
import { ShareDataService } from '../../../services/share-data.service';
import moment from 'moment';
import { DataChangeEvent } from '../../../model/data-change/event';
import { GiayToLienQuanComponent } from '../benh-an-emr/giay-to-lien-quan.component';
import { FrontendConfigService } from '../../../services/frontend-config/frontend-config.service';
import { EmrService } from '../../../services/emr.service';
import { PatientInformation, pharma } from '../../medicament/thuoc-lanh-dao-duyet/thuoc-lanh-dao-duyet.component';
import { ToastrTranslateService } from '@shared/services/toastr-translate-service';
import { ServiceService } from '../../../services/service.service';
import { SyntheticClsComponent } from '../components/synthetic-cls/synthetic-cls.component';
import { MatDialog } from '@angular/material/dialog';
import { PrintService } from '../../../services/print.service';
import { Globals } from '../../../app.globals';

@Component({
  selector: 'app-phieu-yeu-cau-quan-ly-khang-sinh',
  templateUrl: './phieu-yeu-cau-quan-ly-khang-sinh.component.html',
  styleUrls: ['./phieu-yeu-cau-quan-ly-khang-sinh.component.scss'],
  providers:[PharmaService]
})
export class PhieuYeuCauQuanLyKhangSinhComponent extends GiayToLienQuanComponent implements OnInit, OnChanges {
  @Input() patientValue !: PatientInformation;
  @Input() currentTab : number | undefined;
  @Input() input_examination_prescription_code !: number;
  @Input() input_pharma_ids_to_update: number[] = [] ;
  @Input() input_pharma_to_update: pharma[] = [];
  //todo: Gợi ý giá trị cũ bằng placeholder
  pct: string = '';
  bach_cau: string = '';
  crp: string = '';
  object_id: string = '';

  /**
   * Phiếu này có là phiếu yêu cầu thuốc duyệt lãnh đạo hay không
   */
  @Input() mode?: 'required_to_approve';

  @Output() pharmaChange = new EventEmitter<DataChangeEvent | null>();

  examination_prescription_code: number = 0;
  pharma_ids_to_update: number[] = []
  pharma_to_update: pharma[] = [];

  yeu_cau_sd_ks_ql:PhieuYeuCauQLKhangSinh = new PhieuYeuCauQLKhangSinh();
  YEUCAU_SDKS_UTQL: any = {};
  benh_nhiem_khuan: any;
  duong_vao: any;
  y_kien_khoa_duoc:any;
  y_kien_duoc_lam_san:any;
  variableGlobal: any;
  ngay_thuc_hien: any;
  ngay_y_kien: any;
  supply_id= 1;
  pharmaSelected: Pharma = new Pharma();

  filteredUserCBYTs: any = [];
  filteredUsers: any = [];
  resetUser: Name = new Name();
  constructor(private localStorageService : LocalStorageService,
              private doctorService: DoctorService,
              private shareDataService: ShareDataService,
              private serviceServices: ServiceService,
              private toastr: ToastrTranslateService,
              private proxyService: FrontendConfigService,
              private emrService: EmrService,
              private dialog: MatDialog,
              private printService: PrintService,
              private globals: Globals) {
    super();
    this.variableGlobal = this.proxyService.getFrontendConfig();
  }

  ngOnInit(): void {
    this.YEUCAU_SDKS_UTQL = this.variableGlobal["YEUCAU_SDKS_UTQL"] ? this.variableGlobal["YEUCAU_SDKS_UTQL"].value: {}
    this.patientInfo = new PatientInformation();


  }
  BenhPham: BenhPham = new BenhPham();
  createBenhPham(objCreate: any){
    objCreate.ngay_cay_unix = moment(objCreate.ngay_cay).unix();
    objCreate.ngay_tra_unix = moment(objCreate.ngay_tra).unix();
    if (this.yeu_cau_sd_ks_ql.benh_pham === undefined) {
      this.yeu_cau_sd_ks_ql.benh_pham = new Array<BenhPham>();
    }
    this.yeu_cau_sd_ks_ql.benh_pham?.push(objCreate);
    this.BenhPham = new BenhPham();
  }
  removeBenhPham(indexOfelement: number){
    this.pharma_to_update.splice(indexOfelement, 1);
  }
  createPharma(pharma: Pharma){
    if(pharma.pharma_id) {
      if(this.yeu_cau_sd_ks_ql.phac_do_ks_yeucau === undefined ) {
        this.yeu_cau_sd_ks_ql.phac_do_ks_yeucau = new Array<Pharma>();
      }
      this.yeu_cau_sd_ks_ql.phac_do_ks_yeucau.push(pharma);
      this.pharmaSelected = new Pharma();
    }
  }
  filterUser(query: any, isCBYT: number){
    this.doctorService.getDoctors(query, "query").subscribe(dataReturn => {
      if(dataReturn.status === true){
        if(isCBYT === 1){
          this.filteredUserCBYTs = this.doctorService.convertUserCBYT("user", dataReturn.results);
        }else {
          this.filteredUsers = this.doctorService.convertUserEMR("user", dataReturn.results);
        }
      }
    });
  }
  removePharma(indexOfelement: number){
    this.pharma_to_update.splice(indexOfelement, 1);
  }
  displayFn(pharma: Pharma): string {
    return pharma && pharma.pharma_name ? pharma.pharma_name +" "+ ((pharma.pharma_dosage.length > 0) ? (", "+ pharma.pharma_dosage) : "") : '';
  }
  displayUser(value: any): string {
    return value && value.TEN ? value.TEN : '';
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getAllSyntheticCLS() // Lấy các chỉ số.
    this.getExdocument() //Lấy thông tin các phiếu cũ

    this.examination_prescription_code = this.input_examination_prescription_code;
    this.pharma_ids_to_update = this.input_pharma_ids_to_update;
    this.pharma_to_update = this.input_pharma_to_update;

    if (this.selectGiayToLienQuan && this.selectGiayToLienQuan.id){
      this.yeu_cau_sd_ks_ql = this.selectGiayToLienQuan;
      this.YEUCAU_SDKS_UTQL.phac_do = (this.yeu_cau_sd_ks_ql.phac_do_ks) ? this.yeu_cau_sd_ks_ql.phac_do_ks : this.YEUCAU_SDKS_UTQL.phac_do;
      this.YEUCAU_SDKS_UTQL.nhiem_khuan = (this.yeu_cau_sd_ks_ql.benh_nhiem_khuan) ? this.yeu_cau_sd_ks_ql.benh_nhiem_khuan : this.YEUCAU_SDKS_UTQL.nhiem_khuan;
      this.YEUCAU_SDKS_UTQL.duong_vao = (this.yeu_cau_sd_ks_ql.duong_vao) ? this.yeu_cau_sd_ks_ql.duong_vao : this.YEUCAU_SDKS_UTQL.duong_vao;
      this.ngay_thuc_hien = moment.unix(this.yeu_cau_sd_ks_ql.ngay_thuc_hien).format();
      this.ngay_y_kien = moment.unix(this.yeu_cau_sd_ks_ql.ngay_y_kien).format();
    }else {
      if(this.patientValue){
        this.patientInfo = Object.assign(this.patientInfo, this.patientValue);
      }
      this.yeu_cau_sd_ks_ql = new PhieuYeuCauQLKhangSinh();
      if(this.YEUCAU_SDKS_UTQL.phac_do && this.YEUCAU_SDKS_UTQL.phac_do.length > 0){
        this.YEUCAU_SDKS_UTQL.phac_do.forEach((phacdo: any)=>{
          phacdo.phac_do_ks_name = '';
          phacdo.checked = false;
          phacdo.phac_do_ks_ly_do = (phacdo.phac_do_ks_id == 4) ? "Khác" : phacdo.phac_do_ks_ly_do;
        })
      }
      if(this.YEUCAU_SDKS_UTQL.nhiem_khuan && this.YEUCAU_SDKS_UTQL.nhiem_khuan.length > 0) {
        this.YEUCAU_SDKS_UTQL.nhiem_khuan.forEach((nhiem_khuan: any) => {
          nhiem_khuan.checked = undefined;

        });
      }
      this.benh_nhiem_khuan = [];
      this.duong_vao = [];
      if(this.YEUCAU_SDKS_UTQL.duong_vao && this.YEUCAU_SDKS_UTQL.duong_vao.length > 0) {
        this.YEUCAU_SDKS_UTQL.duong_vao.forEach((duong_vao: any) => {
          duong_vao.checked = undefined;
        });
      }
      this.ngay_thuc_hien = moment();
      this.ngay_y_kien = moment();
      this.yeu_cau_sd_ks_ql.ngay_y_kien = moment().unix();
      this.yeu_cau_sd_ks_ql.ngay_thuc_hien = moment().unix();
      this.yeu_cau_sd_ks_ql.parent_name = this.patientInfo.parent_name || '';
    }
    this.yeu_cau_sd_ks_ql.phac_do_ks = this.YEUCAU_SDKS_UTQL.phac_do;
    Object.assign(this.yeu_cau_sd_ks_ql.phac_do_ks_yeucau, this.pharma_to_update);
    this.yeu_cau_sd_ks_ql.benh_nhiem_khuan = this.YEUCAU_SDKS_UTQL.nhiem_khuan;
    this.yeu_cau_sd_ks_ql.duong_vao = this.YEUCAU_SDKS_UTQL.duong_vao;
    if(!this.patientValue) {
      this.initOrKeepValues(this.patientInfo, [
        {
          key: 'DO_TUOI',
          defaultValueFactory: () => {
            if (this.patientInfoHis?.birthday) {
              if (this.patientInfo.created_at) {
                return moment.unix(this.patientInfo.created_at).year() - moment.unix(this.patientInfoHis.birthday).year();
              } else {
                return moment().year() - moment.unix(this.patientInfoHis.birthday).year();
              }
            }
            return null;
          },
          isEmptyChecker: () => true
        }
      ]);
    }
    this.shareDataService.pushData(this.yeu_cau_sd_ks_ql, "yeu_cau_sd_ks_ql");
  }
  onDate(event: any, title: string, index: number = -1): void{
    switch (title){
      case 'ngay_y_kien':
        this.yeu_cau_sd_ks_ql['ngay_y_kien'] = moment(event).unix();
      break;
      case 'ngay_thuc_hien':
        this.yeu_cau_sd_ks_ql['ngay_thuc_hien'] = moment(event).unix();
        break;
      case 'ngay_cay':
        // console.log(this.yeu_cau_sd_ks_ql.benh_pham[index]);
        if(index > -1){
          this.yeu_cau_sd_ks_ql.benh_pham[index].ngay_cay_unix = moment(event).unix();
        }else {
          this.BenhPham.ngay_cay_unix = moment(event).unix();
        }
        break;
      case 'ngay_tra':
        if(index > -1){
          this.yeu_cau_sd_ks_ql.benh_pham[index].ngay_tra_unix = moment(event).unix();
        }else {
          this.BenhPham.ngay_tra_unix = moment(event).unix();
        }
        break;
    }
  }

  save(status : number){
    this.pharma_ids_to_update = [];
    let feConfig = this.variableGlobal["FORM_ID_YEU_CAU_QUAN_LY_KHANG_SINH"] ? Number(this.variableGlobal["FORM_ID_YEU_CAU_QUAN_LY_KHANG_SINH"].value) : 5097
      this.pharma_to_update.forEach(
        pharma => {
          this.pharma_ids_to_update.push(Number(pharma.pharma_id))
        }
      )

    //todo: Gọi e/cd/ để lưu thông tin phiếu.
    this.emrService.saveEMR(this.yeu_cau_sd_ks_ql, this.patientValue.patient_id ||0,
      this.patientValue.reception_queue_id.toString(),'', 1, 'FORM_ID_YEU_CAU_QUAN_LY_KHANG_SINH',
      2, undefined).subscribe((data) => {
        if(data.status){ //Lưu thành công thông tin phiếu -> Gọi API để cập nhật trang thái toa.
          this.emrService.luuToa(this.examination_prescription_code, this.pharma_ids_to_update, status).subscribe({
            next: (data) => {
              if (data.status) {
                if(status == 1)
                  this.toastr.success('Lưu phiếu thành công', 'Lưu thành công');
                else {
                  if(status == 3)
                    this.toastr.success('Không đồng ý sử dụng thành công', 'Không đồng ý!');
                  else
                    this.toastr.success('Đồng ý sử dụng thành công', 'Đồng ý!');
                }
              } else {
                if(status == 1)
                  this.toastr.error('Lưu phiếu thất bài', 'Lưu thất bại');
                else
                  this.toastr.error('Đổi trạng thái phiếu thất bại', 'Thất bại');
              }
            },
          })
        }
        else{
          this.toastr.clear();
          this.toastr.error(data.Error,'Error');
        }
    })

  }

  //todo: Lấy dữ liệu bệnh sử của bệnh nhân
  getAllSyntheticCLS() {
    this.serviceServices.getServiceUsed(this.patientValue.patient_id, '', {$in: [0,1]},[
      {service_category_parent_id: {$in: [3, 4, 5]}},
    ],{
        key_level_1 : "service_category_parent_id",
        key_level_2 : "used_at",
      },
      null,
      this.patientInfo.medical_record_no,
      {
        "_id": "$_id",
        "form_id": "$form_id",
        "from_ehos_v1": "$from_ehos_v1",
        "service_name": "$service_name",
        "current_day_time": "$current_day_time",
        "service_category_id": "$service_category_id",
        "service_category_name": "$service_category_name",
        "service_category_parent_id": "$service_category_parent_id",
        "service_category_parent_name": "$service_category_parent_name",
        "patient_company_insurance_selected": "$patient_company_insurance_selected",
        "patient_health_insurance_selected": "$patient_health_insurance_selected",
        "service_id": "$service_id",
        "used_at": "$used_at",
        "is_pacs": "$is_pacs",
        "is_sent": "$is_sent",
        "address": "$address",
        "birthday": "$birthday",
        "created_at": "$created_at",
        "in_patient": "$in_patient",
        "patient_fullname": "$patient_fullname",
        "patient_id": "$patient_id",
        "patient_type_name": "$patient_type_name",
        "phone_number": "$phone_number",
        "sex": "$sex",
        "recommendation_by": "$recommendation_by",
        "diagnosis_content": "$diagnosis_content",
        "barcode_id": "$barcode_id",
        "recommendation_id_pacs": "$recommendation_id_pacs",
        "results": "$results",
        "pharmas": "$pharmas",
        "supplements": "$supplements",
        "pharmas_bhyt": "$pharmas_bhyt",
        "medical_products": "$medical_products"
      }
      ).subscribe((res) => {
      if (res.status && res.results.length > 0) {
        res.results.forEach((cap1: any) => {
          let listDichVu = cap1.data[0].exams //Lấy được danh sách những dịch vụ thực hiện trong ngày gần nhất
          let arrayResult: any[] = []
          //todo: Lấy tất cả dịch vụ và lấy những kết quả cần.
          listDichVu.forEach(
            (dichVu: any) => {
              dichVu.services[dichVu.services.length - 1].services.results.parameters
                .forEach(//todo: Gán kết quả và model
                  (para: any) => {
                    if(para.lab_indicator_code == "PCT")
                      this.pct = para.lab_indicator_value;
                    if(para.lab_indicator_code == 'WBC')
                      this.bach_cau = para.lab_indicator_value;
                    if(para.lab_indicator_code == 'CRP')
                      this.crp = para.lab_indicator_value;
                  }
                )
            });
          })
        }
      });
  }

  //todo: Gọi getExDocument để lấy thông tin phiếu cũ.
  getExdocument() {
    this.emrService.getExDocument(5079, this.patientValue.patient_id,
      this.patientValue.reception_queue_id.toString()).subscribe(
      (data) => {
        this.object_id = data.results[0]._id;
        if(data.status){
          // console.log(data.results,data.results[data.results.length - 1])
          Object.assign(this.yeu_cau_sd_ks_ql, data.results[0].results[data.results[0].results.length - 1])
        }
      }
    )
  }

  /**
   * Kienkv: get Synthetic Cls
   */
  openSyntheticCls() {
    const dialogRef = this.dialog.open(SyntheticClsComponent, {
      panelClass: 'confirm-dialog',
      width: '60vw',
      data: {
        patient_id: this.patientInfo.patient_id,
        reception_queue_id: this.patientInfo.reception_queue_id
      }
    })
    dialogRef.afterClosed().subscribe((value: string)=>{
      if (value) {
        this.yeu_cau_sd_ks_ql.ket_qua_cls_gan_nhat = value;
      }
    })
  }

  printPhieu() {
    const printModel = {
      results: {
        object_id: this.object_id,
        format: 'pdf',
        report_router: '/reports/' + this.globals.prefix_report + '/document/PhieuThuocDuyetLanhDao',
      },
    };
    this.printService.printReport(printModel)
  }
}
