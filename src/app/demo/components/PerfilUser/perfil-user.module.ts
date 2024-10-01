import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilUserRoutingModule } from './perfil-user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PerfilUComponent } from './PerfilU/perfil-u/perfil-u.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PerfilUserRoutingModule,
    InputTextModule,
    ButtonModule,
    FileUploadModule,
    ToastModule,
    CardModule,
    PerfilUComponent
  ],
  declarations: []
})
export class PerfilUserModule { }
