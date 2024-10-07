import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkEnvService } from '../../../../service/work-env.service';
import { MessageService } from 'primeng/api'; // Asegúrate de importar MessageService
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Asegúrate de importar FormBuilder y FormGroup

@Component({
  selector: 'app-editar-ent',
  templateUrl: './editar-ent.component.html',
  styleUrls: ['./editar-ent.component.scss']
})
export class EditarEntComponent implements OnInit {
  entornoId: string;
  entornoData: any; // Aquí puedes definir la estructura de datos del entorno
  tipoEntornos: any[]; // Define la propiedad para las opciones del dropdown
  entornoForm: FormGroup; // Declara entornoForm como FormGroup

  constructor(
      private route: ActivatedRoute,
      private workEnvService: WorkEnvService,
      private fb: FormBuilder, // Asegúrate de inyectar FormBuilder
      private messageService: MessageService
  ) { }

  ngOnInit() {
      this.entornoId = this.route.snapshot.paramMap.get('id'); // Obtiene el ID del entorno de la ruta
      console.log('ID del entorno en EditarEntComponent:', this.entornoId); // Verifica que el ID no sea undefined
      this.loadEntornoData();
      this.loadTipoEntornos(); // Carga las opciones del tipo de entorno
      this.inicializarFormulario(); // Inicializa el formulario
  }

  inicializarFormulario(): void {
      this.entornoForm = this.fb.group({
          title: ['', Validators.required],
          type: ['', Validators.required],
          descriptionW: [''], // Este campo se mantiene como 'description'
          date_start: ['', Validators.required],
          date_end: ['', Validators.required]
      });
  }

  loadTipoEntornos() {
      // Aquí puedes definir las opciones para el dropdown
      this.tipoEntornos = [
          { label: 'Tipo 1', value: 'Tipo 1' },
          { label: 'Tipo 2', value: 'Tipo 2' },
          { label: 'Tipo 3', value: 'Tipo 3' }
      ];
  }

  loadEntornoData() {
    this.workEnvService.getWorkEnv(this.entornoId).subscribe(data => {
        this.entornoData = {
            title: data.title,
            type: data.type,
            description: data.descriptionW, // Asigna descriptionW a description
            date_start: data.date_start,
            date_end: data.date_end
        }; // Carga los datos del entorno
        this.entornoForm.patchValue(this.entornoData); // Rellena el formulario con los datos
    }, error => {
        console.error('Error al cargar los datos del entorno:', error);
    });
}

  onSubmit(): void {
    if (this.entornoForm.valid) {
        const entornoId = this.route.snapshot.paramMap.get('id'); // Obtiene el ID del entorno

        // Obtiene los valores actuales del formulario
        const formValues = this.entornoForm.value; // Usa el valor del formulario directamente

        const updatedData = {
            nameW: formValues.title || this.entornoData.title, // Usa el valor del formulario directamente
            descriptionW: formValues.descriptionW || this.entornoData.description, // Usa el valor del formulario o el original
            type: formValues.type, // Usa el valor del formulario directamente
            date_start: formValues.date_start, // Usa el valor del formulario directamente
            date_end: formValues.date_end, // Usa el valor del formulario directamente
            logicdeleted: false // O el valor que necesites
        };

        console.log('Datos a enviar:', updatedData); // Verifica los datos que se envían

        // Llama al servicio para actualizar el entorno
        this.workEnvService.updateWorkEnv(entornoId, updatedData).subscribe(
            response => {
                console.log('Respuesta del servidor:', response); // Verifica la respuesta del servidor
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Entorno actualizado correctamente' });
            },
            error => {
                console.error('Error al actualizar el entorno:', error); // Maneja el error
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el entorno' });
            }
        );
    } else {
        this.marcarFormularioComoTocado(this.entornoForm);
        this.messageService.add({ severity: 'warn', summary: 'Formulario inválido', detail: 'Por favor, complete todos los campos requeridos correctamente' });
    }
  }

  marcarFormularioComoTocado(formGroup: FormGroup) {
      Object.values(formGroup.controls).forEach(control => {
          control.markAsTouched();
          if (control instanceof FormGroup) {
              this.marcarFormularioComoTocado(control);
          }
      });
  }
}

