import { Admin } from './admin'; // Asegúrate de que el path es correcto
import { Cliente } from './cliente'; // Asegúrate de que el path es correcto
import { Conductor } from './conductor'; // Asegúrate de que el path es correcto

export class Pedido {
    id: number;
    direccion: string;
    localidad: string;
    cd_postal: number;
    ciudad: string;
    ct_paquetes: number;
    estado: string;
    origen:String;
    destino:String|null;
    fechaBodega: Date | null;
    fechaTransito: Date | null;
    fechaEntregado: Date | null;
    foto: string|null;
    novedad: string|null;
    cliente?: Cliente;
    admin?: Admin;
    conductor?: Conductor;

    constructor(
      id: number,
      direccion: string,
      localidad: string,
      cd_postal: number,
      ciudad: string,
      ct_paquetes: number,
      estado: string,
      fechaBodega: Date | null,
      fechaTransito: Date | null,
      fechaEntregado: Date | null,
      foto: string,
      novedad: string,
      origen:string,
      destino:string,
      cliente: Cliente,
      admin: Admin,
      conductor: Conductor
    ) {
      this.id = id;
      this.direccion = direccion;
      this.localidad = localidad;
      this.cd_postal = cd_postal;
      this.ciudad = ciudad;
      this.ct_paquetes = ct_paquetes;
      this.estado = estado;
      this.fechaBodega = fechaBodega;
      this.fechaTransito = fechaTransito;
      this.fechaEntregado = fechaEntregado;
      this.foto = foto;
      this.destino=destino;
      this.origen=origen;
      this.novedad = novedad;
      this.cliente = cliente;
      this.admin = admin;
      this.conductor = conductor;
    }
  }
