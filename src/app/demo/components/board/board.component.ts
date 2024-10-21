import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BoardService } from './service/board-service';
import { ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { WorkEnvMService } from '../workenvm/servicios/workenvm-service';
import { forkJoin } from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'; 
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
@Component({
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @ViewChild('dt') dt: Table;

  newBoardName: string;
  newBoardDescription: string;
  newListName: string;
  newListDescription: string;
  newListColor: string;
  updateListName: string;
  updateListDescription: string;
  updateListColor: string;
  displayNewBoardDialog = false;
  displayActivityDialog: boolean = false;
  displayEditListDialog = false;
  selectedActivity: any = {};
  dataBoard: any = {};
  idb: string;
  idw: string;
  privilege: number;
  lists: any[] = [];
  loading: boolean = true;
  connectedDropLists: string[] = [];
  displayNewListDialog = false;
  selectedList: any = {};
  cards : any = [];
  newActName: string;
  newActDescription: string;
  newActDate: Date;
  isUrgent: string;
  selectidlist: number;
  displayNewActDialog = false;
  displayEditActDialog = false;
  EditActName: string;
  EditActDescription: string;
  EditActDate: Date;
  EditisUrgent: string;
  idcardselect: number;
  selectedLabels: any [] = [];
  labels: any [] = [];
  membersact: any [] = [];
  displayMembersDialog = false;
  selectedmembers: any [] = [];
  possiblesmembers: any [] = [];
  selectedFile: File | null = null;
  memberswork: any [];
  nameAuth: string;
  comments: any [] = [];
  idjoin;
  newComment;
  displayEditComment = false;
  EditComment;
  idcomment;
  nameL;
  colorL;
  displayNewLabelD = false;
  displayEditLabelD = false;
  selectedLabel;
  editnameL;
  editColorL;

  mylabels: any [] = [];
  displayLabelD = false;
  filterName = '';
  filterColor = '';
  logicdeleted;
  isDateInvalid: boolean = false;

  filterNamee: string = '';
  filterDate: string = '';
  filteredLists: any [] = [];
  constructor(
    private bs: BoardService,
    private ar: ActivatedRoute,
    private ms: MessageService,
    private cs: ConfirmationService,
    private r: Router,
    private ws: WorkEnvMService,
    private cdr: ChangeDetectorRef,
    private auth: AuthService
     // Inyectamos ChangeDetectorRef,
   
  ) {}

  DialogEditBoard(){
    this.displayNewBoardDialog = true;
  }

  loadLabels(){
      this.bs.getLabels(this.idw).subscribe({
        next: (res) =>{
          this.mylabels = res;
        }
      })
  }

  ngOnInit() {
    this.ar.paramMap.subscribe(params => {
      this.idb = params.get('idb');
      this.idw = params.get('id');
    
      forkJoin({
        board: this.bs.getBoard(+(this.idb), +(this.idw)),
        lists: this.bs.getLists(+(this.idb)),
        workEnv: this.ws.getWorkEnv(this.idw),
        memberswork: this.ws.getMembers(this.idw),
        userauth: this.auth.getUser(),
        labels: this.bs.getLabels(this.idw)
  
      }).subscribe({
        next: (results) => {
          this.dataBoard = results.board;
          this.privilege = results.workEnv.privilege
          this.memberswork = results.memberswork
          this.nameAuth = results.userauth.name;
          this.idjoin = results.workEnv.idJoinUserWork;
          this.mylabels = results.labels
          this.logicdeleted = results.workEnv.logicdeleted;
          console.log(this.logicdeleted);
          this.lists = results.lists.map((list: any) => {
            return {
              idList: list.idList,
              name: list.nameL,
              description: list.descriptionL,
              color: list.colorL,
              logicdeleted: list.logicdeleted,
              cards: list.cards || []
            };
          });
          
          this.filteredLists = [...this.lists];

          // Cargar etiquetas para cada tarjeta
          const labelRequests = this.lists.flatMap(list => 
            list.cards.map(card => this.getCardLabels(card.idCard).then(labels => {
              card.labels = labels; // Asignar etiquetas a la tarjeta
            }))
          );
  
          // Esperar a que todas las etiquetas se carguen
          Promise.all(labelRequests).then(() => {
            this.connectedDropLists = this.lists.map(list => list.idList.toString());
            this.loading = false;
            this.cdr.detectChanges(); // Forzamos la detección de cambios después de la carga
          });
        },
        error: (err) => {
          console.error('Error al obtener datos:', err);
          this.loading = false;
        }
      });
    });
  }
  

  drop(event: CdkDragDrop<any[]>): void {
    const previousContainerData = event.previousContainer.data;
    const currentContainerData = event.container.data;

    // Mover dentro de la misma lista
    if (event.previousContainer === event.container) {
        moveItemInArray(currentContainerData, event.previousIndex, event.currentIndex);
    } else {
        // Mover entre listas diferentes
        const movedItem = previousContainerData[event.previousIndex];

        // Actualiza el idList del movedItem
        movedItem.idList = event.container.id;

        // Transfiere el item
        transferArrayItem(previousContainerData, currentContainerData, event.previousIndex, event.currentIndex);

        // Aquí puedes llamar a la función para actualizar el backend
        this.bs.updateActivityStatus(movedItem.idCard, movedItem.idList);
    }
}




  openActivityModal(activity: any) {

    this.selectedActivity = activity;

    let labelsids = this.selectedActivity.labels.map(label => label.idLabel);
    

    this.bs.getPossibleLabels(labelsids, this.idw).subscribe({
 
        next: (res) =>{
          this.labels = res;
        },

        error: (er) =>{
            console.log(er);
        }

    });

    this.bs.getComments(this.idw, this.selectedActivity.idCard).subscribe({

        next: (res)  =>{
          this.comments = res;
        }

    });

    this.displayActivityDialog = true;
    
  }

  EditBoard() {
    if (this.newBoardName) {
      this.ms.add({ severity: 'info', summary: 'Cargando', detail: 'El tablero se está actualizando...' });
      this.bs.editBoard(+(this.idb), +(this.idw), this.newBoardName, this.newBoardDescription).subscribe({
        next: () => {
          this.ms.add({ severity: 'success', summary: 'Éxito', detail: 'El tablero se ha actualizado con éxito' });
          this.getBoardData();
        }
      });
    } else {
      this.ms.add({ severity: 'error', summary: 'Error', detail: 'Debe especificar un nombre al tablero' });
    }
  }

  DeleteBoard() {
    this.cs.confirm({
      message: '¿Estás seguro de que deseas archivar este tablero?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ms.add({ severity: 'info', summary: 'Cargando', detail: 'El tablero se está archivando...' });
        this.bs.deleteBoard(+(this.idb), +(this.idw)).subscribe({
          next: () => {
            this.ms.add({ severity: 'success', summary: 'Éxito', detail: 'El tablero se archivó' });
            this.r.navigate([`/WorkEnv/${this.idw}/Members/${this.idw}`]);
          }
        });
      }
    });
  }

  UnDeleteBoard() {
    this.cs.confirm({
      message: '¿Estás seguro de que deseas desarchivar este tablero?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ms.add({ severity: 'info', summary: 'Cargando', detail: 'El tablero se está desarchivando...' });
        this.bs.undeleteBoard(+(this.idb), +(this.idw)).subscribe({
          next: () => {
            this.ms.add({ severity: 'success', summary: 'Éxito', detail: 'El tablero se desarchivó' });
            this.getBoardData();
          }
        });
      }
    });
  }

  private getBoardData() {
    this.loading = true;
    this.bs.getBoard(+(this.idb), +(this.idw)).subscribe((board) => {
      this.dataBoard = board;
      this.loading = false;
      this.cdr.detectChanges(); // Forzar la detección de cambios
    });
  }

  createList(){
    this.displayNewListDialog = true;
  }

  loadLists(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.bs.getLists(+(this.idb)).subscribe({
        next: (res) => {
          this.lists = res.map((list: any) => ({
            idList: list.idList,
            name: list.nameL,
            description: list.descriptionL,
            color: list.colorL,
            logicdeleted: list.logicdeleted,
            cards: list.cards || []
          }));
  
          // Cargar etiquetas para cada tarjeta
          this.lists.forEach(list => {
            list.cards.forEach(card => {
              this.getCardLabels(card.idCard).then(labels => {
                card.labels = labels; // Asumiendo que getCardLabels devuelve las etiquetas
              });
            });
          });
  
          this.cdr.detectChanges();
          resolve();
        },
        error: (err) => reject(err)
      });
    });
  }
  
  getFilteredCards(cards: any[]): any[] {
    return cards.filter(card => {
      // Verifica si filterName tiene un valor antes de filtrar por nombre
      const matchesName = this.filterNamee ? card.nameC.toLowerCase().includes(this.filterName.toLowerCase()) : true;
      // Verifica si filterDate tiene un valor antes de filtrar por fecha
      const matchesDate = this.filterDate ? card.end_date === this.filterDate : true;
      // Devuelve solo las tarjetas que coincidan con ambos filtros si ambos están presentes
      return matchesName && matchesDate;
    });
  }

  
  
  createNewList(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.bs.newList(+(this.idb), this.newListName, this.newListDescription, this.newListColor).subscribe({
        next: () => resolve(),
        error: (err) => reject(err)
      });
    });
  }

  newList() {
    if (this.newListName) {
      this.ms.add({ severity: 'info', summary: 'Cargando', detail: 'Se está creando la lista...' });
  
      this.createNewList().then(() => {
        this.ms.add({ severity: 'success', summary: 'Éxito', detail: 'Se ha creado la lista con éxito' });
  
        // Recargamos las listas después de crear una nueva
        this.loadLists().then(() => {
          this.cdr.detectChanges(); // Forzar la detección de cambios después de cargar las listas
          this.connectedDropLists = this.lists.map(list => list.idList.toString());
        });
      }).catch(error => {
        console.error('Error al crear la lista:', error);
        this.ms.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al crear la lista' });
      });
    } else {
      this.ms.add({ severity: 'error', summary: 'Error', detail: 'Se requiere un nombre para la lista' });
    }
  }


  confirmDeleteList(listId) {
    this.cs.confirm({
      message: '¿Estás seguro de que deseas eliminar esta lista?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ms.add({ severity: 'info', summary: 'Cargando', detail: 'Eliminando lista...' });

          this.bs.deleteList(listId).subscribe({

              next: (res) => {

              this.ms.add({ severity: 'success', summary: 'Éxito', detail: 'Lista eliminada correctamente' });
                  this.loadLists().then(()=>{
                    this.cdr.detectChanges(); // Forzar la detección de cambios después de cargar las listas
                    this.connectedDropLists = this.lists.map(list => list.idList.toString());
                  })
                
              }

          });
      }
    });
  }

  UpdateListDialog(list){
      
    this.selectedList = list;
    this.updateListName = list.name;
    this.updateListDescription = list.description;
    this.updateListColor = list.color;
    this.displayEditListDialog = true;
 
  }

  EditList(){
      if(this.updateListName){

        this.ms.add({ severity: 'info', summary: 'Cargando', detail: 'Actualizando lista...' });

        this.bs.updateList(+(this.idb), this.updateListName, this.updateListDescription, this.updateListColor, this.selectedList.idList).subscribe({

          
            next: (res) =>{
                this.loadLists().then(()=>{

                  this.cdr.detectChanges(); // Forzar la detección de cambios después de cargar las listas
                  this.connectedDropLists = this.lists.map(list => list.idList.toString());
                  this.ms.add({ severity: 'success', summary: 'Éxito', detail: 'Lista actualizada' });

                });
                
            }

            

        });

        this.displayEditListDialog = false;

      }else{
        this.ms.add({ severity: 'error', summary: 'Error', detail: 'Se requiere un nombre para la lista' });
      }
  }

  getCardLabels(cardId): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.bs.getActivityLabel(cardId).subscribe({
        next: (labels) => resolve(labels),
        error: (err) => {
          console.error('Error al obtener etiquetas:', err);
          reject(err);
        }
      });
    });
  }
  
  addActivity(idList){
    this.displayNewActDialog = true;
    this.selectidlist = idList;
  }

  validateDate() {
    const today = new Date();
    if (this.newActDate) {
        this.isDateInvalid = this.newActDate < today;
    } else {
        this.isDateInvalid = false; // si no hay fecha, no hay error
    }
}

  newAct(){
  
    if(this.newActName && !this.isDateInvalid){
      const year = this.newActDate.getFullYear();
      const month = String(this.newActDate.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexed
      const day = String(this.newActDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      this.ms.add({ severity: 'info', summary: 'Cargando', detail: 'Se está creando la actividad...' });

      this.bs.newCard(this.newActName, formattedDate, this.newActDescription, +(this.isUrgent), this.selectidlist).subscribe({

        next: (suc) =>{

          this.loadLists().then(()=>{
            this.cdr.detectChanges(); // Forzar la detección de cambios después de cargar las listas
            this.connectedDropLists = this.lists.map(list => list.idList.toString());
            this.ms.add({ severity: 'success', summary: 'Éxito', detail: 'Se ha creado la actividad con éxito.' });
          })
        }

      });
    }else{
      this.ms.add({ severity: 'error', summary: 'Error', detail: 'Se requiere un nombre para la actividad o bien la fecha no puede ser antes de la actual.' });
    }

  }

  UpdateActDialog(){
    this.EditActName = this.selectedActivity.nameC;
    this.EditActDescription = this.selectedActivity.descriptionC;
    this.EditActDate = this.selectedActivity.end_date;
    this.EditisUrgent = this.selectedActivity.important;
    this.idcardselect = this.selectedActivity.idCard;
    this.displayEditActDialog = true;
  }

  editAct(){
    if(this.EditActName){
      const year = this.EditActDate.getFullYear();
      const month = String(this.EditActDate.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexed
      const day = String(this.EditActDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      this.ms.add({ severity: 'info', summary: 'Cargando', detail: 'Se está actualizando la actividad...' });

      this.bs.updateCard(this.EditActName, formattedDate, this.EditActDescription, +(this.isUrgent), this.idcardselect).subscribe({

        next: (suc) =>{

          this.loadLists().then(()=>{
            this.cdr.detectChanges(); // Forzar la detección de cambios después de cargar las listas
            this.connectedDropLists = this.lists.map(list => list.idList.toString());
            this.ms.add({ severity: 'success', summary: 'Éxito', detail: 'Se ha actualizado la actividad con éxito.' });
          })
        }

      });

      this.displayEditActDialog = false;
    }else{
      this.ms.add({ severity: 'error', summary: 'Error', detail: 'Se requiere un nombre para la actividad.' });
    }
  }

  confirmDeleteAct(idcard) {
    this.cs.confirm({
      message: '¿Estás seguro de que deseas eliminar esta actividad?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ms.add({ severity: 'info', summary: 'Cargando', detail: 'Eliminando actividad...' });

          this.bs.deleteCard(idcard).subscribe({

              next: (res) => {

              this.ms.add({ severity: 'success', summary: 'Éxito', detail: 'Actividad eliminada correctamente' });
                  this.loadLists().then(()=>{
                    this.cdr.detectChanges(); // Forzar la detección de cambios después de cargar las listas
                    this.connectedDropLists = this.lists.map(list => list.idList.toString());
                  })
                  this.displayActivityDialog = false;
              }
              

          });
      }
    });
  }

  addLabel(idc) {
    let idsL = this.selectedLabels.map(label => label.idLabel);
    if (idsL.length > 0) {
      this.ms.add({ severity: 'info', summary: 'Cargando', detail: 'Agregando etiquetas a la actividad...' });
  
      this.bs.storeCardLabels(idc, idsL).subscribe({
        next: (res) => {
          this.ms.add({ severity: 'success', summary: 'Éxito', detail: 'Se han agregado las etiquetas correctamente' });
  
          this.loadLists().then(() => {
            this.cdr.detectChanges(); // Forzar la detección de cambios después de cargar las listas
            this.connectedDropLists = this.lists.map(list => list.idList.toString());
            this.selectedLabels = [];
            this.labels = [];
  
            // Llamar a getPossibleLabels para actualizar las etiquetas disponibles
            const labelsids = this.selectedActivity.labels.map(label => label.idLabel);
            this.bs.getPossibleLabels(labelsids, this.idw).subscribe({
              next: (res) => {
                this.labels = res; // Actualizar las etiquetas posibles
              },
              error: (er) => {
                console.log(er);
              }
            });
          });
  
          // Cargar etiquetas para cada tarjeta
          const labelRequests = this.lists.flatMap(list =>
            list.cards.map(card => this.getCardLabels(card.idCard).then(labels => {
              card.labels = labels; // Asignar etiquetas a la tarjeta
            }))
          );
  
          // Esperar a que todas las etiquetas se carguen
          Promise.all(labelRequests).then(() => {
            this.connectedDropLists = this.lists.map(list => list.idList.toString());
            this.loading = false;
            this.cdr.detectChanges(); // Forzamos la detección de cambios después de la carga
            this.openActivityModal(this.selectedActivity);
          });
        },
        error: (err) => {
          this.ms.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al agregar las etiquetas' });
        }
      });
    } else {
      this.ms.add({ severity: 'error', summary: 'Error', detail: 'Debe seleccionar al menos una etiqueta' });
    }
  }
  
  deleteLabelAct(idc, idl) {
    this.cs.confirm({
      message: '¿Estás seguro de que deseas remover esta etiqueta de la actividad?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ms.add({ severity: 'info', summary: 'Cargando', detail: 'Removiendo etiqueta...' });
  
        this.bs.deleteLabelAct(idc, idl).subscribe({
          next: (res) => {
            this.ms.add({ severity: 'success', summary: 'Éxito', detail: 'Etiqueta removida correctamente' });
            
            this.loadLists().then(() => {
              this.cdr.detectChanges(); // Forzar la detección de cambios después de cargar las listas
              this.connectedDropLists = this.lists.map(list => list.idList.toString());
              this.selectedLabels = [];
              this.labels = [];
  
              // Llamar a getPossibleLabels para actualizar las etiquetas disponibles
              const labelsids = this.selectedActivity.labels.map(label => label.idLabel);
              this.bs.getPossibleLabels(labelsids, this.idw).subscribe({
                next: (res) => {
                  this.labels = res; // Actualizar las etiquetas posibles
                },
                error: (er) => {
                  console.log(er);
                }
              });
            });
  
            // Cargar etiquetas para cada tarjeta
            const labelRequests = this.lists.flatMap(list =>
              list.cards.map(card => this.getCardLabels(card.idCard).then(labels => {
                card.labels = labels; // Asignar etiquetas a la tarjeta
              }))
            );
  
            // Esperar a que todas las etiquetas se carguen
            Promise.all(labelRequests).then(() => {
              this.connectedDropLists = this.lists.map(list => list.idList.toString());
              this.loading = false;
              this.cdr.detectChanges(); // Forzamos la detección de cambios después de la carga
              this.openActivityModal(this.selectedActivity);
            });
          },
          error: (err) => {
            this.ms.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al eliminar la etiqueta' });
          }
        });
      }
    });
  }
  

  getMembersAct(ida: string) {
    this.ws.getMembersPhotos(ida).subscribe({
        next: (res) => {
            this.membersact = res;
            console.log(this.membersact);

            // Mapea los IDs de los miembros
            const membersids = this.membersact.map(m => m.idUser);
            console.log(membersids);

            // Solo ahora llama a getPossibleMembers, asegurando que membersids ya está disponible
            this.bs.getPossibleMembers(membersids, +this.idw).subscribe({
                next: (res) => {
                    this.possiblesmembers = res;
                },
                error: (err) => {
                    console.error('Error fetching possible members:', err);
                }
            });
        },
        error: (err) => {
            console.error('Error fetching members photos:', err);
        }

      
    });
    this.possiblesmembers.map(member => 'http://localhost:8000' + member.photo)
    this.displayMembersDialog = true; // Muestra el diálogo después de iniciar la solicitud
}


  confirmDeleteMember(idu, idc){
    this.cs.confirm({
      message: '¿Estás seguro de que deseas remover a este miembro de la actividad?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ms.add({ severity: 'info', summary: 'Cargando', detail: 'Removiendo miembro...' });

         this.bs.deleteMemberAct(idc, idu).subscribe({

            next: (res) =>{
              this.ms.add({ severity: 'success', summary: 'Éxito', detail: 'Miembro removido exitosamente' });
              this.loadLists().then(()=>{
                this.cdr.detectChanges(); // Forzar la detección de cambios después de cargar las listas
                this.connectedDropLists = this.lists.map(list => list.idList.toString());
                this.selectedmembers = [];
                this.getMembersAct(this.selectedActivity.idCard);
              })



            }

         });
      }
    });
  }

  addMember(idc){
     let idsM = this.selectedmembers.map(m => m.idJoinUserWork);
     if(idsM){
      this.ms.add({ severity: 'info', summary: 'Cargando', detail: 'Asignando miembros a la actividad...' });

        this.bs.storeCardMembers(idc, idsM).subscribe({
            next: (res) =>{
              this.ms.add({ severity: 'success', summary: 'Éxito', detail: 'Se han asignado los miembros correctamente' });

              this.loadLists().then(()=>{
                this.cdr.detectChanges(); // Forzar la detección de cambios después de cargar las listas
                this.connectedDropLists = this.lists.map(list => list.idList.toString());
                this.selectedmembers = [];
                this.getMembersAct(this.selectedActivity.idCard);
              })
              
              
            }
            
        });

    }else{
      this.ms.add({ severity: 'error', summary: 'Error', detail: 'Debe seleccionar almenos un miembro' });

    }

  }

  
  onFileSelected(event: Event, idc: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        this.selectedFile = input.files[0]; // Obtiene el archivo seleccionado

        // Validar que sea un archivo PDF
        if (this.selectedFile.type !== 'application/pdf') {
            alert('Por favor, selecciona un archivo PDF.');
            return; // Detiene la ejecución si no es un PDF
        }

        console.log('Archivo seleccionado:', this.selectedFile);
        this.uploadEvidence(this.selectedFile, idc);
    }
}

  onUploadClick() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click(); // Simula el clic en el input de archivo
  }

  uploadEvidence(file: File, idc) {
    
    this.ms.add({ severity: 'info', summary: 'Cargando', detail: 'Se está adjuntando la evidencia...' });
    const formData = new FormData();
    formData.append('idCard', idc);
    formData.append('evidence', file);

    this.bs.uploadEvidence(formData).subscribe({

        next: (res) =>{
          this.ms.add({ severity: 'success', summary: 'Éxito', detail: 'Se ha adjuntado la evidencia correctamente' });
        },
        error: (er) =>{
          console.log(er);
        }

    });

  }

  downloadEvidence(idc: string) {
    this.ms.add({ severity: 'info', summary: 'Cargando', detail: 'Se está descargando la evidencia...' });
    this.bs.downloadEvidence(idc).subscribe(response => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `${idc}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url); // Limpia el objeto URL

        this.ms.add({ severity: 'success', summary: 'Éxito', detail: 'Se ha descargado la evidencia.' });

    }, error => {
        console.error('Error al descargar el archivo:', error);
        if (error.status === 404) {
          this.ms.add({ severity: 'warn', summary: 'Atención', detail: 'Aún no hay ninguna evidencia adjuntada para esta actividad.' });

        } else {
          this.ms.add({ severity: 'warn', summary: 'Atención', detail: 'Aún no hay ninguna evidencia adjuntada para esta actividad.' });

        }
    });
}

ApprobeEvidence(idc,namec){
  
  this.cs.confirm({
    message: '¿Estás seguro de aprobar la actividad?',
    header: 'Confirmar',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      let idsCoordinators = this.memberswork.filter(m => m.privilege === 2 || m.privilege === 1).map(m => m.idUser);

      this.ms.add({ severity: 'info', summary: 'Cargando', detail: 'Aprobando la actividad...' });

       this.bs.approbeCard(idc, idsCoordinators, namec, this.nameAuth).subscribe({
        
          next: (res) =>{
            this.ms.add({ severity: 'success', summary: 'Éxito', detail: 'Se ha aprobado la actividad' });
            this.loadLists().then(()=>{
              this.cdr.detectChanges(); // Forzar la detección de cambios después de cargar las listas
              this.connectedDropLists = this.lists.map(list => list.idList.toString());
              this.openActivityModal(this.selectedActivity);
            })
            
          }

       });
    }
  });

}

DesApprobeEvidence(idc, namec){
  this.cs.confirm({
    message: '¿Estás seguro de cancelar la aprobación de la actividad?',
    header: 'Confirmar',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      let idsCoordinators = this.memberswork.filter(m => m.privilege === 2 || m.privilege === 1).map(m => m.idUser);

      this.ms.add({ severity: 'info', summary: 'Cargando', detail: 'Desaprobando la actividad...' });

       this.bs.desapprobeCard(idc, idsCoordinators, namec, this.nameAuth).subscribe({
        
          next: (res) =>{
            this.ms.add({ severity: 'success', summary: 'Éxito', detail: 'Se ha desaprobado la actividad' });
            this.loadLists().then(()=>{
              this.cdr.detectChanges(); // Forzar la detección de cambios después de cargar las listas
              this.connectedDropLists = this.lists.map(list => list.idList.toString());
              this.openActivityModal(this.selectedActivity);
            })
            
          }

       });
    }
  });
}

EndAct(idc, namec){

  this.cs.confirm({
    message: '¿Estás seguro de marcar como completada la actividad?',
    header: 'Confirmar',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      let idsCoordinators = this.memberswork.filter(m => m.privilege === 2 || m.privilege === 1).map(m => m.idUser);

      this.ms.add({ severity: 'info', summary: 'Cargando', detail: 'Marcando como completada la actividad...' });

       this.bs.endCard(idc, idsCoordinators, namec, this.nameAuth).subscribe({
        
          next: (res) =>{
            this.ms.add({ severity: 'success', summary: 'Éxito', detail: 'Se ha marcado como completada la actividad' });
            this.loadLists().then(()=>{
              this.cdr.detectChanges(); // Forzar la detección de cambios después de cargar las listas
              this.connectedDropLists = this.lists.map(list => list.idList.toString());
              this.openActivityModal(this.selectedActivity);
            })
            
          }

       });
    }
  });
}

deleteComment(idc){

  this.cs.confirm({
    message: '¿Estás seguro de eliminar este comentario?',
    header: 'Confirmar',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {

      this.ms.add({ severity: 'info', summary: 'Cargando', detail: 'Eliminando comentario...' });

      this.bs.deleteComment(idc).subscribe({
          next: (res) =>{
            
            this.ms.add({ severity: 'success', summary: 'Éxito', detail: 'Se ha eliminado el comentario' });
            this.loadLists().then(()=>{
              this.cdr.detectChanges(); // Forzar la detección de cambios después de cargar las listas
              this.connectedDropLists = this.lists.map(list => list.idList.toString());
              this.openActivityModal(this.selectedActivity)
            })

          }
      });
      
    }
  });


}

 newC(idc){
    if(this.newComment){

      this.ms.add({ severity: 'info', summary: 'Cargando', detail: 'Agregando comentario...' });

      this.bs.newComment(this.idjoin, idc, this.newComment).subscribe({

        next: (res) =>{
          this.ms.add({ severity: 'success', summary: 'Éxito', detail: 'Comentario agregado con éxito.' });
          this.loadLists().then(()=>{
            this.cdr.detectChanges(); // Forzar la detección de cambios después de cargar las listas
            this.connectedDropLists = this.lists.map(list => list.idList.toString());
            this.openActivityModal(this.selectedActivity);
          })
        }
      });

    }else{
      this.ms.add({ severity: 'error', summary: 'Error', detail: 'No puede agregar un comentario vacío' });
    }
 }
 
 updateComment(idc, txt){
   this.displayEditComment = true;
   this.EditComment = txt;
   this.idcomment = idc;
 }

 changeC(){

  this.cs.confirm({
    message: '¿Estás seguro de editar este comentario?',
    header: 'Confirmar',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {

        if(this.EditComment){
          this.ms.add({ severity: 'info', summary: 'Cargando', detail: 'Actualizando comentario...' });
          this.bs.updateComment(this.idcomment, this.EditComment).subscribe({
    
              next: (res) =>{
                this.ms.add({ severity: 'success', summary: 'Éxito', detail: 'Comentario actualizado con éxito' });
                this.loadLists().then(()=>{
                  this.cdr.detectChanges(); // Forzar la detección de cambios después de cargar las listas
                  this.connectedDropLists = this.lists.map(list => list.idList.toString());
                  this.openActivityModal(this.selectedActivity);
                  this.displayEditComment = false;
                })
              }
    
          });
        }else{
          this.ms.add({ severity: 'error', summary: 'Error', detail: 'No puede adjuntar un comentario vacío' });

        }
      
      
    }
  });
 }

 seenComment(idc){
  this.ms.add({ severity: 'info', summary: 'Cargando', detail: 'Marcando como visto...' });

  this.bs.seenComment(idc).subscribe({

    next: (res) =>{
      this.ms.add({ severity: 'success', summary: 'Éxito', detail: 'Comentario mercado como visto' });
      this.loadLists().then(()=>{
        this.cdr.detectChanges(); // Forzar la detección de cambios después de cargar las listas
        this.connectedDropLists = this.lists.map(list => list.idList.toString());
        this.openActivityModal(this.selectedActivity);
      })
    }

});
 }

 newLabel(){
    this.displayNewLabelD = true;
 }

 CLabel(){
    if(this.nameL){
      this.ms.add({ severity: 'info', summary: 'Cargando', detail: 'Agregando etiqueta...' });

      this.bs.newLabel(this.nameL, this.colorL, this.idw).subscribe({

          next: (res) =>{
            this.ms.add({ severity: 'success', summary: 'Éxito', detail: 'Etiqueta agregada' });
            this.loadLists().then(()=>{
              this.cdr.detectChanges(); // Forzar la detección de cambios después de cargar las listas
              this.connectedDropLists = this.lists.map(list => list.idList.toString());
              this.displayNewLabelD = false;
              this.loadLabels();
            })

          }

      });
    }else{
      this.ms.add({ severity: 'error', summary: 'Error', detail: 'Debe indicar un nombre a la etiqueta' });

    }

 }
  showL(){
    this.displayLabelD = true;
  }

  filteredLabels() {
    return this.mylabels.filter(label =>
        (!this.filterName || label.name.includes(this.filterName)) &&
        (!this.filterColor || label.color === this.filterColor)
    );
}

editLabel(label){
  this.displayEditLabelD = true;
  this.selectedLabel = label;
  this.editnameL = label.nameL;
  this.editColorL = label.colorL;
}

ELabel(){
  if(this.editnameL){
    this.ms.add({ severity: 'info', summary: 'Cargando', detail: 'Actualizando etiqueta...' });

    this.bs.editLabel(this.editnameL, this.editColorL, this.idw, this.selectedLabel.idLabel).subscribe({

        next: (res) =>{
          this.ms.add({ severity: 'success', summary: 'Éxito', detail: 'Etiqueta actualizada' });
          this.loadLists().then(()=>{
            this.cdr.detectChanges(); // Forzar la detección de cambios después de cargar las listas
            this.connectedDropLists = this.lists.map(list => list.idList.toString());
            this.displayEditLabelD = false;
            this.loadLabels();
          })

        }

    });
  }else{
    this.ms.add({ severity: 'error', summary: 'Error', detail: 'Debe indicar un nombre a la etiqueta' });
  }
}

deleteLabel(idl){

  this.cs.confirm({
    message: '¿Estás seguro de eliminar esta etiqueta?',
    header: 'Confirmar',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
          this.ms.add({ severity: 'info', summary: 'Cargando', detail: 'Eliminando etiqueta...' });
          this.bs.deleteLabel(idl).subscribe({
    
              next: (res) =>{
                this.ms.add({ severity: 'success', summary: 'Éxito', detail: 'Etiqueta eliminada con éxito' });
                this.loadLists().then(()=>{
                  this.cdr.detectChanges(); // Forzar la detección de cambios después de cargar las listas
                  this.connectedDropLists = this.lists.map(list => list.idList.toString());
                  this.loadLabels();

                })
              }
    
          }); 
    }
  });

}

}

