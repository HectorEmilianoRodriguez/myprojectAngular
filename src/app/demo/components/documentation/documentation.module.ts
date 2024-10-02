import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationRoutingModule } from './documentation-routing.module';
import { DocumentationComponent } from './documentation.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TabMenuModule } from 'primeng/tabmenu'; // Asegúrate de importar TabMenuModule



import { HttpClientModule } from '@angular/common/http'; // Para peticiones HTTP


@NgModule({
    imports: [
        CommonModule,
        DocumentationRoutingModule,
        PanelMenuModule,
        HttpClientModule,
        TabMenuModule
    ],
    declarations: [DocumentationComponent]
})
export class DocumentationModule { }
