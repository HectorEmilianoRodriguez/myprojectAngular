import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnionComponent } from './union/union.component';

const routes: Routes = [
  {path : 'unionEntorno', component:UnionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnionEntornoRoutingModule { }
