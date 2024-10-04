import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ButtonModule } from 'primeng/button';
import { SolicitudRoutingModule } from './solicitud-routing.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SolicitudesComponent } from './solicitudes/solicitudes/solicitudes.component';


@NgModule({
  declarations: [SolicitudesComponent],
  imports: [
    CommonModule,
    SolicitudRoutingModule,
    ButtonModule,
    AutoCompleteModule,
    FormsModule
  ]
})
export class SolicitudModule { }
