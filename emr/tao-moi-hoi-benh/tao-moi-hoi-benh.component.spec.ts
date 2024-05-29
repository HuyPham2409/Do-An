import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaoMoiHoiBenhComponent } from './tao-moi-hoi-benh.component';

describe('TaoMoiHoiBenhComponent', () => {
  let component: TaoMoiHoiBenhComponent;
  let fixture: ComponentFixture<TaoMoiHoiBenhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaoMoiHoiBenhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaoMoiHoiBenhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
