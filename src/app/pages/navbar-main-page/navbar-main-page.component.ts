import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-navbar-main-page',
  standalone: true,
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './navbar-main-page.component.html',
  styleUrl: './navbar-main-page.component.css'
})
export class NavbarMainPageComponent {

}
