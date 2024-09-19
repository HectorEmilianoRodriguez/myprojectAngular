import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerificacionAuthComponent } from './verificacionAuth/verificacion-auth/verificacion-auth.component';	
import { VerificacionAuthRoutingModule } from './verificacion-auth-routing.module';


@NgModule({
  declarations: [
    VerificacionAuthComponent
  ],
  imports: [
    CommonModule,
    VerificacionAuthRoutingModule
  ]
})
export class VerificacionAuthModule { }
