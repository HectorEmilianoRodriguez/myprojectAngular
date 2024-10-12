import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { ServicioTCService } from '../servicio/servicio-tc.service'; // Asegúrate de que la ruta sea correcta
import { Activity } from '../modelo/actividad'; // Asegúrate de que la ruta sea correcta
import { Group } from '../modelo/groups.model'; // Asegúrate de que la ruta sea correcta
import { WorkEnvMService } from 'src/app/demo/components/workenvm/servicios/workenvm-service'; // Asegúrate de que la ruta sea correcta

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
    id: string;

    idJoinUserWork: number; // Variable para almacenar el ID del entorno de trabajo

    constructor(private servicioTC: ServicioTCService,
      private workEnvService: WorkEnvMService,
      private route: ActivatedRoute,) { }

    ngOnInit() {
      this.getWorkEnv();
      this.loadTaskGroups();
      this.route.paramMap.subscribe(params =>{
        this.id = params.get('id');
        console.log(this.id)
     })
    }




    getWorkEnv(): void {
      const userId = '1'; // Reemplaza esto con el ID del usuario actual
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

  loadTaskGroups(): void {
    this.servicioTC.getTaskGroups(this.idJoinUserWork).subscribe(
        (data) => {
            this.taskGroups = data; // Asigna los grupos de tareas a la propiedad
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
        },
        (error) => {
          console.error('Error fetching activities', error);
        }
      );
    }

    addActivity(): void {
      this.newActivity = new Activity(0, '', '', new Date().toISOString().split('T')[0], 0, 0, 0, this.selectedGroupId, null); // Reinicia el formulario
      this.servicioTC.createActivity(this.newActivity).subscribe(
        (data) => {
          this.activities.push(data); // Agrega la nueva actividad a la lista
        },
        (error) => {
          console.error('Error creating activity', error);
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
  }
