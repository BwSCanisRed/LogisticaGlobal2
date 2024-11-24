// src/app/data/data.ts

import { Admin } from '../models/admin';
import { Cliente } from '../models/cliente';
import { Conductor } from '../models/conductor';
import { Pedido } from '../models/pedido';
import { Vehiculo } from '../models/vehiculo';

// Datos de ejemplo para Vehiculo
const vehiculo1 = new Vehiculo(1, 'ABC123', 'Toyota', 2020, 2000);
const vehiculo2 = new Vehiculo(2, 'XYZ789', 'Honda', 2022, 1500);

// Datos de ejemplo para Conductor
const conductor1 = new Conductor(1001, 'Juan Perez', 12345, 'Norte', 'juan@example.com', 'password1', vehiculo1,"conductor");
const conductor2 = new Conductor(1002, 'Carlos Gomez', 67890, 'Sur', 'carlos@example.com', 'password2', vehiculo2,"despachador");

// Datos de ejemplo para Admin (antes llamado Despachador)
const admin1 = new Admin(2001, 'Ana Martinez', 'Bodega Norte', 'ana@example.com', 'password3');
const admin2 = new Admin(2002, 'Laura Ramirez', 'Bodega Sur', 'laura@example.com', 'password4');

// Datos de ejemplo para Cliente
const cliente1 = new Cliente(3001, 'Maria Lopez', 'CC', 'maria@example.com', 'password5', []);
const cliente2 = new Cliente(3002, 'Jose Ruiz', 'CC', 'jose@example.com', 'password6', []);

// Datos de ejemplo para Pedido
const pedido1 = new Pedido(1, 'Calle 123', 'Localidad 1', 11001, 'Bogotá', 3, 'En tránsito', new Date(), null, null, 'foto1.jpg', 'Sin novedad', 'origen1','destino1', cliente1, admin1, conductor1);
const pedido2 = new Pedido(2, 'Carrera 45', 'Localidad 2', 22001, 'Medellín', 2, 'En tránsito', null, new Date(), null, 'foto2.jpg', 'Retrasado', 'origen2','destino2', cliente2, admin2, conductor1);

// Agrega los pedidos a los clientes
cliente1.pedidos.push(pedido1);
cliente2.pedidos.push(pedido2);

// Exporta los datos
export const CLIENTES: Cliente[] = [cliente1, cliente2];
export const CONDUCTORES: Conductor[] = [conductor1, conductor2];
export const ADMIN: Admin[] = [admin1, admin2]; // Cambiado a ADMINISTRADORES para mayor claridad
export const VEHICULOS: Vehiculo[] = [vehiculo1, vehiculo2];
export const PEDIDOS: Pedido[] = [pedido1, pedido2];
