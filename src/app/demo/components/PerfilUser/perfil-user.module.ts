import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilUserRoutingModule } from './perfil-user-routing.module';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PerfilUserRoutingModule,
    ToastModule
  ]
})
export class PerfilUserModule { }
