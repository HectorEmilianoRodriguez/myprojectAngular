import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

    constructor() {}

    ngOnInit() {
      // Inicialización si es necesario
    }

    totalEntornosParticipo = 0;
    totalMisEntornos = 0;
    totalactividesevaluar = 0;
    totalsolicitudes = 0;
    totalactividesporexpirar = 0;
    totalcomentarios = 0;
    

    misEntornos: MenuItem[] = [
        {
          label: 'Ver entornos',
          items: [
            { label: 'New', icon: 'pi pi-fw pi-plus' },
            { label: 'Open', icon: 'pi pi-fw pi-download' },
            { label: 'Option 1', icon: 'pi pi-fw pi-calendar' },
            { label: 'Option 2', icon: 'pi pi-fw pi-calendar' },
            { label: 'Option 1', icon: 'pi pi-fw pi-calendar' },
            { label: 'Option 2', icon: 'pi pi-fw pi-calendar' }
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
            { label: 'Option 1', icon: 'pi pi-fw pi-calendar' },
            { label: 'Option 2', icon: 'pi pi-fw pi-calendar' }
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
}
