import { Component, OnInit } from '@angular/core';
import { fileService } from '../files/services/files-service';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkEnvMService } from '../workenvm/servicios/workenvm-service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.scss'] // Cambia "styleUrl" a "styleUrls"
})
export class ArchivesComponent implements OnInit {

  idw: string;
  privilege: any;
  idj: any;
  folder: any;
  idf: any;
  selectedFile: File | null = null;
  files: any [] = [];
  logicdeleted;
  constructor(
    private fs: fileService, 
    private r: ActivatedRoute, 
    private ws: WorkEnvMService,
    private router: Router,
    private ms: MessageService,
    private cs: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.r.paramMap.subscribe(params => {
      this.idw = params.get('id')!;
      this.idf = params.get('idf')!;
      this.ws.getWorkEnv(this.idw).subscribe({
        next: (res) => {
          this.privilege = res.privilege;
          this.idj = res.idJoinUserWork;
          this.logicdeleted = res.logicdeleted;
          // Asegúrate de que idj e idf están disponibles antes de hacer la llamada
          if (this.idj && this.idf) {
            this.fs.getFolderInfo(this.idj, this.idf).subscribe({
              next: (res) => {
                if (res.message === "notshared" || res.message === "none") {
                  this.router.navigate(['/Dash']);
                }
                this.folder = res;
              },
              error: () => {
                this.router.navigate(['/Dash']);
              }
            });
          }
        }
      });
      this.getFiles();
    });
  }
  triggerFileInput() { 
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }
  

  newArchive() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('nameF', this.folder.nameF);
      formData.append('idFolder', this.folder.idFolder.toString()); // Asegúrate de que es un string
      formData.append('nameA', this.selectedFile.name);


      console.log('nombre:', this.selectedFile.name);
      console.log('idFolder:', this.folder.idFolder.toString());
      console.log('file:', this.selectedFile);
      console.log('nameF:', this.folder.nameF);

      this.ms.add({ severity: 'info', summary: 'Cargando', detail: 'Se está subiendo el archivo...' });

      this.fs.uploadFile(formData).subscribe({
        next: (res) => {
          this.ms.add({ severity: 'success', summary: 'Éxito', detail: 'Archivo subido exitosamente' });
          this.selectedFile = null; // Limpiar la selección después de la carga
          this.getFiles();
        },
        error: (error) => {
          console.error('Error al subir el archivo:', error);
          this.ms.add({ severity: 'error', summary: 'Error', detail: 'No se pudo subir el archivo.' });
        }
      });
    } else {
      console.log('Por favor, selecciona un archivo.');
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.newArchive();
    }
  }

  getFiles(){
    this.fs.getFiles(this.idf).subscribe({
        next: (res) =>{
          this.files = res;
        }
    });
  }

  downloadFile(link: string) {
    const fullUrl = 'http://localhost:8000/' + link;
    this.ms.add({severity: 'info', summary: 'cargando', detail: 'Descargando archivo...'});
    this.fs.downloadFile(fullUrl).subscribe({
        next: (response) => {
            // Crear un Blob a partir de la respuesta
            const blob = new Blob([response], { type: response.type });
            const url = window.URL.createObjectURL(blob);

            // Crear un enlace temporal para la descarga
            const a = document.createElement('a');
            a.href = url;
            a.download = link.split('/').pop(); // Obtiene el nombre del archivo
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            this.ms.add({severity: 'success', summary: 'Éxito', detail: 'Archivo descargado con éxito.'});

        },
        error: (error) => {
            console.error('Error al descargar el archivo:', error);
        }
    });
}

  deleteFile(idfile){
    this.cs.confirm({
      message: '¿Estás seguro de que deseas eliminar este archivo?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ms.add({severity: 'info', summary: 'Cargando', detail: 'Eliminando archivo...'});
        this.fs.deleteFile(idfile).subscribe({
            next: (res) =>{
              this.ms.add({severity: 'success', summary: 'Éxito', detail: 'Archivo eliminado.'});
              this.getFiles();
            }
        });
      },
        acceptLabel: 'Sí', // Cambia el texto del botón de aceptación a "Sí"
        rejectLabel: 'No'
    });
  }


}
