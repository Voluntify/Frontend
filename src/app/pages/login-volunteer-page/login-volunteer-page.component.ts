import { Component, signal } from '@angular/core';
import { MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login-volunteer-page',
  standalone: true,
  imports: [
    MatLabel,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './login-volunteer-page.component.html',
  styleUrl: './login-volunteer-page.component.css'
})
export class LoginVolunteerPageComponent {
}
