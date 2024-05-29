import { Component, Inject, OnInit } from '@angular/core';
import { ServiceService } from '../../../../services/service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Moment } from 'moment';

@Component({
  selector: 'app-synthetic-cls',
  templateUrl: './synthetic-cls.component.html',
  styleUrls: ['./synthetic-cls.component.scss'],
})
export class SyntheticClsComponent implements OnInit {
  query: string = '';
  listCLS: any = [];
  listXN: any = [];
  listInNormal: any = [];
  listCheckboxCls: Map<number, any> = new Map<number, any>();
  listCheckboxXn: Map<number, any> = new Map<number, any>();
  listChildCheckboxXn: Map<string, string> = new Map<string, string>();
  listChildCheckboxIn: Map<string, string> = new Map<string, string>();
  listCheckboxIn: Map<number, any> = new Map<number, any>();
  conclusion: string = '';
  regexForStripHTML = /(<([^>]+)>)/ig;
  ket_qua_cls: string = '';
  currentType = '';
  listOneXn: Map<number, string> = new Map<number, string>();
  isShowResultsXn: Map<number, boolean> = new Map<number, boolean>();
  dateStart: any = '';
  dateEnd: any = '';
  checkAll: number = 0;
  currentCategory: number = 0;

  constructor(private serviceService: ServiceService,
              private dialogRef: MatDialogRef<SyntheticClsComponent>,
              @Inject(MAT_DIALOG_DATA) private data: { patient_id: number, reception_queue_id: string }) {
  }

  ngOnInit(): void {
    this.getAllSyntheticCLS();
  }

  getAllSyntheticCLS() {
    const filterMore: any = [
      {
        'patient_id': this.data.patient_id,
        'reception_queue_id': this.data.reception_queue_id,
      },
      { 'service_category_parent_id': { '$in': [3, 4, 5] } },
      { 'service_category_parent_id': { '$in': [3, 4, 5] } },
    ];
    const key_level_1 = 'service_category_id';
    if (this.dateStart && this.dateEnd) {
      filterMore.push({
        'created_at': {
          '$gte': this.dateStart.unix(),
          '$lte': (this.dateEnd as Moment).endOf('day').unix(),
        },
      });
    }
    this.serviceService.getServiceUsed(this.data.patient_id, this.data.reception_queue_id, { $in: [0, 1] }, filterMore, {
      key_level_1,
    }).subscribe((res) => {
      if (res.status && res.results.length > 0) {
        res.results.forEach((cap1: any) => {
          cap1.data.forEach((cap2: any) => {
            cap2.exams.forEach((cap3: any) => {
              cap3.services.forEach((cap4: any) => {
                if (cap4.services.service_category_parent_id == 3) {
                  this.listXN.push(cap4.services);
                  let inNormal = false;
                  if (cap4.services.results.parameters) {
                    for (const par of cap4.services.results.parameters) {
                      if (this.isInNormal(par.lab_indicator_value, par.lab_indicator_min, par.lab_indicator_max)) {
                        inNormal = true;
                        break;
                      }
                    }
                  }
                  if (cap4.services.results.test_status && cap4.services.results.test_status.microbiology_test_status_code === 'dt') inNormal = true;
                  if (inNormal) {
                    this.listInNormal.push(cap4.services);
                  }
                } else {
                  this.listCLS.push(cap4.services);
                }
              });
            });
          });
        });
      }
    });
  }

