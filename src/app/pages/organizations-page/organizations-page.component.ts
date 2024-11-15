import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-organizations-page',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions, 
    CommonModule
  ],
  templateUrl: './organizations-page.component.html',
  styleUrl: './organizations-page.component.css'
})
export class OrganizationsPageComponent {

}
