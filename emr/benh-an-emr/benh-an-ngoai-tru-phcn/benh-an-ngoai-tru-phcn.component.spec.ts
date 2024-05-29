import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhAnNgoaiTruPhcnComponent } from './benh-an-ngoai-tru-phcn.component';

describe('BenhAnNgoaiTruPhcnComponent', () => {
  let component: BenhAnNgoaiTruPhcnComponent;
  let fixture: ComponentFixture<BenhAnNgoaiTruPhcnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnNgoaiTruPhcnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhAnNgoaiTruPhcnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
