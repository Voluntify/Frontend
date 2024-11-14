import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Usuarios } from '../model/usuarios';
import { Organizaciones } from '../model/organizaciones';
import { Login} from '../model/login';
import { voluntariadosTotal } from '../model/voluntariadosTotal';

@Injectable({
  providedIn: 'root'
})
export class VoluntifyService {
  public token: string | null = null;
  public name: string | null = null;

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

    //metodo para obtener el nombre del usuario
    setUsername(name: string) {
      this.name = name;
      localStorage.setItem('username', name);
    }

    //metodo para obtener el nombre del usuario
    getUsername(): string | null {
      return localStorage.getItem('username');
    }

    //metodo para guardar token en localstorage
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

    //metodo para obtener el perfil del usuario
    obtenerPerfil(): Observable<any> {
      const token = localStorage.getItem('token');
      var name = this.getUsername();
      return this.http.get<any>(`${this.apiUrl}/api/user/perfil`, {  
        params: new HttpParams().set('name', name || ''), headers: new HttpHeaders({
        //se envia el token como header
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` })
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
}
