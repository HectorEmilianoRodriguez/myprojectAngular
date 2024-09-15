import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEComponent } from './crear-e.component';

describe('CrearEComponent', () => {
  let component: CrearEComponent;
  let fixture: ComponentFixture<CrearEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearEComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
