import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThiLucComponent } from './thi-luc.component';

describe('ThiLucComponent', () => {
  let component: ThiLucComponent;
  let fixture: ComponentFixture<ThiLucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThiLucComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThiLucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
