import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { inforPharma, phieuTruyenDich } from '../../../../model/emr/phieu_truyen_dich';
import * as moment from 'moment';
import { ShareDataService } from '../../../../services/share-data.service';
import { DoctorService } from '../../../../services/doctor.service';
import { Name } from '../../../../model/emr/global';
import { ServiceService } from 'app/services/service.service';
import { Globals } from 'app/app.globals';
import { PrintService } from 'app/services/print.service';
import { ToastrTranslateService } from '@shared/services/toastr-translate-service';
import { FrontendConfigService } from '../../../../services/frontend-config/frontend-config.service';

@Component({
  selector: 'app-phieu-truyen-dich',
  templateUrl: './phieu-truyen-dich.component.html',
  styleUrls: ['./phieu-truyen-dich.component.scss'],
})
export class PhieuTruyenDichComponent implements OnInit, OnChanges {
  phieuTruyenDich = new phieuTruyenDich();
  newPharmaInfused = new inforPharma();
  @Input() patientInfo: any;
  @Input() isCreateGiayToLienQuan: any;
  @Input() selectGiayToLienQuan: any;
  @Input() listLoaiGiayToSave: any;
  filteredUserCBYTs: any = [];
  filteredUsers: any = [];
  listYLenh: any = [];
  listPharma: any = [];
  resetUser: Name = new Name();
  theTich = '';
  totalTheTich = 0;
  tocDO = 0;
  thoiGian = 0;
  batDau = moment();
  ketThuc = moment();
  listIDWayToUse: any = [];
  selectedYLenh: any = [];
  listPharmaCreated: any = [];

  protected variableGlobal: any = {};

  constructor(
    private shareDataService: ShareDataService,
    private doctorService: DoctorService,
    private serviceService: ServiceService,
    private proxyService: FrontendConfigService,
    private printService: PrintService,
    private toastr: ToastrTranslateService,
    private globals: Globals
  ) {
    this.variableGlobal = this.proxyService.getFrontendConfig();
  }

  protected async getFrontendConfigValueAsync(formName: string, defaultValue = []) {
    const config = await this.variableGlobal['getAsync'](formName);
    return config ? config?.value : defaultValue;
  }

  async ngOnInit() {
    this.phieuTruyenDich.ngay_thuc_hien_unix = Math.floor(Date.now() / 1000);
    this.listIDWayToUse = await this.getFrontendConfigValueAsync('way_to_use');
    const user_logged = localStorage.getItem('user_logged');
    if (this.patientInfo && this.patientInfo.patient_id) {
      this.getNgayYlenh();
    }
    if (user_logged) {
      let convertUser = JSON.parse(user_logged);
      this.phieuTruyenDich.DIEU_DUONG_THUC_HIEN = {
        ...this.phieuTruyenDich.DIEU_DUONG_THUC_HIEN,
        TEN: convertUser.full_name,
      };
      this.phieuTruyenDich.CHU_KY_DIEU_DUONG = convertUser.user_signature_image;
      this.phieuTruyenDich.user_signature = convertUser.user_signature;
    }
  }
  createChonThuoc(objCreate: any) {
    const temp = { ...objCreate };
    this.phieuTruyenDich.LIST = this.phieuTruyenDich.LIST || [];
    this.phieuTruyenDich.LIST.push(temp);
    this.listPharmaCreated.push(temp)
    this.newPharmaInfused = new inforPharma();
    this.handlePharmaCreated()

    this.totalTheTich = this.calculate();
    this.phieuTruyenDich.TONG_THE_TICH = this.totalTheTich;
  }
  removeChonThuoc(indexOfelement: number, objRemove: any) {
    this.phieuTruyenDich.LIST.splice(indexOfelement, 1);

    const index = this.listPharmaCreated.findIndex((pharma: any) => {
      return pharma.THUOC_TRUYEN.id === objRemove.THUOC_TRUYEN.id &&
        pharma.THUOC_TRUYEN.pharma_name === objRemove.THUOC_TRUYEN.pharma_name &&
        pharma.THE_TICH === objRemove.THE_TICH &&
        pharma.TOC_DO_TRUYEN === objRemove.TOC_DO_TRUYEN;
    });

    if(index !== -1){
      this.listPharmaCreated.splice(index, 1);
    }

    this.handlePharmaCreated()

    // this.totalTheTich = this.calculate();
    // this.phieuTruyenDich.TONG_THE_TICH = this.totalTheTich;
  }
  filterUser(query: any, isCBYT: number) {
    this.doctorService.getDoctors(query, 'query').subscribe(dataReturn => {
      if (dataReturn.status === true) {
        if (isCBYT === 1) {
          this.filteredUserCBYTs = this.doctorService.convertUserCBYT('user', dataReturn.results);
        } else {
          this.filteredUsers = this.doctorService.convertUserEMR('user', dataReturn.results);
        }
      }
    });
  }
  displayDMICD(value: any): string {
    return value && value.TEN ? value.TEN : '';
  }
  ngOnChanges() {
    if (this.patientInfo && this.patientInfo.patient_id) {
      this.getNgayYlenh();
    }
    if (this.isCreateGiayToLienQuan === true) {
      this.phieuTruyenDich = new phieuTruyenDich();
    }
    if (this.isCreateGiayToLienQuan !== true && this.selectGiayToLienQuan) {
      this.phieuTruyenDich = this.selectGiayToLienQuan;
      if(this.phieuTruyenDich.NGAY_Y_LENH){
        this.changeGetYLenh(this.phieuTruyenDich.NGAY_Y_LENH)
      }
    }
    if (this.isCreateGiayToLienQuan || !this.phieuTruyenDich) {
      this.phieuTruyenDich = new phieuTruyenDich();
      if (this.patientInfo) {
        this.convert();
      }
    }
    this.shareDataService.pushData(this.phieuTruyenDich, 'td_truyen_dich');
  }

