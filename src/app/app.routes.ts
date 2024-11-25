import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import HomeComponent from './authentication/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { ConductorComponent } from './components/conductor/conductor.component';
import { NuevoConductorComponentComponent } from './components/nuevo-conductor-component/nuevo-conductor-component.component';
import { NuevoPedidoComponentComponent } from './components/nuevo-pedido-component/nuevo-pedido-component.component';
import { NuevoVehiculoComponentComponent } from './components/nuevo-vehiculo-component/nuevo-vehiculo-component.component';
import { TrackingComponent } from './tracking/tracking.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tracking/:id', component: TrackingComponent }, // Asegúrate de que esta ruta esté definida con :id
  { path: 'conductor/:conductorId', component: ConductorComponent },
  { path: 'admin/:adminId', component: AdminComponent },
  { path: 'login', loadComponent: () => import('./authentication/home/home.component')},
  { path: 'nuevo-admin', component: AdminComponent },
  { path: 'nuevo-vehiculo', component: NuevoVehiculoComponentComponent },
  { path: 'nuevo-conductor', component: NuevoConductorComponentComponent },
  { path: 'nuevo-pedido/:adminId', component: NuevoPedidoComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
