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
import { asistencias } from '../../model/asistencias';

@Component({
  selector: 'app-assistance-control',
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
    RouterLink,
    NavbarOrganizationsComponent
  ],
  templateUrl: './assistance-control.component.html',
  styleUrl: './assistance-control.component.css'
})
export class AssistanceControlComponent implements OnInit{
  asistencia: asistencias[] = [];

  constructor(
    private voluntifyService: VoluntifyService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    //se obtienen la informacion del voluntariado
    this.getAsistencias();
  }

  getAsistencias(){
    this.voluntifyService.getAsistenciasVoluntariado().subscribe(
      (data: asistencias[]) => {
        this.asistencia = data; 
      },
      (error) => {
        console.error('Error al cargar el voluntariado', error);
      }
    );
  }

  Asistencias(voluntariados: Voluntariado){
    this.voluntifyService.setVoluntariadoLista(voluntariados.titulo as string);
    this.router.navigate(['/assistance-control']);
  }
}
