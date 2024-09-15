import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnionEntornoRoutingModule } from './union-entorno-routing.module';
import { ButtonModule } from 'primeng/button';
import { UnionComponent } from './union/union.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms'; 


@NgModule({
  declarations: [UnionComponent],
  imports: [
    CommonModule,
    UnionEntornoRoutingModule,
    ButtonModule,
    AutoCompleteModule,
    FormsModule
    
  ]
})
export class UnionEntornoModule { }
