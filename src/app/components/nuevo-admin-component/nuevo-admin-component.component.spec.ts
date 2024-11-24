import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoAdminComponentComponent } from './nuevo-admin-component.component';

describe('NuevoAdminComponentComponent', () => {
  let component: NuevoAdminComponentComponent;
  let fixture: ComponentFixture<NuevoAdminComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoAdminComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoAdminComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
