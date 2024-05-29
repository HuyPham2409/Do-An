import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LyDoVaoVienComponent } from './ly-do-vao-vien.component';

describe('LyDoVaoVienComponent', () => {
  let component: LyDoVaoVienComponent;
  let fixture: ComponentFixture<LyDoVaoVienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LyDoVaoVienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LyDoVaoVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
