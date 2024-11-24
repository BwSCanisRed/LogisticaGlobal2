import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoPedidoComponentComponent } from './nuevo-pedido-component.component';

describe('NuevoPedidoComponentComponent', () => {
  let component: NuevoPedidoComponentComponent;
  let fixture: ComponentFixture<NuevoPedidoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoPedidoComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoPedidoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
