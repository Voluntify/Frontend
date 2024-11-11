import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarStartPageComponent } from "../navbar-start-page/navbar-start-page.component";

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [RouterLink, NavbarStartPageComponent],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.css'
})
export class StartPageComponent {

}
