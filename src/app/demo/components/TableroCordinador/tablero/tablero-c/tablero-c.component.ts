import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { ServicioTCService } from '../servicio/servicio-tc.service'; // Asegúrate de que la ruta sea correcta
import { Activity } from '../modelo/actividad'; // Asegúrate de que la ruta sea correcta
import { Group } from '../modelo/groups.model'; // Asegúrate de que la ruta sea correcta
import { WorkEnvMService } from 'src/app/demo/components/workenvm/servicios/workenvm-service'; // Asegúrate de que la ruta sea correcta
import { AuthService } from 'src/app/services/auth.service'; // Asegúrate de importar el servicio de autenticación

import { Label } from '../modelo/label.model'; // Asegúrate de que la ruta sea correcta
import { EditarGroup } from '../modelo/editarGroup.model'; // Asegúrate de que la ruta sea correcta
import { EditarAct } from '../modelo/editarAct.model';


interface ExpandedRows {
  [key: string]: boolean;
}

@Component({
  templateUrl: './tablero-c.component.html',
  styleUrls: ['./tablero-c.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class TableroCComponent implements OnInit {
  taskGroups: Group[] = []; // Propiedad para almacenar grupos de tareas
  activities: Activity[] = []; // Propiedad para almacenar actividades
  newActivity: Activity = new Activity(0, '', '', new Date().toISOString().split('T')[0], 0, 0, 0, 0, null); // Inicializa la nueva actividad
  rowGroupMetadata: any = {}; // Inicializa la propiedad
  loading: boolean = true; // Para mostrar el estado de carga
  expandedRows: ExpandedRows = {}; // Para manejar las filas expandidas
  isExpanded: boolean = false; // Para manejar el estado de expansión
  id: any;

  idJoinUserWork: number; // Variable para almacenar el ID del entorno de trabajo
  labels: Label[] = []; // Propiedad para almacenar etiquetas
  visible: boolean = false;
  actividades: boolean = false;
  minDate: Date;
  newGroup: Group; // Inicializa un nuevo grupo
  displayModal: boolean = false; // Controla la visibilidad del modal

  importanceOptions: any[] = [
    { label: 'Sí', value: 1 },
    { label: 'No', value: 0 }
  ];

  selectedGroup: EditarGroup = new EditarGroup(0, '', new Date(), new Date(), 0); // Usar el modelo EditarGroup para la edición
  // src/app/demo/components/TableroCordinador/tablero/tablero-c/tablero-c.component.ts

selectAct: EditarAct = new EditarAct(0, '', '', new Date().toISOString().split('T')[0], 0, null, 0, 0, 0); // Inicializa el modelo EditarAct
  constructor(private servicioTC: ServicioTCService,
    private workEnvService: WorkEnvMService,
    private route: ActivatedRoute,
    private authService: AuthService,// Inyecta el servicio de autenticación
    private messageService: MessageService,
    private confirmationService: ConfirmationService,

  ) { }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
        this.id = params.get('id'); // Obtiene el ID del grupo
        console.log(this.id);
        this.minDate = new Date();

        this.workEnvService.getWorkEnv(this.id).subscribe({
            next: (res) => {
                this.idJoinUserWork = res.idJoinUserWork;

                // Carga los grupos de tareas y las etiquetas después de obtener el idJoinUserWork
                this.loadTaskGroups();
                this.loadLabels();

                // Inicializa el nuevo grupo aquí, asegurando que idJoinUserWork esté disponible
                this.newGroup = new Group(0, '', new Date(), new Date(), this.idJoinUserWork);
            },
            error: (err) => {
                console.error('Error al obtener el entorno de trabajo:', err);
                // Manejar el error según sea necesario
            }
        });
    });
}


  loadUserData(): void {
    this.authService.getUser().subscribe(
      (data) => {
        this.idJoinUserWork = data.idJoinUserWork; // Asegúrate de que la respuesta contenga esta propiedad
        console.log('ID del entorno de trabajo:', this.idJoinUserWork);
        this.getWorkEnv(); // Llama a obtener el entorno de trabajo después de obtener el ID del usuario
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );
  }

  getWorkEnv(): void {
    const userId = this.id;
    this.workEnvService.getWorkEnv(userId).subscribe(
      (data) => {
        this.idJoinUserWork = data.idJoinUserWork; // Asegúrate de que la respuesta contenga esta propiedad
        this.loadTaskGroups(); // Carga los grupos de tareas después de obtener el ID
      },
      (error) => {
        console.error('Error fetching work environment', error);
      }
    );
  }

  loadLabels(): void {
    // Asegúrate de que estás usando el idWork correcto
    this.servicioTC.getLabels(this.id).subscribe(
      (data) => {
        this.labels = data; // Asigna las etiquetas a la propiedad
        console.log('Etiquetas cargadas:', this.labels); // Para verificar que las etiquetas se cargan correctamente
      },
      (error) => {
        console.error('Error fetching labels', error);
      }
    );
  }

  loadTaskGroups(): void {
    this.servicioTC.getTaskGroups(this.idJoinUserWork).subscribe(
      (data) => {
        this.taskGroups = data; // Asigna los grupos de tareas a la propiedad
        console.log('Grupos de tareas cargados:', this.taskGroups); // Verifica que los grupos tengan IDs

        this.loading = false; // Cambia el estado de carga
      },
      (error) => {
        console.error('Error fetching task groups', error);
        this.loading = false; // Cambia el estado de carga
      }
    );
  }

  loadActivities(idgrouptaskcl: number): void {
    this.servicioTC.getActivitiesByGroup(idgrouptaskcl).subscribe(
      (data) => {
        this.activities = data; // Asigna las actividades a la propiedad
        console.log('Actividades cargadas:', this.activities); // Para verificar que las actividades se cargan correctamente
      },
      (error) => {
        console.error('Error fetching activities', error);
      }
    );
  }

  logGroupId(groupId: number): void {
    console.log('ID del grupo:', groupId);
  }

  addActivity(groupId: number): void {
    // Asegúrate de que los valores se asignen correctamente
    this.newActivity.idgrouptaskcl = groupId; // Asigna el ID del grupo de tareas
    this.newActivity.logicdeleted = 0; // Asegúrate de que este valor esté definido
    this.newActivity.done = 0; // Asegúrate de que este valor esté definido

    // Verifica que los valores se estén asignando correctamente
    console.log('Nueva actividad a crear:', this.newActivity);

    this.servicioTC.createActivity(this.newActivity).subscribe(
      (data) => {
        this.activities.push(data); // Agrega la nueva actividad a la lista
        this.messageService.add({ severity: 'success', summary: 'Actividad Creada', detail: 'La actividad se ha creado correctamente.' });
        this.newActivity = new Activity(0, '', '', new Date().toISOString().split('T')[0], 0, 0, 0, 0, null); // Reinicia el formulario
        this.loadActivities(groupId);
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La actividad se no se creo correctamente, verifique la información' });
        console.error('Error creando actividad', error);
      }
    );
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};

    if (this.taskGroups) {
      for (let i = 0; i < this.taskGroups.length; i++) {
        const rowData = this.taskGroups[i];
        const groupName = rowData.name; // Agrupamos por nombre del grupo

        if (i === 0) {
          this.rowGroupMetadata[groupName] = { index: 0, size: 1 };
        } else {
          const previousRowData = this.taskGroups[i - 1];
          const previousRowGroup = previousRowData.name;
          if (groupName === previousRowGroup) {
            this.rowGroupMetadata[groupName].size++;
          } else {
            this.rowGroupMetadata[groupName] = { index: i, size: 1 };
          }
        }
      }
    }
  }

  expandAll() {
    if (!this.isExpanded) {
      this.taskGroups.forEach(group => group && group.name ? this.expandedRows[group.name] = true : '');
    } else {
      this.expandedRows = {};
    }
    this.isExpanded = !this.isExpanded;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
  }





  createGroup(): void {
    // Crea un nuevo grupo incluyendo idJoinUserWork
    const groupData = {

      name: this.newGroup.name,// Asegúrate de que esta propiedad exista en el modelo
      startdate: this.newGroup.startdate,
      enddate: this.newGroup.enddate,
      idJoinUserWork: this.idJoinUserWork // Incluye el ID del entorno de trabajo
    };

    this.servicioTC.createGroup(groupData).subscribe(
      (data) => {
        this.taskGroups.push(data); // Agrega el nuevo grupo a la lista
        this.displayModal = false; // Cierra el modal
        this.messageService.add({ severity: 'success', summary: 'Grupo Creado', detail: 'El grupo se ha creado correctamente.' });
        this.newGroup = new Group(0, '', new Date(), new Date(), this.idJoinUserWork); // Reinicia el formulario
        this.loadTaskGroups();
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El grupo no se creo correctamente, verifique la información' });
        console.error('Error creando grupo', error);
      }
    );
  }


  openEditModal(group: Group): void {
    this.selectedGroup = new EditarGroup(group.idgrouptaskcl, group.name, new Date(group.startdate), new Date(group.enddate), group.idJoinUserWork); // Clona el grupo seleccionado
    this.visible = true; // Abre el modal de edición
  }

  openEditModalAct(activity: Activity): void {
    this.selectAct = new EditarAct(
        activity.idactivitycl,
        activity.nameT,
        activity.descriptionT,
        activity.end_date,
        activity.important,
        activity.idLabel,
        0, // Asigna un valor por defecto para logicdeleted
        0, // Asigna un valor por defecto para done
        activity.idgrouptaskcl // Asegúrate de que este valor esté disponible
    ); // Clona la actividad seleccionada
    this.actividades = true; // Abre el modal de edición
}

  updateGroup(): void {
    this.servicioTC.editGroup(this.selectedGroup).subscribe(
      (response) => {
        // Actualiza el grupo en la lista
        const index = this.taskGroups.findIndex(g => g.idgrouptaskcl === this.selectedGroup.idgrouptaskcl);
        if (index !== -1) {
          this.taskGroups[index] = { ...this.selectedGroup }; // Reemplaza el grupo antiguo con el nuevo
        }
        this.visible = false; // Cierra el modal
        this.messageService.add({ severity: 'success', summary: 'Grupo Modificado', detail: 'El grupo se ha modificado correctamente.' });
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El grupo no se pudo modificar, verifique la información.' });
        console.error('Error modificando grupo', error);
      }
    );
  }

  updateActivity(): void {
    this.servicioTC.editActivity(this.selectAct).subscribe(
      (response) => {
        // Actualiza la lista de actividades
        const index = this.activities.findIndex(a => a.idactivitycl === this.selectAct.idactivitycl);
        if (index !== -1) {
          this.activities[index] = { ...this.selectAct }; // Reemplaza la actividad antigua con la nueva
        }
        this.actividades = false; // Cierra el modal
        this.messageService.add({ severity: 'success', summary: 'Actividad Modificada', detail: 'La actividad se ha modificado correctamente.' });
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La actividad no se pudo modificar, verifique la información.' });
        console.error('Error modificando actividad', error);
      }
    );
  }


   
  deleteGroup(group:Group, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Esta seguro de eliminar este grupo?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.servicioTC.deleteGroup(group).subscribe(
          (data) => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Se a eliminado correctamente' });
            this.loadTaskGroups();
          },
        )
        
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'No se a podido eliminar correctamente' });
      },
      acceptLabel: 'Sí', // Cambia el texto del botón de aceptación a "Sí"
      rejectLabel: 'No'
    });
  }

  // src/app/demo/components/TableroCordinador/tablero/tablero-c/tablero-c.component.ts

deleteActivity(id: number, event: Event): void {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: '¿Está seguro de eliminar esta actividad?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.servicioTC.deleteActivity(id).subscribe(
                (response) => {
                    // Actualiza la lista de actividades
                    this.activities = this.activities.filter(a => a.idactivitycl !== id);
                    this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'La actividad se ha eliminado correctamente.' });
                },
                (error) => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la actividad.' });
                    console.error('Error eliminando actividad', error);
                }
            );
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'No se ha podido eliminar la actividad.' });
        },
        acceptLabel: 'Sí', // Cambia el texto del botón de aceptación a "Sí"
        rejectLabel: 'No'
    });
}

  
}
