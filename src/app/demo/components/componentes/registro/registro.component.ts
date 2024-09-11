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

  }

  cargaInicial() {
    this.fgregistro = this.formBuilder.group({
      nombre: [null, [Validators.required]],
      contrasena: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(45)]]

    });
  }

}
