import { Component, OnInit} from '@angular/core';
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
  selector: 'app-create-event-page',
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
  templateUrl: './create-event-page.component.html',
  styleUrl: './create-event-page.component.css'
})
export class CreateEventPageComponent implements OnInit {
  RegistrationVoluntariadoForm: FormGroup;
  categorias = [
    { id: 1, nombre: 'Educación' },
    { id: 2, nombre: 'Salud' },
    { id: 3, nombre: 'Social' },
    { id: 4, nombre: 'Arte' },
    { id: 5, nombre: 'Medio Ambiente' },
    { id: 8, nombre: 'Cultura' },
    { id: 9, nombre: 'Deporte' },
    { id: 11, nombre: 'Animales' },
    { id: 12, nombre: 'Derechos Humanos' }
  ];

  constructor(
    private fb: FormBuilder,
    private voluntifyService: VoluntifyService, 
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.RegistrationVoluntariadoForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(4)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]], 
      fecha_inicio: ['', [Validators.required, this.fechaValida1]],
      fecha_fin: ['', [Validators.required, this.fechaValida2]],
      ubicacion: ['', [Validators.required, Validators.minLength(8)]],
      requisitos: ['', [Validators.required, Validators.minLength(10)]],
      id_organizaciones: ['', Validators.required],
      id_categorias: ['', Validators.required]
    });
  }

  addVoluntariado() {
    if (this.RegistrationVoluntariadoForm.valid) {
      this.voluntifyService.addVoluntariado(this.RegistrationVoluntariadoForm.value).subscribe(
        response => {
          this.snackBar.open('Voluntariado realizado exitosamente', 'Cerrar', { duration: 3000 });
          this.RegistrationVoluntariadoForm.reset();
          this.router.navigate(['/organization-main']);
        },
        error => {
          this.snackBar.open('Error al registrar el voluntariado', 'Cerrar', { duration: 3000 });
        }
      );
    }
  }

  ngOnInit(): void {
    const idOrganizacion = this.voluntifyService.getidOrganizacion();
    if (idOrganizacion !== null) {
      this.RegistrationVoluntariadoForm.get('id_organizaciones')?.setValue(idOrganizacion);
    }
  }

  fechaValida1(Control: { value: string | number | Date; }) {
    const Fecha = new Date(Control.value);
    const Hoy = new Date();
    Hoy.setHours(0, 0, 0, 0);
    Fecha.setHours(0, 0, 0, 0);
    return Fecha >= Hoy ? null : { FechaInvalida1: true };
  }

  fechaValida2(Control: { value: string | number | Date; }) {
    const Fecha = new Date(Control.value);
    const Hoy = new Date();
    return Fecha > Hoy ? null : { FechaInvalida2: true };
  }

  cancelar() {
    this.router.navigate(['/organization-main']);
  }
}
