import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkEnvMService } from '../workenvm/servicios/workenvm-service';
import { fileService } from './services/files-service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
@Component({
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  idw: string;
  idj;
  privilege: any;
  name: string;
  displaynewf = false;
  folders: any[] = [];
  displayModal = false;
  selectedFolder: any; 
  menuItems: any[] = [];
  Ename: string;
  members: any[] = [];
  selectedMembersIds: number[] = []; // Para almacenar los ids seleccionados
  displayDialog = false;
  sharedMembers: any [] = [];
  displayMembersFolder = false;
  logicdeleted = 0;
  idFolders: any [] = [];
  @ViewChild('dt') dt: Table; // Asegúrate de tener una referencia a la tabla

  constructor(
    private ar: ActivatedRoute,
    private ws: WorkEnvMService,
    private fs: fileService,
    private ms: MessageService,
    private cs: ConfirmationService
  ) {}

  ngOnInit() {
    this.ar.paramMap.subscribe(params => {
      this.idw = params.get('id');
      this.ws.getWorkEnv(this.idw).subscribe({
        next: (res) => {
          this.privilege = res.privilege;
          this.idj = res.idJoinUserWork;
          this.logicdeleted = res.logicdeleted;
          this.getFolders();
        }
      });
    });
  }


  // Método para abrir el diálogo
  showDialog() {
    this.displayDialog = true;
  }
  onMemberSelect(id: number, selected: boolean) {
    if (selected) {
      // Si el miembro está seleccionado, verifica si ya está en la lista
      if (!this.selectedMembersIds.includes(id)) {
        this.selectedMembersIds.push(id);
      }
    } else {
      // Si el miembro está deseleccionado, lo removemos de la lista
      this.selectedMembersIds = this.selectedMembersIds.filter(memberId => memberId !== id);
    }
    
    // Actualiza el estado de selección de los miembros
    this.members.forEach(m => {
      if (m.idJoinUserWork === id) {
        m.selected = selected; // Actualiza el estado de selección
      }
    });
  }
  openDialogFolder() {
    this.displaynewf = true;
  }

  shareFolder() {
    console.log('IDs de miembros seleccionados:', this.selectedMembersIds);
    this.displayDialog = false;
  
    // Limpiar el estado de los miembros seleccionados
    this.members.forEach(member => {
      member.selected = false; // Restablece la selección
    });

    if(this.selectedMembersIds.length > 0){
      this.ms.add({ severity: 'info', summary: 'Cargando', detail: 'Compartiendo carpeta' });

      this.fs.shareFolder(this.selectedMembersIds, this.selectedFolder.idFolder).subscribe({

        next: (res) =>{
          this.ms.add({ severity: 'success', summary: 'Éxito', detail: 'Carpeta compartida con éxito' });
          // Limpia los IDs seleccionados
          this.selectedMembersIds = [];
          this.displayDialog = false;
          this.getMembers();
        }

    });
    }else{
      this.ms.add({ severity: 'error', summary: 'Error', detail: 'Debe seleccionar a los miembros para compartir la carpeta' });

    }

  }
  

  newFolder() {
    if (this.name) {
      this.ms.add({ severity: 'info', summary: 'Cargando', detail: 'Agregando carpeta...' });
      this.fs.newFolder(this.name, this.idj).subscribe({
        next: (res) => {
          this.ms.add({ severity: 'success', summary: 'Éxito', detail: 'Carpeta agregada con éxito.' });
          this.displaynewf = false;
          this.getFolders();
        },
        error: () => {
          this.ms.add({ severity: 'error', summary: 'Error', detail: 'No se pudo agregar la carpeta.' });
        }
      });
    } else {
      this.ms.add({ severity: 'error', summary: 'Error', detail: 'Se debe indicar un nombre a la carpeta' });
    }
  }

  getFolders() {
    this.fs.getFolders(this.idj).subscribe({
      next: (res) => {
        this.folders = res;
      }
    });
  }

  getMembers(){
    this.fs.getMembersShare(this.idw, this.selectedFolder.idFolder).subscribe({
      next: (res) => {
        // Agregar el atributo `selected` a cada miembro
        this.members = res.map(member => ({
          ...member,
          selected: false // Inicializa `selected` como false
        }))
      }
    });
  }
 
  editFolder() {
    this.displayModal = true; // Muestra el modal
    this.Ename = this.selectedFolder.nameF; // Establece el nombre de la carpeta en el input

}

eFolder(){
  
  if(this.Ename){
    this.ms.add({severity: 'info', summary: 'Cargando', detail: 'Actualizando la carpeta...'}); 
    this.fs.editFolder(this.Ename, this.selectedFolder.idFolder).subscribe({
      next: (res) =>{        
        this.getFolders();
        this.ms.add({severity: 'success', summary: 'Éxito', detail: 'Carpeta actualizada con éxito'}); 
        this.displayModal = false;
      }
  });
  }else{
    this.ms.add({severity: 'error', summary: 'Error', detail: 'Debe especificar un nombre a la carpeta.'}); 
  } 
}


deleteFolder() {
    
  this.cs.confirm({
    message: '¿Estás seguro de eliminar esta carpeta?',
    header: 'Confirmar',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.ms.add({severity: 'info', summary: 'Cargando', detail: 'Eliminando carpeta...'}); 
        this.fs.deleteFolder(this.selectedFolder.idFolder).subscribe({

            next: (res) =>{
              this.ms.add({severity: 'success', summary: 'Éxito', detail: 'Carpeta eliminada'}); 
              this.getFolders();
            }


        });
    },
        acceptLabel: 'Sí', // Cambia el texto del botón de aceptación a "Sí"
        rejectLabel: 'No'
  });


}

shareFile(){
  this.getMembers();
  this.displayDialog = true;
}

membersFolder(){
  this.sharedMembers = [];

  this.fs.getMembersSharedFile(this.idw, this.selectedFolder.idFolder).subscribe({

      next: (res) =>{
        this.sharedMembers = res;
        this.displayMembersFolder = true;
      }

  });
}

removeMember(idUser: number, idjoin) {
    this.cs.confirm({
      message: '¿Estás seguro de remover la carpeta a este miembro?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ms.add({severity: 'info', summary: 'Cargando', detail: 'Removiendo carpeta a miembro...'}); 
        this.fs.removeShare(this.selectedFolder.idFolder, idjoin).subscribe({
          next: (res) =>{
            this.ms.add({severity: 'success', summary: 'Éxito', detail: 'Se ha removido la carpeta al miembro.'}); 
            this.sharedMembers = this.sharedMembers.filter(member => member.idUser !== idUser);
            this.members = [];
            this.getMembers();
          }
          
        });
      },
      acceptLabel: 'Sí', // Cambia el texto del botón de aceptación a "Sí"
      rejectLabel: 'No'})
}

  toggleMenu(event: MouseEvent, folder: any, menu: any) {
    event.stopPropagation(); 
    this.selectedFolder = folder; 
    this.menuItems = [

        this.privilege === 1 || this.privilege === 2 && this.logicdeleted === 0 && { label: 'Editar', icon: 'pi pi-pencil', command: () => this.editFolder() }, // Este ahora muestra el modal
        this.privilege === 1 || this.privilege === 2 && this.logicdeleted === 0 && { label: 'Eliminar', icon: 'pi pi-trash', command: () => this.deleteFolder() },
        { label: 'Compartir', icon: 'pi pi-heart', command: () => this.shareFile() },
        { label: 'Ver miembros compartidos', icon: 'pi pi-users', command: () => this.membersFolder() }
    ];
    menu.toggle(event);
}



}
