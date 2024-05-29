import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PARA } from '../../../../model/Patient_EMR';

@Component({
  selector: 'app-tien-thai-para',
  templateUrl: './tien-thai-para.component.html',
  styleUrls: ['./tien-thai-para.component.scss']
})
export class TienThaiParaComponent implements OnInit, OnChanges {
  @Input() tienthaiPara = new PARA();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.tienthaiPara.currentValue) {
      this.tienthaiPara = new PARA();
    }
  }
}
