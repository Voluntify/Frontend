import { Component} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { VoluntifyService } from '../../service/voluntify.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { NavbarMainPageComponent } from "../navbar-main-page/navbar-main-page.component";

@Component({
  selector: 'app-registration-form-page',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule,
    MatDatepickerModule,
    NavbarMainPageComponent
],
  templateUrl: './registration-form-page.component.html',
  styleUrl: './registration-form-page.component.css'
})
export class RegistrationFormPageComponent {
  RegistrationVol: FormGroup;

  constructor(
    private fb: FormBuilder,
    private voluntifyService: VoluntifyService, 
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.RegistrationVol = this.fb.group({
      estado: [null, Validators.required],
      fecha_inscripcion: ['', [Validators.required, this.fechaValida]], 
      id_usuarios: [this.voluntifyService.getUserCode(), Validators.required],
      id_voluntariados: [this.voluntifyService.getIdVoluntariado(), Validators.required]
    });
  }

  registrarInscripcion() {
    if (this.RegistrationVol.valid) {
      this.voluntifyService.addInscripcion(this.RegistrationVol.value).subscribe(
        response => {
          this.snackBar.open('Inscripcion realizada exitosamente', 'Cerrar', { duration: 3000 });
          this.RegistrationVol.reset();
          this.router.navigate(['/main']);
        },
        error => {
          this.snackBar.open('Error al realizar la inscripcion', 'Cerrar', { duration: 3000 });
        }
      );
    }
  }

  fechaValida(Control: { value: string | number | Date; }) {
    const Fecha = new Date(Control.value);
    const Hoy = new Date();
    Fecha.setHours(0, 0, 0, 0);
    Hoy.setHours(0, 0, 0, 0);
    return Fecha.getTime() == Hoy.getTime() ? null : { FechaInvalida: true };
  }

  cancelar() {
    this.router.navigate(['/main']);
  }
}
