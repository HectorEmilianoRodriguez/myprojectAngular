import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button, ButtonModule } from 'primeng/button';
import { CrearEntornoRoutingModule } from './crear-entorno-routing.module';
import { CrearEComponent } from './crearE/crear-e/crear-e.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import { InputTextModule } from 'primeng/inputtext'; 
import { CalendarModule } from 'primeng/calendar';
import { Calendar } from '@fullcalendar/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    CrearEComponent
  ],
  imports: [
    CommonModule,
    CrearEntornoRoutingModule,
    ButtonModule,
    ReactiveFormsModule, 
    InputTextModule,
    CalendarModule,
    InputTextareaModule,
    DropdownModule
   
  ]
})
export class CrearEntornoModule {


 }
