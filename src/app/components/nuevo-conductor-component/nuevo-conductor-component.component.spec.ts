import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoConductorComponentComponent } from './nuevo-conductor-component.component';

describe('NuevoConductorComponentComponent', () => {
  let component: NuevoConductorComponentComponent;
  let fixture: ComponentFixture<NuevoConductorComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoConductorComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoConductorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
