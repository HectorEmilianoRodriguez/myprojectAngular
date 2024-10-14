import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArchivesComponent } from '../archives.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ArchivesComponent },
        
    ])],
    exports: [RouterModule]
})
export class ArchivesRoutingModule { }
