import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DoctorService } from '../../../../services/doctor.service';
import { CanBoYTe, KhoaDieuTri } from '../../../../model/emr/quan_ly_nguoi_benh';
import { Name } from '../../../../model/emr/global';
import { ReceptionService } from '../../../../services/reception.service';
import { ExaminationService } from '../../../../services/examination.service';
import { DM } from '../../../../model/Patient_EMR';
import { CategoryGenaralService } from '../../../../services/category-genaral.service';
import { Pharma } from '../../../../model/medicament/pharma';
import { Observable, Subject } from 'rxjs';
import { pp_vo_cam } from '../../cac_loai_phieu_trong_benh_an/phieu-duyet-mo/phieu-duyet-mo.component';
import { ServiceService } from '../../../../services/service.service';
import { IBranch } from '../../../../model/branch';
import { LocalStorageService } from '@shared';
import { TranslateService } from '@ngx-translate/core';
import { ContractService } from '../../../../services/contract/contract.service';
import { PackageTypeService } from '../../../../services/package/package-type.service';
import PackageService from '../../../../services/package/package.service';
import { Package } from '../../../quan-ly-tiem-chung/quan_ly_goi_tiem_chung';
import { GetServiceUsedResponseResults } from '../../../../model/service/response';
import { EmrService } from '../../../../services/emr.service';
import { SearchMenuPipe } from '../../../../pipes/search-menu/search-menu.pipe';
import { Globals } from '../../../../app.globals';

/**
 * @type CanBoYTe cbyt
 * @type Name user
 * @type KhoaDieuTri kdt
 * @type DM icd
 * @type Pharma pharma
 * @type PharmaWayToUse way_to_use
 * @type InpatientFile in_patient_file
 * @type BloodType blood_type
 * @type BloodType rhesus_factor
 * @type PPTTTE pttt
 * @type MedicalFacility medical_facility
 * @type PharmaApothecary pharma_apothecary
 * @type Manufacturer manufacturer
 * @type phieu_pttt phieu_pttt
 */
export type SelectModel = any;

export type SelectCategory = '' | 'cbyt' | 'user' | 'kdt' | 'icd' | 'pp_vo_cam' | 'pharma'
  | 'way_to_use' | 'dichVu' | 'in_patient_file' | 'blood_type' | 'rhesus_factor' | 'pttt'
  | 'medical_facility' | 'pharma_apothecary' | 'manufacturer' | 'ingredient' | 'aware' | 'inventory'
  | 'pharma_treatment1_category' | 'pharma_treatment2_category' | 'pharma_treatment3_category'
  | 'pharma-inventory-category'
  | 'pharma-report-category'| 'pharma-category'
  | 'unit'| 'nutrition-category'
  | 'khoa'| 'hospital'
  | 'service'
  | 'package_service'|'kham_tien_me'
  | 'pharma-management-category'| 'vaccine'|'supply'
  | 'warehouse' | 'contract' | 'map-service' | 'package'| 'room'
  | 'service_price' | 'phieu_pttt' | 'ex_document' | 'kid_question'
  | 'service_category'
  | 'contact-status' | 'title';

