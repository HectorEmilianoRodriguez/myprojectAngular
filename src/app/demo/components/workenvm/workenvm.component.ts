import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api'; // Importar ConfirmationService
import { WorkEnvMService } from './servicios/workenvm-service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
export interface Miembro {
  idUser: number;
  photo: string,
  name: string;
  email: string;
  privilege: number; 
  date: Date; 
  editedPrivilege?: number; // Cambiado a número para facilitar la comparación
}

@Component({
  templateUrl: './workenvm.component.html',
  styleUrls: ['./workenvm.component.scss'],
  providers: [MessageService, ConfirmationService] // Agregar ConfirmationService a los providers
})
export class WorkEnvComponent implements OnInit {
  privileges = [
    { label: 'Miembro', value: 0 },
    { label: 'Coordinador', value: 1 }
  ];

  id: string;
  dataWork: any;
  privilege: number;
  customers1: Miembro[] = [];
  loading: boolean = true;
  idWork: number;
  namework: string;
  invitarform: FormGroup;
  logicdeleted;
  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private WorkEnvServiceM: WorkEnvMService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute, // Inyectar ConfirmationService,
    private message: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {

    this.invitarform = this.fb.group({
      emailinvitar: ['', [Validators.required, Validators.email]]

    })
  
    this.route.paramMap.subscribe(params =>{
       this.id = params.get('id');
       if(this.id){

          this.WorkEnvServiceM.getWorkEnv(this.id).subscribe({
            
             next: (res) =>{
                this.dataWork = res;
                this.privilege = res.privilege;
                this.idWork = res.idWorkEnv;
                this.namework = res.title;
                this.logicdeleted = res.logicdeleted;
             },

            error : (er) =>{
              console.log(er);
            }
          });

          

       }else{
        console.log('sin id')
       }
    })

    this.loadExampleData();
  }

  loadExampleData() {
    this.loading = true;
  
    this.WorkEnvServiceM.getMembers(this.id).subscribe({
      next: (res) => {
        this.customers1 = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar los miembros:', err);
        this.loading = false;
      }
    });
  }
  
  onSubmit() {
    if (this.invitarform.valid) {
        const email = this.invitarform.value.emailinvitar;

        this.WorkEnvServiceM.inviteMember(email, this.namework, this.idWork).subscribe({
            next: (res) => {
                if (res.error === "error") {
                    this.message.add({ 
                        severity: 'error', 
                        summary: 'Error', 
                        detail: 'Este miembro ya está actualmente en el espacio de trabajo' 
                    });
                } else if (res.message === "success") {
                    this.message.add({ 
                        severity: 'success', 
                        summary: 'Éxito', 
                        detail: 'Se ha enviado una solicitud al correo especificado' 
                    });
                } else {
                    // Manejo de otros casos no contemplados explícitamente
                    this.message.add({
                        severity: 'warn', 
                        summary: 'Advertencia', 
                        detail: 'No se pudo procesar la solicitud'
                    });
                }
                console.log(res); // Registro de la respuesta
            },
            error: (err) => {
                console.error(err); // Registro del error
                // Mostrar mensaje genérico de error
                this.message.add({ 
                    severity: 'error', 
                    summary: 'Error en el servidor', 
                    detail: 'Ocurrió un problema al enviar la invitación. Intenta de nuevo más tarde.' 
                });
            }
        });
    } else {
        this.invitarform.markAllAsTouched(); // Marca todos los campos como tocados si el formulario no es válido
    }
}


  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  onPrivilegeChange(customer: Miembro) {
    // Este método se puede utilizar para manejar cualquier lógica adicional necesaria
    // Después de cambiar el privilegio, puedes mantener la referencia al privilegio anterior
    customer.editedPrivilege = customer.privilege; // Mantiene el estado para la edición
}


  editPrivilege(customer: Miembro) {

    this.confirmationService.confirm({
      message: `¿Estás seguro de cambiar el privilegio a ${customer.name}?`,
      header: 'Confirmar Actualización',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        
        this.WorkEnvServiceM.updateMember(customer.idUser, this.idWork, customer.editedPrivilege).subscribe({

            next: (res) =>{
              this.message.add({ severity: 'success', summary: 'Éxito', detail: `Privilegio del miembro ${customer.name} actualizado` });

            }


        });

      }
    });
   
  }

  deleteMember(customer: Miembro) {
    // Abrir el modal de confirmación al hacer clic en eliminar
    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas eliminar a ${customer.name}?`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Lógica para eliminar al miembro
        this.customers1 = this.customers1.filter(c => c !== customer);

        this.WorkEnvServiceM.deleteMember(customer.idUser, customer.name, customer.email, this.idWork, this.namework).subscribe({

            next: (res) =>{

               this.message.add({ severity: 'success', summary: 'Éxito', detail: `Miembro ${customer.name} expulsado exitosamente` });


            }


        });

      }
    });
  }

  
}