  getPharma(pharaInfo: any) {
    if(pharaInfo){
      this.newPharmaInfused.THUOC_TRUYEN = pharaInfo.THUOC_TRUYEN;
      this.newPharmaInfused.TOC_DO_TRUYEN = pharaInfo.TOC_DO_TRUYEN;
      this.newPharmaInfused.THE_TICH = pharaInfo.THE_TICH;
    }

  }

  calculate() {
    var totalTheTich = 0;
    var TocDoTruyenMax = 0;
    var speed_unit_id = 0;
    if (this.phieuTruyenDich.LIST?.length > 0) {
      TocDoTruyenMax = this.phieuTruyenDich.LIST[0].TOC_DO_TRUYEN;
      this.phieuTruyenDich.SPEED_UNIT_NAME = this.phieuTruyenDich.LIST[0].THUOC_TRUYEN.speed_unit.name;
      this.phieuTruyenDich.LIST.forEach((pharma: any) => {
        TocDoTruyenMax < pharma.TOC_DO_TRUYEN ? (TocDoTruyenMax = pharma.TOC_DO_TRUYEN) : (TocDoTruyenMax = TocDoTruyenMax)
        if(pharma.THUOC_TRUYEN.speed_unit.id !== 0){
          speed_unit_id = pharma.THUOC_TRUYEN.speed_unit.id;
          this.phieuTruyenDich.SPEED_UNIT_NAME = pharma.THUOC_TRUYEN.speed_unit.name;
        }
      }
      );
    }
    this.phieuTruyenDich.LIST.forEach(x => (totalTheTich += x.THE_TICH));
    this.tocDO = TocDoTruyenMax;
    this.phieuTruyenDich.TOC_DO_TRUNG_BINH = TocDoTruyenMax;
    if (TocDoTruyenMax != 0) {
      if(speed_unit_id === 1){
        this.thoiGian = parseInt((totalTheTich * 20 / TocDoTruyenMax).toFixed()) ;

      }
      if(speed_unit_id === 2){
        this.thoiGian = parseInt((totalTheTich / TocDoTruyenMax * 60).toFixed()); //phút
      }

    } else {
      this.thoiGian = 0;
    }
    this.phieuTruyenDich.TONG_THOI_GIAN_TRUYEN = this.thoiGian;
    if(this.phieuTruyenDich.BAT_DAU_TRUYEN){
      this.tinhThoiGianKetThuc
    }
    return totalTheTich;
  }
  tinhThoiGianKetThuc(event: any) {
    this.tinhThoiGianTruyen(this.newPharmaInfused)
    this.newPharmaInfused.THOI_GIAN_KET_THUC= event + this.newPharmaInfused.THOI_GIAN_TRUYEN * 60;
  }

  tinhThoiGianKetThucTruyenTungThuoc(event: any, index: number){
    this.tinhThoiGianTruyen(this.phieuTruyenDich.LIST[index])
    this.phieuTruyenDich.LIST[index].THOI_GIAN_KET_THUC = event + this.phieuTruyenDich.LIST[index].THOI_GIAN_TRUYEN * 60
  }

