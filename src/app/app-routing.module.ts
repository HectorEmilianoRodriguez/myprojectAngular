import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './demo/components/auth/guards/auth.guard';import { AppLayoutComponent as WorkEnvAppLayoutComponent} from './layoutw/app.layout.component';

@NgModule({ //Módulo que define las rutas de la aplicación en formato JSON.
    imports: [
        RouterModule.forRoot([
            {
                path: '', redirectTo: '/auth/login', pathMatch: 'full'
            },
            {
                path: 'Invitation', loadChildren: () => import('./demo/components/Invitation/invitation.module').then(m => m.InvitationModule)
            },
                /*Cada ruta está definida como un objeto
                cuyos atributos representan algo en concrecto;
                path es utilizado para indicar la estructura de la ruta,
                redirectTo es útil para redireccionar a una ruta ya existente,
                children es utilizado cuando se indica una ruta hija, este tipo de rutas
                son importantes al momento de renderizar únicamnete un componente sin afectar
                los demás loadChildren es un atributo que recibe una función anónima que es utilizada
                para renderizar el contenido de un módulo completo.
                */
            { 
                path: '', component: AppLayoutComponent,
                children: [
                    { path: 'Dash', loadChildren: () => import('./demo/components/dashboard/dashboard.module')
                    .then(m => m.DashboardModule),canActivate: [AuthGuard] },
                    //ruta del dashboard.
                    { path: 'crearE', loadChildren: () => import('./demo/components/crearEntorno/crear-entorno.module')
                        .then(m => m.CrearEntornoModule),canActivate: [AuthGuard]  },
                    //ruta para agregar un espacio de trabajo.
                    { path: 'respaldo', loadChildren: () => import('./demo/components/ResA/respaldo-routing.module')
                        .then(m => m.RespaldoRoutingModule),canActivate: [AuthGuard]  },
                    //ruta para respaldar o restaurar la base de datos.
                    { path: 'perfiles', loadChildren: () => import('./demo/components/PerfilUser/perfil-user.module')
                        .then(m => m.PerfilUserModule), canActivate: [AuthGuard] },
                    //ruta para editar información del perfil.
                    { path: 'solicitud', loadChildren: () => import('./demo/components/Solicitudes/solicitud-routing.module')
                        .then(m => m.SolicitudRoutingModule), canActivate: [AuthGuard] },
                    //ruta para enviar solicitudes hacia espacios de trabajos.
                    { path: 'edit-work-env', loadChildren: () => import('./demo/components/editarEnt/editarent/editar-routing.module')
                        .then(m => m.EditarRoutingModule), canActivate: [AuthGuard] },
                    { path: 'tablero', loadChildren: () => import('./demo/components/TableroCordinador/tablero/tablero-c.module')
                        .then(m => m.TableroCModule), canActivate: [AuthGuard] },      
                ]
            },
           
            {
                path: 'WorkEnv/:id', component: WorkEnvAppLayoutComponent,
                children: [
                    { path: 'Members/:id', loadChildren: () => import('./demo/components/workenvm/workenvm.module').then(m => m.WorkEnvModule), canActivate: [AuthGuard] },
                    { path: 'Reports/:id', loadChildren: () => import('./demo/components/reports/report-component/report-module.module').then(m => m.ReportModuleModule), canActivate: [AuthGuard]},
                    { path: 'Board/:id/:idb',  loadChildren: () => import('./demo/components/board/board.module').then(m => m.BoardModule), canActivate: [AuthGuard]},
                    { path: 'Edit/:id',  loadChildren: () => import('./demo/components/editarEnt/editarent/editar.module').then(m => m.EditarModule), canActivate: [AuthGuard]},
                    { path: 'Files/:id', loadChildren: () => import('./demo/components/files/files.module').then(m => m.FilesModule)},
                    { path: 'Folder/:id/:idf', loadChildren: () => import('./demo/components/archives/archives.module').then(m => m.ArchivesModule)},
                    { path: 'grupos/:id', loadChildren: () => import('./demo/components/TableroCordinador/tablero/tablero-c.module').then(m => m.TableroCModule), canActivate: [AuthGuard] },
                    { path: 'waterfall/:id/:idb', loadChildren: () =>import('./demo/components/waterfall/waterfall.module').then(m => m.WaterfallModule), canActivate: [AuthGuard] },
                    { path: 'calendario/:id', loadChildren: () => import('./demo/components/calendario/calendario.module').then(m => m.CalendarioModule), canActivate: [AuthGuard] },
                    
                    
                    
                ]

            },


           
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'registro', loadChildren: () => import('./demo/components/componentes/componentes.module').then(m => m.ComponentesModule) },
            { path: 'verificacion', loadChildren: () => import('./demo/components/verificacion/verificacion-auth.module').then(m => m.VerificacionAuthModule) },
            { path: 'resetPassword', loadChildren: () => import('./demo/components/recovertPassword/recovert.module').then(m => m.RecovertModule)},
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' }
   
            
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
