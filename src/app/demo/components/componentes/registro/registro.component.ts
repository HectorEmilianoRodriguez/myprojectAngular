import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterService } from '../servicios/register.service';
import { Password } from 'primeng/password';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
  providers: [MessageService]
})


export class RegistroComponent {
  protected fgregistro: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private app: AppComponent,
    private router: Router,
    private route: ActivatedRoute,
    private servicioRegistro: RegisterService,
    private messageService: MessageService

  ) {
  }

  ngOnInit(): void {
    this.cargaInicial();
    console.log(this.fgregistro.valid);
  }



  cargaInicial() {
    this.fgregistro = this.formBuilder.group({
      nombre: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.maxLength(155), Validators.email]],
      contrasena: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],

    }, { validators: [this.validacionPassword] });



  }




  validacionPassword(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('contrasena').value;
    const confirmPassword = group.get('confirmPassword').value;

    if (password !== confirmPassword) {
      return { matchingPasswords: true };
    } else {
      return null;
    }
  }

  onSubmit() {
    if (this.fgregistro.valid) {
      let data = {
        name: this.fgregistro.value['nombre'],
        email: this.fgregistro.value['email'],
        password: this.fgregistro.value['contrasena']
      };

      this.servicioRegistro.postRegister(data).subscribe({
        next: response => {
          console.log("Registro exitoso: ", response);
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro exitoso. Redirigiendo...' });

          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 7000);
        },
        error: err => {
          // Maneja el error
          console.error('Error en el registro: ', err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en el registro. Inténtalo de nuevo.' }); // Muestra un mensaje de error
        }
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}


