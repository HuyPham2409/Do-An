import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhAnRangHamMatComponent } from './benh-an-rang-ham-mat.component';

describe('BenhAnRangHamMatComponent', () => {
  let component: BenhAnRangHamMatComponent;
  let fixture: ComponentFixture<BenhAnRangHamMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnRangHamMatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhAnRangHamMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
