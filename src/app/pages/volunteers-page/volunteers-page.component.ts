import { Component } from '@angular/core';
import { NavbarMainPageComponent } from "../navbar-main-page/navbar-main-page.component";
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { voluntariadosTotal } from '../../model/voluntariadosTotal';
import { VoluntifyService } from '../../service/voluntify.service';

@Component({
  selector: 'app-volunteers-page',
  standalone: true,
  imports: [
    NavbarMainPageComponent,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './volunteers-page.component.html',
  styleUrl: './volunteers-page.component.css'
})
export class VolunteersPageComponent {
  token: string | null = null;
  voluntariados: voluntariadosTotal[] = [];

  constructor(
    private voluntifyService: VoluntifyService
  ) {}

  ngOnInit(): void {
    //se obtienen todos los voluntariados
    this.voluntifyService.getAllVoluntariados().subscribe(
      (data: voluntariadosTotal[]) => {
        this.voluntariados = data; 
      },
      (error) => {
        console.error('Error al cargar los voluntariados', error);
      }
    );
  }
}
