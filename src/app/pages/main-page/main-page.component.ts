import { Component, OnInit} from '@angular/core';
import { VoluntifyService } from '../../service/voluntify.service';
import { CommonModule } from '@angular/common';
import { Voluntariados } from '../../model/voluntariados';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NavbarMainPageComponent } from "../navbar-main-page/navbar-main-page.component";

@Component({
  selector: 'app-main-page',
  standalone: true,
imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    NavbarMainPageComponent
],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit{
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
