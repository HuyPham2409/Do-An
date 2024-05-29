import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhAnIuiComponent } from './benh-an-iui.component';

describe('BenhAnIuiComponent', () => {
  let component: BenhAnIuiComponent;
  let fixture: ComponentFixture<BenhAnIuiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnIuiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhAnIuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
