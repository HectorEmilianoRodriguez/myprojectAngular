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
 
interface ExpandedRows {
    [key: string]: boolean;
  }
  
  @Component({
    templateUrl: './tablero-c.component.html',
    styleUrls: ['./tablero-c.component.scss']
  })
  export class TableroCComponent implements OnInit {
    taskGroups: Group[] = []; // Propiedad para almacenar grupos de tareas
    activities: Activity[] = []; // Propiedad para almacenar actividades
    newActivity: Activity = new Activity(0, '', '', new Date().toISOString().split('T')[0], 0, 0, 0, 0, null); // Inicializa la nueva actividad
    rowGroupMetadata: any = {}; // Inicializa la propiedad
    loading: boolean = true; // Para mostrar el estado de carga
    expandedRows: ExpandedRows = {}; // Para manejar las filas expandidas
    isExpanded: boolean = false; // Para manejar el estado de expansión
    selectedGroupId: number; // Asegúrate de que este ID esté definido
    id: any;

    idJoinUserWork: number; // Variable para almacenar el ID del entorno de trabajo
    labels: Label[] = []; // Propiedad para almacenar etiquetas
    

    constructor(private servicioTC: ServicioTCService,
      private workEnvService: WorkEnvMService,
      private route: ActivatedRoute,
      private authService: AuthService // Inyecta el servicio de autenticación
   
     ) { }

    
     ngOnInit() {
      this.route.paramMap.subscribe(params => {
        this.id = params.get('id'); // Obtiene el ID del grupo
        console.log(this.id);
        this.idJoinUserWork = Number(this.id); // Asigna el ID a idJoinUserWork
        console.log('ID del entorno de trabajo:', this.idJoinUserWork);
        this.loadTaskGroups(); // Carga los grupos de tareas
        this.loadLabels();
      });

      // Inicializa el nuevo grupo
      this.newGroup = new Group(0, '', '', '', this.idJoinUserWork); // Asegúrate de que el constructor de Group tenga los parámetros correctos
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
      const userId = this.idJoinUserWork.toString(); 
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
              this.newActivity = new Activity(0, '', '', new Date().toISOString().split('T')[0], 0, 0, 0, 0, null); // Reinicia el formulario
          },
          (error) => {
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

    newGroup: Group; // Inicializa un nuevo grupo
    displayModal: boolean = false; // Controla la visibilidad del modal

    

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
          this.newGroup = new Group(0, '', '', '', this.idJoinUserWork); // Reinicia el formulario
          this.loadTaskGroups();
        },
        (error) => {
          console.error('Error creando grupo', error);
        }
      );
    }
  }
