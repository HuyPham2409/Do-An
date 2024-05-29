import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhamBenhCoQuanKhacSoSinhComponent } from './kham-benh-co-quan-khac-so-sinh.component';

describe('KhamBenhCoQuanKhacSoSinhComponent', () => {
  let component: KhamBenhCoQuanKhacSoSinhComponent;
  let fixture: ComponentFixture<KhamBenhCoQuanKhacSoSinhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhamBenhCoQuanKhacSoSinhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KhamBenhCoQuanKhacSoSinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
