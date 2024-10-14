import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RouterModule, Routes } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { BoardComponent } from './board.component';
import { BoardRoutingModule } from './board-routing.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RadioButtonModule } from 'primeng/radiobutton';
@NgModule({
  declarations: [BoardComponent],
  imports: [
    CommonModule,
    BoardRoutingModule,
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
    DragDropModule,
    RadioButtonModule,
    FormsModule
  ],
  providers: [ConfirmationService, MessageService]
})
export class BoardModule { }
