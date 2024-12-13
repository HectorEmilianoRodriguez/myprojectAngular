import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkEnvService } from '../../../../service/work-env.service';
import { ConfirmationService, MessageService } from 'primeng/api'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';
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
  logicdeletedWork;
  constructor(
      private route: ActivatedRoute,
      private workEnvService: WorkEnvService,
      private fb: FormBuilder, 
      private messageService: MessageService,
      private cs: ConfirmationService,
      private router: Router
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
          nameW: ['', Validators.required],
          type: ['', Validators.required],
          descriptionW: [''], 
          date_start: ['', Validators.required],
          date_end: ['', Validators.required]
      });
  }

  loadTipoEntornos() {
      // Aquí puedes definir las opciones para el dropdown
      this.tipoEntornos = [
          { label: 'Desarollo de software', value: 'Desarollo de software' },
          { label: 'Redes de computadoras', value: 'Redes de computadoras' },
          { label: 'Otro', value: 'Otro' }
      ];
  }

  loadEntornoData() {
    this.workEnvService.getWorkEnv(this.entornoId).subscribe(data => {
        console.log('Datos recuperados:', data); 

        this.logicdeletedWork = data.logicdeleted;
        this.entornoData = {
            nameW: data.title, 
            type: data.type,
            descriptionW: data.descriptionW,
            date_start: data.date_start,
            date_end: data.date_end
        }; // Carga los datos del entorno

        // Rellena el formulario con los datos
        this.entornoForm.patchValue({
            nameW: this.entornoData.nameW, 
            type: this.entornoData.type,
            descriptionW: this.entornoData.descriptionW,
            date_start: this.entornoData.date_start,
            date_end: this.entornoData.date_end
        });

 
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
            nameW: formValues.nameW, // Usa el nuevo valor directamente
            descriptionW: formValues.descriptionW, // Usa el nuevo valor directamente
            type: formValues.type, // Usa el nuevo valor directamente
            date_start: formValues.date_start, // Usa el nuevo valor directamente
            date_end: formValues.date_end, // Usa el nuevo valor directamente
            logicdeleted: false 
        };

        console.log('Datos a enviar:', updatedData); // Verifica los datos que se envían

        // Llama al servicio para actualizar el entorno
        this.workEnvService.updateWorkEnv(entornoId, updatedData).subscribe(
            response => {
                console.log('Respuesta del servidor:', response); // Verifica la respuesta del servidor
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Entorno actualizado correctamente' });
                this.loadEntornoData();
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

  deleteWorkEnv(){

    this.cs.confirm({
        message: '¿Estás seguro de que deseas archivar este espacio de trabajo?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Cargando', detail: 'Archivando espacio de trabajo...' });
            this.workEnvService.deleteWorkEnv(this.entornoId).subscribe({
                next: (res) =>{
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Espacio de trabajo archivado.' });
                    this.router.navigate(['/Dash']);
                }
            });
        }
      });


    

  }


  undeleteWorkEnv(){
    this.cs.confirm({
        message: '¿Estás seguro de que deseas desarchivar este espacio de trabajo?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Cargando', detail: 'Desarchivando espacio de trabajo...' });
            this.workEnvService.undeleteWorkEnv(this.entornoId).subscribe({
                next: (res) =>{
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Espacio de trabajo desarchivado.' });
                    this.router.navigate(['/Dash']);
                }
            });
        }
      });
  }


}

