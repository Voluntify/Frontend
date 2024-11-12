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

@Component({
  selector: 'app-register-volunteer-page',
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
  ],
  templateUrl: './register-volunteer-page.component.html',
  styleUrl: './register-volunteer-page.component.css'
})
export class RegisterVolunteerPageComponent {
  registerVolunForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private voluntifyService: VoluntifyService, 
    private snackBar: MatSnackBar,
    private router: Router,
  )

  {
    this.registerVolunForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required,  Validators.minLength(4)]],
      direccion: ['', [Validators.required, Validators.minLength(10)]],
      fecha_registro: ['', [Validators.required, this.fechaValida]],
      telefono: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]]
    });
  }


  registrarUsuario() {
    if (this.registerVolunForm.valid) {
      this.voluntifyService.addUsuario(this.registerVolunForm.value).subscribe(
        response => {
          this.snackBar.open('Usuario registrado exitosamente', 'Cerrar', { duration: 3000 });
          this.registerVolunForm.reset();
          this.router.navigate(['/login-volunteer']);
        },
        error => {
          this.snackBar.open('Error al registrar el usuario', 'Cerrar', { duration: 3000 });
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
    this.router.navigate(['/start']);
  }
}