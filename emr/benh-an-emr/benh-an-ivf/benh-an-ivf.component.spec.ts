import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhAnIvfComponent } from './benh-an-ivf.component';

describe('BenhAnIvfComponent', () => {
  let component: BenhAnIvfComponent;
  let fixture: ComponentFixture<BenhAnIvfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnIvfComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BenhAnIvfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
