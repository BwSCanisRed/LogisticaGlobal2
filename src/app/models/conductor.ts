import { Pedido } from './pedido'; // Asegúrate de que el path es correcto
import { Vehiculo } from './vehiculo'; // Asegúrate de que el path es correcto

export class Conductor {
  cedula: number;
  nombre: string;
  licencia: number;
  zona: string;
  correo: string;
  contraseña: string;
  vehiculo: Vehiculo;
  rol:String;
  pedidos: Pedido[];

  constructor(
    cedula: number,
    nombre: string,
    licencia: number,
    zona: string,
    correo: string,
    contraseña: string,
    vehiculo: Vehiculo,
    rol:String,
    pedidos: Pedido[] = []
  ) {
    this.cedula = cedula;
    this.nombre = nombre;
    this.licencia = licencia;
    this.zona = zona;
    this.correo = correo;
    this.contraseña = contraseña;
    this.vehiculo = vehiculo;
    this.rol=rol;
    this.pedidos = pedidos;
  }
}
