import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableroCRoutingModule } from './tablero-c-routing.module';

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
import { TableroCComponent } from './tablero-c/tablero-c.component';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { CalendarModule } from 'primeng/calendar';








import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [TableroCComponent],
  imports: [
    CommonModule,
    TableroCRoutingModule,
    FormsModule,
		TableModule, // Asegúrate de que este módulo esté importado
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
		DialogModule,
		FormsModule,
		DividerModule,
		DropdownModule,
		CalendarModule

		
		
  ]
 
})
export class TableroCModule { }
