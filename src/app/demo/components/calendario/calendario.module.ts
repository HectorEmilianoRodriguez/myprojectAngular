import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioRoutingModule } from './calendario-routing.module';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarioComponent } from './calendario/calendario/calendario.component';
import { DialogModule } from 'primeng/dialog'; // Importa el módulo de PrimeNG para diálogos
import { FormsModule } from '@angular/forms'; // Importa FormsModule

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [CalendarioComponent],
  imports: [
    CommonModule,
    CalendarioRoutingModule,
    FullCalendarModule,
    DialogModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    CalendarModule
    

  ]
})
export class CalendarioModule { }
