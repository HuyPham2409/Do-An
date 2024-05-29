import { Component, OnInit } from '@angular/core';
import { BenhAnComponent } from '../benh-an.component';
import { EmrService } from '../../../../services/emr.service';

@Component({
  selector: 'app-benh-an-mat-day-mat',
  templateUrl: './benh-an-mat-day-mat.component.html',
  styleUrls: ['./benh-an-mat-day-mat.component.scss'],
})
export class BenhAnMatDayMatComponent extends BenhAnComponent implements OnInit {
  constructor(private emrService: EmrService) {
    super();
  }

  ngOnInit(): void {
    this.emrService.tenBenhAn = this.tenBenhAn;
  }
}
