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
  entornoData: any; 
  tipoEntornos: any[]; 
  entornoForm: FormGroup;

  constructor(
      private route: ActivatedRoute,
      private workEnvService: WorkEnvService,
      private fb: FormBuilder, 
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
          descriptionW: [''], 
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
            descriptionW: data.descriptionW, 
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
          const updatedData = {
              nameW: this.entornoForm.value.title, 
              descriptionW: this.entornoForm.value.descriptionW, 
              type: this.entornoForm.value.type, 
              date_start: this.entornoForm.value.date_start, 
              date_end: this.entornoForm.value.date_end, 
              logicdeleted: false 
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

