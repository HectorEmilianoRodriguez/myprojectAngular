import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { AppLayoutModule as WorkEnvAppLayoutModule } from './layoutw/app.layout.module';

import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { PanelMenuModule } from 'primeng/panelmenu';  // Asegúrate de importar PanelMenuModule
import { HttpBackend, HttpClient, HttpClientModule } from '@angular/common/http';
import { RespaldoModule } from './demo/components/ResA/respaldo.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { SolicitudModule } from './demo/components/Solicitudes/solicitud.module';
import { EditarModule } from './demo/components/editarEnt/editarent/editar.module';
import { TableroCModule } from './demo/components/TableroCordinador/tablero/tablero-c.module';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule,HttpClientModule,  RespaldoModule,  WorkEnvAppLayoutModule,SolicitudModule,EditarModule, CommonModule,PanelMenuModule,FullCalendarModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
