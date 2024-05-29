import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoCauHoiTreEmComponent } from './bo-cau-hoi-tre-em.component';

describe('BoCauHoiTreEmComponent', () => {
  let component: BoCauHoiTreEmComponent;
  let fixture: ComponentFixture<BoCauHoiTreEmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoCauHoiTreEmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoCauHoiTreEmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
