import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilUComponent } from './PerfilU/perfil-u/perfil-u.component';

const routes: Routes = [
  {path : 'perfil', component:PerfilUComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilUserRoutingModule { }
