import { Component, OnInit } from '@angular/core';
import { VoluntifyService } from '../../service/voluntify.service';
import { Usuarios } from '../../model/usuarios';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HabilidadesPorUsuario } from '../../model/habilidadesPorUsuario';
import { InteresesPorUsuario } from '../../model/interesesPorUsuario';
import { HabilidadesNuevasPorUsuario } from '../../model/habilidadesNuevasPorUsuario';
import { habilidades } from '../../model/habilidades';
import { intereses } from '../../model/intereses';
import { InteresesNuevosPorUsuario } from '../../model/interesesNuevosPorUsuario';
import { NavbarMainPageComponent } from "../navbar-main-page/navbar-main-page.component";

@Component({
  selector: 'app-settings-volunteer-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    NavbarMainPageComponent
],
  templateUrl: './settings-volunteer-page.component.html',
  styleUrl: './settings-volunteer-page.component.css'
})
export class SettingsVolunteerPageComponent implements OnInit {
  usuario: Usuarios[] = [];  
  habilidad: HabilidadesPorUsuario[] = [];
  interes: InteresesPorUsuario[] = [];
  habilidadesTotal: habilidades[] = [];
  interesTotal: intereses[] = [];

  constructor(
    private voluntifyService: VoluntifyService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(){
    this.obtenerPerfil();
    this.obtenerHabilidadesPorPerfil();
    this.obtenerInteresesPorPerfil();
    this.obtenerHabilidades();
    this.obtenerIntereses();
  }

  // Método para obtener el perfil del usuario
  obtenerPerfil(){
    this.voluntifyService.obtenerPerfil().subscribe(
      (data: Usuarios[]) => {  
        if (data) {
          this.usuario = data;  
        } 
      },
      (error) => {
        console.error('Error al obtener el perfil', error);
      }
    );
  }

  // Método para actualizar el correo del usuario
  actualizarCorreo(usuario: Usuarios){
    // Guardar el correo en localStorage 
    this.voluntifyService.setCorreo(this.usuario[0].correo as string);
  
    // Usa al método de actualización 
    this.voluntifyService.putUserMail(usuario).subscribe(
      (updatedUser) => {
        this.snackBar.open('Correo actualizado exitosamente', 'Cerrar', { duration: 3000 });
      },
      (error) => {
        this.snackBar.open('Error al actualizar el correo', 'Cerrar', { duration: 3000 });
      }
    );
  }

  // Método para actualizar el telefono del usuario
  actualizarTelefono(usuario: Usuarios){
    // Guardar el telefono en localStorage 
    this.voluntifyService.setUserPhone(Number(this.usuario[0].telefono));
  
    // Usa al método de actualización 
    this.voluntifyService.putUserPhone(usuario).subscribe(
      (updatedUser) => {
        this.snackBar.open('Telefono actualizado exitosamente', 'Cerrar', { duration: 3000 });
      },
      (error) => {
        this.snackBar.open('Error al actualizar el telefono', 'Cerrar', { duration: 3000 });
      }
    );
  }

  // Método para actualizar la direccion del usuario
  actualizarDireccion(usuario: Usuarios){
    // Guardar la direccion en localStorage 
    this.voluntifyService.setDireccion(this.usuario[0].direccion as string);
  
    // Usa al método de actualización 
    this.voluntifyService.putUserLocation(usuario).subscribe(
      (updatedUser) => {
        this.snackBar.open('Direccion actualizada exitosamente', 'Cerrar', { duration: 3000 });
      },
      (error) => {
        this.snackBar.open('Error al actualizar la direccion', 'Cerrar', { duration: 3000 });
      }
    );
  }
  
  //metodo para obtener habilidades
  obtenerHabilidadesPorPerfil(): void {
    this.voluntifyService.obtenerHabilidadesPorPerfil().subscribe(
      (data: HabilidadesPorUsuario[]) => {  
        if (data) {
          this.habilidad = data;  
        } 
      },
      (error) => {
        console.error('Error al obtener el perfil', error);
      }
    );
  }

  //metodo para obtener intereses
  obtenerInteresesPorPerfil(): void {
    this.voluntifyService.obtenerInteresesPorPerfil().subscribe(
      (data: InteresesPorUsuario[]) => {  
        if (data) {
          this.interes = data;  
        } 
      },
      (error) => {
        console.error('Error al obtener el perfil', error);
      }
    );
  }

  //metodo para obtener habilidades totales
  obtenerHabilidades(){
    this.voluntifyService.obtenerHabilidades().subscribe(
      (data: habilidades[]) => {  
        if (data) {
          this.habilidadesTotal = data;  
        } 
      },
      (error) => {
        console.error('Error al obtener el perfil', error);
      }
    );
  }

  //metodo para ingresar una nueva habilidad
  agregarHabilidad(id_habilidades: number) {
    const id_usuarios = this.voluntifyService.getUserCode();

    if (id_usuarios && id_habilidades) {
      const nuevaHabilidad: HabilidadesNuevasPorUsuario = {
        id_usuarios: id_usuarios,
        id_habilidades: id_habilidades,
      };

      this.voluntifyService.addHabilidadesPorUsuaro(nuevaHabilidad).subscribe(
        response => {
          this.snackBar.open('Habilidad agregada exitosamente', 'Cerrar', { duration: 3000 });
          this.obtenerHabilidadesPorPerfil();  
        },
        error => {
          this.snackBar.open('Error al agregar la habilidad', 'Cerrar', { duration: 3000 });
        }
      );
    }
  }
  
  //metodo para obtener intereses totales
  obtenerIntereses(){
    this.voluntifyService.obtenerIntereses().subscribe(
      (data: intereses[]) => {  
        if (data) {
          this.interesTotal = data;  
        } 
      },
      (error) => {
        console.error('Error al obtener el perfil', error);
      }
    );
  }

  //metodo para ingresar un nuevo interes
  agregarInteres(id_intereses: number) {
    const id_usuarios = this.voluntifyService.getUserCode();

    if (id_usuarios && id_intereses) {
      const nuevoInteres: InteresesNuevosPorUsuario = {
        id_usuarios: id_usuarios,
        id_intereses: id_intereses,
      };

      this.voluntifyService.addInteresesPorUsuaro(nuevoInteres).subscribe(
        response => {
          this.snackBar.open('Interes agregado exitosamente', 'Cerrar', { duration: 3000 });
          this.obtenerInteresesPorPerfil();  
        },
        error => {
          this.snackBar.open('Error al agregar el Interes', 'Cerrar', { duration: 3000 });
        }
      );
    }
  }
}
