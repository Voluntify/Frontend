import { Component } from '@angular/core';
import { NavbarMainPageComponent } from "../navbar-main-page/navbar-main-page.component";
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { organizacionesTotal } from '../../model/organizacionesTotal';
import { VoluntifyService } from '../../service/voluntify.service';

@Component({
  selector: 'app-organizations-page',
  standalone: true,
  imports: [
    NavbarMainPageComponent,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    FormsModule,
    CommonModule,

    MatFormFieldModule,

    MatInputModule
  ],
  templateUrl: './organizations-page.component.html',
  styleUrl: './organizations-page.component.css'
})
export class OrganizationsPageComponent {
  token: string | null = null;
  organizaciones: organizacionesTotal[] = [];
  nombreBuscar: string = '';  

  constructor(
    private voluntifyService: VoluntifyService
  ) {}

  ngOnInit(): void {
    //se obtienen todos los voluntariados
    this.getOrganizaciones();
  }

  getOrganizaciones(){
    this.voluntifyService.getAllOrganizaciones().subscribe(
      (data: organizacionesTotal[]) => {
        this.organizaciones = data
      }, 
      (error) => {
        console.error('Error al cargar las organizaciones', error)
      }
    );
  }

  getOrganizacionesByName(): void {
    if (this.nombreBuscar){
      // Guardar el nombre en localstorage
      this.voluntifyService.setNombreABuscar(this.nombreBuscar);
      // Usa la funcion getOrganizacionesByName para buscar organizaciones por nombre
      this.voluntifyService.getOrganizacionesByName().subscribe(
        (data: organizacionesTotal[]) => {
          this.organizaciones = data
        },
        (error) => {
          console.error('Error al buscar organizaciones', error)
        }
      );
    } else {
      //Si el nombre no existe, se cargan todas las organizaciones
      this.getOrganizaciones();
    }
  }
}
