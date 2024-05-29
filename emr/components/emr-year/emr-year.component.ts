import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import moment, { Moment } from 'moment';
import { NamTuoi } from '../../../../model/emr/global';
import { MatDatepicker } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { FormControl, NgModel } from '@angular/forms';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-emr-year',
  templateUrl: './emr-year.component.html',
  styleUrls: ['./emr-year.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class EmrYearComponent {
  @Input() label = '';
  @Input() placeholder = '';

  @Input() moment: Moment | null = null;
  @Output() momentChange = new EventEmitter<Moment | null>();

  @Input() year = '';
  @Output() yearChange = new EventEmitter<string>();

  @Input() age = 0;
  @Output() ageChange = new EventEmitter<number>();
  // DD/MM/YYYY
  @Input() birthday?: string = '';


  @ViewChild('model') model!: NgModel;

  constructor() {
  }

  selectYear(selected: Moment, datepicker: MatDatepicker<Moment>) {
    const year = selected.year();
    const birthday = moment(this.birthday, 'DD/MM/YYYY');
    const result = moment(this.birthday, 'DD/MM/YYYY').year(year);
    this.momentChange.emit(result);
    this.yearChange.emit(year + '');
    this.ageChange.emit(result.diff(birthday, 'years'));
    datepicker.close();
  }
}
