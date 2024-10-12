import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { WorkEnvMService } from '../demo/components/workenvm/servicios/workenvm-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Board } from './models/Board';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    styleUrl: './app.menu.component.scss'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    dataWork: any;
    id: string | null = null;  // Inicializamos el id en null
    data: any;
    boards: Board[] = [];
    displayNewBoardDialog = false;
    newBoardName: string;
    newBoardDescription: string;

    constructor(
        public layoutService: LayoutService,
        private workEnvMService: WorkEnvMService,
        private route: ActivatedRoute,
        private router: Router,
        private msgS: MessageService
    ) {}

   ngOnInit() {
    // Usamos paramMap para obtener el 'id'
    this.route.paramMap.subscribe(paramMap => {
        this.id = paramMap.get('id');  // Obtenemos el id de los parámetros de la URL

        if (this.id) {
            // Obtener datos del entorno de trabajo
            this.loadWorkEnvData(this.id);
        } else {
            console.log('No se encontró el ID en la URL');
        }
    });
}

    loadWorkEnvData(id: string) {
        this.workEnvMService.getWorkEnv(id).subscribe({
            next: (res) => {
                this.data = res;

                // Obtener los tableros (Boards) del entorno de trabajo
                this.loadBoards(this.data.idWorkEnv);
            },
            error: (err) => {
                console.error('Error al obtener datos del entorno de trabajo:', err);
                this.router.navigate(['/Dash']);
            }
        });
    }

    loadBoards(idWorkEnv: string) {
        this.workEnvMService.getBoards(+(idWorkEnv)).subscribe({
            next: (boardsRes) => {
                this.boards = boardsRes;

                // Configura el menú aquí después de obtener los datos y los tableros
                this.model = [
                    {
                        label: 'Home',
                        items: [
                            { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/Dash'] },
                            { label: `${this.data.title}`, icon: 'pi pi-pencil', routerLink: [`/WorkEnv/${this.data?.idWorkEnv}/Edit/${this.data?.idWorkEnv}`] }
                        ]
                    },
                    {
                        label: 'Opciones',
                        items: [
                            { label: 'Miembros', icon: 'pi pi-fw pi-users', routerLink: [`/WorkEnv/${this.data?.idWorkEnv}/Members/${this.data?.idWorkEnv}`] },
                            { label: 'Calendario de actividades', icon: 'pi pi-fw pi-calendar', routerLink: ['/union/unionEntorno'] },
                            { label: 'Recursos', icon: 'pi pi-fw pi-folder-open', routerLink: ['/uikit/input'] },
                            { label: 'Reportes', icon: 'pi pi-fw pi-file-pdf', routerLink: [`/WorkEnv/${this.data?.idWorkEnv}/Reports/${this.data?.idWorkEnv}`] },
                            ...(this.data.privilege === 1 || this.data.privilege === 2 ? [{ label: 'Grupos de tareas', icon: 'pi pi-fw pi-book', routerLink: [`/WorkEnv/${this.data?.idWorkEnv}/tablero/${this.data?.idWorkEnv}`] }] : []),
                            {
                                label: 'Tableros', icon: 'pi pi-fw pi-book',
                                items: this.boards.filter(board => board.logicdeleted === 0).map(board => ({
                                    label: board.nameB, 
                                    icon: 'pi pi-fw pi-bookmark', 
                                    routerLink: [`/WorkEnv/${this.data?.idWorkEnv}/Board/${this.data?.idWorkEnv}/${board.idBoard}`]
                                }))
                            }
                        ]
                    },
                    {
                        label: 'Nuevo tablero',
                        items: [
                            {label: 'Agregar', command: () => this.showDialog(), icon: 'pi pi-fw pi-plus-circle'}
                        ]
                    },
                    {
                        label: 'Archivados', icon: 'pi pi-fw pi-folder',
                        items: [
                            {
                                label: 'Tableros archivados', icon: 'pi pi-fw pi-book',
                                items: this.boards
                                    .filter(board => board.logicdeleted === 1)  // Filtrar los tableros archivados
                                    .map(board => ({
                                        label: board.nameB, 
                                        icon: 'pi pi-fw pi-bookmark', 
                                        routerLink: [`/WorkEnv/${this.data?.idWorkEnv}/Board/${this.data?.idWorkEnv}/${board.idBoard}`]
                                    }))
                            }
                        ]
                    }
                ];
            },
            error: (err) => {
                console.error('Error al obtener tableros:', err);
            }
        });
    }

    createNewBoard() {
        if (this.newBoardName) {
            this.msgS.add({severity: 'info', summary: 'Cargando...', detail: 'Se está creando el tablero...'});

            this.workEnvMService.newBoard(+(this.id), this.newBoardName, this.newBoardDescription).subscribe({
                next: (suc) => {
                    this.msgS.add({severity: 'success', summary: 'Éxito', detail: 'El tablero se ha creado correctamente'});
                    this.displayNewBoardDialog = false;  // Cerrar el diálogo

                    // Volver a cargar los tableros después de crear uno nuevo
                    this.loadBoards(this.data.idWorkEnv);
                },
                error: (err) => {
                    this.msgS.add({severity: 'error', summary: 'Error', detail: 'No se pudo crear el tablero'});
                }
            });
        } else {
            this.msgS.add({severity: 'error', summary: 'Error', detail: 'Debe indicar un nombre al tablero'});
        }
    }

    showDialog() {
        this.displayNewBoardDialog = true;
    }

}
