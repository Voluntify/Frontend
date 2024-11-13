import { Component, signal } from '@angular/core';
import { MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VoluntifyService } from '../../service/voluntify.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login-volunteer-page',
  standalone: true,
  imports: [
    MatLabel,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login-volunteer-page.component.html',
  styleUrl: './login-volunteer-page.component.css'
})
export class LoginVolunteerPageComponent {
  loginVolunteerForm: FormGroup;
  token: string | null = null;

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(
    private fb: FormBuilder,
    private voluntifyService: VoluntifyService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginVolunteerForm = this.fb.group({
      nombre: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  LoginVolunteer() {
    if (this.loginVolunteerForm.valid) {
      this.voluntifyService.loginUser(this.loginVolunteerForm.value).subscribe(
        response => {
          if (response && response.jwttoken) {
            //almacena el token en la variable token
            this.token = response.jwttoken;
            //almacena el token en el servicio en el localstorage
            this.voluntifyService.setToken(response.jwttoken); 
            //redirige a la pagina principal "main"
            this.router.navigate(['/main']);
            //muestra un mensaje de inicio de sesion exitoso
            this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', { duration: 3000 });
          } else {
            this.snackBar.open('Error al obtener el token', 'Cerrar', { duration: 3000 });
          }
        },
        error => {
          this.snackBar.open('Nombre o contraseña incorrecta, intentalo de nuevo', 'Cerrar', { duration: 3000 });
        }
      );
    }
  }
  
}
