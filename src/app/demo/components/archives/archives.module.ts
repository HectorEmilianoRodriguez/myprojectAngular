import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchivesComponent } from './archives.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ArchivesRoutingModule } from './services/archives-routing.module';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [ArchivesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ToastModule,
    TableModule,
    ArchivesRoutingModule,
    ButtonModule,
    ConfirmDialogModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class ArchivesModule { }
