import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TongKetBenhAnComponent } from './tong-ket-benh-an.component';

describe('TongKetBenhAnComponent', () => {
  let component: TongKetBenhAnComponent;
  let fixture: ComponentFixture<TongKetBenhAnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TongKetBenhAnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TongKetBenhAnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
