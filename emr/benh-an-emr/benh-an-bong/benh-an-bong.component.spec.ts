import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhAnBongComponent } from './benh-an-bong.component';

describe('BenhAnBongComponent', () => {
  let component: BenhAnBongComponent;
  let fixture: ComponentFixture<BenhAnBongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnBongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhAnBongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
