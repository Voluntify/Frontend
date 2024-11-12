import { Component } from '@angular/core';
import { NavbarMainPageComponent } from "../navbar-main-page/navbar-main-page.component";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [NavbarMainPageComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
