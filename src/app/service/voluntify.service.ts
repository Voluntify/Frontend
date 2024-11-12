import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Usuarios } from '../model/usuarios';
import { Organizaciones } from '../model/organizaciones';
import { Login} from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class VoluntifyService {

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

    //metodo para loguear usuario
    loginUser(user: Login): Observable<{ token: string }> {
      return this.http.post<{ token: string }>(`${this.apiUrl}/authenticate`, user);
    }    

    //metodo para loguear organizacion
    loginOrg(user: Login): Observable<{ token: string }> {
      return this.http.post<{ token: string }>(`${this.apiUrl}/authenticate`, user);
    } 
}
