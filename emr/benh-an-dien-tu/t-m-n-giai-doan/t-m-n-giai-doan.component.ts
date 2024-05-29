import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { TMNGiaiDoan } from '../../../../model/Patient_EMR';
import { ShareDataService } from '../../../../services/share-data.service';

@Component({
  selector: 'app-t-m-n-giai-doan',
  templateUrl: './t-m-n-giai-doan.component.html',
  styleUrls: ['./t-m-n-giai-doan.component.scss']
})
export class TMNGiaiDoanComponent implements OnInit,OnChanges {
  @Input() TNMGiaiDoan = new TMNGiaiDoan();
  constructor(private shareDataService: ShareDataService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
  }
}
