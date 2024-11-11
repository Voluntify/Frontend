import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-start-page',
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterLink,
  ],
  templateUrl: './navbar-start-page.component.html',
  styleUrl: './navbar-start-page.component.css'
})
export class NavbarStartPageComponent {

}
