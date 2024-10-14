import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiciosCEService } from '../../servicios/servicios-ce.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { WorkEnvService } from '../../../../service/work-env.service';

@Component({
  selector: 'app-crear-e',
  templateUrl: './crear-e.component.html',
  styleUrl: './crear-e.component.scss',
  providers: [MessageService]
})
export class CrearEComponent implements OnInit {
  entornoForm: FormGroup;
  tipoEntornos: string[] = ['Desarollo de software', 'Redes de computadoras', 'Otro'];

  constructor(
    private fb: FormBuilder,
    private serviciosCE: ServiciosCEService,
    private router: Router,
    private messageService: MessageService,
    private workEnvService: WorkEnvService
  ) {}

  ngOnInit(): void {
    this.cargaInicial();
  }

  cargaInicial(): void {
    this.entornoForm = this.fb.group({
      nameW: ['', [Validators.required, Validators.maxLength(100)]],
      descriptionW: ['', Validators.maxLength(500)],
      type: ['', Validators.required],
      date_start: ['', Validators.required],
      date_end: ['', Validators.required]
    }, { validators: this.validadorFechas });
  }

  // Esta función valida que la fecha de inicio no sea posterior a la fecha de fin
  validadorFechas(grupo: FormGroup): {[key: string]: any} | null {
    const inicio = grupo.get('date_start').value;
    const fin = grupo.get('date_end').value;
    if (inicio && fin && new Date(inicio) > new Date(fin)) {
      return { 'fechasInvalidas': true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.entornoForm.valid) {
      const entornoData = {
        ...this.entornoForm.value,
        logicdeleted: 0
      };
      console.log('Datos del entorno a enviar:', entornoData);
      this.serviciosCE.newWorkEnv(entornoData).subscribe({
        next: (response) => {
          if (response.message === 'ok') {
            this.messageService.add({severity:'success', summary: 'Éxito', detail: 'Entorno de trabajo creado exitosamente'});
            setTimeout(() => {
              this.router.navigate(['/Dash']);
            }, 1000); // Espera 1 segundo antes de navegar
          } else {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'No se pudo crear el entorno de trabajo'});
          }
        },
        error: (err) => {
          console.error('Error en la creación del entorno: ', err);
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Ocurrió un error al crear el entorno de trabajo'});
        }
      });
    } else {
      this.marcarFormularioComoTocado(this.entornoForm);
      this.messageService.add({severity:'warn', summary: 'Formulario inválido', detail: 'Por favor, complete todos los campos requeridos correctamente'});
    }
  }

  // Esta función marca todos los campos del formulario como 'tocados'
  // para que se muestren los mensajes de error de validación
  marcarFormularioComoTocado(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.marcarFormularioComoTocado(control);
      }
    });
  }
}