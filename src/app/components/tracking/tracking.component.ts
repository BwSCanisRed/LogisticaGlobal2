import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pedido } from '../../models/pedido';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
  pedido: Pedido | undefined;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private pedidoService: PedidoService) {}

  ngOnInit(): void {
    const trackingNumber = this.route.snapshot.paramMap.get('id');

    if (trackingNumber) {
      this.pedidoService.getPedidoPorTracking(trackingNumber).subscribe({
        next: (pedido) => (this.pedido = pedido),
        error: (err) => (this.error = err.error || 'Pedido no encontrado'),
      });
    } else {
      this.error = 'Número de guía no proporcionado';
    }
  }
}
