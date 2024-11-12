import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { VoluntifyService } from '../../service/voluntify.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-organization-page',
  standalone: true,
  imports: [
    MatLabel,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    ReactiveFormsModule
    ],
  templateUrl: './login-organization-page.component.html',
  styleUrl: './login-organization-page.component.css'
})
export class LoginOrganizationPageComponent {
  loginOrganizationForm: FormGroup;

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
      this.voluntifyService.loginOrg(this.loginOrganizationForm.value).subscribe(
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
