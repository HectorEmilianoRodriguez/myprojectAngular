import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearEComponent } from './crearE/crear-e/crear-e.component';

const routes: Routes = [
  {path : 'crearEntorno', component:CrearEComponent}

];
 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrearEntornoRoutingModule { }
