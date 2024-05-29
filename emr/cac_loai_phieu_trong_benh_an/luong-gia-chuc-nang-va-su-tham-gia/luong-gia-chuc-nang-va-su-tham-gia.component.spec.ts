import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuongGiaChucNangVaSuThamGiaComponent } from './luong-gia-chuc-nang-va-su-tham-gia.component';

describe('LuongGiaChucNangVaSuThamGiaComponent', () => {
  let component: LuongGiaChucNangVaSuThamGiaComponent;
  let fixture: ComponentFixture<LuongGiaChucNangVaSuThamGiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuongGiaChucNangVaSuThamGiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LuongGiaChucNangVaSuThamGiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
