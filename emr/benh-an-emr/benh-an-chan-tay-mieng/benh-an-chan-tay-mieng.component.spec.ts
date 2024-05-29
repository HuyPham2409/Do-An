import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhAnChanTayMiengComponent } from './benh-an-chan-tay-mieng.component';

describe('BenhAnChanTayMiengComponent', () => {
  let component: BenhAnChanTayMiengComponent;
  let fixture: ComponentFixture<BenhAnChanTayMiengComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnChanTayMiengComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhAnChanTayMiengComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
