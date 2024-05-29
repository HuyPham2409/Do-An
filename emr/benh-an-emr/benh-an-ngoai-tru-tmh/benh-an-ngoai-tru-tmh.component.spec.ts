import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhAnNgoaiTruTmhComponent } from './benh-an-ngoai-tru-tmh.component';

describe('BenhAnNgoaiTruTmhComponent', () => {
  let component: BenhAnNgoaiTruTmhComponent;
  let fixture: ComponentFixture<BenhAnNgoaiTruTmhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnNgoaiTruTmhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhAnNgoaiTruTmhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
