import { Component, OnInit } from '@angular/core';
import { VoluntifyService } from '../../service/voluntify.service';
import { Usuarios } from '../../model/usuarios';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HabilidadesPorUsuario } from '../../model/habilidadesPorUsuario';
import { InteresesPorUsuario } from '../../model/interesesPorUsuario';
import { VoluntariadosPorUsuario } from '../../model/voluntariadosPorUsuario';
import { NavbarOrganizationsComponent } from "../navbar-organizations/navbar-organizations.component";
import { inscripcionVoluntariado } from '../../model/inscripcionVoluntariado';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-volunteer-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    NavbarOrganizationsComponent,
    MatRadioModule,
    FormsModule,
    MatFormFieldModule,
    MatSnackBarModule
],
  templateUrl: './volunteer-page.component.html',
  styleUrl: './volunteer-page.component.css'
})

export class VolunteerPageComponent implements OnInit {
  usuario: Usuarios[] = [];  
  habilidad: HabilidadesPorUsuario[] = [];
  interes: InteresesPorUsuario[] = [];
  voluntariados: VoluntariadosPorUsuario[] = [];
  inscripciones: inscripcionVoluntariado[] = [];

  constructor(
    private voluntifyService: VoluntifyService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerPerfil();
    this.obtenerHabilidadesPorPerfil();
    this.obtenerInteresesPorPerfil();
    this.obtenerVoluntariadosPorPerfil();
    //cargar inscripciones
    this.voluntifyService.obtenerInscripcionesPorUsuario().subscribe(
      (data: inscripcionVoluntariado[]) => {
        this.inscripciones = data;
      },
      (error) => {
        console.error('Error al cargar las organizaciones', error);
      }
    );
  }

  //uso este luego para obtiene el correo en seetings para actualizar
  obtenerPerfil(): void {
    this.voluntifyService.obtenerPerfilByAdmin().subscribe(
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
    this.voluntifyService.obtenerHabilidadesPorPerfilByAdmin().subscribe(
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
    this.voluntifyService.obtenerInteresesPorPerfilByAdmin().subscribe(
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
    this.voluntifyService.obtenerVoluntariadosRealizadosorPerfilByAdmin().subscribe(
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

  actualizarInscripcion(inscripciones: inscripcionVoluntariado): void {
    this.voluntifyService.putInscripcion(inscripciones, inscripciones.estado).subscribe(
      (updatedUser) => {
        this.snackbar.open('inscripcion actualizada exitosamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/list-view']);
      },
      (error) => {
        this.snackbar.open('Error al actualizar la inscripcion', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/list-view']);
      }
    );
  }
}