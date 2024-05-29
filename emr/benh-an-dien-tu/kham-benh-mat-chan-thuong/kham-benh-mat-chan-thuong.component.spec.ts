import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhamBenhMatChanThuongComponent } from './kham-benh-mat-chan-thuong.component';

describe('KhamBenhMatChanThuongComponent', () => {
  let component: KhamBenhMatChanThuongComponent;
  let fixture: ComponentFixture<KhamBenhMatChanThuongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhamBenhMatChanThuongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KhamBenhMatChanThuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
