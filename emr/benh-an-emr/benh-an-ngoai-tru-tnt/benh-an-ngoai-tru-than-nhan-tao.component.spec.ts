import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhAnNgoaiTruThanNhanTaoComponent } from './benh-an-ngoai-tru-than-nhan-tao.component';

describe('BenhAnNgoaiTruThanNhanTaoComponent', () => {
  let component: BenhAnNgoaiTruThanNhanTaoComponent;
  let fixture: ComponentFixture<BenhAnNgoaiTruThanNhanTaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnNgoaiTruThanNhanTaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhAnNgoaiTruThanNhanTaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