  getConclusion(value: any, index: number, category: 'cls' | 'xn' | 'in' | 'c_in' | 'c_xn', anotherGroup: number = -1) {
    switch (category) {
      case 'cls':
        this.ket_qua_cls = '';
        this.listCheckboxXn.clear();
        this.listCheckboxIn.clear();
        this.listChildCheckboxIn.clear();
        this.listChildCheckboxXn.clear();
        if (this.listCheckboxCls.has(index)) {
          this.listCheckboxCls.delete(index);
        } else {
          this.listCheckboxCls.set(index, value);
          this.listCheckboxCls.forEach((val: any) => {
            const conclusion = val.results.conclusion.replaceAll(this.regexForStripHTML, '');
            this.ket_qua_cls += val.service_name + ' : ' + conclusion + ';\n';
          });
        }
        break;
      case 'xn':
        if (category != this.currentType) this.ket_qua_cls = '';
        this.currentType = category;
        this.listCheckboxIn.clear();
        this.listCheckboxCls.clear();
        this.listChildCheckboxIn.clear();
        if (this.listCheckboxXn.has(index)) {
          this.listCheckboxXn.delete(index);
        } else {
          if (value.results.service_category_id === 13) {
            this.listCheckboxXn.set(index, value.results.test_status.microbiology_test_status_name);
            this.ket_qua_cls += value.service_name + ' : ' + value.results.test_status.microbiology_test_status_name + ';\n';
          } else {
            this.listCheckboxXn.set(index, value.results.parameters);
            let xndx = 0;
            this.listCheckboxXn.get(index).forEach((param: any) => {
              this.listChildCheckboxXn.set(index + '-' + xndx, param.lab_indicator_name + ' : ' + param.lab_indicator_value + ';\n');
              xndx++;
            });
            this.listChildCheckboxXn.forEach((val: any) => {
              this.ket_qua_cls += val;
            });
          }
        }
        break;
      case 'in':
        if (category != this.currentType) this.ket_qua_cls = '';
        this.currentType = category;
        this.listCheckboxXn.clear();
        this.listCheckboxCls.clear();
        this.listChildCheckboxXn.clear();
        if (this.listCheckboxIn.has(index)) {
          this.listCheckboxIn.delete(index);
        } else {
          if (value.results.service_category_id === 13) {
            this.listCheckboxIn.set(index, value.results.test_status.microbiology_test_status_name);
            this.ket_qua_cls += value.service_name + ' : ' + value.results.test_status.microbiology_test_status_name + ';\n';
          } else {
            this.listCheckboxIn.set(index, value.results.parameters);
            let indx = 0;
            this.listCheckboxIn.get(index).forEach((param: any) => {
              const isInnor = this.isInNormal(param.lab_indicator_value, param.lab_indicator_min, param.lab_indicator_max);
              if (isInnor) {
                this.listChildCheckboxIn.set(index + '-' + indx, param.lab_indicator_name + ' : ' + param.lab_indicator_value + ';\n');
              }
              indx++;
            });
            this.listChildCheckboxIn.forEach((value: any) => {
              this.ket_qua_cls += value;
            });
          }
        }
        break;
      case 'c_in':
        this.ket_qua_cls = '';
        this.listCheckboxXn.clear();
        this.listCheckboxCls.clear();
        this.listChildCheckboxXn.clear();
        if (this.listChildCheckboxIn.has(anotherGroup + '-' + index)) {
          this.listChildCheckboxIn.delete(anotherGroup + '-' + index);
          if (this.listCheckboxIn.has(anotherGroup)) this.listCheckboxIn.delete(anotherGroup);
        } else {
          // for (let x = 0; x < this.listInNormal.length; x++){
          //   if (x != anotherGroup) {
          //     for (let y = 0; y < this.listInNormal[x].results.parameters.length; y++){
          //       this.listChildCheckboxIn.delete(x + '-' + y);
          //     }
          //   }
          // }
          this.listChildCheckboxIn.set(anotherGroup + '-' + index, value.lab_indicator_name + ' : ' + value.lab_indicator_value + ';\n');
        }
        this.listChildCheckboxIn.forEach((value, key) => {
          this.ket_qua_cls += value;
        });
        break;
      case 'c_xn':
        this.ket_qua_cls = '';
        this.listCheckboxIn.clear();
        this.listCheckboxCls.clear();
        this.listChildCheckboxIn.clear();
        if (this.listChildCheckboxXn.has(anotherGroup + '-' + index)) {
          this.listChildCheckboxXn.delete(anotherGroup + '-' + index);
          if (this.listCheckboxXn.has(anotherGroup)) this.listCheckboxXn.delete(anotherGroup);
        } else {
          // for (let i = 0; i < this.listXN.length; i++){
          //   if (i != anotherGroup) {
          //     for (let j = 0; j < this.listXN[i].results.parameters.length; j++){
          //       this.listChildCheckboxXn.delete(i + '-' + j);
          //     }
          //   }
          // }
          this.listChildCheckboxXn.set(anotherGroup + '-' + index, value.lab_indicator_name + ' : ' + value.lab_indicator_value + ';\n');
        }
        this.listChildCheckboxXn.forEach((value, key) => {
          this.ket_qua_cls += value;
        });
        break;
    }
  }

