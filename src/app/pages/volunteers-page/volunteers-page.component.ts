import { Component } from '@angular/core';
import { NavbarMainPageComponent } from "../navbar-main-page/navbar-main-page.component";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-volunteers-page',
  standalone: true,
  imports: [
    NavbarMainPageComponent,
    MatIconModule
  ],
  templateUrl: './volunteers-page.component.html',
  styleUrl: './volunteers-page.component.css'
})
export class VolunteersPageComponent {
  
}
