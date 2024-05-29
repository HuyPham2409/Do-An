import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhAnNaoPhaThaiComponent } from './benh-an-nao-pha-thai.component';

describe('BenhAnNaoPhaThaiComponent', () => {
  let component: BenhAnNaoPhaThaiComponent;
  let fixture: ComponentFixture<BenhAnNaoPhaThaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnNaoPhaThaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhAnNaoPhaThaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
