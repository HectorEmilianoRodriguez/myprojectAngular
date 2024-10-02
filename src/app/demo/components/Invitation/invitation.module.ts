import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InvitationComponent } from './invitation.component';
import { InvitationRoutingModule } from './invitation-routing..module';


@NgModule({
  declarations: [
    InvitationComponent
  ],
  imports: [
    CommonModule,
    InvitationRoutingModule,
    ButtonModule
    
    
    
  ]
})
export class InvitationModule { }
