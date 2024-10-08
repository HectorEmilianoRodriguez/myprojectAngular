import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { AppLayoutComponent } from './app.layout.component';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    opcionesDesplegadas: boolean = false;
    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private appLayoutComponent: AppLayoutComponent,
    ) { }

    ngOnInit() {
        this.items = [
            {
                label: 'Perfil',
                icon: 'pi pi-user',
                items: [
                    {
                        label: 'Editar',
                        icon: 'pi pi-user-edit',
                        command: () => this.editPerfil()
                    },
                    {

                        label: 'Contraseña',
                        icon: 'pi pi-key',
                        command: () => this.editContrasena()
                    },
                    {

                        label: 'Salir',
                        icon: 'pi pi-sign-in',
                        command: () => this.salir()
                    },
                ]
            },

        ];

    }


    salir() {

        this.layoutService.logout().subscribe({
            next: (response: any) => {
                if (response.message === 'success') {
                    this.router.navigate(['/auth/login']);
                }
            },
            error: (error) => {
                console.log(error);
            }

        })
        
        this.ocultarOpciones();
    }

    editPerfil(){
        this.router.navigate(['/perfiles/perfil']);
        this.ocultarOpciones();
    }
    editContrasena(){
        this.router.navigate(['/perfiles/contra']);
        this.ocultarOpciones();
    }
    toggleOpciones() {
        this.opcionesDesplegadas = !this.opcionesDesplegadas;
    }

    ocultarOpciones() {
        this.opcionesDesplegadas = false;
    }
}
