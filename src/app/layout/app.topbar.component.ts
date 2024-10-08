import { Component, ElementRef, ViewChild, HostListener,OnInit,ChangeDetectorRef } from '@angular/core';
import { AppLayoutComponent } from './app.layout.component';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from 'src/app/services/auth.service';

import { PerfilUService } from '../demo/components/PerfilUser/PerfilU/servicios/perfil-u.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

    items!: MenuItem[];
    notificaciones: any[] = [];
    mostrarNotificaciones: boolean = false;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    opcionesDesplegadas: boolean = false;
    fotoUser: SafeUrl | null = null;
    nombreUsuario: string = '';
    isLoadingPhoto: boolean = false;


    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private appLayoutComponent: AppLayoutComponent,
        private authService: AuthService,
        private perfilService: PerfilUService,
        private sanitizer: DomSanitizer,

        private cdr: ChangeDetectorRef


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

        this.cargarDatosUsuario();
    }
 
    cargarDatosUsuario() {
        this.perfilService.obtenerUserPerfil().subscribe(
            (data) => {
                if (data && data.name) {
                    this.nombreUsuario = data.name;
                }
            },
            (error) => {
                console.error('Error al cargar el perfil del usuario:', error);
            }
        );

        this.perfilService.ObtenerFotoUser().subscribe(
            (response: Blob) => {
                const objectUrl = URL.createObjectURL(response);
                this.fotoUser = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
            },
            (error) => {
                console.error('Error al cargar la foto del usuario:', error);
                this.fotoUser = './assets/demo/images/login/avatar.png';
            }
        );
        this.geNotifi();
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


    geNotifi() {
        this.perfilService.getNotificatios().subscribe(
            (data) => {
                this.notificaciones = data; // Almacena las notificaciones en la propiedad
                console.log('Notificaciones recibidas:', this.notificaciones); // Muestra las notificaciones en la consola
            },
            (error) => {
                console.error('Error al obtener las notificaciones:', error); // Manejo de errores
            }
        )
    }

    toggleNotificaciones() {
        this.mostrarNotificaciones = !this.mostrarNotificaciones; // Alterna la visibilidad
    }
}
