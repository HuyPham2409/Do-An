import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhAnNgoaiTruRhmComponent } from './benh-an-ngoai-tru-rhm.component';

describe('BenhAnNgoaiTruRhmComponent', () => {
  let component: BenhAnNgoaiTruRhmComponent;
  let fixture: ComponentFixture<BenhAnNgoaiTruRhmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnNgoaiTruRhmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhAnNgoaiTruRhmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
