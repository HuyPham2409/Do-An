import { Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";

import moment from "moment";
import {CategoryGenaralService} from "../../../../services/category-genaral.service";
import {DoctorService} from "../../../../services/doctor.service";
import {Branch} from "../../../../model/branch";
import {LocalStorageService} from "@shared";
import {ServiceService} from "../../../../services/service.service";
import {ToastrTranslateService} from "@shared/services/toastr-translate-service";
import { ShareDataService } from '../../../../services/share-data.service';
import { LabratoryMenuService } from '../../../../services/laboratory/labratory-menu.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Globals } from '../../../../app.globals';
import { EmrService } from '../../../../services/emr.service';
import { LaboratoryService } from '../../../laboratory/laboratory.service';
import { Pharma } from '../../../../model/medicament/pharma';
import { Subscription } from 'rxjs';

interface PharmaTest {
  document_consignment_code: string;
  pharma: Pharma;
}

@Component({
  selector: 'app-thu-phan-ung-thuoc',
  templateUrl: './thu-phan-ung-thuoc.html',
  styleUrls: ['./thu-phan-ung-thuoc.component.scss']
})
export class ThuPhanUngThuocComponent implements OnInit, OnDestroy {
  @Input() patientInfo: any;
  @Input() selectGiayToLienQuan: any;
  @Input() isCreateGiayToLienQuan: any;

  @Input() idGiayTo = 5072;

  displayedColumns: any;
  dataList:any = [];
  // pharmaTestForm: FormGroup;
  newTestControl = {
    end_date: null,
    start_date: null,
    so_lo: null,
    doctor: null,
    nguoithu: null,
    pharma: null,
    phuongphap: null,
    result: null,
    chan_doan: null,
  };
  pharmaTestList: any[] = [];
  pharmaTestPatientInfo:any;
  branchSelect: Branch = new Branch();

  printSelect = new SelectionModel(true, []);

  listResult = [
    'Âm tính',
    'Dương tính'
  ];

  readonly indexesToPrint: number[] = [];

  private readonly subscriptions = new Subscription();

  constructor(private localStorageService: LocalStorageService,
              private serviceService: ServiceService,
              private shareDataService: ShareDataService,
              private toastr: ToastrTranslateService,
              private menu: LabratoryMenuService,
              private globals: Globals,
              private storage: LocalStorageService,
              private emrService: EmrService,
              private laboratoryService: LaboratoryService,
              private toastrTranslateService: ToastrTranslateService) { }

  ngOnInit(): void {
    this.branchSelect = this.localStorageService.get("chi_nhanh");
    this.subscriptions.add(this.menu.onSave().subscribe(this.save));
    this.subscriptions.add(this.menu.onPrint().subscribe(this.print));
  }

  ngOnChanges() {
    if (!this.isCreateGiayToLienQuan && this.patientInfo.patient_id && this.patientInfo.patient_id !== undefined) {
      this.getPharmaTests();
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  addPharmaTest() {
    this.pharmaTestList.push(this.newTestControl);
    this.newTestControl = {
      end_date: null,
      start_date: null,
      so_lo: null,
      doctor: null,
      nguoithu: null,
      pharma: null,
      phuongphap: null,
      result: null,
      chan_doan: null,
    };
  }

  getPharmaTests() {
    this.serviceService.getPharmaTest(this.patientInfo.patient_id).subscribe(dataReturn => {
        if (dataReturn.status === true && dataReturn.results[0]) {
          this.pharmaTestList = (dataReturn.results[0].pharmas_reflect_test) ? dataReturn.results[0].pharmas_reflect_test : [];
          this.pharmaTestPatientInfo = {
            address1: dataReturn.results[0].address1,
            birthday: dataReturn.results[0].birthday,
            patient_id: dataReturn.results[0].patient_id,
            patient_fullname: dataReturn.results[0].patient_fullname
          }
          if (this.pharmaTestList.length === 0) {
            this.menu.viewAsWaiting();
          } else {
            this.menu.viewAsProcessed();
          }

          this.pharmaTestList.forEach((item:any) => {
            item.start_date = moment.unix(item.date_start);
            item.end_date = moment.unix(item.date_end);
            item.so_lo = item.document_consignment_code ? item.document_consignment_code : item.so_lo ;
            item.chan_doan = item.pharma_diagnosis;
          })
        } else {
          this.pharmaTestList = [];
          this.menu.viewAsWaiting();
        }
    });
  }

  deletePharmaTest(index: any) {
    this.pharmaTestList.splice(index,1)
  }

  save = () => {
    let data = {
      "results": {
        "address1": this.pharmaTestPatientInfo && this.pharmaTestPatientInfo.address1 ? this.pharmaTestPatientInfo.address1 : (this.patientInfo.results?.hc.address1 || this.patientInfo.address1),
        "birthday": this.pharmaTestPatientInfo && this.pharmaTestPatientInfo.birthday ? this.pharmaTestPatientInfo.birthday : (this.patientInfo.results?.patientInfoHis.birthday || this.patientInfo.birthday),
        "patient_fullname": this.pharmaTestPatientInfo && this.pharmaTestPatientInfo.patient_fullname ? this.pharmaTestPatientInfo.patient_fullname : (this.patientInfo.results?.patientInfoHis.patient_fullname || this.patientInfo.HO_TEN),
        "patient_id": this.patientInfo.patient_id,
        "sex": this.pharmaTestPatientInfo && this.pharmaTestPatientInfo.sex ? this.pharmaTestPatientInfo.sex : (this.patientInfo.results?.patientInfoHis.sex || this.patientInfo.sex),
        "pharmas_reflect_test": [],
      }
    }

    let pharmaList:any = [];
    this.pharmaTestList.forEach((item:any) => {
      item.date_start = moment(item.start_date).unix();
      item.date_end = moment(item.end_date).unix();
      // item.chan_doan = item.pharma_diagnosis;
      item.pharma_diagnosis = item.chan_doan;
      item.document_consignment_code = item.so_lo;
      pharmaList.push(item);
    })

    data.results.pharmas_reflect_test = pharmaList;
    this.serviceService.savePharmaTest(data).subscribe(dataReturn => {
      if(dataReturn.status == true){
        this.shareDataService.pushData(data, "phieu_cls");
        this.toastr.success('home.successfully_changed_information', 'home.success');
        this.menu.signalBackOrSave();
      }else{
        this.toastr.error(dataReturn.error.message, 'home.error');
      }
      this.getPharmaTests();
    });
  }

  print = () => {
    if (this.indexesToPrint.length === 0) {
      this.toastrTranslateService.error(
        'toast.error_no_print_selected.pharma_test',
        'toast.error_generic'
      );
      return;
    }

    const printModel: any = {
      branch_id: this.storage.getBranch().branch_id,
      domain: this.globals.API_DOMAIN,
      patient_id: this.patientInfo.patient_id,
      permission: "get_examination_data",
      print_account: this.localStorageService.getUserLogged().full_name
    }
    const document_consignment_codes: string[] = [];
    const pharma_ids: number[] = [];
    this.pharmaTestList.forEach((pharmaTest: PharmaTest, index) => {
      if (this.indexesToPrint[index]) {
        document_consignment_codes.push(pharmaTest.document_consignment_code);
        pharma_ids.push(pharmaTest.pharma.pharma_id);
      }
    })
    if (document_consignment_codes.length > 0) {
      printModel.document_consignment_code =
        `{$match:{'pharmas_reflect_test.document_consignment_code': {$in:${JSON.stringify(document_consignment_codes)}}}},`;
    }
    if (pharma_ids.length > 0) {
      printModel.pharma_id =
        `{$match:{'pharmas_reflect_test.pharma.pharma_id': {$in:${JSON.stringify(pharma_ids)}}}},`;
    }
    this.emrService.getRouterPrint(this.idGiayTo, 0).then((data: any) => {
      printModel.report_router = data;
      this.laboratoryService.printRouter(data, printModel,false)
    })
  }
}
