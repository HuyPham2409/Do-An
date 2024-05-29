import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhAnUngBuouComponent } from './benh-an-ung-buou.component';

describe('BenhAnUngBuouComponent', () => {
  let component: BenhAnUngBuouComponent;
  let fixture: ComponentFixture<BenhAnUngBuouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnUngBuouComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhAnUngBuouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
