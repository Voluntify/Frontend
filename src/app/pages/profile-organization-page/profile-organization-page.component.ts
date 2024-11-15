import { Component, OnInit} from '@angular/core';
import { VoluntifyService } from '../../service/voluntify.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Organizaciones } from '../../model/organizaciones';
import { Voluntariado } from '../../model/voluntariado';

@Component({
  selector: 'app-profile-organization-page',
  standalone: true,
  imports: [],
  templateUrl: './profile-organization-page.component.html',
  styleUrl: './profile-organization-page.component.css'
})
export class ProfileOrganizationPageComponent {

}
