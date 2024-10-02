import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecovertpasswordComponent } from './recovertpassword.component';

describe('RecovertpasswordComponent', () => {
  let component: RecovertpasswordComponent;
  let fixture: ComponentFixture<RecovertpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecovertpasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecovertpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
