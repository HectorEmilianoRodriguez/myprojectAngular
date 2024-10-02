import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificacionAuthComponent } from './verificacion-auth.component';

describe('VerificacionAuthComponent', () => {
  let component: VerificacionAuthComponent;
  let fixture: ComponentFixture<VerificacionAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificacionAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificacionAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
