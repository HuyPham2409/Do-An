import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyBenhAnComponent } from './quan-ly-benh-an.component';

describe('QuanLyBenhAnComponent', () => {
  let component: QuanLyBenhAnComponent;
  let fixture: ComponentFixture<QuanLyBenhAnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuanLyBenhAnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuanLyBenhAnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
