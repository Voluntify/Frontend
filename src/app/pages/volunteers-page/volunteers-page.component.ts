import { Component } from '@angular/core';
import { NavbarMainPageComponent } from "../navbar-main-page/navbar-main-page.component";
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-volunteers-page',
  standalone: true,
  imports: [
    NavbarMainPageComponent,
    MatIconModule,
    MatFormField,
    MatLabel
  ],
  templateUrl: './volunteers-page.component.html',
  styleUrl: './volunteers-page.component.css'
})
export class VolunteersPageComponent {
  
}
