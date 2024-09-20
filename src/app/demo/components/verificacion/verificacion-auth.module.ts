import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerificacionAuthComponent } from './verificacionAuth/verificacion-auth/verificacion-auth.component';	
import { VerificacionAuthRoutingModule } from './verificacion-auth-routing.module';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    VerificacionAuthComponent
  ],
  imports: [
    CommonModule,
    VerificacionAuthRoutingModule,
    ButtonModule
    
    
    
  ]
})
export class VerificacionAuthModule { }
