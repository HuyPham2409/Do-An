import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TongKetBenhAnNgoaikhoaComponent } from './tong-ket-benh-an-ngoaikhoa.component';

describe('TongKetBenhAnNgoaikhoaComponent', () => {
  let component: TongKetBenhAnNgoaikhoaComponent;
  let fixture: ComponentFixture<TongKetBenhAnNgoaikhoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TongKetBenhAnNgoaikhoaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TongKetBenhAnNgoaikhoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
