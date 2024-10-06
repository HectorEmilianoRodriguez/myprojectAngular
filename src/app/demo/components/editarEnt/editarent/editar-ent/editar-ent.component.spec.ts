import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEntComponent } from './editar-ent.component';

describe('EditarEntComponent', () => {
  let component: EditarEntComponent;
  let fixture: ComponentFixture<EditarEntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarEntComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
