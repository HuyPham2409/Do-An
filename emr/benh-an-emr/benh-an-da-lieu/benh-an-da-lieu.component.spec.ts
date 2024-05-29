import { ComponentFixture, TestBed } from '@angular/core/testing';

import {BenhAnDaLieuComponent} from './benh-an-da-lieu.component';

describe('BenhAnNoiKhoaComponent', () => {
  let component: BenhAnDaLieuComponent;
  let fixture: ComponentFixture<BenhAnDaLieuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnDaLieuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhAnDaLieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
