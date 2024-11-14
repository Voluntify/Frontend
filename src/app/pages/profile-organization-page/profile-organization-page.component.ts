import { Component, OnInit} from '@angular/core';
import { VoluntifyService } from '../../service/voluntify.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Organizaciones } from '../../model/organizaciones';
import { Voluntariado } from '../../model/voluntariado';

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
  MatInputModule
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
    private router: Router
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
    this.voluntifyService.obtenerVoluntariadosPorOrganizacion().subscribe(
      (data: Voluntariado[]) => {
        this.voluntariados = data; 
      },
      (error) => {
        console.error('Error al cargar los voluntariados', error);
      }
    );
  }
}
