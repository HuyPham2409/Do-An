import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BenhAnComponent } from './benh-an.component';
import { DocumentExam } from '../../../model/emr/document-exam/document-exam';

export interface IGiayToLienQuanComponent<T> {
  selectGiayToLienQuan: T;
}

@Directive()
export abstract class GiayToLienQuanComponent<T = any> extends BenhAnComponent implements IGiayToLienQuanComponent<T>, OnChanges {
  /**
   * TODO: Models
   */
  @Input() isCreateGiayToLienQuan = false;
  @Input() selectGiayToLienQuan!: T;
  @Input() loaiGiayToLienQuan: DocumentExam = {}
  @Input() listLoaiGiayToSave: T[] = [];

  private static formatNumber(value: any, options = { minimumIntegerDigits: 1, useGrouping: true }): string {
    if (isNaN(value) || value === Infinity) {
      return '';
    } else {
      return Number(value).toLocaleString('en', {
        maximumFractionDigits: 2,
        ...options,
      });
    }
  }
  static calcBMI(weight: number, height: number) {
    let bmi = this.formatNumber(
      Number(weight) / ((Number(height) / 100) * (Number(height) / 100)),
    );
    return bmi;
  }

  abstract ngOnChanges(changes: SimpleChanges): void;

  protected checkNonEmpty(obj: any): boolean {
    return !!obj && Object.keys(obj).length > 0;
  }
}
