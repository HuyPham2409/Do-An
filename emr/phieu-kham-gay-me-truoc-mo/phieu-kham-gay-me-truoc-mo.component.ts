import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-phieu-kham-gay-me-truoc-mo',
  templateUrl: './phieu-kham-gay-me-truoc-mo.component.html',
  styleUrls: ['./phieu-kham-gay-me-truoc-mo.component.scss']
})
export class PhieuKhamGayMeTruocMoComponent implements OnInit {
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;

  constructor() { }

  ngOnInit(): void {
  }

}
