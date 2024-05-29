import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-phieu-tham-kham-tai-khoa',
  templateUrl: './phieu-tham-kham-tai-khoa.component.html',
  styleUrls: ['./phieu-tham-kham-tai-khoa.component.scss']
})
export class PhieuThamKhamTaiKhoaComponent implements OnInit {
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;

  constructor() { }

  ngOnInit(): void {
  }

}
