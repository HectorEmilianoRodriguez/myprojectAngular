import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

import { EditarEntComponent } from '../editarEnt/editarent/editar-ent/editar-ent.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardComponent },
        
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
