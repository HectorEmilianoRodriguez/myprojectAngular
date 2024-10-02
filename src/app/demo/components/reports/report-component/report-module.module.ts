import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { ReportRoutingModule } from './report-routing.module';
import { ReportComponentComponent } from './report-component.component';
import { CalendarModule } from 'primeng/calendar'; // Importación de p-calendar
import { DialogModule } from 'primeng/dialog'; // Importa el módulo de diálogo

@NgModule({
  declarations: [ReportComponentComponent],
  imports: [
    	CommonModule,
   	 	ReportRoutingModule,
		FormsModule,
		TableModule,
		RatingModule,
		ButtonModule,
		SliderModule,
		InputTextModule,
		ToggleButtonModule,
		RippleModule,
		MultiSelectModule,
		DropdownModule,
		ProgressBarModule,
		ToastModule,
		ConfirmDialogModule,
		ReactiveFormsModule,
		CalendarModule,
		DialogModule,
		MultiSelectModule
	
  ]
})
export class ReportModuleModule { }
