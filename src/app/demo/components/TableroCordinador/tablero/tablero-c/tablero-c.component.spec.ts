import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroCComponent } from './tablero-c.component';

describe('TableroCComponent', () => {
  let component: TableroCComponent;
  let fixture: ComponentFixture<TableroCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableroCComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableroCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
