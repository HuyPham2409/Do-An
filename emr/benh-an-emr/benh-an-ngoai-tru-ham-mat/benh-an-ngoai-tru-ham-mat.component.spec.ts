import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhAnNgoaiTruHamMatComponent } from './benh-an-ngoai-tru-ham-mat.component';

describe('BenhAnNgoaiTruHamMatComponent', () => {
  let component: BenhAnNgoaiTruHamMatComponent;
  let fixture: ComponentFixture<BenhAnNgoaiTruHamMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnNgoaiTruHamMatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhAnNgoaiTruHamMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
