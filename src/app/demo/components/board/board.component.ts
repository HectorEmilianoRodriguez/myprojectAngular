import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BoardService } from './service/board-service';
import { ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { WorkEnvMService } from '../workenvm/servicios/workenvm-service';
import { forkJoin } from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'; 
import { ChangeDetectorRef } from '@angular/core';

@Component({
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  newBoardName: string;
  newBoardDescription: string;
  displayNewBoardDialog = false;
  displayActivityDialog: boolean = false;
  selectedActivity: any = {};
  dataBoard: any = {};
  idb: string;
  idw: string;
  privilege: number;
  lists: any[] = [];
  loading: boolean = true;
  connectedDropLists: string[] = [];

  constructor(
    private bs: BoardService,
    private ar: ActivatedRoute,
    private ms: MessageService,
    private cs: ConfirmationService,
    private r: Router,
    private ws: WorkEnvMService,
    private cdr: ChangeDetectorRef
  ) {}

  DialogEditBoard(){
    this.displayNewBoardDialog = true;
  }

  ngOnInit() {
    this.ar.paramMap.subscribe(params => {
      this.idb = params.get('idb');
      this.idw = params.get('id');
  
      forkJoin({
        board: this.bs.getBoard(+(this.idb), +(this.idw)),
        lists: this.bs.getLists(+(this.idb)),
        workEnv: this.ws.getWorkEnv(this.idw)
      }).subscribe({
        next: (results) => {
          this.dataBoard = results.board;
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
  
          this.connectedDropLists = this.lists.map(list => list.idList.toString());
          console.log(this.connectedDropLists);
          this.privilege = results.workEnv.privilege;
          this.loading = false;
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
  
    if (event.previousContainer === event.container) {
      // Move within the same list
      moveItemInArray(currentContainerData, event.previousIndex, event.currentIndex);
    } else {
      // Move between different lists
      transferArrayItem(previousContainerData,
                        currentContainerData,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
  

  openActivityModal(activity: any) {
    this.selectedActivity = activity;
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
    });
  }
}
