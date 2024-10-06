import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarEntComponent } from './editar-ent/editar-ent.component';

const routes: Routes = [
  {path : 'editar/:id', component:EditarEntComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditarRoutingModule { }
