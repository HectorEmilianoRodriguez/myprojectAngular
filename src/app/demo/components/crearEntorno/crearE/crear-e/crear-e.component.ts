import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-e',
 
  
  templateUrl: './crear-e.component.html',
  styleUrl: './crear-e.component.scss'
})
export class CrearEComponent implements OnInit {
  entornoForm: FormGroup;
  tipoEntornos: string[] = ['Tipo 1', 'Tipo 2', 'Tipo 3']; // Ejemplo de opciones para el select

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.entornoForm = this.fb.group({
      entornoNombre: ['', Validators.required],
      tipoEntorno: ['', Validators.required],
      descripcion: [''] // Puedes agregar validaciones si es necesario
    });
  }
  onSubmit(): void {
    if (this.entornoForm.valid) {
      // Procesa el formulario
      console.log('Formulario enviado', this.entornoForm.value);
    } else {
      this.entornoForm.markAllAsTouched(); // Marca todos los campos como tocados para mostrar errores
    }
  }
}