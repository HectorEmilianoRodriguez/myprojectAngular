import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './demo/components/auth/guards/auth.guard';import { AppLayoutComponent as WorkEnvAppLayoutComponent} from './layoutw/app.layout.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', redirectTo: '/auth/login', pathMatch: 'full'
            },
            {
                path: 'Invitation', loadChildren: () => import('./demo/components/Invitation/invitation.module').then(m => m.InvitationModule)

            },
           

            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: 'Dash', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule),canActivate: [AuthGuard] },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule),canActivate: [AuthGuard]  },
                    { path: 'union', loadChildren: () => import('./demo/components/UnionEntorno/union-entorno.module').then(m => m.UnionEntornoModule),canActivate: [AuthGuard]  },
                    { path: 'crearE', loadChildren: () => import('./demo/components/crearEntorno/crear-entorno.module').then(m => m.CrearEntornoModule),canActivate: [AuthGuard]  },
                    { path: 'respaldo', loadChildren: () => import('./demo/components/ResA/respaldo-routing.module').then(m => m.RespaldoRoutingModule),canActivate: [AuthGuard]  },
                    
                    
                ]
            },
           
            {
                path: 'WorkEnv/:id', component: WorkEnvAppLayoutComponent,
                children: [
                    { path: 'Members/:id', loadChildren: () => import('./demo/components/workenvm/workenvm.module').then(m => m.WorkEnvModule), canActivate: [AuthGuard] },
                    { path: 'Reports/:id', loadChildren: () => import('./demo/components/reports/report-component/report-module.module').then(m => m.ReportModuleModule), canActivate: [AuthGuard]},
                    { path: 'Board/:id/:idb',  loadChildren: () => import('./demo/components/board/board.module').then(m => m.BoardModule), canActivate: [AuthGuard]}
                ]

            },


           
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'registro', loadChildren: () => import('./demo/components/componentes/componentes.module').then(m => m.ComponentesModule) },
            { path: 'verificacion', loadChildren: () => import('./demo/components/verificacion/verificacion-auth.module').then(m => m.VerificacionAuthModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' }
   
            
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
