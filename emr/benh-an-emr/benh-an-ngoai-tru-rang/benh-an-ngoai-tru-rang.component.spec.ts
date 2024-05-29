import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhAnNgoaiTruRangComponent } from './benh-an-ngoai-tru-rang.component';

describe('BenhAnNgoaiTruRangComponent', () => {
  let component: BenhAnNgoaiTruRangComponent;
  let fixture: ComponentFixture<BenhAnNgoaiTruRangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnNgoaiTruRangComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhAnNgoaiTruRangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
