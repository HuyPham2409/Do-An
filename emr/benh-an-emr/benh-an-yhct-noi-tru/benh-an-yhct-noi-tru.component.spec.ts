import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhAnYhctNoiTruComponent } from './benh-an-yhct-noi-tru.component';

describe('BenhAnYhctNoiTruComponent', () => {
  let component: BenhAnYhctNoiTruComponent;
  let fixture: ComponentFixture<BenhAnYhctNoiTruComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnYhctNoiTruComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhAnYhctNoiTruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