  tinhThoiGianTruyen(pharma: inforPharma){
    if(pharma.THUOC_TRUYEN.speed_unit && pharma.THUOC_TRUYEN.speed_unit.id === 1){
      if(pharma.THE_TICH && pharma.TOC_DO_TRUYEN){
        pharma.THOI_GIAN_TRUYEN = parseInt((pharma.THE_TICH * 20 / pharma.TOC_DO_TRUYEN).toFixed()) ;
      }
    }
    if(pharma.THUOC_TRUYEN.speed_unit && pharma.THUOC_TRUYEN.speed_unit.id === 2){
      if(pharma.THE_TICH && pharma.TOC_DO_TRUYEN){
        pharma.THOI_GIAN_TRUYEN = parseInt((pharma.THE_TICH / pharma.TOC_DO_TRUYEN * 60).toFixed()) ;
      }
    }
  }

  //todo: lấy danh sách y lệnh
  getNgayYlenh() {
    const way_to_use_ids = this.listIDWayToUse.map((item: any) => item.id);
    if (way_to_use_ids.length !== 0) {
      this.serviceService
        .getYLenh({
          patient_id: this.patientInfo.patient_id,
          reception_queue_id: this.patientInfo.reception_queue_id,
          way_to_use_ids: way_to_use_ids,
          n: 100,
          p: 0,
        })
        .subscribe((dataReturn: any) => {
          if (dataReturn.status == true) {
            const results = dataReturn.results;
            results.forEach((obj: any) => {
              // Lấy giá trị của trường _id
              let datetime = obj._id;
              // Thêm trường datetime vào
              obj.datetime = moment.unix(datetime).format('HH:mm:ss DD/MM/YYYY');
            });
            this.listYLenh = results.sort((a: any, b: any) => b._id - a._id);
          }
        });
    }
  }

  //todo: chọn y lênh
  changeGetYLenh(event: any) {
    if (event) {
      this.toastr.clear();
      if (this.isCreateGiayToLienQuan == true) {
        this.phieuTruyenDich.LIST = [];
      }
      this.selectedYLenh = [];
      this.listPharmaCreated = [];
      this.newPharmaInfused = new inforPharma();
      //Kiểm tra y lệnh này đã tạo phiếu truyền dịch chưa
      this.listLoaiGiayToSave.forEach((item: any) => {
        if(item.NGAY_Y_LENH && item.NGAY_Y_LENH._id == event._id){
          this.selectedYLenh.push(item)
          if (this.isCreateGiayToLienQuan == true) {
            this.toastr.warning("Y lệnh này đã được tạo phiếu truyền dịch", "Cảnh báo!");
          }
        }
      })
      this.selectedYLenh.forEach((item: any) => {
        if (item && item.LIST) {
          const matchingPharmas = item.LIST.filter((pharmaPtd: any) => {
            return event.pharmas.filter((pharmaYLenh: any) => {
                if(pharmaPtd.THUOC_TRUYEN.pharma_id !== 0){
                  return pharmaPtd.THUOC_TRUYEN.pharma_id === pharmaYLenh.pharma_id;
                }else {
                  return (
                    pharmaPtd.THUOC_TRUYEN.pharma_name === pharmaYLenh.pharma_name &&
                    pharmaPtd.THUOC_TRUYEN.quantity_compounding === pharmaYLenh.quantity_compounding &&
                    pharmaPtd.THUOC_TRUYEN.speed === pharmaYLenh.speed
                  );
                }
              }
            );
          });
          if (matchingPharmas && !this.listPharmaCreated.some((existingPharma: any) => this.areObjectsEqual(existingPharma, matchingPharmas))) {
            this.listPharmaCreated.push(...matchingPharmas);
          }
        }
      });

      this.phieuTruyenDich.BAC_SI_DIEU_TRI = {
        ...this.phieuTruyenDich.DIEU_DUONG_THUC_HIEN,
        TEN: event.examining_by_fullname,
      };
      this.phieuTruyenDich.CHAN_DOAN = event.examining_diagnosis;
      // this.phieuTruyenDich.LIST = [];
      this.listPharma = [];
      event.pharmas.forEach((pharma: any) => {
        const temp = {
          disabled: false,
          THUOC_TRUYEN: pharma,
          THE_TICH: parseInt(pharma.quantity_compounding),
          SO_LUONG: pharma.pharma_id !== 0 ? pharma.quantity_compounding : 1,
          TOC_DO_TRUYEN:  pharma.speed,
          LABEL: (pharma.pharma_code ? (pharma.pharma_code + ", ") : "") + pharma.pharma_name + ( pharma.pharma_dosage ? (", " + pharma.pharma_dosage) : ""),
        };

        this.listPharma.push(temp);
      });

      this.handlePharmaCreated()
    }
  }

