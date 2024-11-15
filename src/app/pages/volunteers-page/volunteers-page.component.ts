import { Component } from '@angular/core';
import { NavbarMainPageComponent } from "../navbar-main-page/navbar-main-page.component";
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { voluntariadosTotal } from '../../model/voluntariadosTotal';
import { VoluntifyService } from '../../service/voluntify.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-volunteers-page',
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
  templateUrl: './volunteers-page.component.html',
  styleUrl: './volunteers-page.component.css'
})
export class VolunteersPageComponent {
  token: string | null = null;
  voluntariados: voluntariadosTotal[] = [];
  nombreBuscar: string = '';  

  constructor(
    private voluntifyService: VoluntifyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //se obtienen todos los voluntariados
    this.getVoluntariados();
  }

  getVoluntariados(){
    this.voluntifyService.getAllVoluntariados().subscribe(
      (data: voluntariadosTotal[]) => {
        this.voluntariados = data; 
      },
      (error) => {
        console.error('Error al cargar los voluntariados', error);
      }
    );
  }

  getVoluntariadosByName(): void {
    if (this.nombreBuscar) {
      // Guardar el nombre en localStorage
      this.voluntifyService.setNombreABuscar(this.nombreBuscar); 
      // Usa la funcion searchVoluntariadosByName para buscar voluntariados por nombre
      this.voluntifyService.getVoluntariadosByName().subscribe(
        (data: voluntariadosTotal[]) => {
          this.voluntariados = data;  
        },
        (error) => {
          console.error('Error al buscar voluntariados', error);
        }
      );
    } else {
      //Si el nombre no existe, se cargan todos los voluntariados
      this.getVoluntariados();  
    }
  }

  ConocerMas(voluntariado: voluntariadosTotal): void {
    this.voluntifyService.setNameVoluntariadoSelected(voluntariado.nombre as string);
    this.router.navigate(['/volunteer-selected-page']);
  }
}
