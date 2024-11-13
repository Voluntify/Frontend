import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { VoluntifyService } from '../../service/voluntify.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-organization-page',
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
  templateUrl: './login-organization-page.component.html',
  styleUrl: './login-organization-page.component.css'
})
export class LoginOrganizationPageComponent {
  loginOrganizationForm: FormGroup;
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
    this.loginOrganizationForm = this.fb.group({
      nombre: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  LoginOrganization() {
    if (this.loginOrganizationForm.valid) {
      this.voluntifyService.loginUser(this.loginOrganizationForm.value).subscribe(
        response => {
          if (response.jwttoken) {
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
