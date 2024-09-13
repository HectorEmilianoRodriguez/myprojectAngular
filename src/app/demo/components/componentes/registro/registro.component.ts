import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterService } from '../servicios/register.service';
import { Password } from 'primeng/password';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
  
  
export class RegistroComponent {
  protected fgregistro: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private app: AppComponent,
    private router: Router,
    private route: ActivatedRoute,
    private servicioRegistro: RegisterService,

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

    },{ validators: [this.validacionPassword] });
    
     

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

    onSubmit(){
      if(this.fgregistro.valid){
        
        let data = {
          name : this.fgregistro.value['nombre'],
          email: this.fgregistro.value['email'],
          Password : this.fgregistro.value['contrasena']
       }
       
        this.servicioRegistro.postRegister(data).subscribe({
          next: response =>{
              //maneja la respuesta exitosa
              console.log("Registro exitoso: ", response);
              this.router.navigate(['api/login']);//redirige a la pagina de inicio de sesion


            },
            error : err =>{
              //maneja el error
              console.error('Error en el registro: ',err);

            }

          });

        }else{
          console.log('Formulario valido');

        }
      }
}


