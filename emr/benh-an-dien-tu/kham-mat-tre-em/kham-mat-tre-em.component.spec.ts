import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhamMatTreEmComponent } from './kham-mat-tre-em.component';

describe('KhamMatTreEmComponent', () => {
  let component: KhamMatTreEmComponent;
  let fixture: ComponentFixture<KhamMatTreEmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhamMatTreEmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KhamMatTreEmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
