import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioRoutingModule } from './calendario-routing.module';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarioComponent } from './calendario/calendario/calendario.component';
import { DialogModule } from 'primeng/dialog'; // Importa el módulo de PrimeNG para diálogos
import { FormsModule } from '@angular/forms'; // Importa FormsModule


@NgModule({
  declarations: [CalendarioComponent],
  imports: [
    CommonModule,
    CalendarioRoutingModule,
    FullCalendarModule,
    DialogModule,
    FormsModule
  ]
})
export class CalendarioModule { }
