import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiayDongYThucHienPtttComponent } from './giay-dong-y-thuc-hien-pttt.component';

describe('GiayDongYThucHienPtttComponent', () => {
  let component: GiayDongYThucHienPtttComponent;
  let fixture: ComponentFixture<GiayDongYThucHienPtttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiayDongYThucHienPtttComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiayDongYThucHienPtttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
