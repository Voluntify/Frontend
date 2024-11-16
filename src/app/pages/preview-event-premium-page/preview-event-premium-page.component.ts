import { Component, OnInit} from '@angular/core';
import { VoluntifyService } from '../../service/voluntify.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Voluntariado } from '../../model/voluntariado';
import { NavbarOrganizationsComponent } from "../navbar-organizations/navbar-organizations.component";
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-preview-event-premium-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    NavbarOrganizationsComponent,
    RouterLink
  ],
  templateUrl: './preview-event-premium-page.component.html',
  styleUrl: './preview-event-premium-page.component.css'
})

export class PreviewEventPremiumPageComponent implements OnInit{
  voluntariados: Voluntariado[] = [];

  constructor(
    private voluntifyService: VoluntifyService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    //se obtienen la informacion del voluntariado
    this.getVoluntariadosByNameAdmin();
  }

  getVoluntariadosByNameAdmin(){
    this.voluntifyService.getVoluntariadosByNameAdmin().subscribe(
      (data: Voluntariado[]) => {
        this.voluntariados = data; 
      },
      (error) => {
        console.error('Error al cargar el voluntariado', error);
      }
    );
  }

  //metodo para actualizar la contrasena
  actualizarDescripcion(voluntariados: Voluntariado){  
    // Usa al método de actualización 
    this.voluntifyService.putDescripcion(voluntariados, voluntariados.descripcion as string).subscribe(
      (updatedUser) => {
        this.snackBar.open('Descripcion actualizada exitosamente', 'Cerrar', { duration: 3000 });
      },
      (error) => {
        this.snackBar.open('Error al actualizar la descripcion', 'Cerrar', { duration: 3000 });
      }
    );
  }

  //metodo para actualizar la contrasena
  actualizarFecha_inicio(voluntariados: Voluntariado){  
    // Usa al método de actualización 
    this.voluntifyService.putFecha_inicio(voluntariados, new Date(voluntariados.fecha_inicio)).subscribe(
      (updatedUser) => {
        this.snackBar.open('Fecha_inicio actualizada exitosamente', 'Cerrar', { duration: 3000 });
      },
      (error) => {
        this.snackBar.open('Error al actualizar la Fecha_inicio', 'Cerrar', { duration: 3000 });
      }
    );
  }
  

  //metodo para actualizar la contrasena
  actualizaFecha_fin(voluntariados: Voluntariado){  
    // Usa al método de actualización 
    this.voluntifyService.putFecha_fin(voluntariados, new Date(voluntariados.fecha_fin)).subscribe(
      (updatedUser) => {
        this.snackBar.open('Fecha_fin actualizada exitosamente', 'Cerrar', { duration: 3000 });
      },
      (error) => {
        this.snackBar.open('Error al actualizar la Fecha_fin', 'Cerrar', { duration: 3000 });
      }
    );
  }

  //metodo para actualizar la contrasena
  actualizarUbicacion(voluntariados: Voluntariado){  
    // Usa al método de actualización 
    this.voluntifyService.putUbicacion(voluntariados, voluntariados.ubicacion as string).subscribe(
      (updatedUser) => {
        this.snackBar.open('Ubicacion actualizada exitosamente', 'Cerrar', { duration: 3000 });
      },
      (error) => {
        this.snackBar.open('Error al actualizar la Ubicacion', 'Cerrar', { duration: 3000 });
      }
    );
  }

  //metodo para actualizar la contrasena
  actualizarRequisitos(voluntariados: Voluntariado){  
    // Usa al método de actualización 
    this.voluntifyService.putRequisitos(voluntariados, voluntariados.requisitos as string).subscribe(
      (updatedUser) => {
        this.snackBar.open('Requisitos actualizados exitosamente', 'Cerrar', { duration: 3000 });
      },
      (error) => {
        this.snackBar.open('Error al actualizar los Requisitos', 'Cerrar', { duration: 3000 });
      }
    );
  }

  ListaInscritos(voluntariados: Voluntariado){
    this.voluntifyService.setVoluntariadoLista(voluntariados.titulo as string);
    this.router.navigate(['/list-view']);
  }

  Asistencias(voluntariados: Voluntariado){
    this.voluntifyService.setVoluntariadoLista(voluntariados.titulo as string);
    this.router.navigate(['/assistance-control']);
  }
}
