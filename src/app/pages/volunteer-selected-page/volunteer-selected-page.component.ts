import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { VoluntifyService } from '../../service/voluntify.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { VoluntariadosPorUsuario } from '../../model/voluntariadosPorUsuario';
import { NavbarMainPageComponent } from '../navbar-main-page/navbar-main-page.component';
import { RouterLink } from '@angular/router';
import { voluntariadosSeleccionado } from '../../model/voluntariadoSeleccionado';
import { UsuarioCodigo } from '../../model/usuarioCodigo';

@Component({
  selector: 'app-volunteer-selected-page',
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
    MatInputModule,
    RouterLink
    ],
  templateUrl: './volunteer-selected-page.component.html',
  styleUrl: './volunteer-selected-page.component.css'
})
export class VolunteerSelectedPageComponent {
  token: string | null = null;
  voluntariado: voluntariadosSeleccionado[] = [];
  userCode: UsuarioCodigo[] = [];

  constructor(
    private voluntifyService: VoluntifyService
  ) {}

  ngOnInit(): void {
    //se obtienen todos el voluntariado
    this.obtenerVoluntariadoSeleccionado();

    //se obtiene el codigo de usuario
    this.voluntifyService.obtenerUserCode().subscribe(
      (data) => { 
        if (data) {
          this.userCode = data; 
          this.voluntifyService.setUserCode(this.userCode[0].codigo);
        }
      },
      (error) => {
        console.error('Error al obtener el código de usuario', error);
      }
    );
  }

  obtenerVoluntariadoSeleccionado(){
    this.voluntifyService.obtenerVoluntariadoSeleccionado().subscribe(
      (data: voluntariadosSeleccionado[]) => {
        this.voluntariado = data; 
      },
      (error) => {
        console.error('Error al cargar el voluntariado', error);
      }
    );
  }
}
