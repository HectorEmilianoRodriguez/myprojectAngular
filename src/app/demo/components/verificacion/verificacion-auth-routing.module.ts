import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificacionAuthComponent } from './verificacionAuth/verificacion-auth/verificacion-auth.component';

const routes: Routes = [
  { path: 'verifica', component: VerificacionAuthComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerificacionAuthRoutingModule { }
