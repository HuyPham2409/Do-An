import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import moment, { Moment } from 'moment';
import { DateTime } from '../../../../model/emr/global';

@Component({
  selector: 'app-emr-date-range',
  templateUrl: './emr-date-range.component.html',
  styleUrls: ['./emr-date-range.component.scss'],
})
export class EmrDateRangeComponent implements OnInit {
  @Input() label = '';

  @Input() fromModel: Moment | null = null;
  @Output() fromModelChange = new EventEmitter<Moment>();
  @Input() dmFromModel = new DateTime();
  @Output() dmFromModelChange = new EventEmitter<DateTime>();

  @Input() toModel: Moment | null = null;
  @Output() toModelChange = new EventEmitter<Moment>();
  @Input() dmToModel = new DateTime();
  @Output() dmToModelChange = new EventEmitter<DateTime>();

  constructor() {
  }

  ngOnInit(): void {
    if (!this.dmFromModel) {
      this.dmFromModel = new DateTime();
    }
    if (!this.dmToModel) {
      this.dmToModel = new DateTime();
    }
  }

  onFromDate(date: Moment): void{
    this.dmFromModel.DATE = moment(date).format("DD/MM/YYYY");
    this.dmFromModel.TIME = moment(date).format("HH:mm");
    this.dmFromModelChange.emit(this.dmFromModel);
    this.fromModelChange.emit(date);
  }

  onToDate(date: Moment): void{
    this.dmToModel.DATE = moment(date).format("DD/MM/YYYY");
    this.dmToModel.TIME = moment(date).format("HH:mm");
    this.dmToModelChange.emit(this.dmToModel);
    this.toModelChange.emit(date);
  }
}
