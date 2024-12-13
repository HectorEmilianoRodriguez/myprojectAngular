import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaterFallRoutingModule } from './waterfall-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TimelineModule } from 'primeng/timeline';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WaterfallComponent } from './waterfall.component';

@NgModule({
  declarations: [WaterfallComponent],
  imports: [
    CommonModule,
    WaterFallRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
    DialogModule,
    ConfirmDialogModule,
    TimelineModule

  ],
  providers: [MessageService, ConfirmationService]
})


export class WaterfallModule { }
