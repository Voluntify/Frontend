import { Component, OnInit,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { VoluntifyService } from '../../service/voluntify.service';
import { Router, RouterLink } from '@angular/router';
import { Organizaciones } from '../../model/organizaciones';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-subscription-page',
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
    ReactiveFormsModule,
    MatRadioModule
  ],
  templateUrl: './subscription-page.component.html',
  styleUrl: './subscription-page.component.css'
})


export class SubscriptionPageComponent {
  organizaciones: Organizaciones[] = [];
  suscripcionActiva: boolean = false; 

  constructor(
    private voluntifyService: VoluntifyService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Llamar al servicio para obtener las organizaciones y verificar los datos
    this.voluntifyService.obtenerInfoOrganizationMain().subscribe(
      (data: Organizaciones[]) => {
        this.organizaciones = data;
      },
      (error) => {
        console.error('Error al cargar las organizaciones', error);
      }
    );
  }

  actualizarSuscripcion(organizaciones: Organizaciones): void {
    this.voluntifyService.setSuscripcion(this.organizaciones[0].suscripcion_activa);

    this.voluntifyService.putSuscripcion(organizaciones).subscribe(
      (updatedUser) => {
        this.snackBar.open('Suscripción actualizada exitosamente', 'Cerrar', { duration: 3000 });
      },
      (error) => {
        this.snackBar.open('Error al actualizar la suscripción', 'Cerrar', { duration: 3000 });
      }
    );  
  }

  cancelar(): void {
    this.router.navigate(['/organization-main']);
  }
}