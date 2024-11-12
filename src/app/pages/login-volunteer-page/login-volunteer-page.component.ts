import { Component, signal } from '@angular/core';
import { MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VoluntifyService } from '../../service/voluntify.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login-volunteer-page',
  standalone: true,
  imports: [
    MatLabel,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login-volunteer-page.component.html',
  styleUrl: './login-volunteer-page.component.css'
})
export class LoginVolunteerPageComponent {
  loginVolunteerForm: FormGroup;

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
      this.voluntifyService.login(this.loginVolunteerForm.value).subscribe(
        response => {
          this.router.navigate(['/main']),
          this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', { duration: 3000 });
        },
        error => {
          this.snackBar.open('Nombre o contraseña incorrecta, intentalo de nuevo', 'Cerrar', { duration: 3000 });
        }
      );
    }
  }
}
