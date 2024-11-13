import { Component } from '@angular/core';
import { NavbarMainPageComponent } from "../navbar-main-page/navbar-main-page.component";
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Voluntariados } from '../../model/voluntariados';
import { VoluntifyService } from '../../service/voluntify.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-volunteers-page',
  standalone: true,
  imports: [
    NavbarMainPageComponent,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatLabel,
    MatIconModule,
    MatFormField
  ],
  templateUrl: './volunteers-page.component.html',
  styleUrl: './volunteers-page.component.css'
})
export class VolunteersPageComponent {
  token: string | null = null;
  voluntariados: Voluntariados[] = [];

  constructor(
    private voluntifyService: VoluntifyService
  ) {}

  ngOnInit(): void {
    //para ver el token
    this.viewJWTToken();
    //se obtienen todos los voluntariados
    this.voluntifyService.getAllVoluntariados().subscribe(
      (data: Voluntariados[]) => {
        this.voluntariados = data; 
      },
      (error) => {
        console.error('Error al cargar los voluntariados', error);
      }
    );
  }

  viewJWTToken() {
    this.token = this.voluntifyService.getToken();
  }
}
