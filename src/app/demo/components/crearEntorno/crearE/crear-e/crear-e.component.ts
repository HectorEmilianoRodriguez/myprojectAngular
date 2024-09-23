import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiciosCEService } from '../../servicios/servicios-ce.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-e',
  templateUrl: './crear-e.component.html',
  styleUrl: './crear-e.component.scss'
})
export class CrearEComponent implements OnInit {
  entornoForm: FormGroup;
  tipoEntornos: string[] = ['Tipo 1', 'Tipo 2', 'Tipo 3']; // Asegúrate de que estos tipos coincidan con los esperados por el backend

  constructor(
    private fb: FormBuilder,
    private serviciosCE: ServiciosCEService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.entornoForm = this.fb.group({
      nameW: ['', Validators.required],
      descriptionW: [''],
      type: ['', Validators.required],
      date_start: ['', Validators.required],
      date_end: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.entornoForm.valid) {
      const entornoData = {
        ...this.entornoForm.value,
        logicdeleted: 0
      };

      this.serviciosCE.newWorkEnv(entornoData).subscribe({
        next: (response) => {
          if (response.message === 'ok') {
            console.log('Entorno de trabajo creado exitosamente');
            this.router.navigate(['/dashboard']);
          } else {
            console.error('Error al crear el entorno de trabajo', response.error);
            // Mostrar un mensaje de error al usuario
          }
        },
        error: (error) => {
          console.error('Error al crear el entorno de trabajo', error);
          // Mostrar un mensaje de error al usuario
        }
      });
    } else {
      this.entornoForm.markAllAsTouched();
    }
  }
}