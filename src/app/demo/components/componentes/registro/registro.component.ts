import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { Router, ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute

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


}
