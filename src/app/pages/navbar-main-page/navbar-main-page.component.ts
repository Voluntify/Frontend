import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-navbar-main-page',
  standalone: true,
  imports: [
    MatIconModule,
    MatToolbarModule,
    RouterLink,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './navbar-main-page.component.html',
  styleUrl: './navbar-main-page.component.css'
})
export class NavbarMainPageComponent {

}
