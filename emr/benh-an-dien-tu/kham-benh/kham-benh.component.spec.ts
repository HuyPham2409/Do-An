import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhamBenhComponent } from './kham-benh.component';

describe('KhamBenhComponent', () => {
  let component: KhamBenhComponent;
  let fixture: ComponentFixture<KhamBenhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhamBenhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KhamBenhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
