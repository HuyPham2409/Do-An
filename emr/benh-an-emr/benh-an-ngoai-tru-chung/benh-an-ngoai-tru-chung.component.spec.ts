import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhAnNgoaiTruChungComponent } from './benh-an-ngoai-tru-chung.component';

describe('BenhAnNgoaiTruChungComponent', () => {
  let component: BenhAnNgoaiTruChungComponent;
  let fixture: ComponentFixture<BenhAnNgoaiTruChungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnNgoaiTruChungComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhAnNgoaiTruChungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
