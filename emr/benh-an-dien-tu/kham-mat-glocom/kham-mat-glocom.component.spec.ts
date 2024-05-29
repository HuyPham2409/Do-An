import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhamMatGlocomComponent } from './kham-mat-glocom.component';

describe('KhamMatGlocomComponent', () => {
  let component: KhamMatGlocomComponent;
  let fixture: ComponentFixture<KhamMatGlocomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhamMatGlocomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KhamMatGlocomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
