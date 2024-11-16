import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Usuarios } from '../model/usuarios';
import { Organizaciones } from '../model/organizaciones';
import { Login} from '../model/login';
import { inscripcionVoluntariado } from '../model/inscripcionVoluntariado';
import { HabilidadesNuevasPorUsuario } from '../model/habilidadesNuevasPorUsuario';
import { InteresesNuevosPorUsuario } from '../model/interesesNuevosPorUsuario';
import { Voluntariado } from '../model/voluntariado';

@Injectable({
  providedIn: 'root'
})
export class VoluntifyService {
  public token: string | null = null;
  public name: string | null = null;
  public userCode: number | null = null;  
  public idVoluntariado: number | null = null;
  public correo: string | null = null;
  public telefono: number | null = null;
  public direccion: string | null = null;
  public contrasena: string | null = null;
  public idOrganizacion: number | null = null;
  public suscripcion_activa: boolean = false;
  public voluntariadoAMostrar: string | null = null;
  public voluntariadoLista: string | null = null;
  public idAceptar: number | null = null;
  public idInscripcion: number | null = null;
  public estado_inscripcion: boolean = false;
  

  private apiUrl = 'http://localhost:8080'; // URL del backend

  constructor(private http: HttpClient) { }

   //metodo para registrar usuario
   addUsuario(usuarios: Usuarios): Observable<Usuarios> {
    return this.http.post<Usuarios>(`${this.apiUrl}/api/RegistroDeNuevoUsuario`, usuarios, { 
       headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
    }  

    //metodo para registrar organizacion
   addOrganizacion(organizaciones: Organizaciones): Observable<Usuarios> {
    return this.http.post<Usuarios>(`${this.apiUrl}/api/RegistroDeOrganizacion`, organizaciones, { 
       headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
    }  

    //metodo para loguear usuario u organizacion
    loginUser(user: Login): Observable<{ jwttoken: string }> {
      return this.http.post<{ jwttoken: string }>(`${this.apiUrl}/authenticate`, user, { 
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
     });
    }

    //metodo para almacenar el nombre del usuario
    setUsername(name: string) {
      this.name = name;
      localStorage.setItem('username', name);
    }

    //metodo para obtener el nombre del usuario
    getUsername(): string | null {
      return localStorage.getItem('username');
    }

    //metodo para almacenar token en localstorage
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('token', token);
    }
  
    //metodo para obtener token de localsotrage
    getToken(): string | null {
      return localStorage.getItem('token');
    }
    
    //metodo para obtener todos los voluntariados
    getAllVoluntariados() {
      //se almacena en la constante token el token del localstorage
      const token = localStorage.getItem('token'); 
      //se retorna los voluntariados si el token enviado es correcto
      return this.http.get<any>(`${this.apiUrl}/api/user/VerVoluntariadosTodos`, { headers: new HttpHeaders({
        //se envia el token como header
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` })
    });
    }

    //metodo para obtener todos las organizaciones
    getAllOrganizaciones(){
      const token = localStorage.getItem('token');
      //se retorna los voluntariados si el token enviado es correcto
      return this.http.get<any>(`${this.apiUrl}/api/user/VerOrganizacionesTodos`, { headers: new HttpHeaders({
        //se envia el token como header
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` })
    });

    }

    // Método para guardar el nombre del voluntariado en localStorage, para buscar por nombre
    setNombreABuscar(name: string){
      this.name = name;
      localStorage.setItem('name', name);
    }

    // Método para obtener el nombre del voluntariado desde localStorage, para buscar por nombre
    getNombreABuscar(): string | null {
      return localStorage.getItem('name');
    }

    //metodo para buscar voluntariados por nombre
    getVoluntariadosByName(){
      //se almacena en la constante token el token del localstorage
      const token = localStorage.getItem('token');
      //se almacena en la constante name el name del localstorage con la funcion getNombreABuscar
      var name = this.getNombreABuscar();
      return this.http.get<any>(`${this.apiUrl}/api/user/VerVoluntariadosPorNombre`, { 
        //se envia el nombre como parametro
        params: new HttpParams().set('name', name || ''), 
        //se envia el token como header
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
       });
    }

    //metodo para buscar organizaciones por nombre
    getOrganizacionesByName(){
      //se almacena en la constante token el token del localstorage
      const token = localStorage.getItem('token')
      //se almacena en la constante name el name del localstorage con la funcion getNombreABuscar
      const name = this.getNombreABuscar();
      return this.http.get<any>(`${this.apiUrl}/api/user/VerOrganizacionesPorNombre`, {
        //se envia el nombre como parametro
        params: new HttpParams().set('name', name || ''),
        //se envia el token como header
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      }) 
    }

    //metodo para obtener el perfil del usuario
    obtenerPerfil(): Observable<any> {
      const token = localStorage.getItem('token');
      var name = this.getUsername();
      return this.http.get<any>(`${this.apiUrl}/api/user/perfil`, {  
        //se envia el nombre como parametro
        params: new HttpParams().set('name', name || ''), 
        headers: new HttpHeaders({
        //se envia el token como header
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` })
    });
    }

    //metodo para obtener habilidades del usuario
    obtenerHabilidadesPorPerfil(): Observable<any> {
      const token = localStorage.getItem('token');
      var name = this.getUsername();
      return this.http.get<any>(`${this.apiUrl}/api/user/HabilidadesPorPerfil`, {  
        //se envia el nombre como parametro
        params: new HttpParams().set('name', name || ''), 
        headers: new HttpHeaders({
        //se envia el token como header
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` })
    });
    }

    //metodo para obtener intereses del usuario
    obtenerInteresesPorPerfil(): Observable<any> {
      const token = localStorage.getItem('token');
      var name = this.getUsername();
      return this.http.get<any>(`${this.apiUrl}/api/user/InteresesPorPerfil`, {  
        //se envia el nombre como parametro
        params: new HttpParams().set('name', name || ''), 
        headers: new HttpHeaders({
        //se envia el token como header
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` })
    });
    }

    //metodo para obtener voluntariados realizados del usuario
    obtenerVoluntariadosRealizadosorPerfil(): Observable<any> {
      const token = localStorage.getItem('token');
      var name = this.getUsername();
      return this.http.get<any>(`${this.apiUrl}/api/user/VoluntariadosRealizadosPorUsuario`, {  
        //se envia el nombre como parametro
        params: new HttpParams().set('name', name || ''), 
        headers: new HttpHeaders({
        //se envia el token como header
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` })
    });
    }

    //metodo para alamcenar el nombre del voluntariado seleccionado
    setNameVoluntariadoSelected(name: string) {
      this.name = name;
      localStorage.setItem('name', name);
    }

    //metodo para obtener el nombre del voluntariado seleccionado
    getNameVoluntariadoSelected(): string | null {
      return localStorage.getItem('name');
    }

    //metodo para obtener EL voluntariado seleccionado
    obtenerVoluntariadoSeleccionado(): Observable<any> {
      const token = localStorage.getItem('token');
      var name = this.getNameVoluntariadoSelected();
      return this.http.get<any>(`${this.apiUrl}/api/user/VerVoluntariadosPorNombreTotal`, {  
        //se envia el nombre como parametro
        params: new HttpParams().set('name', name || ''), 
        headers: new HttpHeaders({
        //se envia el token como header
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` })
    });
    }

    //metodo para almacenar el codigo del usuario usando el backend
    obtenerUserCode(): Observable<any> {
      const token = localStorage.getItem('token');
      var name = this.getUsername();
      return this.http.get<any>(`${this.apiUrl}/api/user/codigoUsuario`, {  
        //se envia el nombre como parametro
        params: new HttpParams().set('name', name || ''), 
        headers: new HttpHeaders({
        //se envia el token como header
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` })
    });
    }

    //metodo para almacenar el codigo del usuario en localstorage
    setUserCode(userCode: number) {
      this.userCode = userCode;
      localStorage.setItem('userCode', userCode.toString());
    }

    //metodo para obtener el codigo del usuario del localstorage
    getUserCode(): number | null {
      return localStorage.getItem('userCode') ? parseInt(localStorage.getItem('userCode') || '') : null;
    }

    //metodo para almacenar el id del voluntariado
    setIdVoluntariado(idVoluntariado: number) {
      this.idVoluntariado = idVoluntariado;
      localStorage.setItem('idVoluntariado', idVoluntariado.toString());
    }

    //metodo para obtener el id del voluntariado
    getIdVoluntariado(): number | null {
      return localStorage.getItem('idVoluntariado') ? parseInt(localStorage.getItem('idVoluntariado') || '') : null;
    }

    //metodo para registrar una inscripcion 
   addInscripcion(inscripcion: inscripcionVoluntariado): Observable<inscripcionVoluntariado> {
    const token = localStorage.getItem('token');
    return this.http.post<inscripcionVoluntariado>(`${this.apiUrl}/api/user/InscripcionAVoluntariado`, inscripcion, { headers: new HttpHeaders({
      //se envia el token como header
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` })
    });
    }

    //Metodos para editar el perfil del usuario
    // Método para almacenar el correo en localStorage
    setCorreo(correo: string){
      this.correo = correo;
      localStorage.setItem('correo', correo);
    }

    // Método para obtener el correo desde localStorage
    getCorreo(): string | null {
      return localStorage.getItem('correo');
    }

    //metodo para modificae el correo del usuario
    putUserMail(usuario: Usuarios): Observable<Usuarios> {
      const token = localStorage.getItem('token');
      const usuarioId = this.getUserCode();
      const correo = this.getCorreo();
    
      return this.http.put<Usuarios>(`${this.apiUrl}/api/user/CorreoModificacion`, usuario, { 
        params: new HttpParams()
          .set('usuarioId', usuarioId || '')  
          .set('correo', correo || ''),  
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      });
    }

    //metodo para almacenar el codigo del usuario en localstorage
    setUserPhone(telefono: number) {
      this.telefono = telefono;
      localStorage.setItem('telefono', telefono.toString());
    }

    //metodo para obtener el codigo del usuario del localstorage
    getUserPhone(): number | null {
      return localStorage.getItem('telefono') ? parseInt(localStorage.getItem('telefono') || '') : null;
    }

    //metodo para modificae el telefono del usuario
    putUserPhone(usuario: Usuarios): Observable<Usuarios> {
      const token = localStorage.getItem('token');
      const usuarioId = this.getUserCode();
      const telefono = this.getUserPhone();
    
      return this.http.put<Usuarios>(`${this.apiUrl}/api/user/TelefonoModificacion`, usuario, { 
        params: new HttpParams()
          .set('usuarioId', usuarioId || '')  
          .set('telefono', telefono || ''),  
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      });
    }

    // Método para almacenar la direccion en localStorage
    setDireccion(direccion: string){
      this.direccion = direccion;
      localStorage.setItem('direccion', direccion);
    }

    // Método para obtener la direccion desde localStorage
    getDireccion(): string | null {
      return localStorage.getItem('direccion');
    }
    
    //metodo para modificae la direccion del usuario
    putUserLocation(usuario: Usuarios): Observable<Usuarios> {
      const token = localStorage.getItem('token');
      const usuarioId = this.getUserCode();
      const direccion = this.getDireccion();
    
      return this.http.put<Usuarios>(`${this.apiUrl}/api/user/DireccionModificacion`, usuario, { 
        params: new HttpParams()
          .set('usuarioId', usuarioId || '')  
          .set('direccion', direccion || ''),  
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      });
    }

    //metodo para registrar habilidades por usuario
    addHabilidadesPorUsuaro(habilidadesNuevasPorUsuario: HabilidadesNuevasPorUsuario): Observable<HabilidadesNuevasPorUsuario> {
      const token = localStorage.getItem('token');
      return this.http.post<HabilidadesNuevasPorUsuario>(`${this.apiUrl}/api/user/RegistroHabilidadesPorUsuario`, habilidadesNuevasPorUsuario, { 
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` })
      });
    }

    //obtener todas las habilidades
    obtenerHabilidades(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/api/VerHabilidades`);
    }

    //metodo para registrar intereses por usuario
    addInteresesPorUsuaro(interesesNuevosPorUsuario: InteresesNuevosPorUsuario): Observable<InteresesNuevosPorUsuario> {
      const token = localStorage.getItem('token');
      return this.http.post<InteresesNuevosPorUsuario>(`${this.apiUrl}/api/user/RegistroInteresPorUsuario`, interesesNuevosPorUsuario, { 
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` })
      });
    }

    //metodo para obtener todos los intereses
    obtenerIntereses(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/api/VerIntereses`);
    }

    //metodo para obtener la informacion del main de la organizacion
    obtenerInfoOrganizationMain(): Observable<any> {
      const token = localStorage.getItem('token');
      var name = this.getUsername();
      return this.http.get<any>(`${this.apiUrl}/api/admin/VerOrganizacionesPorNombre`, {  
        //se envia el nombre como parametro
        params: new HttpParams().set('name', name || ''), 
        headers: new HttpHeaders({
        //se envia el token como header
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` })
    });
    }

    //metodo para obtener los voluntariados de una organizacion
    obtenerVoluntariadosPorOrganizacionA(): Observable<any> {
      const token = localStorage.getItem('token');
      var name = this.getUsername();
      return this.http.get<any>(`${this.apiUrl}/api/admin/VerVoluntariadosPorOrganizacionA`, {  
        //se envia el nombre como parametro
        params: new HttpParams().set('name', name || ''), 
        headers: new HttpHeaders({
        //se envia el token como header
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` })
    });
    }

  
    obtenerInfoOrganizationMainB(): Observable<any> {
      const token = localStorage.getItem('token');
      const name = localStorage.getItem('organizationName') || '';
      return this.http.get<any>(`${this.apiUrl}/api/user/VerOrganizacionesPorNombreB`, {
        params: new HttpParams().set('name', name),
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      });
    }
    
    obtenerVoluntariadosPorOrganizacionB(): Observable<any> {
      const token = localStorage.getItem('token');
      const name = localStorage.getItem('organizationName') || ''; 
      return this.http.get<any>(`${this.apiUrl}/api/user/VerVoluntariadosPorOrganizacionB`, {
        params: new HttpParams().set('name', name),
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      });
    }


    //metodo para almacenar el nombre de la organizacion en localstorage
    // Método para almacenar la direccion en localStorage
    sePassword(contrasena: string){
      this.contrasena = contrasena;
      localStorage.setItem('contrasena', contrasena);
    }

    // Método para obtener la direccion desde localStorage
    gePassword(): string | null {
      return localStorage.getItem('contrasena');
    }

    //metodo para actualizar contraseña de organizacion
    putOrgPassword(organizacion: Organizaciones): Observable<Usuarios> {
      const token = localStorage.getItem('token');
      const codigo = this.getUserCode();
      const contrasena = this.gePassword();
    
      return this.http.put<Usuarios>(`${this.apiUrl}/api/admin/ContrasenaModificar`, organizacion, { 
        params: new HttpParams()
          .set('codigo', codigo || '')  
          .set('contrasena', contrasena || ''),  
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      });
    }

      //metodo para almacenar el id de la organizacion
      setidOrganizacion(idOrganizacion: number) {
        this.idOrganizacion = idOrganizacion;
        localStorage.setItem('idOrganizacion', idOrganizacion.toString());
      }

      //metodo para obtener el id de la organizacion
      getidOrganizacion(): number | null {
        return localStorage.getItem('idOrganizacion') ? parseInt(localStorage.getItem('idOrganizacion') || '') : null;
      }

    //metodo para registrar un nuevo voluntariado 
    addVoluntariado(voluntariado: Voluntariado): Observable<Voluntariado> {
      const token = localStorage.getItem('token');
      return this.http.post<Voluntariado>(`${this.apiUrl}/api/admin/RegistrarVoluntariados`, voluntariado, { 
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` })
      });
    }

    //metodos para suscripcion
    setSuscripcion(suscripcion_activa: boolean){
      this.suscripcion_activa = suscripcion_activa;
      localStorage.setItem('suscripcion_activa', suscripcion_activa.toString());
    }

    // Método para obtener la suscripcion_activa desde localStorage
    getSuscripcion(): string | null {
      return localStorage.getItem('suscripcion_activa');
    }

    //metodo para convertir la suscripcion activa a booleano
    suscripcion_activaToBoolean(): boolean {
      const suscripcionActiva = localStorage.getItem('suscripcion_activa');
      if (suscripcionActiva === 'true') {
        return true;
      } else if (suscripcionActiva === 'false') {
        return false;
      }
      return false;
    }

    getIdOrg(): string | null {
      return localStorage.getItem('idOrganizacion');
    }

    //metodo para suscripcion
    putSuscripcion(usuario: Organizaciones): Observable<Organizaciones> {
      const token = localStorage.getItem('token');
      const id = this.getIdOrg(); 
      const suscripcion_activa = this.suscripcion_activaToBoolean();
      
      return this.http.put<Organizaciones>(`${this.apiUrl}/api/admin/SuscripcionDeOrganizacion`, usuario, { 
        params: new HttpParams()
          .set('id', id || '')  
          .set('suscripcion_activa', suscripcion_activa), 
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      });
    }


    setVoluntariadoAMostrar(voluntariadoAMostrar: string){
      this.voluntariadoAMostrar = voluntariadoAMostrar;
      localStorage.setItem('voluntariadoAMostrar', voluntariadoAMostrar);
    }

    // Método para obtener la suscripcion_activa desde localStorage
    getVoluntariadoAMostrar(): string | null {
      return localStorage.getItem('voluntariadoAMostrar');
    }

    //metodo para obtener voluntariados por nombre
    getVoluntariadosByNameAdmin(){
      //se almacena en la constante token el token del localstorage
      const token = localStorage.getItem('token');
      var voluntariadoAMostrar = this.getVoluntariadoAMostrar();
      return this.http.get<any>(`${this.apiUrl}/api/admin/VerVoluntariadosPorNombre`, { 
        //se envia el nombre como parametro
        params: new HttpParams().set('name', voluntariadoAMostrar || ''), 
        //se envia el token como header
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
       });
    }


    //Metodos para editar un voluntariado
    //metodo para modificar el correo del voluntariado
    putDescripcion(voluntariado: Voluntariado, descripcion: string): Observable<Voluntariado> {
      const token = localStorage.getItem('token');
      const Id = this.getIdVoluntariado();
      return this.http.put<Voluntariado>(`${this.apiUrl}/api/admin/DescripcionModificacion`, voluntariado, { 
        params: new HttpParams()
          .set('Id', Id || '')  
          .set('descripcion', descripcion || ''),  
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      });
    }

    //metodo para modificar los requisitos del voluntariado
    putRequisitos(voluntariado: Voluntariado, requisitos: string): Observable<Voluntariado> {
      const token = localStorage.getItem('token');
      const Id = this.getIdVoluntariado();
      return this.http.put<Voluntariado>(`${this.apiUrl}/api/admin/requisitosModificacion`, voluntariado, { 
        params: new HttpParams()
          .set('Id', Id || '')  
          .set('requisitos', requisitos || ''),  
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      });
    }

     //metodo para modificar la ubicacion del voluntariado
     putUbicacion(voluntariado: Voluntariado, ubicacion: string): Observable<Voluntariado> {
      const token = localStorage.getItem('token');
      const Id = this.getIdVoluntariado();
      return this.http.put<Voluntariado>(`${this.apiUrl}/api/admin/ubicacionModificacion`, voluntariado, { 
        params: new HttpParams()
          .set('Id', Id || '')  
          .set('ubicacion', ubicacion || ''),  
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      });
    }

     //metodo para modificar la fecha_fin del voluntariado
     putFecha_fin(voluntariado: Voluntariado, fecha_fin: Date): Observable<Voluntariado> {
      const token = localStorage.getItem('token');
      const Id = this.getIdVoluntariado();
      const fecha_finNew = fecha_fin.toISOString().split('T')[0];

      return this.http.put<Voluntariado>(`${this.apiUrl}/api/admin/fecha_finModificacion`, voluntariado, { 
        params: new HttpParams()
          .set('Id', Id || '')  
          .set('fecha_fin', fecha_finNew),  
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      });
    }

     //metodo para modificar la fecha_fin del voluntariado
     putFecha_inicio(voluntariado: Voluntariado, fecha_inicio: Date): Observable<Voluntariado> {
      const token = localStorage.getItem('token');
      const Id = this.getIdVoluntariado();
      const fecha_inicioNew = fecha_inicio.toISOString().split('T')[0]; 
      
      return this.http.put<Voluntariado>(`${this.apiUrl}/api/admin/fecha_inicioModificacion`, voluntariado, { 
        params: new HttpParams()
          .set('Id', Id || '')  
          .set('fecha_inicio', fecha_inicioNew),  
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      });
    }

    setVoluntariadoLista(voluntariadoLista: string) {
      this.voluntariadoLista = voluntariadoLista;
      localStorage.setItem('voluntariadoLista', voluntariadoLista);
    }

    //metodo para obtener el nombre del voluntariado seleccionado
    getVoluntariadoLista(): string | null {
      return localStorage.getItem('voluntariadoLista');
    }
    
    //metodo para obtener lista de inscripciones
    getInscripcionesAVoluntariado(){
      const token = localStorage.getItem('token')
      const name = this.getVoluntariadoLista();
      return this.http.get<any>(`${this.apiUrl}/api/admin/VerInscripcionesPorVoluntariado`, {
        //se envia el nombre como parametro
        params: new HttpParams().set('name', name || ''),
        //se envia el token como header
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      }) 
    }

    //metodo para usar la variable de aceptar o denegar solicitudes
    getidAceptar(): number | null {
      return localStorage.getItem('idAceptar') ? parseInt(localStorage.getItem('idAceptar') || '') : null;
    }

    //metodo para obtener el perfil del usuario
    obtenerPerfilByAdmin(): Observable<any> {
      const token = localStorage.getItem('token');
      var codigo = this.getidAceptar();
      return this.http.get<any>(`${this.apiUrl}/api/admin/perfil`, {  
        //se envia el nombre como parametro
        params: new HttpParams().set('codigo', codigo || ''), 
        headers: new HttpHeaders({
        //se envia el token como header
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` })
    });
    }

    //metodo para obtener habilidades del usuario
    obtenerHabilidadesPorPerfilByAdmin(): Observable<any> {
      const token = localStorage.getItem('token');
      var codigo = this.getidAceptar();
      return this.http.get<any>(`${this.apiUrl}/api/admin/HabilidadesPorPerfilAdmin`, {  
        //se envia el nombre como parametro
        params: new HttpParams().set('codigo', codigo || ''), 
        headers: new HttpHeaders({
        //se envia el token como header
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` })
    });
    }

    //metodo para obtener intereses del usuario
    obtenerInteresesPorPerfilByAdmin(): Observable<any> {
      const token = localStorage.getItem('token');
      var codigo = this.getidAceptar();
      return this.http.get<any>(`${this.apiUrl}/api/admin/InteresesPorPerfilByAdmin`, {  
        //se envia el nombre como parametro
        params: new HttpParams().set('codigo', codigo || ''), 
        headers: new HttpHeaders({
        //se envia el token como header
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` })
    });
    }

    //metodo para obtener voluntariados realizados del usuario
    obtenerVoluntariadosRealizadosorPerfilByAdmin(): Observable<any> {
      const token = localStorage.getItem('token');
      var codigo = this.getidAceptar();
      return this.http.get<any>(`${this.apiUrl}/api/admin/VoluntariadosRealizadosPorUsuarioByAdmin`, {  
        //se envia el nombre como parametro
        params: new HttpParams().set('codigo', codigo || ''), 
        headers: new HttpHeaders({
        //se envia el token como header
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` })
    });
    }


    //metodos para inscripcion
    setinscripcion(estado_inscripcion: boolean){
      this.estado_inscripcion = estado_inscripcion;
      localStorage.setItem('estado_inscripcion', estado_inscripcion.toString());
    }

    setIdInscripcion(idInscripcion: number) {
       this.idInscripcion = idInscripcion;
      localStorage.setItem('idInscripcion', idInscripcion.toString());
    }
    //metodo para usar la variable de aceptar o denegar inscripciones
    getIdInscripcion(): number | null {
      return localStorage.getItem('idInscripcion') ? parseInt(localStorage.getItem('idInscripcion') || '') : null;
    }

    //metodo para actualizar la inscripcion de un voluntariado (aceptar o rechazar)
    putInscripcion(inscripciones: inscripcionVoluntariado, estado_inscripcion: boolean): Observable<inscripcionVoluntariado> {
      const token = localStorage.getItem('token');
      const id = this.getIdInscripcion();
      return this.http.put<inscripcionVoluntariado>(`${this.apiUrl}/api/admin/EstadoDeInscripciones`, inscripciones, { 
        params: new HttpParams()
          .set('id', id || '')  
          .set('estado', estado_inscripcion || ''),  
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      });
    }

    //metodo para obtener voluntariados realizados del usuario
    obtenerInscripcionesPorUsuario(): Observable<any> {
      const token = localStorage.getItem('token');
      var codigo = this.getidAceptar();
      var inscripcion = this.getIdInscripcion();
      return this.http.get<any>(`${this.apiUrl}/api/admin/VerInscripcionesPorUsuario`, {  
        //se envia el nombre como parametro
        params: new HttpParams().set('codigo', codigo || '')
        .set('codigo2', inscripcion || ''), 
        headers: new HttpHeaders({
        //se envia el token como header
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` })
    });
    }

    //metodo para obtener las asistencias de un voluntariado
      getAsistenciasVoluntariado(){
      const token = localStorage.getItem('token');
      //se almacena en la constante name el name del localstorage con la funcion getNombreABuscar
      var name = this.getVoluntariadoLista();
      return this.http.get<any>(`${this.apiUrl}/api/admin/VerAsistenciasPorNombreDeVoluntariado`, { 
        //se envia el nombre como parametro
        params: new HttpParams().set('name', name || ''), 
        //se envia el token como header
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
       });
    }

}
