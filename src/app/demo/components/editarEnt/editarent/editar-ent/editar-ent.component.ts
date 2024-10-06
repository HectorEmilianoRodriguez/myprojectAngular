import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkEnvService } from '../../../../service/work-env.service';

@Component({
  selector: 'app-editar-ent',
  templateUrl: './editar-ent.component.html',
  styleUrls: ['./editar-ent.component.scss']
})
export class EditarEntComponent implements OnInit {
  entornoId: string;
  entornoData: any; // Aquí puedes definir la estructura de datos del entorno

  constructor(
      private route: ActivatedRoute,
      private workEnvService: WorkEnvService
  ) { }

  ngOnInit() {
      this.entornoId = this.route.snapshot.paramMap.get('id'); // Obtiene el ID del entorno de la ruta
      console.log('ID del entorno en EditarEntComponent:', this.entornoId); // Verifica que el ID no sea undefined
      this.loadEntornoData();
  }

  loadEntornoData() {
      this.workEnvService.getWorkEnv(this.entornoId).subscribe(data => {
          this.entornoData = data; // Carga los datos del entorno
      }, error => {
          console.error('Error al cargar los datos del entorno:', error);
      });
  }

  onSubmit() {
    this.workEnvService.updateWorkEnv(this.entornoId, this.entornoData).subscribe(response => {
        console.log('Entorno actualizado:', response);
        // Redirigir o mostrar un mensaje de éxito
    }, error => {
        console.error('Error al actualizar el entorno:', error);
    });
  }

  // Aquí puedes agregar métodos para manejar el formulario y guardar los cambios
}

