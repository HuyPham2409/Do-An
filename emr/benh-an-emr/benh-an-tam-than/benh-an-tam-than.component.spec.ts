import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhAnTamThanComponent } from './benh-an-tam-than.component';

describe('BenhAnTamThanComponent', () => {
  let component: BenhAnTamThanComponent;
  let fixture: ComponentFixture<BenhAnTamThanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnTamThanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhAnTamThanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
