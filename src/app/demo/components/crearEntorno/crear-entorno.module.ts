import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button, ButtonModule } from 'primeng/button';
import { CrearEntornoRoutingModule } from './crear-entorno-routing.module';
import { CrearEComponent } from './crearE/crear-e/crear-e.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import { InputTextModule } from 'primeng/inputtext'; 

@NgModule({
  declarations: [
    CrearEComponent
  ],
  imports: [
    CommonModule,
    CrearEntornoRoutingModule,
    ButtonModule,
    ReactiveFormsModule, 
    InputTextModule 
    
   
  ]
})
export class CrearEntornoModule {


 }
