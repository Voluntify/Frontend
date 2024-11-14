import { Component } from '@angular/core';
import { NavbarOrganizationsComponent } from "../navbar-organizations/navbar-organizations.component";

@Component({
  selector: 'app-profile-organization-page',
  standalone: true,
  imports: [NavbarOrganizationsComponent],
  templateUrl: './profile-organization-page.component.html',
  styleUrl: './profile-organization-page.component.css'
})
export class ProfileOrganizationPageComponent {

}
