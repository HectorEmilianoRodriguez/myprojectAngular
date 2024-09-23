import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { AppLayoutComponent } from './app.layout.component';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from 'src/app/services/auth.service';
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
        private authService: AuthService
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

        this.authService.logout().subscribe({
            next: (response: any) => {
                if (response.message === 'success') {
                    // Limpiar cualquier estado local si es necesario
                    localStorage.removeItem('user');
                    sessionStorage.clear();
                    
                    // Ocultar opciones
                    this.ocultarOpciones();
                    
                    // Redirigir al login
                    this.router.navigate(['/landing']);
                    console.log('Cookies después del login:', document.cookie);
                } else {
                    // Manejar respuesta inesperada
                    console.error('Respuesta inesperada del servidor');
                }
            },
            error: (error) => {
                console.error('Error al cerrar sesión', error);
                // Aquí podrías mostrar un mensaje de error al usuario
                // Por ejemplo, usando un servicio de notificaciones
                 
            }
        });
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
