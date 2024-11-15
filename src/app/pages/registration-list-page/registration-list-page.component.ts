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
import { inscripcionVoluntariado } from '../../model/inscripcionVoluntariado';

@Component({
  selector: 'app-registration-list-page',
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
  templateUrl: './registration-list-page.component.html',
  styleUrl: './registration-list-page.component.css'
})
export class RegistrationListPageComponent implements OnInit{
  inscripciones: inscripcionVoluntariado[] = [];

  constructor(
    private voluntifyService: VoluntifyService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    //se obtienen la informacion del voluntariado
    this.getInscripcionesAVoluntariado();
  }

  getInscripcionesAVoluntariado(){
    this.voluntifyService.getInscripcionesAVoluntariado().subscribe(
      (data: inscripcionVoluntariado[]) => {
        this.inscripciones = data; 
      },
      (error) => {
        this.snackBar.open('Error al cargar las inscripciones', 'Cerrar', { duration: 3000 });
      }
    );
  }
}