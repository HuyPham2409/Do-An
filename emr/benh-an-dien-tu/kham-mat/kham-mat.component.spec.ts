import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhamMatComponent } from './kham-mat.component';

describe('KhamMatComponent', () => {
  let component: KhamMatComponent;
  let fixture: ComponentFixture<KhamMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhamMatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KhamMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
