import { Component, OnInit} from '@angular/core';
import { VoluntifyService } from '../../service/voluntify.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Voluntariados } from '../../model/voluntariados';

@Component({
  selector: 'app-cardsmain',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule, 
    CommonModule
  ],
  templateUrl: './cardsmain.component.html',
  styleUrl: './cardsmain.component.css'
})
export class CardsmainComponent implements OnInit {
  voluntariados: Voluntariados[] = [];

  constructor(
    private voluntifyService: VoluntifyService
  ) { }

  ngOnInit() {
    this.voluntifyService.getAllVoluntariados().subscribe(
      (data: Voluntariados[]) => {
        this.voluntariados = data; 
      },
      (error) => {
        console.error('Error al cargar los voluntariados', error);
      }
    );
  }
}