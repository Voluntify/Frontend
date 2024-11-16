import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-organizations',
  standalone: true,
  imports: [
    MatIconModule,
    MatToolbarModule,
    RouterLink,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './navbar-organizations.component.html',
  styleUrl: './navbar-organizations.component.css'
})
export class NavbarOrganizationsComponent {
  constructor(private router: Router) {}

  CerrarSesion(): void {
    // Limpiar todo el localStorage
    localStorage.clear();

    // Navegar al inicio de sesión
    this.router.navigate(['/start']); 
  }
}
