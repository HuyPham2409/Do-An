import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienBanHoiChanComponent } from './bien-ban-hoi-chan.component';

describe('BienBanHoiChanComponent', () => {
  let component: BienBanHoiChanComponent;
  let fixture: ComponentFixture<BienBanHoiChanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BienBanHoiChanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BienBanHoiChanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
