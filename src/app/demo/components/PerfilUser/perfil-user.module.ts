import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfilUserRoutingModule } from './perfil-user-routing.module';
import { PerfilUComponent } from './PerfilU/perfil-u/perfil-u.component';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [PerfilUComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PerfilUserRoutingModule,
    ToastModule,
    InputTextModule,
    ButtonModule,
    FileUploadModule,
    CardModule
  ],
  providers: [MessageService]
})
export class PerfilUserModule { }
