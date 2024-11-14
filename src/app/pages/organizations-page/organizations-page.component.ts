import { Component } from '@angular/core';
import { NavbarMainPageComponent } from "../navbar-main-page/navbar-main-page.component";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { VoluntifyService } from '../../service/voluntify.service';
import { Organizaciones } from '../../model/organizaciones';

@Component({
  selector: 'app-organizations-page',
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
  templateUrl: './organizations-page.component.html',
  styleUrl: './organizations-page.component.css'
})
export class OrganizationsPageComponent {
  token: string | null = null;
  organizaciones: Organizaciones[] = [];

  constructor(
    private voluntifyService: VoluntifyService
  ) {}

  ngOnInit(): void {
    //para ver el token
    this.viewJWTToken();
    //se obtienen todos las organizaciones
    this.voluntifyService.getAllOrganizaciones().subscribe(
      (data: Organizaciones[]) => {
        this.organizaciones = data; 
      },
      (error) => {
        console.error('Error al cargar las organizaciones', error);
      }
    );
  }

  viewJWTToken() {
    this.token = this.voluntifyService.getToken();
  }
}
