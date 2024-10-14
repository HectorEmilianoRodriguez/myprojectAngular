import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RespaldoRoutingModule } from './respaldo-routing.module';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TabMenuModule } from 'primeng/tabmenu'; // Asegúrate de importar TabMenuModule
import { RespaldoyAuthComponent } from './respaldoy-auth/respaldoy-auth.component';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [RespaldoyAuthComponent],
  imports: [
    CommonModule,
    RespaldoRoutingModule,
    TabMenuModule,
    PanelMenuModule,
    FileUploadModule,
    ButtonModule,
    ToastModule,
    FormsModule
  ]
   
})
export class RespaldoModule { }
