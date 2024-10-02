import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecovertpasswordComponent } from './recovertpassword/recovertpassword.component';
import { RecovertRoutingModule } from './recovert-routing.module';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [RecovertpasswordComponent],
  imports: [
    CommonModule,
    RecovertRoutingModule,
    PasswordModule,
    FormsModule,
    ButtonModule
  ]
})
export class RecovertModule { }
