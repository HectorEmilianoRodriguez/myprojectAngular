import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WorkEnvComponent } from './workenvm.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: WorkEnvComponent }
    ])],
    exports: [RouterModule]
})
export class WorkEnvRoutingModule { }
