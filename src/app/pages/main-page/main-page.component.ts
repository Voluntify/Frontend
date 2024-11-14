import { Component, OnInit} from '@angular/core';
import { VoluntifyService } from '../../service/voluntify.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NavbarMainPageComponent } from "../navbar-main-page/navbar-main-page.component";
import { voluntariadosTotal } from '../../model/voluntariadosTotal';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-main-page',
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
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit{
  token: string | null = null;
  voluntariados: voluntariadosTotal[] = [];

  constructor(
    private voluntifyService: VoluntifyService,
    private router: Router
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

  ConocerMas(voluntariado: voluntariadosTotal): void {
    this.voluntifyService.setNameVoluntariadoSelected(voluntariado.nombre as string);
    this.router.navigate(['/volunteer-selected-page']);
  }
}
