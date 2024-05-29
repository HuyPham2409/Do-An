import { Component, EventEmitter, Input, OnInit, Output,OnChanges, SimpleChanges } from '@angular/core';
import moment, { Moment } from 'moment';
import { DateTime } from '../../../../model/emr/global';

@Component({
  selector: 'app-emr-date',
  templateUrl: './emr-date.component.html',
  styleUrls: ['./emr-date.component.scss'],
})
export class EmrDateComponent implements OnInit, OnChanges {
  @Input() mode: 'datetime' | 'date' | 'time' = 'datetime';

  @Input() label = '';
  @Input() placeholder = '';
  @Input() isDisabled:boolean = false;

  /**
   * Nếu có giá trị model truyền vào lần đầu tiên thì dmModel và unixModel sẽ tự đổi theo
   */
  @Input() model: Moment | null = null;
  @Output() modelChange = new EventEmitter<Moment>();

  @Input() dmModel = new DateTime();
  @Output() dmModelChange = new EventEmitter<DateTime>();

  /**
   * Khi unixModel thay đổi thì model sẽ tự đổi theo
   */
  @Input() unixModel: number | null = null;
  @Output() unixModelChange = new EventEmitter<number | null>();

  constructor() {
  }

  ngOnInit(): void {
    if (this.model) {
      setTimeout(() => {
        this.onDate(moment(this.model));
      });
    }
    if (!this.dmModel) {
      this.dmModel = new DateTime();
    }
    if (!this.unixModel) {
      this.unixModel = null;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    setTimeout(() => {
      if (changes?.unixModel?.currentValue) {
        this.modelChange.emit(moment.unix(changes?.unixModel?.currentValue));
      }
    });
  }

  onDate(date: Moment): void {
    this.modelChange.emit(date);

    this.dmModel.DATE = date ? date.format('DD/MM/YYYY') : '';
    this.dmModel.TIME = date ? date.format('HH:mm') : '';
    this.dmModelChange.emit(this.dmModel);

    this.unixModel = date ? date.unix() : null;
    this.unixModelChange.emit(this.unixModel);
  }

  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    let parsedDate: Moment = moment();
    if(this.mode == 'datetime'){
      parsedDate = moment(inputValue, 'HH:mm DD/MM/YYYY');
    }else if(this.mode == 'time'){
      parsedDate = moment(inputValue, 'HH:mm');
    }else if(this.mode == 'date'){
      parsedDate = moment(inputValue, 'DD/MM/YYYY');
    }

    if (parsedDate.isValid()) {
      this.model = parsedDate;
      this.onDate(this.model);
    }else {
      const currentDate = moment().format(this.mode === 'datetime' ? 'HH:mm DD/MM/YYYY' : this.mode === 'time' ? 'HH:mm' : 'DD/MM/YYYY');
      (event.target as HTMLInputElement).value = currentDate;
    }
  }
}
