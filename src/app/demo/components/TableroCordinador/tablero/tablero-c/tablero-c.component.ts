import { Component, OnInit } from '@angular/core';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';

import { ServicioTCService } from '../servicio/servicio-tc.service'; // Asegúrate de que la ruta sea correcta
import { Activity } from '../modelo/actividad'; // Asegúrate de que la ruta sea correcta
import { Group } from '../modelo/groups.model'; // Asegúrate de que la ruta sea correcta

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
    newActivity: Activity = new Activity(0, '', '', new Date(), false, false, 0, 0); // Inicializa la nueva actividad
    rowGroupMetadata: any = {}; // Inicializa la propiedad
    loading: boolean = true; // Para mostrar el estado de carga
    expandedRows: ExpandedRows = {}; // Para manejar las filas expandidas
    isExpanded: boolean = false; // Para manejar el estado de expansión

    constructor(private servicioTC: ServicioTCService) { }

    ngOnInit() {
      this.loadTaskGroups();
    }

    loadTaskGroups(): void {
      this.servicioTC.getTaskGroups().subscribe(
        (data) => {
          this.taskGroups = data; // Asigna los grupos de tareas a la propiedad
          this.loading = false; // Cambia el estado de carga
          this.updateRowGroupMetaData(); // Actualiza la metadata de agrupación
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
      this.servicioTC.createActivity(this.newActivity).subscribe(
        (data) => {
          this.activities.push(data); // Agrega la nueva actividad a la lista
          this.newActivity = new Activity(0, '', '', new Date(), false, false, 0, 0); // Reinicia el formulario
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