/**
 * Hướng dẫn thêm danh mục tìm kiếm:
 * 1. Thêm vào SelectModel, SelectCategory
 * 2. Thêm vào getList / Truyền vào hàm getList riêng
 * 3. Dùng bindLabel hoặc (ng-option-tmp và ng-label-tmp)
 */
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit, OnDestroy {
  //#region Core
  private destroy$ = new Subject<void>();
  //#endregion

  //#region Inputs
  @Input() label = '';

  @Input() model!: SelectModel;
  @Output() modelChange = new EventEmitter<SelectModel>();

  @Input() category: SelectCategory = '';

  @Input() resetTo: SelectModel = undefined;

  @Input() listItems!: SelectModel[];

  @Input() getList?: (query: string) => Observable<SelectModel[]>;

  /**
   * Là tên một trường của object để hiển thị ra.
   */
  @Input() bindLabel = '';

  @Input() disabled = false;
  @Input() multiple = false;
  @Input() reSearch = false;

  @Input() isLoading = false;

  @Input() useBuiltInSearch = false;
  readonly DISABLE_BUILT_IN_SEARCH = () => true;
  private readonly searchPipe = new SearchMenuPipe();

  @Input() useAPI = true;

  @Input() isClearable = true;

  //todo: get branch
  private branhSelect: IBranch;

  @Input() params: Record<string, any> = {};

  /**
   * Nếu value trong params là hàm thì nó sẽ truyền thuộc tính này
   */
  @Input() paramsGetterArg: any;
  //#endregion

  constructor(private doctorService: DoctorService,
              private receptionService: ReceptionService,
              private examinationService: ExaminationService,
              private serviceService: ServiceService,
              private storage: LocalStorageService,
              private translate:TranslateService,
              private categoryService: CategoryGenaralService,
              private contractService: ContractService,
              private packageType: PackageTypeService,
              private packageService: PackageService,
              private emrService: EmrService,
              private globals: Globals,
  ) {
    this.branhSelect = this.storage.get('chi_nhanh');
  }

  chiNhanh: any = {}
  private getItemInLocal(key:string){
    let item = localStorage.getItem(key);
    if (item) return JSON.parse(item);
    return null;
  }

  ngOnInit() {
    this.chiNhanh = this.getItemInLocal('cache_chinhanh');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Nếu value trong params là hàm thì lấy dữ liệu từ hàm đó
   */
  private extractParams(): Record<string, any> {
    const params = Object.assign({}, this.params);
    Object.entries(params).forEach(([key, value]) => {
      if (typeof value === 'function') {
        params[key] = value(this.paramsGetterArg);
      }
      if (params[key] === undefined) {
        delete params[key];
      }
    });
    return params;
  }

  private _getListDebounce?: NodeJS.Timeout;

  private _getList_BuiltIn(query: string, arraySearch: any = {}) {
    this.isLoading = true;
    switch (this.category) {
      case 'cbyt': {
        this.doctorService.getDoctors(query, 'query').subscribe(dataReturn => {
          if (dataReturn.status === true) {
            this.listItems = this.doctorService.convertUserCBYT('user', dataReturn.results)
              .map((user: any) => {
                delete user.title_id; // Lỗi conflict type ở phiếu in (phiếu in là Long, trên db là String rỗng)
                return user;
              });
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        });
        break;
      }
      case 'user': {
        this.doctorService.getDoctors(query, 'query').subscribe(dataReturn => {
          if (dataReturn.status === true) {
            this.listItems = this.doctorService.convertUserEMR('user', dataReturn.results);
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        });
        break;
      }
      case 'kdt': {
        const objParam = {
          active: 1,
          query,
          // room_type_id: 568 // TODO: room_type_id: 568: Khoa
        };
        this.receptionService.filterRoom(objParam).subscribe(dataReturn => {
          if (dataReturn.status === true) {
            this.listItems = this.receptionService.convertKDT(dataReturn.results);
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        });
        break;
      }
      case 'icd': {
        this.examinationService.filterICD(query).subscribe(dataReturn => {
          if (dataReturn.status === true) {
            this.listItems = this.receptionService.convertDM('service', dataReturn.results);
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        });
        break;
      }
      case 'pharma': {
        this.categoryService.getPharma(query).subscribe(dataReturn => {
          if (dataReturn.status === true) {
            this.listItems = dataReturn.results;
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        });
        break;
      }
      case 'way_to_use': {
        this.categoryService.getCategoryGenaral({
          query,
          active: true,
        }, 0, 10, 'way-to-use').subscribe(dataReturn => {
          if (dataReturn.status === true) {
            this.listItems = dataReturn.results;
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        });
        break;
      }
      case 'pp_vo_cam': {
        this.categoryService.getCategoryGenaral({
          textSearch: query,
          active: true,
        }, 0, 10, 'anesthetic-method').subscribe(dataReturn => {
          if (dataReturn.status === true) {
            this.listItems = dataReturn.results;
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        });
        break;
      }
      case 'in_patient_file': {
        this.receptionService.filterCategorySystem(query, 'in-patient-file').subscribe(dataReturn => {
          if (dataReturn.status === true) {
            this.listItems = dataReturn.results;
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        });
        break;
      }
      case 'blood_type': {
        this.listItems = [
          { id: 0, name: 'Không xác định' },
          { id: 1, name: 'A' },
          { id: 2, name: 'B' },
          { id: 3, name: 'AB' },
          { id: 4, name: 'O' },
        ];
        this.isLoading = false;
        break;
      }
      case 'dichVu': {
        this.listItems = [
          { id: 0, name: 'Dịch vụ 1' },
          { id: 1, name: 'Dịch vụ 2' },
          { id: 2, name: 'Dịch vụ 3' },
          { id: 3, name: 'Dịch vụ 4' },
          { id: 4, name: 'Dịch vụ 5' },
        ];
        this.isLoading = false;
        break;
      }
      case 'rhesus_factor': {
        this.listItems = [
          { id: 0, name: 'Không xác định' },
          { id: 1, name: 'Dương tính' },
          { id: 2, name: 'Âm tính' },
        ];
        this.isLoading = false;
        break;
      }
      case 'medical_facility': {
        this.categoryService.getCategoryGenaral({
          query,
        }, 0, 10, 'medical-facility').subscribe(dataReturn => {
          if (dataReturn.status === true) {
            this.listItems = dataReturn.results;
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        });
        break;
      }
      case 'pharma_apothecary': {
        this.categoryService.getCategoryGenaral({
          query,
        }, 0, 10, 'pharma-apothecary').subscribe(dataReturn => {
          if (dataReturn.status === true) {
            this.listItems = dataReturn.results;
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        });
        break;
      }
      case 'ingredient': {
        this.categoryService.getCategoryGenaral({
          query, ...this.params,
        }, 0, 10, 'ingredient').subscribe(dataReturn => {
          if (dataReturn.status === true) {
            this.listItems = dataReturn.results;
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        });
        break;
      }
      case 'pharma_treatment1_category': {
        this.categoryService.getCategoryGenaral({
          query,
        }, 0, 10, 'pharma-treatment1-category').subscribe(dataReturn => {
          if (dataReturn.status === true) {
            this.listItems = dataReturn.results;
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        });
        break;
      }
      case 'pharma_treatment2_category': {
        this.categoryService.getCategoryGenaral({
          query, ...this.extractParams(),
        }, 0, 10, 'pharma-treatment2-category').subscribe(dataReturn => {
          if (dataReturn.status === true) {
            this.listItems = dataReturn.results;
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        });
        break;
      }
      case 'pharma_treatment3_category': {
        this.categoryService.getCategoryGenaral({
          query, ...this.extractParams(),
        }, 0, 10, 'pharma-treatment3-category').subscribe(dataReturn => {
          if (dataReturn.status === true) {
            this.listItems = dataReturn.results;
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        });
        break;
      }
      case 'pharma-management-category': {
        this.categoryService.getCategoryGenaral({
          query,
        }, 0, 10, 'pharma-management-category').subscribe(dataReturn => {
          if (dataReturn.status === true) {
            this.listItems = dataReturn.results;
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        });
        break;
      }
      case 'manufacturer': {
        this.categoryService.getCategoryGenaral({
          query,
        }, 0, 10, 'manufacturer').subscribe(dataReturn => {
          if (dataReturn.status === true) {
            this.listItems = dataReturn.results;
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        });
        break;
      }
      case 'aware': {
        this.categoryService.getCategoryGenaral({
          query,
        }, 0, 10, 'aware').subscribe(dataReturn => {
          if (dataReturn.status === true) {
            this.listItems = dataReturn.results;
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        });
        break;
      }
      case 'inventory': {
        this.categoryService.getCategoryGenaral({
          query,
        }, 0, 10, 'pharma-category').subscribe(dataReturn => {
          if (dataReturn.status === true) {
            this.listItems = dataReturn.results;
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        });
        break;
      }
      case 'pharma-inventory-category': {
        this.categoryService.getCategoryGenaral({
          query,
        }, 0, 10, 'pharma-inventory-category').subscribe(dataReturn => {
          if (dataReturn.status === true) {
            this.listItems = dataReturn.results;
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        });
        break;
      }
      case 'pharma-report-category': {
        this.categoryService.getCategoryGenaral({
          query,
        }, 0, 10, 'pharma-report-category').subscribe(dataReturn => {
          if (dataReturn.status === true) {
            this.listItems = dataReturn.results;
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        });
        break;
      }
      case 'unit': {
        this.categoryService.getCategoryGenaral({
          query,
        }, 0, 10, 'unit').subscribe(dataReturn => {
          if (dataReturn.status === true) {
            this.listItems = dataReturn.results;
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        });
        break;
      }
      case 'nutrition-category': {
        this.categoryService.getCategoryGenaral({
          query,
        }, 0, 10, 'nutrition-category').subscribe(dataReturn => {
          if (dataReturn.status === true) {
            this.listItems = dataReturn.results;
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        });
        break;
      }
      case 'khoa': {
        const objParam = {
          active: 1,
          query,
          room_type_id: 568
        };
        this.receptionService.filterRoom(objParam).subscribe(dataReturn => {
          if (dataReturn.status === true) {
            this.listItems = this.receptionService.convertKDT(dataReturn.results);
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        });
        break;
      }
      case 'hospital': {
        this.receptionService.filterHospital('').subscribe(dataReturn => {
          if (dataReturn.status === true) {
            this.listItems = this.receptionService.convertDM('hospital', dataReturn.results);
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        });
        break;
      }
      case 'service': {
        const arrQuery = {
          query,
          active: 1,
          service_type: 1,
          n: 30,
          ...this.params,
        };
        this.serviceService.getTreeServiceCategoriesLevel1(arrQuery, 1).subscribe(
          {
            next: (dataReturn:any) => {
              if (dataReturn.status){
                this.listItems = dataReturn.results;
              } else {
                this.listItems = [];
              }
              this.isLoading = false;
            }
          }
        );
        break;
      }
      case 'package_service': {
        const param = [
          {type: 'branch_id', value: 1572},
          {type: 'st', value: ''},
          {type: 'n', value: 30},
          {type: 'active', value: 2},
          {type: 'query', value: query},
          ...(this.params.ni_scpi ? [{type:'ni_scpi', value: this.params.ni_scpi}] : [])
        ];
        this.serviceService.getServiceIndex(param).subscribe(dataReturn => {
          if (dataReturn.status === true) {
            this.listItems = dataReturn.results;
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        });
        break;
      }
      case 'kham_tien_me': {
        const param = [
          {type: 'branch_id', value: this.chiNhanh.branch_id},
          {type: 'st', value: 'multi_match'},
          {type: 'n', value: 10},
          {type: 'query', value: query},
          ...(this.params.ni_scpi ? [{type:'ni_scpi', value: this.params.ni_scpi}] : [])
        ];
        this.serviceService.getServiceIndex(param).subscribe(dataReturn => {
          if (dataReturn.status === true) {
            this.listItems = dataReturn.results;
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        });
        break;
      }
      case 'vaccine': {
        this.categoryService.getCategoryGenaral({
          query,
          active: true,
        }, 0, 10, 'vaccine').subscribe(dataReturn => {
          if (dataReturn.status === true) {
            this.listItems = dataReturn.results;
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        });
        break;
      }
      case 'contract': {
        this.contractService.getContractData(0, 10).subscribe((dataReturn:any) => {
          if (dataReturn.status) {
            this.listItems = dataReturn.results;
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        });
        break;
      }
      case 'map-service': {
        this.packageType.getPackageServiceMappings('', query).subscribe((dataReturn:any) => {
          if (dataReturn.status) {
            this.listItems = dataReturn.results;
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        });
        break;
      }
      case 'package': {
        this.packageService.getPackageData('', query, this.params.cti).subscribe((dataReturn:any) => {
          if (dataReturn.status) {
            this.listItems = dataReturn.results;
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        })
        break;
      }
      case 'service_price': {
        this.serviceService.getServiceIndex([
          {type: 'query', value: query},
          ...Object.entries(this.params).map(([type, value]) => ({type, value}))
        ]).subscribe((dataReturn:any) => {
          if (dataReturn.status) {
            this.listItems = dataReturn.results;
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        })
        break;
      }
      case 'ex_document': {
        this.emrService.getExDocument(this.params.form_id ? this.params.form_id: 5083,
          this.params.patient_id ? this.params.patient_id: 0,
          this.params.reception_queue_id ? this.params.reception_queue_id: "").subscribe((res:any) => {
          if (res.status && res.results[0]){
            this.listItems = [...res.results[0].results.result.blood_pressure];
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        })
        break;
      }
      // case 'kid_question': {
      //   this.emrService.getListKidQuestion(this.params.type ? this.params.type: 1,
      //     this.params.patient_id ? this.params.patient_id: 0,
      //     this.params.form_id ? this.params.form_id: "").subscribe((res:any) => {
      //       if (res.status && res.results[0]){
      //         this.listItems = [...res.results[0].results];
      //       } else {
      //         this.listItems = [];
      //       }
      //     this.isLoading = false;
      //   })
      //   break;
      // }
      case 'phieu_pttt': {
        this.serviceService.getServiceUsed<GetServiceUsedResponseResults<
          '_id', 'service_category_parent_id', 'service_category_id'>>(
          this.params.patient_id?this.params.patient_id:0,
          this.params.reception_queue_id?this.params.reception_queue_id:'',
          this.params.in_patient?this.params.in_patient:0,
          [
            {service_category_id: {$in: [7, 8]}},
            {service_category_parent_id: {$in: [7, 8]}},
          ],
          {key_level_1: '_id'},
          undefined,
          this.params.medical_record_no,
          {
            service_category_id: '$service_category_id',
            results: '$results'
          }
        ).subscribe((res)=>{
          if (!res.status) {
            this.isLoading = false;
            return;
          }
          let listPttt:any = []
          res.results.forEach((cap1) => {
            cap1.data.forEach((cap2) => {
              cap2.exams.forEach( (cap3:any) => {
                cap3.services.forEach((cap4:any) => {
                  listPttt.push(cap4.services.results)
                })
              })
            })
          })
          this.listItems = listPttt.reduce((acc:any, val:any) => acc.concat(val), []);
          this.isLoading = false;
        })
        break;
      }
      case 'service_category': {
        this.serviceService.getTreeServiceCategories(
          {
            service_category_parent: 0
          }, 0).subscribe((dataReturn: any) => {
          if (dataReturn.status) {
            this.listItems = dataReturn.results;
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        });
        break;
      }
      case 'title': {
        this.packageService.getTitle(10, 'title',
          true, 17,query).subscribe(dataReturn => {
          if (dataReturn.status === true) {
            this.listItems = dataReturn.results;
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        });
        break;
      }
      default: {
        let arrSeach: any = {
          active: true
        }
        if (Object.keys(arraySearch).length > 0) {
          Object.keys(arraySearch).forEach(key => {
            if (key !== undefined && arraySearch[key] !== undefined && key == 'warehouse_id') {
              if(arraySearch[key] !== null){
                arrSeach.query = arraySearch[key]
              }
            }
          })
        }else {
          arrSeach.query = query;
        }
        this.categoryService.getCategoryGenaral(arrSeach, 0, 10, this.category).subscribe(dataReturn => {
          if (dataReturn.status === true) {
            this.listItems = dataReturn.results;
            if(this.listItems.length ==1){
              this.handleChange(this.listItems[0]);
            }
            this.reSearch = false;
          } else {
            this.listItems = [];
          }
          this.isLoading = false;
        });
      }
    }
  }

  _getList = (query: string, arraySearch: any = {}) => {
    const searchFunction = this.getList || (this.useAPI ? this._getList_BuiltIn : () => {});

    if (this._getListDebounce) {
      clearTimeout(this._getListDebounce);
    }
    this._getListDebounce = setTimeout(() => {
      searchFunction.bind(this)(query, arraySearch);
    }, this.globals.DEBOUNCE_TIME);
  };

  _searchLocalList = (term: string, item: any): boolean => {
    if (this.bindLabel) {
      return this.searchPipe.search(term, item, this.bindLabel);
    }
    // TODO: Nếu không tìm kiếm được theo bindLabel?
    return true;
  }

  reset() {
    let reset: SelectModel;
    if (this.resetTo !== undefined) {
      reset = this.resetTo;
    } else {
      switch (this.category) {
        case 'cbyt': {
          reset = new CanBoYTe();
          break;
        }
        case 'user': {
          reset = new Name();
          break;
        }
        case 'kdt': {
          reset = new KhoaDieuTri();
          break;
        }
        case 'icd': {
          reset = new DM();
          break;
        }
        case 'pp_vo_cam': {
          reset = new pp_vo_cam();
          break;
        }
        case 'package_service': {
          reset = new Package();
          break;
        }
        default:
          reset = {};
          break;
      }
    }
    this.modelChange.emit(reset);
  }

  handleChange(data: SelectModel) {
    if (!data) {
      this.reset();
      return;
    }
    this.modelChange.emit(data);
  }
  ngOnChanges(){
    if(this.reSearch && this.model){
      this._getList("", this.model)
    }
  }
}
