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
  selector: 'app-register-organization-page',
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
  templateUrl: './register-organization-page.component.html',
  styleUrl: './register-organization-page.component.css'
})
export class RegisterOrganizationPageComponent {
  registerOrgForm: FormGroup;
  Nivel = ['Premium', 'Basic']; 

  constructor(
    private fb: FormBuilder,
    private voluntifyService: VoluntifyService, 
    private snackBar: MatSnackBar,
    private router: Router,
  )

  {
  this.registerOrgForm = this.fb.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required, Validators.minLength(10)]],
    correo: ['', [Validators.required]],
    telefono: ['', [Validators.required, Validators.minLength(9)]],
    direccion: ['', [Validators.required]],
    sitio_web: ['', [Validators.required]],
    fecha_registro: ['', [Validators.required, this.fechaValida]],
    suscripcion_activa: [null, Validators.required],
    nivel_suscripcion : ['', Validators.required],
    contrasena: ['', [Validators.required, Validators.minLength(6)]],
    rol: ['', [Validators.required]],    
  });
}



  registrarOrganizacion() {
    if (this.registerOrgForm.valid) {
      this.voluntifyService.addOrganizacion(this.registerOrgForm.value).subscribe(
        response => {
          this.snackBar.open('Organizacion registrada exitosamente', 'Cerrar', { duration: 3000 });
          this.registerOrgForm.reset();
        },
        error => {
          this.snackBar.open('Error al registrar la organizacion', 'Cerrar', { duration: 3000 });
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
