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
  pass;
  pass2;
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
    
    if (this.archivoSeleccionado && this.pass2 === "UPEMOR-98E0AFSJ213") {
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
      this.messageService.add({severity:'error', summary: 'Error', detail: 'La clave es incorrecta'});
    }
  }

  hacerRespaldo() {

    if(this.pass === "UPEMOR-98E0AFSJ213"){
      this.messageService.add({severity:'info', summary: 'Cargando', detail: 'Respaldando base de datos...'});

    this.serviciosAuth.respaldoBD().subscribe({
      next: (response) => {
        // Crear un objeto URL para el blob recibido
        const blob = new Blob([response], { type: 'application/sql' });
        const url = window.URL.createObjectURL(blob);
        
        // Crear un enlace para descargar el archivo
        const a = document.createElement('a');
        a.href = url;
        a.download = `backup_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.sql`; // Nombre del archivo
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        this.messageService.add({severity:'success', summary: 'Éxito', detail: 'Base de datos respaldada correctamente'});
      },
      error: (err) => {
        console.error('Error al realizar el respaldo de la base de datos:', err);
      }
    });
    }else{
      this.messageService.add({severity:'error', summary: 'Error', detail: 'La clave es incorrecta'});

    }
    
  }


}

