import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RespaldoyAuthComponent } from './respaldoy-auth/respaldoy-auth.component';

const routes: Routes = [

  {path : 'respaldo', component:RespaldoyAuthComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RespaldoRoutingModule { }
