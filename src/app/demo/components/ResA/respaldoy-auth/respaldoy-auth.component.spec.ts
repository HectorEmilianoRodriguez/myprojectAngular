import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespaldoyAuthComponent } from './respaldoy-auth.component';

describe('RespaldoyAuthComponent', () => {
  let component: RespaldoyAuthComponent;
  let fixture: ComponentFixture<RespaldoyAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RespaldoyAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RespaldoyAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
