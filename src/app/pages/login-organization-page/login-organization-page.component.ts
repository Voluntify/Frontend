import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-organization-page',
  standalone: true,
  imports: [
    MatLabel,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './login-organization-page.component.html',
  styleUrl: './login-organization-page.component.css'
})
export class LoginOrganizationPageComponent {

}
