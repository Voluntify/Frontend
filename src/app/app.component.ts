import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarStartPageComponent } from "./pages/navbar-start-page/navbar-start-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarStartPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'voluntify';
}
