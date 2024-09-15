import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
    templateUrl: './documentation.component.html',
    styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent {
    constructor() {}

    ngOnInit() {
      // Inicialización si es necesario
    }

    misEntornos: MenuItem[] = [
        {
          label: 'Mis entornos',
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
          label: 'Otros entornos',
          items: [
            { label: 'Option 1', icon: 'pi pi-fw pi-calendar' },
            { label: 'Option 2', icon: 'pi pi-fw pi-calendar' }
          ]
        },
        
      ];

      actividadesEvaluar: MenuItem[] = [
        {
          label: 'Otros entornos',
          items: [
            { label: 'Option 1', icon: 'pi pi-fw pi-calendar' },
            { label: 'Option 2', icon: 'pi pi-fw pi-calendar' }
          ]
        },
       
      ];

      actividadesAExpirar: MenuItem[] = [
        {
          label: 'Otros entornos',
          items: [
            { label: 'Option 1', icon: 'pi pi-fw pi-calendar' },
            { label: 'Option 2', icon: 'pi pi-fw pi-calendar' }
          ]
        },
        
      ];


      comentariosPendientes: MenuItem[] = [
        {
          label: 'Otros entornos',
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
          label: 'Otros entornos',
          items: [
            { label: 'Option 1', icon: 'pi pi-fw pi-calendar' },
            { label: 'Option 2', icon: 'pi pi-fw pi-calendar' }
          ]
        },
        
      ];





}
    
