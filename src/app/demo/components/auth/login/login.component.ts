import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AppComponent } from 'src/app/app.component';
import { LoginService } from '../servicios/login.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html', providers: [MessageService],

    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password: any;
    Correo: any;
    visible: boolean = false; //CONTRALa el modal del recuperar contraseña

    constructor(public layoutService: LayoutService, private messageService: MessageService,
        private app: AppComponent, private servicioLogin: LoginService,
        private router: Router, private authService: AuthService
    ) {

    }

    ngOnInit(): void {
        this.app.hideLoading();
    }
    enviarLogin() {
        this.app.showLoading();
        let data = {
            email: this.Correo,
            password: this.password
        }

        this.authService.postLogin(data).subscribe({
            next: (response: any) => {
                //mensajes de no logear
                if (response.message === 'success') {
                    console.log('Cookies después del login:', document.cookie);
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'inicio de sesion Corrrecto' });
                   // this.router.navigate(['/Dash']);
                }
                else {
                    this.messageService.add({ severity: 'info', summary: 'Informacion', detail: response.message });
                }
                console.log(data);
                //}
            },
            complete: () => {
                this.app.hideLoading();
            },
            error: (error) => {
                if (error.status === 401) {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
                } else {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error durante el inicio de sesion' });
                }
            }
        })
    }


    // Método para mostrar el modal
    showDialog() {
        this.visible = true;
    }


    //metodo para manejar la recuperacion 

    recuperarContraseña() {

        this.app.showLoading();
        let data = {
            email: this.Correo,

        }

        this.servicioLogin.recuperarPassword(data).subscribe({
            next: data => {
                //mensajes de no logear
                //his.messageService.add({severity:'info', summary:'Atención', detail:'Recibiras un correo electronico con un enlace de activación para completar el proceso de cambio de contraseña.',sticky: true});
                //if (typeof data === 'object' && data !== null) {
                //} else {

                console.log(data);
                //}
            },
            complete: () => {
                this.router.navigate(['/Dash']);
            },

            error: error => {
                //mensajes de error
            }

        })


    }


}
