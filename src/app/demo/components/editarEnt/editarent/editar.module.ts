import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditarRoutingModule } from './editar-routing.module';
import { EditarEntComponent } from './editar-ent/editar-ent.component';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
   

@NgModule({
  declarations: [EditarEntComponent],
  imports: [
    CommonModule,
    EditarRoutingModule,
    FormsModule
  ]
})
export class EditarModule { }
