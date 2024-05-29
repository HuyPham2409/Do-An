import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BangTheoDoiBenhNhanEcmoComponent } from './bang-theo-doi-benh-nhan-ecmo.component';

describe('BangTheoDoiBenhNhanEcmoComponent', () => {
  let component: BangTheoDoiBenhNhanEcmoComponent;
  let fixture: ComponentFixture<BangTheoDoiBenhNhanEcmoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BangTheoDoiBenhNhanEcmoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BangTheoDoiBenhNhanEcmoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
