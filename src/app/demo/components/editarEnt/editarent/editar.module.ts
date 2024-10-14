import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditarRoutingModule } from './editar-routing.module';
import { EditarEntComponent } from './editar-ent/editar-ent.component';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { DropdownModule } from 'primeng/dropdown'; // Importa el módulo de dropdown
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar ReactiveFormsModule
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [EditarEntComponent],
  imports: [
    CommonModule,
    EditarRoutingModule,
    FormsModule,
    ReactiveFormsModule, // Asegúrate de que ReactiveFormsModule esté importado
    DropdownModule,
    CalendarModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule
  ],

  providers: [ConfirmationService, MessageService]
})
export class EditarModule { }
