import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NamTuoi } from '../../../../model/emr/global';
import moment, { Moment } from 'moment';

@Component({
  selector: 'app-emr-age',
  templateUrl: './emr-age.component.html',
  styleUrls: ['./emr-age.component.scss']
})
export class EmrAgeComponent implements OnInit {
  @Input() label = '';
  @Input() placeholder = '';

  @Input() moment: Moment | null = null;
  @Output() momentChange = new EventEmitter<Moment>();

  @Input() year = '';
  @Output() yearChange = new EventEmitter<string>();

  @Input() age = 0;
  @Output() ageChange = new EventEmitter<number>();
  // DD/MM/YYYY
  @Input() birthday?: string = '';

  constructor() {}

  ngOnInit(): void {
  }

  onChange(age: number) {
    const birthday = moment(this.birthday, 'DD/MM/YYYY');
    const result = birthday.add(age, 'years');
    const year = result.year();
    this.momentChange.emit(result);
    this.yearChange.emit(year + '');
    this.ageChange.emit(age);
  }
}
