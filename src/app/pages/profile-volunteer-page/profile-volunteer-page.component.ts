import { Component, OnInit } from '@angular/core';
import { VoluntifyService } from '../../service/voluntify.service';
import { Usuarios } from '../../model/usuarios';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-profile-volunteer-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ],
  templateUrl: './profile-volunteer-page.component.html',
  styleUrl: './profile-volunteer-page.component.css'
})

export class ProfileVolunteerPageComponent implements OnInit {
  usuario: Usuarios[] = [];  

  constructor(private usuariosService: VoluntifyService) {}

  ngOnInit(): void {
    this.obtenerPerfil();
  }

  obtenerPerfil(): void {
    this.usuariosService.obtenerPerfil().subscribe(
      (data: Usuarios[]) => {  
        if (data && data.length > 0) {
          this.usuario = data;  
          console.log('Perfil obtenido', this.usuario);  
        } 
      },
      (error) => {
        console.error('Error al obtener el perfil', error);
      }
    );
  }
  
}
