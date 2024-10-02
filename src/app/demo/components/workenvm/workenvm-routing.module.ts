import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkEnvComponent } from './workenvm.component';

const routes: Routes = [
    { path: '', component: WorkEnvComponent }  // Agregar el parámetro :id en la ruta
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WorkEnvRoutingModule { }
