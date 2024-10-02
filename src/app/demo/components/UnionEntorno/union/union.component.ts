import { Component } from '@angular/core';

@Component({
  selector: 'app-union',
  
  templateUrl: './union.component.html',
  styleUrl: './union.component.scss'
})
export class UnionComponent {
  entornoNombre: string = 'Nombre del Entorno'; //nombre estatico por ahora
  fechaInicio: string = '01/01/2024'; 
  fechaTermino: string = '31/12/2024'; 
  miembrosActivos: number = 10; 
  coordinador: string = 'Un nombre de coordinador';

  
  
  /*
  entornoNombre: string = '';
  coordinador: string = '';
  miembrosActivos: number = 0;
  fechaInicio: string = '';
  fechaTermino: string = '';

   constructor(private proyectoService : proyectoService){}

   ngOnInit():void{
     this.loadProyectoData();


   }
     loadProyectoData(): void {
    this.proyectoService.getProyectoData().subscribe(data => {
      this.entornoNombre = data.entornoNombre;
      this.coordinador = data.coordinador;
      this.miembrosActivos = data.miembrosActivos;
      this.fechaInicio = data.fechaInicio;
      this.fechaTermino = data.fechaTermino;
    });

  */

}
 