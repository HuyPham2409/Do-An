import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HanhChinhComponent } from './hanh-chinh.component';

describe('HanhChinhComponent', () => {
  let component: HanhChinhComponent;
  let fixture: ComponentFixture<HanhChinhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HanhChinhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HanhChinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
