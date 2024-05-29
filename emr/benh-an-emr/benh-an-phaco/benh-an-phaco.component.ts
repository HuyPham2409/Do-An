import { Component, OnInit } from '@angular/core';
import { BenhAnComponent } from '../benh-an.component';
import { EmrService } from '../../../../services/emr.service';

@Component({
  selector: 'app-benh-an-phaco',
  templateUrl: './benh-an-phaco.component.html',
  styleUrls: ['./benh-an-phaco.component.scss']
})
export class BenhAnPhacoComponent extends BenhAnComponent implements OnInit {

  constructor(private emrService: EmrService) {
    super();
  }

  ngOnInit(): void {
    this.emrService.tenBenhAn = this.tenBenhAn;
  }

}
