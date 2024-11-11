export interface Organizaciones {
    codigo?: number;
    nombre: String;
    descripcion: String;
    correo: String;
    telefono: number;
    direccion: String;
    sitio_web: String;
    fecha_registro: Date;
    suscripcion_activa: boolean;
    nivel_suscripcion: String;
    contrasena: String;
    rol: String;
}    