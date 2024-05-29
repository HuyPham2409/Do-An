import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ExaminationService } from '../../../../services/examination.service';
import { ReceptionService } from '../../../../services/reception.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { CategoryGenaralService } from '../../../../services/category-genaral.service';
import { DoctorService } from '../../../../services/doctor.service';
import { PackageTypeService } from '../../../../services/package/package-type.service';
import { PharmaService } from '../../../../services/medicament/pharma.service';

export type MultiSelectModel = any;

export type MultiSelectCategory = '' | 'icd' | 'icds'  | 'mota' | 'way_to_use' | 'ATC' | 'bs' | 'kdt' | 'pharma' | 'vaccine'
  | 'vaccine_mapped_pharma';

/**
 * @author tuongpm
 */
@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit {
  @Input() label = '';
  /**
   * Các mục đã chọn
   */
  @Input() items: MultiSelectModel[] = [];
  @Input() bindLabel = '';
  @Input() category: MultiSelectCategory = 'icd';
  @Input() isDisabled = false;
  /**
   * Hiển thị ngoài form, khác với giá trị đang lưu
   */
  @Input() displayWith: (value: MultiSelectModel) => string = (x) => x;
  @Output() itemsChange: EventEmitter<{items: any[], label: string}> = new EventEmitter<{items: any[], label: string}>();

  query = '';
  /**
   * Các mục có thể chọn
   */
  @Input() listItems: MultiSelectModel[] = [];

  @Input() params: Record<string, any> = {};

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('input') input?: ElementRef<HTMLInputElement>;

  constructor(private examinationService: ExaminationService,
              private receptionService: ReceptionService,
              private categoryGenaralService: CategoryGenaralService,
              private pharmaService: PharmaService,
              private doctorService:DoctorService,
              private packageTypeService: PackageTypeService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    // if(changes.items) {
    //   this.itemsChange.emit(this.items)
    // }
    if (!this.items) {
      this.items = [];
    } else if (!Array.isArray(this.items)) {
      this.items = [this.items];
    }
  }

  addChip(item: any) {
  }

  selectChip(event: MatAutocompleteSelectedEvent) {
    this.items?.push(event.option.value);
    if (this.input) {
      this.input.nativeElement.value = '';
    }
    this.query = '';
    this.itemsChange.emit({items: this.items, label: this.label})
  }

  removeChip(item: MultiSelectModel) {
    const indexActive = this.items?.indexOf(item);

    if (indexActive >= 0) {
      this.items.splice(indexActive, 1);
    }
    this.itemsChange.emit({items: this.items, label: this.label})
  }

  @Input() getList(query: string) {
    switch (this.category) {
      case 'icd': {
        this.examinationService.filterICD(query).subscribe(dataReturn => {
          if(dataReturn.status === true){
            this.listItems = this.receptionService.convertDM('service', dataReturn.results);
          } else{
            this.listItems = [];
          }
        });
        break;
      }
      case 'icds': {
        this.examinationService.filterICD(query).subscribe(dataReturn => {
          if(dataReturn.status === true){
            this.listItems = this.receptionService.convertDM('service', dataReturn.results);
          } else{
            this.listItems = [];
          }
        });
        break;
      }
      case 'ATC': {
        this.categoryGenaralService.getCategoryGenaral({ query, active: true }, 0, 10, 'atc').subscribe(dataReturn => {
          if(dataReturn.status === true){
            const temp = dataReturn.results;
            this.listItems = temp;
          } else{
            this.listItems = [];
          }
        });
        break;
      }
      case 'way_to_use': {
        this.categoryGenaralService.getCategoryGenaral({
          query,
          active: true,
        }, 0, 10, 'way-to-use').subscribe(dataReturn => {
          if (dataReturn.status === true) {
            this.listItems = dataReturn.results;
          } else {
            this.listItems = [];
          }
        });
        break;
      }
      case 'pharma': {
        this.categoryGenaralService.getCategoryGenaral({
          query,
          active: true,
        }, 0, 10, 'pharma').subscribe(dataReturn => {
          if (dataReturn.status === true) {
            this.listItems = dataReturn.results;
          } else {
            this.listItems = [];
          }
        });
        break;
      }
      case 'bs': {
        this.doctorService.getDoctors(query, 'query').subscribe(dataReturn => {
          if(dataReturn.status === true){
            const temp = dataReturn.results;
            this.listItems = temp;
          } else{
            this.listItems = [];
          }
        });
        break;
      }
      case 'kdt': {
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
        });
        break;
      }
      case 'vaccine': {
        this.categoryGenaralService.getCategoryGenaral({
          query,
          active: true,
        }, 0, 10, 'vaccine').subscribe(dataReturn => {
          if (dataReturn.status === true) {
            this.listItems = dataReturn.results;
          } else {
            this.listItems = [];
          }
        });
        break;
      }
      case 'vaccine_mapped_pharma': {
        this.packageTypeService.getPackageVaccineMappings(this.params.vaccine_code,'','','',1000).subscribe(
          {
            next:(data:any)=>{
              if (data.status === true){
                this.listItems = data.results[0].supplies;
              }else {
                this.listItems = [];
              }
            }
          }
        )
      }
    }
  }
}