  closeDialog(type: string = 'value') {
    if (type === 'close') {
      this.dialogRef.close('');
    } else {
      this.dialogRef.close(this.ket_qua_cls);
    }
  }

  isInNormal(value: string, min: string, max: string, type: 'xn' | 'xnvs' = 'xn') {
    if (type === 'xnvs') {
      if (value === 'dt') {
        return true;
      }
    } else {
      const parseValue = parseFloat(value);
      const parseMin = parseFloat(min);
      const parseMax = parseFloat(max);
      if (isNaN(parseValue) || isNaN(parseMin) || isNaN(parseMax)) {
        return true;
      }
      if (parseValue < parseMin) {
        return true;
      }
      if (parseValue > parseMax) {
        return true;
      }
    }
    return false;
  }

  showResultsXN(index: number) {
    if (!this.isShowResultsXn.has(index)) {
      this.isShowResultsXn.set(index, true);
    } else {
      this.isShowResultsXn.delete(index);
    }
  }

  filterDate() {
    this.listCLS = [];
    this.listXN = [];
    this.listInNormal = [];
    this.getAllSyntheticCLS();
  }

  selectAll(type: 'cls' | 'xn' | 'in') {
    switch (type) {
      case 'cls':
        if (this.checkAll === 1) {
          this.ket_qua_cls = '';
          this.listCheckboxCls.clear();
          this.checkAll = -1;
          return;
        }
        for (let i = 0; i < this.listCLS.length; i++) {
          this.getConclusion(this.listCLS[i], i, 'cls');
          this.checkAll = 1;
        }
        break;
      case 'xn':
        if (this.checkAll === 2) {
          this.checkAll = -1;
          return;
        }
        for (let i = 0; i < this.listXN.length; i++) {
          this.ket_qua_cls = '';
          this.getConclusion(this.listXN[i], i, 'xn');
          this.checkAll = 2;
        }
        break;
      case 'in':
        if (this.checkAll === 3) {
          this.checkAll = -1;
          return;
        }
        for (let i = 0; i < this.listInNormal.length; i++) {
          this.getConclusion(this.listInNormal[i], i, 'in');
          this.checkAll = 3;
        }
        break;
    }
  }

  checkCurrentCategory = (cate: number) => {
    if (cate !== this.currentCategory) {
      this.currentCategory = cate;
      return true;
    } else {
      return false;
    }
  };

  selectXn(category_id: number, list: any, type: 'xn' | 'in') {
    const listXnByCate = list
      .map((item: any, index: number) => ({ ...item, originalIndex: index })) // Add originalIndex to each item
      .filter((item: any) => item.results.service_category_id === category_id)
      .map((item: any) => ({ ...item, index: item.originalIndex }));
    if (type === 'xn') {
      for (let i = 0; i < listXnByCate.length; i++) {
        this.getConclusion(listXnByCate[i], listXnByCate[i].index, 'xn');
      }
    } else {
      for (let i = 0; i < listXnByCate.length; i++) {
        this.getConclusion(listXnByCate[i], listXnByCate[i].index, 'in');
      }
    }
  }
}
