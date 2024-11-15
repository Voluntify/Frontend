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
import { Organizaciones } from '../../model/organizaciones';
import { Voluntariado } from '../../model/voluntariado';
import { NavbarOrganizationsComponent } from "../navbar-organizations/navbar-organizations.component";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-organization-page',
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
  templateUrl: './profile-organization-page.component.html',
  styleUrl: './profile-organization-page.component.css'
})
export class ProfileOrganizationPageComponent implements OnInit{
  token: string | null = null;
  organizaciones: Organizaciones[] = [];
  voluntariados: Voluntariado[] = [];

  constructor(
    private voluntifyService: VoluntifyService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    //se obtienen la informacion de la organizacion
    this.obtenerInfoOrganizationMain();
    this.obtenerVoluntariadosPorOrganizacion();
  }

  obtenerInfoOrganizationMain(){
    this.voluntifyService.obtenerInfoOrganizationMain().subscribe(
      (data: Organizaciones[]) => {
        this.organizaciones = data; 
      },
      (error) => {
        console.error('Error al cargar la informacion', error);
      }
    );
  }

  obtenerVoluntariadosPorOrganizacion(){
    this.voluntifyService.obtenerVoluntariadosPorOrganizacionA().subscribe(
      (data: Voluntariado[]) => {
        this.voluntariados = data; 
      },
      (error) => {
        console.error('Error al cargar los voluntariados', error);
      }
    );
  }

  //metodo para actualizar la contrasena
  actualizarContrasena(organizaciones: Organizaciones){
    // Guardar la contrasena en localStorage 
    this.voluntifyService.sePassword(this.organizaciones[0].contrasena as string);
  
    // Usa al método de actualización 
    this.voluntifyService.putOrgPassword(organizaciones).subscribe(
      (updatedUser) => {
        this.snackBar.open('Contraseña actualizada exitosamente', 'Cerrar', { duration: 3000 });
      },
      (error) => {
        this.snackBar.open('Error al actualizar la contraseña', 'Cerrar', { duration: 3000 });
      }
    );
  }
}