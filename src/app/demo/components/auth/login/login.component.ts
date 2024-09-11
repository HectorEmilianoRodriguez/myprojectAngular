import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AppComponent } from 'src/app/app.component';
import { LoginService } from '../servicios/login.service';
import { MessageService } from 'primeng/api';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',providers: [MessageService],

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

    password: string;
    Correo : string;
    
    constructor(public layoutService: LayoutService,private messageService: MessageService,
        private app:AppComponent,private servicioLogin: LoginService
    ) { 

    }

    ngOnInit(): void{
      this.app.hideLoading();
    }
    enviarLogin(){
        this.app.showLoading();
        let data = {
             email : this.Correo,
             password : this.password

        }

        this.servicioLogin.postLogin(data).subscribe({
            next: data=> {
              //mensajes de no logear
              //his.messageService.add({severity:'info', summary:'Atención', detail:'Recibiras un correo electronico con un enlace de activación para completar el proceso de cambio de contraseña.',sticky: true});
                //if (typeof data === 'object' && data !== null) {
                //} else {
                    
                    console.log(data);
                //}
            },
            complete : ()=>{
              
            },

            error : error =>{
                //mensajes de error
            }

        })

    }

    
}
