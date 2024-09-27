import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { WorkEnvMService } from '../demo/components/workenvm/servicios/workenvm-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    dataWork: any;
    id: string | null = null;  // Inicializamos el id en null
    data: any;

    constructor(
        public layoutService: LayoutService,
        private workEnvMService: WorkEnvMService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        // Usamos paramMap para obtener el 'id'
        this.route.paramMap.subscribe(paramMap => {
            this.id = paramMap.get('id');  // Obtenemos el id de los parámetros de la URL

            if (this.id) {
                this.workEnvMService.getWorkEnv(this.id).subscribe({
                    next: (res) => {
                        this.data = res;
                        

                        // Configura el menú aquí después de obtener los datos
                        this.model = [
                            {
                                label: 'Home',
                                items: [
                                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/Dash'] },
                                    { label: `${this.data.title}`, icon: 'pi pi-pencil', routerLink: [`/WorkEnv/Edit/${this.data?.idWorkEnv}`] }
                                ]
                            },
                            {
                                label: 'Opciones',
                                items: [
                                    { label: 'Miembros', icon: 'pi pi-fw pi-users', routerLink: [`/WorkEnv/${this.data?.idWorkEnv}/Members/${this.data?.idWorkEnv}`] },
                                    { label: 'Calendario de actividades', icon: 'pi pi-fw pi-calendar', routerLink: ['/union/unionEntorno'] },
                                    { label: 'Recursos', icon: 'pi pi-fw pi-folder-open', routerLink: ['/uikit/input'] },
                                    ...(this.data.privilege === 1 || this.data.privilege === 2 ? [{ label: 'Grupos de tareas', icon: 'pi pi-fw pi-book', routerLink: [`/WorkEnv/${this.data?.idWorkEnv}/GroupTasks`] }] : []),
                                    {
                                        label: 'Tableros', icon: 'pi pi-fw pi-book',
                                        items: [
                                            { label: 'Tablero A', icon: 'pi pi-fw pi-bookmark' },
                                            { label: 'Tablero B', icon: 'pi pi-fw pi-bookmark' },
                                            { label: 'Tablero C', icon: 'pi pi-fw pi-bookmark' }
                                        ]
                                    }
                                ]
                            },
                            {
                                label: 'Archivados', icon: 'pi pi-fw pi-folder',
                                items: [
                                    {
                                        label: 'Tableros archivados', icon: 'pi pi-fw pi-book',
                                        items: [
                                            { label: 'Entorno A', icon: 'pi pi-fw pi-bookmark' },
                                            { label: 'Entorno B', icon: 'pi pi-fw pi-bookmark' },
                                            { label: 'Entorno C', icon: 'pi pi-fw pi-bookmark' }
                                        ]
                                    }
                                ]
                            }
                        ];
                    },
                    error: (err) => {
                        console.error('Error al obtener datos:', err);
                        this.router.navigate(['/Dash']);
                    }
                });
            } else {
                console.log('No se encontró el ID en la URL');
            }
        });
    }
}
