import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableroCComponent } from './tablero-c/tablero-c.component';

const routes: Routes = [

  {path : ' ', component:TableroCComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableroCRoutingModule { }
