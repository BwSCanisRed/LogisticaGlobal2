import { Pedido } from "./pedido";

export class Cliente {
    cedula: number;
    nombre: string;
    tipo_documento: string;
    correo: string;
    contraseña: string;
    pedidos: Pedido[]; // Asegúrate de tener un modelo de Pedido también
  
    constructor(
      cedula: number,
      nombre: string,
      tipo_documento: string,
      correo: string,
      contraseña: string,
      pedidos: Pedido[] = []
    ) {
      this.cedula = cedula;
      this.nombre = nombre;
      this.tipo_documento = tipo_documento;
      this.correo = correo;
      this.contraseña = contraseña;
      this.pedidos = pedidos;
    }
  }