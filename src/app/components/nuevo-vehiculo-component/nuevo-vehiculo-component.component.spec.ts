import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoVehiculoComponentComponent } from './nuevo-vehiculo-component.component';

describe('NuevoVehiculoComponentComponent', () => {
  let component: NuevoVehiculoComponentComponent;
  let fixture: ComponentFixture<NuevoVehiculoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoVehiculoComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoVehiculoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
