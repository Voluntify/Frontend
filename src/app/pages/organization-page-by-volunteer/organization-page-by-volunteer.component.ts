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
import { NavbarMainPageComponent } from "../navbar-main-page/navbar-main-page.component";

@Component({
  selector: 'app-organization-page-by-volunteer',
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
    NavbarMainPageComponent
],
  templateUrl: './organization-page-by-volunteer.component.html',
  styleUrl: './organization-page-by-volunteer.component.css'
})
export class OrganizationPageByVolunteerComponent implements OnInit{
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
    this.voluntifyService.obtenerInfoOrganizationMainB().subscribe(
      (data: Organizaciones[]) => {
        this.organizaciones = data; 
      },
      (error) => {
        console.error('Error al cargar la informacion', error);
      }
    );
  }

  obtenerVoluntariadosPorOrganizacion(){
    this.voluntifyService.obtenerVoluntariadosPorOrganizacionB().subscribe(
      (data: Voluntariado[]) => {
        this.voluntariados = data; 
      },
      (error) => {
        console.error('Error al cargar los voluntariados', error);
      }
    );
  }

  setIdVoluntariado(voluntariados: Voluntariado): void {
    this.voluntifyService.setIdVoluntariado(voluntariados.codigo as number);
    this.voluntifyService.setNombreABuscar(voluntariados.titulo as string);
    this.router.navigate(['/volunteer-selected-page']);
  }
}

