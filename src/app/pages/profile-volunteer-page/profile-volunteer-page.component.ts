import { Component, OnInit } from '@angular/core';
import { VoluntifyService } from '../../service/voluntify.service';
import { Usuarios } from '../../model/usuarios';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HabilidadesPorUsuario } from '../../model/habilidadesPorUsuario';
import { InteresesPorUsuario } from '../../model/interesesPorUsuario';
import { VoluntariadosPorUsuario } from '../../model/voluntariadosPorUsuario';

@Component({
  selector: 'app-profile-volunteer-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './profile-volunteer-page.component.html',
  styleUrl: './profile-volunteer-page.component.css'
})

export class ProfileVolunteerPageComponent implements OnInit {
  usuario: Usuarios[] = [];  
  habilidad: HabilidadesPorUsuario[] = [];
  interes: InteresesPorUsuario[] = [];
  voluntariados: VoluntariadosPorUsuario[] = [];

  constructor(
    private voluntifyService: VoluntifyService
  ) {}

  ngOnInit(): void {
    this.obtenerPerfil();
    this.obtenerHabilidadesPorPerfil();
    this.obtenerInteresesPorPerfil();
    this.obtenerVoluntariadosPorPerfil();
  }

  //uso este luego para obtiene el correo en seetings para actualizar
  obtenerPerfil(): void {
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

  obtenerVoluntariadosPorPerfil(): void {
    this.voluntifyService.obtenerVoluntariadosRealizadosorPerfil().subscribe(
      (data: VoluntariadosPorUsuario[]) => {  
        if (data) {
          this.voluntariados = data;  
        } 
      },
      (error) => {
        console.error('Error al obtener el perfil', error);
      }
    );
  }
  
}
