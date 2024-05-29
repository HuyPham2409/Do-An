import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhAnMatChanThuongComponent } from './benh-an-mat-chan-thuong.component';

describe('BenhAnMatChanThuongComponent', () => {
  let component: BenhAnMatChanThuongComponent;
  let fixture: ComponentFixture<BenhAnMatChanThuongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnMatChanThuongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhAnMatChanThuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
