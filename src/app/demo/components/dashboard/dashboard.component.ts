import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { WorkEnvService, WorkEnvCounts } from '../../service/work-env.service';
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

    misEntornos: MenuItem[] = [
        {
            label: 'Ver entornos',
            items: [
                { label: 'New', icon: 'pi pi-fw pi-plus' },
                { label: 'Open', icon: 'pi pi-fw pi-download' },
                { label: 'Option 1', icon: 'pi pi-fw pi-calendar' },
                { label: 'Option 2', icon: 'pi pi-fw pi-calendar' },
                { label: 'Option 3', icon: 'pi pi-fw pi-calendar' },
                { label: 'Option 4', icon: 'pi pi-fw pi-calendar' }
            ]
        },
    ];

    elementosEntornosParticipo: MenuItem[] = [
        {
            label: 'Ver entornos',
            items: [
                { label: 'Option 1', icon: 'pi pi-fw pi-calendar' },
                { label: 'Option 2', icon: 'pi pi-fw pi-calendar' }
            ]
        },
    ];

    actividadesEvaluar: MenuItem[] = [
        {
            label: 'Ver actividades',
            items: [
                { label: 'Option 1', icon: 'pi pi-fw pi-calendar' },
                { label: 'Option 2', icon: 'pi pi-fw pi-calendar' }
            ]
        },
    ];

    actividadesAExpirar: MenuItem[] = [
        {
            label: 'Ver actividades',
            items: [
                { label: 'Option 1', icon: 'pi pi-fw pi-calendar' },
                { label: 'Option 2', icon: 'pi pi-fw pi-calendar' }
            ]
        },
    ];

    comentariosPendientes: MenuItem[] = [
        {
            label: 'Ver comentarios',
            items: [
                { label: 'Option 1', icon: 'pi pi-fw pi-calendar' },
                { label: 'Option 2', icon: 'pi pi-fw pi-calendar' },
                { label: 'Option 3', icon: 'pi pi-fw pi-calendar' },
                { label: 'Option 4', icon: 'pi pi-fw pi-calendar' }
            ]
        },
    ];

    solicitudesPendientes: MenuItem[] = [
        {
            label: 'Ver solicitudes',
            items: [
                { label: 'Option 1', icon: 'pi pi-fw pi-calendar' },
                { label: 'Option 2', icon: 'pi pi-fw pi-calendar' }
            ]
        },
    ];

    private navigationSubscription: Subscription;

    constructor(
        private workEnvService: WorkEnvService,
        private router: Router
    ) {}

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
                // Los otros contadores se mantienen en 0 por ahora
                this.totalActividadesEvaluar = 0;
                this.totalComentarios = 0;
                this.totalActividadesPorExpirar = 0;
                this.totalSolicitudes = 0;
            },
            error: (error) => {
                console.error('Error al obtener conteos:', error);
                // Manejar el error apropiadamente
            }
        });
    }
}