import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Usuarios } from '../model/usuarios';
import { Organizaciones } from '../model/organizaciones';
import { Login} from '../model/login';
import { inscripcionVoluntariado } from '../model/inscripcionVoluntariado';
import { HabilidadesNuevasPorUsuario } from '../model/habilidadesNuevasPorUsuario';
import { InteresesNuevosPorUsuario } from '../model/interesesNuevosPorUsuario';

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
}
