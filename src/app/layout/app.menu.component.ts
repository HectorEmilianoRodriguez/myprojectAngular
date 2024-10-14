import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { WorkEnvService } from '../demo/service/work-env.service';
import { MessageService } from 'primeng/api';
@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    displayWorkDialog = false;
    codeWork;

    constructor(public layoutService: LayoutService, public ws: WorkEnvService, public ms: MessageService) { }

    ngOnInit() {
        this.layoutService.getEntornos().subscribe(data => {
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
                        { label: 'Unirme a un espacio', icon: 'pi pi-fw pi-users', command: () => this.showDialog()},
                        { label: 'Mis solicitudes', icon: 'pi pi-fw pi-bell', routerLink: ['/solicitud/solicitudM'] },
                    ]
                },
                {

                    label: 'Espacios de trabajo', icon: 'pi pi-fw pi-bookmark',
                    items: [
                        {
                            label: 'Mis espacios', icon: 'pi pi-fw pi-book',
                            items: data.owner.filter(space => space.logicdeleted === 0).map(space => ({
                                label: space.title, // Usar el título del owner
                                icon: 'pi pi-fw pi-bookmark',
                                routerLink: [`WorkEnv/${space.idWorkEnv}/Members/${space.idWorkEnv}`] // Enlace dinámico
                            }))
                        },
                        {
                            label: 'Espacios donde participo', icon: 'pi pi-fw pi-book',
                            items: data.participant.filter(space => space.logicdeleted === 0).map(space => ({
                                label: space.title, // Usar el título del participant
                                icon: 'pi pi-fw pi-bookmark',
                                routerLink: [`WorkEnv/${space.idWorkEnv}/Members/${space.idWorkEnv}`] // Enlace dinámico
                            }))
                        }

                    ]

                },
                {
                    label: 'Archivados',
                    items: [
                        {
                            label: 'Espacios archivados', icon: 'pi pi-fw pi-book',
                            items: [
                                ...data.owner.filter(space => space.logicdeleted === 1).map(space => ({
                                    label: space.title,
                                    icon: 'pi pi-fw pi-bookmark',
                                    routerLink: [`WorkEnv/${space.idWorkEnv}/Members/${space.idWorkEnv}`] // Enlace dinámico
                                })),
                                ...data.participant.filter(space => space.logicdeleted === 1).map(space => ({
                                    label: space.title,
                                    icon: 'pi pi-fw pi-bookmark',
                                    routerLink: [`WorkEnv/${space.idWorkEnv}/Members/${space.idWorkEnv}`] // Enlace dinámico
                                }))
                            ]
                        }
                    ]
                },   

                {
                    label: 'Restauracion y respaldo',
                    items: [
                        {
                            label: 'Respaldar o restaurar base de datos', icon: 'pi pi-fw pi-question', routerLink: ['/respaldo/respaldo']
                        }
                        
                    ]
                }
            ];


        })

    }


    showDialog(){
        this.displayWorkDialog = true;
    }

    joinWork(){
        if(this.codeWork){
            this.ws.joinWork(this.codeWork).subscribe({

                next: (res) =>{
                    if(res.message === "invalid"){
                        this.ms.add({severity: "error", summary: "Error", detail: "Código inválido"});
                    }
                    if(res.message === "this user is already on this workenv"){
                        this.ms.add({severity: "error", summary: "Error", detail: "Ya habías enviado una solicitud antes"});

                    }

                    if(res.message === "success"){

                        this.ws.NotifyUserNewRequest(this.codeWork).subscribe({

                            next: (res) =>{
                                this.ms.add({severity: "success", summary: "Éxito", detail: "Se ha enviado una solicitud de unión al líder"});

                            }

                        });

                    }
                    this.displayWorkDialog = false;
                }

            });
        }else{
            this.ms.add({severity: "error", summary: "Error", detail: "Debe ingresar el código"});
        }
    }
}
