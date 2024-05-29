import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyntheticClsComponent } from './synthetic-cls.component';

describe('SyntheticClsComponent', () => {
  let component: SyntheticClsComponent;
  let fixture: ComponentFixture<SyntheticClsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyntheticClsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SyntheticClsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
