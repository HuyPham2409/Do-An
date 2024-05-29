import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiDinhDieuTriPhcnComponent } from './chi-dinh-dieu-tri-phcn.component';

describe('ChiDinhDieuTriPhcnComponent', () => {
  let component: ChiDinhDieuTriPhcnComponent;
  let fixture: ComponentFixture<ChiDinhDieuTriPhcnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChiDinhDieuTriPhcnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChiDinhDieuTriPhcnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
