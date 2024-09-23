import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AppLayoutComponent as WorkEnvAppLayoutComponent} from './layoutw/app.layout.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', redirectTo: '/auth/login', pathMatch: 'full'
            },

            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: 'Dash', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
                    { path: 'union', loadChildren: () => import('./demo/components/UnionEntorno/union-entorno.module').then(m => m.UnionEntornoModule) },
                    { path: 'crearE', loadChildren: () => import('./demo/components/crearEntorno/crear-entorno.module').then(m => m.CrearEntornoModule) },
                    { path: 'respaldo', loadChildren: () => import('./demo/components/ResA/respaldo-routing.module').then(m => m.RespaldoRoutingModule) },
                    
                    
                ]
            },

            {
                path: '', component: WorkEnvAppLayoutComponent,
                children: [

                    { path: 'WorkEnv', loadChildren: () => import('./demo/components/workenvm/workenvm.module').then(m => m.WorkEnvModule) }

                ]

            },



            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'registro', loadChildren: () => import('./demo/components/componentes/componentes.module').then(m => m.ComponentesModule) },
            { path: 'verificacion', loadChildren: () => import('./demo/components/verificacion/verificacion-auth.module').then(m => m.VerificacionAuthModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
