import { ServiciosAuthService } from './../servicios/servicios-auth.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-respaldoy-auth',
  templateUrl: './respaldoy-auth.component.html',
  styleUrls: ['./respaldoy-auth.component.scss'],
  providers: [MessageService]
})
export class RespaldoyAuthComponent implements OnInit {
  archivoSeleccionado: File | null = null;
  nombreArchivo: string = '';
  restaurando: boolean = false;

  constructor(
    private serviciosAuth: ServiciosAuthService,
    private messageService: MessageService
    

  ) {}

  ngOnInit() {
   
  }

  capturarFile(event: any): void {
    const file = event.files[0];
    if (file) {
      this.archivoSeleccionado = file;
      this.nombreArchivo = file.name;
      console.log('Archivo seleccionado:', this.nombreArchivo);
    }
  }

  restaurarBaseDeDatos(): void {
    if (this.archivoSeleccionado) {
      this.restaurando = true;
      this.serviciosAuth.restaurarBaseDeDatos(this.archivoSeleccionado)
        .subscribe(
          (respuesta) => {
            console.log('Restauración exitosa', respuesta);
            this.messageService.add({severity:'success', summary: 'Éxito', detail: 'Base de datos restaurada correctamente'});
            this.archivoSeleccionado = null;
            this.nombreArchivo = '';
          },
          (error) => {
            console.error('Error en la restauración', error);
            this.messageService.add({severity:'error', summary: 'Error', detail: 'No se pudo restaurar la base de datos'});
          }
        ).add(() => {
          this.restaurando = false;
        });
    } else {
      this.messageService.add({severity:'warn', summary: 'Advertencia', detail: 'Por favor, seleccione un archivo de respaldo'});
    }
  }
}