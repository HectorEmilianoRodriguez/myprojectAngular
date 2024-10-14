import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { LayoutService } from '../layout/service/app.layout.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../services/auth.service';
import { PerfilUService } from '../demo/components/PerfilUser/PerfilU/servicios/perfil-u.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';
import { AppLayoutComponent } from './app.layout.component';
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];
    notificaciones: any[] = [];
    mostrarNotificaciones: boolean = false;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    opcionesDesplegadas: boolean = false;
    fotoUser;
    nombreUsuario: string = '';
    isLoadingPhoto: boolean = false;
    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private appLayoutComponent: AppLayoutComponent,
        private authService: AuthService,
        private perfilService: PerfilUService,
        private notificacionService :LayoutService,
        private sanitizer: DomSanitizer,
        private cdr: ChangeDetectorRef,
        


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
                if(data.photo){
                    this.fotoUser = 'http://localhost:8000/api/' + data.photo;
                }else{
                    this.fotoUser = 'http://localhost:8000/api/photos/test.jpg';

                }
                 

            },
            (error) => {
                console.error('Error al cargar el perfil del usuario:', error);
            }
        );
        this.geNotifi();
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

    geNotifi() {
        this.perfilService.getNotificatios().subscribe({
            next: (res) => {
              // Convierte el objeto en un array
              this.notificaciones = Object.values(res);
              console.log(this.notificaciones); // Verifica la salida
            },
            error: (er) => {
              console.log(er);
            }
          });
    }

    toggleNotificaciones() {
       
        this.mostrarNotificaciones = !this.mostrarNotificaciones; // Alterna la visibilidad
    }

    visto(idNoti){
        this.notificacionService.notificacionVisible(idNoti).subscribe(
            (next)=> {
                this.geNotifi();
                console.log('Notificaciones vistas'); // Muestra las notificaciones en la consola
             },
             (error) => {
                 console.error('Error al marcar las notificaciones:'); // Manejo de errores
             }

        )
                   
    
    }

}
