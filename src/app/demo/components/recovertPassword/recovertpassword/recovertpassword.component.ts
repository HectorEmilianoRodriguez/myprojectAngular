import { Password } from 'primeng/password';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecovertPasswordService } from '../servicios/recovert-password.service';
@Component({
  selector: 'app-recovertpassword',
  templateUrl: './recovertpassword.component.html',
  styleUrl: './recovertpassword.component.scss'
})
export class RecovertpasswordComponent {

  Password: any;
  Password2: any;
  token2: any | null = null;
  user: any | null = null;
  passwordMismatch: boolean = false;

  constructor(private route: ActivatedRoute,
    private resetService: RecovertPasswordService,
    private router : Router
  ) { }
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token2 = params['token'];
      this.user = params['email'];
    })
  }

  validatePasswords() {
    this.passwordMismatch = this.Password !== this.Password2;
  }

  isSaveButtonDisabled(): boolean {
    return !this.Password || !this.Password2 || this.passwordMismatch;
  }

  reset() {
    let data = {
      token: this.token2,
      email: this.user,
      pass: this.Password,
    }

    this.resetService.changuepass(this.token2, this.user, this.Password).subscribe({
      next: (response) => {
        // Manejar la respuesta exitosa
        console.log('Contraseña cambiada exitosamente:', response);
        // Redirigir al usuario a otra página, por ejemplo, al login
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        // Manejar el error
        console.error('Error al cambiar la contraseña:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    })


  }

}
