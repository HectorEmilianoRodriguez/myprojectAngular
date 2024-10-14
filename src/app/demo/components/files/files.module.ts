import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FilesComponent } from './files.component';
import { FilesRoutingModule } from './files-routing.module';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { CheckboxModule } from 'primeng/checkbox';
@NgModule({
  declarations: [FilesComponent],
  imports: [
    CommonModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ToggleButtonModule,
    FilesRoutingModule,
    ToastModule,
    DialogModule,
    MenuModule,
    CheckboxModule
  ],
  providers: [ConfirmationService, MessageService],
})
export class FilesModule { }
