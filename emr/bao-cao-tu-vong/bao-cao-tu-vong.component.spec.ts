import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaoCaoTuVongComponent } from './bao-cao-tu-vong.component';

describe('BaoCaoTuVongComponent', () => {
  let component: BaoCaoTuVongComponent;
  let fixture: ComponentFixture<BaoCaoTuVongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaoCaoTuVongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaoCaoTuVongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