  areObjectsEqual(obj1: any, obj2: any) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  handlePharmaCreated(){
    this.listPharma = this.listPharma.map((pharma: any) => {
      let TongTheTich = 0
      let TongTheTich2 = 0

      // TH thuốc ko pha chế
      if (
        pharma.THUOC_TRUYEN.pharma_id !== 0 &&
        this.listPharmaCreated.some(
          (pharmaCreated: any) =>
            pharma.THUOC_TRUYEN.pharma_id === pharmaCreated.THUOC_TRUYEN.pharma_id &&
            pharma.THE_TICH ===
              pharmaCreated.THE_TICH
        )
      ) {
        return {
          ...pharma,
          disabled: true,
        };
      }

      // TH thuốc pha chế trùng tên
      if(pharma.THUOC_TRUYEN.pharma_id == 0 &&
        this.listPharmaCreated.some(
          (pharmaCreated: any) =>
            pharma.THUOC_TRUYEN.pharma_name === pharmaCreated.THUOC_TRUYEN.pharma_name &&
            pharma.THUOC_TRUYEN.quantity_compounding ===
            pharmaCreated.THUOC_TRUYEN.quantity_compounding &&
            pharma.TOC_DO_TRUYEN === pharmaCreated.TOC_DO_TRUYEN &&
            (TongTheTich = this.tinhTongTheTich(
              this.listPharmaCreated,
              pharmaCreated.THUOC_TRUYEN.pharma_name
            )) >= ( TongTheTich2 = this.tinhTongTheTich(
              this.listPharma,
              pharma.THUOC_TRUYEN.pharma_name
            ))
        )){
        return {
          ...pharma,
          disabled: true,
        };
      }

      return {
        ...pharma,
        disabled: false,
      };
    });
  }

  // todo: tính tổng thể tích của 1 thuốc đã tạo
  tinhTongTheTich(listPharma: any, pharmaName: string) {
    let tongTheTich = 0
    listPharma.forEach((pharma: any) => {
      if(pharma.THUOC_TRUYEN.pharma_name == pharmaName){
        if(typeof pharma.THE_TICH === 'string'){
          tongTheTich += parseInt(pharma.THE_TICH);
        }else if(typeof pharma.THE_TICH === 'number'){
          tongTheTich += pharma.THE_TICH;
        }
      }
    })
    return tongTheTich;
  }

  handleChangeTheTich(event: any, create: number, index?: number) {
    const inputValue = parseInt(event.target.value)
    if(create === 1) {
      //Trường hợp chưa thêm thuốc vào danh sách
      if(inputValue > this.newPharmaInfused.THE_TICH_CON_LAI){
        this.newPharmaInfused.THE_TICH = this.newPharmaInfused.THE_TICH_CON_LAI
      }

    }else {
      //Trường hợp đã thêm thuốc vào danh sách
      if(index !== undefined && inputValue > this.phieuTruyenDich.LIST[index].THE_TICH_CON_LAI){
        this.phieuTruyenDich.LIST[index].THE_TICH = this.phieuTruyenDich.LIST[index].THE_TICH_CON_LAI
      }
    }
  }

  //Xem phiếu điều trị theo giờ
  printPhieuDieuTri() {
    const printModel = {
      results: {
        birthday_string: this.patientInfo.DO_TUOI.toString() + ' Tuổi',
        domain: this.globals.API_DOMAIN,
        format: 'pdf',
        //id của y lệnh đó
        list_examination_prescription_code: `{$match:{ 'results.examination_prescription_code': {$in: [${this.phieuTruyenDich.NGAY_Y_LENH.examination_prescription_code}]}}},`,
        //truyền id của ngày y lệnh
        list_id: `{\"$oid\":\"${this.phieuTruyenDich.NGAY_Y_LENH.examination_id }\"}`,
        parent_id: this.phieuTruyenDich.NGAY_Y_LENH.parent_id,
        reception_queue_id: this.patientInfo.reception_queue_id,
        report_router: '/reports/' + this.globals.prefix_report + '/NoiTru/Print/PhieuDieuTri',
        supply_id: 1,
      },
    };
    this.printService.printReport(printModel)
  }
  convert(){
    this.phieuTruyenDich.CHAN_DOAN = this.patientInfo.examining_diagnosis;
  }
}
