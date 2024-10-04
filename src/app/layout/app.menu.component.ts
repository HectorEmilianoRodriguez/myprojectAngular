import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/Dash'] }
                ]
            },

            {
                label: 'Opciones de espacios de trabajo',
                items: [
                    { label: 'Crear nuevo espacio', icon: 'pi pi-fw pi-plus', routerLink: ['crearE/crearEntorno'] },
                    { label: 'Unirme a un espacio', icon: 'pi pi-fw pi-users', routerLink: ['/union/unionEntorno'] },
                    { label: 'Mis solicitudes', icon: 'pi pi-fw pi-bell', routerLink: ['/solicitud/solicitudM'] },
                ]
            },

            {
                label: 'Utilities',
                items: [
                    { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/utilities/icons'] },
                    { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
                ]
            },
            {

                label: 'Espacios de trabajo', icon: 'pi pi-fw pi-bookmark',
                items: [
                    {
                        label: 'Mis espacios', icon: 'pi pi-fw pi-book',
                        items: [
                            { label: 'Entorno A', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Entorno B', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Entorno C', icon: 'pi pi-fw pi-bookmark' },
                        ]
                    },
                    {
                        label: 'Espacios donde participo', icon: 'pi pi-fw pi-book',
                        items: [
                            { label: 'Entorno A', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Entorno B', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Entorno C', icon: 'pi pi-fw pi-bookmark' },
                        ]
                    }

                ]

            },

            {
                label: 'Restauracion y respaldo',
                items: [
                    {
                        label: 'Restauración', icon: 'pi pi-fw pi-question', routerLink: ['/respaldo/respaldo']
                    },
                    {
                        label: 'Respaldo', icon: 'pi pi-fw pi-question', routerLink: ['/restauracion/restauracion']
                    },
                    {
                        label: 'Recursos', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
                    }
                ]
            }
        ];
    }
}
