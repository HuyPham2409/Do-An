import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-quan-ly-benh-an',
  templateUrl: './quan-ly-benh-an.component.html',
  styleUrl: './quan-ly-benh-an.component.scss'
})
export class QuanLyBenhAnComponent {

  token: string;
  constructor(fb: FormBuilder, private cookieService: CookieService,
  ) {
    this.token = this.cookieService.get('access_token');
  }

  onChange(event: any) {
    if (event && event.data) {
      event.data.token = this.cookieService.get('access_token');
    }
  }
}
