import { Component, OnInit} from '@angular/core';
import { CardsmainComponent } from "../cardsmain/cardsmain.component";
import { VoluntifyService } from '../../service/voluntify.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-page',
  standalone: true,
imports: [
  CardsmainComponent,
  CommonModule
],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit{
  token: string | null = null;

  constructor(private voluntifyService: VoluntifyService) {}

  ngOnInit(): void {
    this.viewJWTToken();
  }

  viewJWTToken() {
    this.token = this.voluntifyService.getToken();
  }
}
