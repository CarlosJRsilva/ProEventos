import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistragionComponent } from './registragion.component';

describe('RegistragionComponent', () => {
  let component: RegistragionComponent;
  let fixture: ComponentFixture<RegistragionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistragionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistragionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
