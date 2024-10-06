import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { WorkEnvService, WorkEnvCounts, WorkActiCounts } from '../../service/work-env.service';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit, OnDestroy {
    totalMisEntornos: number = 0;
    totalEntornosParticipo: number = 0;
    totalActividadesEvaluar: number = 0;
    totalComentarios: number = 0;
    totalActividadesPorExpirar: number = 0;
    totalSolicitudes: number = 0;

    misEntornos: MenuItem[] = [];

    elementosEntornosParticipo: MenuItem[] = [];

    comentariosPendientes: MenuItem[] = [];

    actividadesEvaluar: MenuItem[] = [];

    actividadesAExpirar: MenuItem[] = [];

    solicitudesPendientes: MenuItem[] = [];

    private navigationSubscription: Subscription;

    constructor(
        private workEnvService: WorkEnvService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadCounts();
        this.navigationSubscription = this.router.events.pipe(
            filter((event): event is NavigationEnd => event instanceof NavigationEnd)
        ).subscribe(() => {
            if (this.router.url === '/dashboard') {
                this.loadCounts();
            }
        });
    }

    ngOnDestroy() {
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

    loadCounts() {
        this.workEnvService.getCounts().subscribe({
            next: (counts: WorkEnvCounts) => {
                console.log('Conteos recibidos:', counts);
                this.totalMisEntornos = counts.owner;
                this.totalEntornosParticipo = counts.participant;
            },
            error: (error) => {
                console.error('Error al obtener conteos:', error);
                // Manejar el error apropiadamente
            }
        });

        this.workEnvService.getActivitis().subscribe({
            next: (counts2: WorkActiCounts) => {
                this.totalActividadesEvaluar = counts2.PendingApprovalActivities;
                this.totalComentarios = counts2.NotSeenComments;
                this.totalActividadesPorExpirar = counts2.AlmostExpiredOrExpiredActivities;
                this.totalSolicitudes = counts2.requests;
            },
            error: (error) => {
                console.error('Error al obtener conteos:', error);
            }

        })
        this.getCantEntornos()
    }

    getCantEntornos() {
        this.workEnvService.getEntornos().subscribe(data => {

            const ownerItems = data.owner
                .filter(entorno => entorno.privilege === 2) // Filtra por privilegio
                .map(entorno => ({
                    label: entorno.title,
                    icon: 'pi pi-fw pi-calendar',
                }));

            const participantItems = data.participant
                .filter(entorno => entorno.privilege === 2) // Filtra por privilegio
                .map(entorno => ({
                    label: entorno.title,
                    icon: 'pi pi-fw pi-calendar',
                }));

            this.misEntornos = [
                {
                    label: 'Mis Entornos',
                    items: [...ownerItems, ...participantItems]
                }
            ];
        })

        this.getCantInvEntornos();
    }

    getCantInvEntornos() {
        this.workEnvService.getEntornos().subscribe(data => {

            const ownerItems = data.owner
                .filter(entorno => entorno.privilege === 1) // Filtra por privilegio
                .map(entorno => ({
                    label: entorno.title,
                    icon: 'pi pi-fw pi-calendar',
                }));

            const participantItems = data.participant
                .filter(entorno => entorno.privilege === 1) // Filtra por privilegio
                .map(entorno => ({
                    label: entorno.title,
                    icon: 'pi pi-fw pi-calendar',
                }));

            this.elementosEntornosParticipo = [
                {
                    label: 'Entornos a los que pertenezco',
                    items: [...ownerItems, ...participantItems]
                }
            ];
        })
        this.getNocoments();
    }

    getNocoments() {
        this.workEnvService.getComents().subscribe(
            (data) => {
                this.comentariosPendientes = [
                    {
                        label: 'Comentarios Pendientes',
                        items: data.map(comentario => ({
                            label: `Entorno: ${comentario.nameW},
                            Tablero: ${comentario.nameB},
                            Comentario de: ${comentario.name},
                            Comentario: ${comentario.nameC}- ${comentario.text} `,
                            icon: 'pi pi-comment'
                        })),
                        icon: 'pi pi-comment',
                        expanded: false // Propiedad para controlar la expansión
                    }
                ];
            },
            (error) => {
                console.error('Error al cargar los comentarios:', error);
            }
        )
        this.getNoActivitis();
    }

    getNoActivitis() {
        this.workEnvService.getNotActivities().subscribe(data => {

            const items = data.map(entorno => ({
                label: `Titulo: ${entorno.nameC} (Entorno: ${entorno.nameW}) Tablero: ${entorno.nameB}`, // Formato del label
                icon: 'pi pi-fw pi-calendar',
            }));
    
            this.actividadesEvaluar = [
                {
                    label: 'Actividades por evaluar',
                    items: items // Asignamos directamente los items
                }
            ];
        }
        )
        this.getPendientes()
    }

    getPendientes() {
        this.workEnvService.getPending().subscribe(data => {
            const items = data.map(entorno => ({
                label: `${entorno.name} (Entorno: ${entorno.nameW})`, // Formato del label
                icon: 'pi pi-fw pi-calendar',
            }));
    
            this.solicitudesPendientes = [
                {
                    label: 'Actividades',
                    items: items // Asignamos directamente los items
                }
            ];
        })
        this.getExpiracion()
    }

    getExpiracion() {
        this.workEnvService.getExpired().subscribe(data => {
            const items = data.map(entorno => ({
                label: `Titulo: ${entorno.nameC} (Entorno: ${entorno.nameW}) Tablero: ${entorno.nameB}`, // Formato del label
                icon: 'pi pi-fw pi-calendar',
            }));
            this.actividadesAExpirar = [
                {
                    label: 'Actividades por expirar',
                    items: items // Asignamos directamente los items
                }
            ];
        })
    }

}