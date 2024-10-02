import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api'; 
import { ReportService } from './servicios/report-service';
import { ActivatedRoute } from '@angular/router';
import { WorkEnvMService } from '../../workenvm/servicios/workenvm-service';
import { Miembro } from './Models/member';
import { Label } from './Models/label';
import { User } from './Models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  templateUrl: './report-component.component.html',
  styleUrl: './report-component.component.scss',
  providers: [MessageService, ConfirmationService] 
})

export class ReportComponentComponent implements OnInit {

    constructor(private confirmationService: ConfirmationService, private reportService: ReportService
      , private route: ActivatedRoute, private WorkEnvServiceM: WorkEnvMService, private messageService: MessageService,
      private authService: AuthService
    ){
      
    }

    public dataWork: any;
    public privilege: number;
    public idWork: number;
    public namework: string;
    public id: string;
    public customers1: Miembro[] = [];
    public selectedMember: Miembro; // Miembro seleccionado
    public startDate: string | null = null;
    public endDate: string | null = null;
    public showProductivityDialog = false;
    public labels: Label[] = [];
    public selectedLabels: Label[] = []; // Almacena las etiquetas seleccionadas
    public selectedMembers: Miembro[] = [];
    multiple: boolean = true; // Define como true si quieres permitir selección múltiple.
    public showParticipantDialog = false;
    public showDeliveryMemberDialog = false;
    public user: User;
    public showDeliveryCoordinatorDialog = false;
    public showPendingTasksDialog = false;
    public showCompletedTasksDialog = false;
    public wait =  true;

    ngOnInit(){

      this.route.paramMap.subscribe(params =>{
        this.id = params.get('id');
        if(this.id){
 
           this.WorkEnvServiceM.getWorkEnv(this.id).subscribe({
 
              next: (res) =>{
                 this.dataWork = res;
                 this.privilege = res.privilege;
                 this.idWork = res.idWorkEnv;
                 this.namework = res.title;
              },
 
             error : (er) =>{
               console.log(er);
             }
           });

        }else{
         console.log('sin id')
        }
     })

    this.MembersData();
    this.LabelsData();
    this.UserData();
    }

    UserData(){
      this.authService.getUser().subscribe({
        next: (res) => {
          this.user = res;
    
        },
        error: (err) => {
          console.error('Error al cargar el user:', err);
          
        }
      });
    }

    MembersData() {
     
      this.WorkEnvServiceM.getMembers(this.id).subscribe({
        next: (res) => {
          this.customers1 = res;
    
        },
        error: (err) => {
          console.error('Error al cargar los miembros:', err);
          
        }
      });
    }

    LabelsData() {
     
      this.reportService.getLabels(this.id).subscribe({
        next: (res) => {
          this.labels = res;
    
        },
        error: (err) => {
          console.error('Error al cargar etiquetas:', err);
          
        }
      });


    }



    productivity() {
      this.showProductivityDialog = true; // Mostrar el diálogo
    }

    onDateSelect(type: string, event: Date) {
      const formattedDate = this.formatDate(event);
      if (type === 'start') {
        this.startDate = formattedDate;
      } else if (type === 'end') {
        this.endDate = formattedDate;
      }
    }
  
    formatDate(date: Date): string {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Sumar 1 ya que los meses inician en 0
      const day = String(date.getDate()).padStart(2, '0'); // Asegurarse de que el día tenga 2 dígitos
      return `${year}-${month}-${day}`; // Formato YYYY-MM-DD
    }

    generateProductivityReport() {
      if (this.selectedMember && this.startDate && this.endDate) {
        // Lógica para generar el reporte de productividad
        const selectedLabelIds = this.selectedLabels.map(label => label.idLabel);
        
        console.log('Generando reporte de productividad...', {
          miembro: this.selectedMember.idUser,
          fechaInicio: this.startDate,
          fechaFin: this.endDate,
          etiquetas: selectedLabelIds
        });


        this.messageService.add({severity: 'info', summary: 'Cargando', detail: 'El reporte se está generando...'});


        this.reportService.productivity(this.id, this.selectedMember.idUser, this.startDate, this.endDate, selectedLabelIds)
        .subscribe((response: Blob) => {
            // Crear un objeto Blob con la respuesta (PDF)
            const blob = new Blob([response], { type: 'application/pdf' });
            
            // Crear una URL temporal para el archivo Blob
            const url = window.URL.createObjectURL(blob);
            
            // Crear un enlace temporal para iniciar la descarga
            const a = document.createElement('a');
            a.href = url;
            a.download = 'reporte_productividad.pdf';  // Nombre del archivo descargado
            document.body.appendChild(a);  // Agregar el enlace al DOM
            
            // Simular un click en el enlace para iniciar la descarga
            a.click();
            
            // Eliminar el enlace después de la descarga
            document.body.removeChild(a);
            this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'El reporte de productividad se ha generado correctamente'});
            this.showProductivityDialog = false;
        }, error => {
            console.error('Error generando el reporte: ', error);
        });

       

        this.showProductivityDialog = false; // Cierra el diálogo
      } else {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Debe seleccionar un miembro y definir un periodo'});
      }
    }

    openProductivityDialog() {
      this.showProductivityDialog = true;
    }

    generateParticipantReport(){
      if (this.selectedMember && this.startDate && this.endDate) {
        // Lógica para generar el reporte de productividad
        const selectedLabelIds = this.selectedLabels.map(label => label.idLabel);
        this.messageService.add({severity: 'info', summary: 'Cargando', detail: 'El reporte se está generando...'});

        this.reportService.participant(this.id, this.selectedMember.idUser, this.startDate, this.endDate, selectedLabelIds)
        .subscribe((response: Blob) => {
            // Crear un objeto Blob con la respuesta (PDF)
            const blob = new Blob([response], { type: 'application/pdf' });
            
            // Crear una URL temporal para el archivo Blob
            const url = window.URL.createObjectURL(blob);
            
            // Crear un enlace temporal para iniciar la descarga
            const a = document.createElement('a');
            a.href = url;
            a.download = 'reporte_participación.pdf';  // Nombre del archivo descargado
            document.body.appendChild(a);  // Agregar el enlace al DOM
            
            // Simular un click en el enlace para iniciar la descarga
            a.click();
            
            // Eliminar el enlace después de la descarga
            document.body.removeChild(a);
            this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'El reporte de participación se ha generado correctamente'});
            this.showParticipantDialog = false;
        }, error => {
            console.error('Error generando el reporte: ', error);
        });


        this.showParticipantDialog = false; // Cierra el diálogo
      } else {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Debe seleccionar un miembro y definir un periodo'});
      }
    }

    generateDeliveryMemberReport(){
      if (this.startDate && this.endDate) {
        // Lógica para generar el reporte de productividad
       
        this.messageService.add({severity: 'info', summary: 'Cargando', detail: 'El reporte se está generando...'});

        this.reportService.deliveryMembers(this.id, this.user.idUser, this.startDate, this.endDate)
        .subscribe((response: Blob) => {
            // Crear un objeto Blob con la respuesta (PDF)
            const blob = new Blob([response], { type: 'application/pdf' });
            
            // Crear una URL temporal para el archivo Blob
            const url = window.URL.createObjectURL(blob);
            
            // Crear un enlace temporal para iniciar la descarga
            const a = document.createElement('a');
            a.href = url;
            a.download = 'reporte_plazosentrega.pdf';  // Nombre del archivo descargado
            document.body.appendChild(a);  // Agregar el enlace al DOM
            
            // Simular un click en el enlace para iniciar la descarga
            a.click();
            
            // Eliminar el enlace después de la descarga
            document.body.removeChild(a);
            this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'El reporte de plazos de enntrega se ha generado correctamente'});
            this.showDeliveryMemberDialog= false; // Cierra el diálogo
          }, error => {
            console.error('Error generando el reporte: ', error);
        });

       

        this.showDeliveryMemberDialog= false; // Cierra el diálogo
      } else {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Debe definir un periodo'});
      }

    }

    generateDeliveryCoordinatorReport(){
      if (this.startDate && this.endDate) {
        // Lógica para generar el reporte de productividad
       
        this.messageService.add({severity: 'info', summary: 'Cargando', detail: 'El reporte se está generando...'});

        this.reportService.deliveryCoordinators(this.id, this.user.idUser, this.startDate, this.endDate)
        .subscribe((response: Blob) => {
            // Crear un objeto Blob con la respuesta (PDF)
            const blob = new Blob([response], { type: 'application/pdf' });
            
            // Crear una URL temporal para el archivo Blob
            const url = window.URL.createObjectURL(blob);
            
            // Crear un enlace temporal para iniciar la descarga
            const a = document.createElement('a');
            a.href = url;
            a.download = 'reporte_plazosentrega_coordinador.pdf';  // Nombre del archivo descargado
            document.body.appendChild(a);  // Agregar el enlace al DOM
            
            // Simular un click en el enlace para iniciar la descarga
            a.click();
            
            // Eliminar el enlace después de la descarga
            document.body.removeChild(a);
            this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'El reporte de plazos de entrega se ha generado correctamente'});
            this.showDeliveryCoordinatorDialog = false;
        }, error => {
            console.error('Error generando el reporte: ', error);
        });

       

        this.showDeliveryCoordinatorDialog = false; // Cierra el diálogo
      } else {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Debe definir un periodo'});
      }

    }

    generatePendingTasksReport(){
      if (this.startDate && this.endDate && this.selectedMembers) {
        // Lógica para generar el reporte de productividad
       
        const selectedUsersIds = this.selectedMembers.map(m => m.idUser);
        this.messageService.add({severity: 'info', summary: 'Cargando', detail: 'El reporte se está generando...'});

        this.reportService.pendingactivities(this.id, this.startDate, this.endDate, selectedUsersIds)
        .subscribe((response: Blob) => {
            // Crear un objeto Blob con la respuesta (PDF)
            const blob = new Blob([response], { type: 'application/pdf' });
            
            // Crear una URL temporal para el archivo Blob
            const url = window.URL.createObjectURL(blob);
            
            // Crear un enlace temporal para iniciar la descarga
            const a = document.createElement('a');
            a.href = url;
            a.download = 'reporte_actividadespendientes.pdf';  // Nombre del archivo descargado
            document.body.appendChild(a);  // Agregar el enlace al DOM
            
            // Simular un click en el enlace para iniciar la descarga
            a.click();
            
            // Eliminar el enlace después de la descarga
            document.body.removeChild(a);
            this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'El reporte de actividades pendientes se ha generado correctamente'});
            this.showPendingTasksDialog = false;
        }, error => {
            console.error('Error generando el reporte: ', error);
        });

        this.showPendingTasksDialog = false;
      } else {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Debe definir un periodo y seleccionar un miembro'});
      }
    }
  
    generateCompletedTasksReport(){
      if (this.startDate && this.endDate && this.selectedMembers) {
        // Lógica para generar el reporte de productividad
       
        const selectedUsersIds = this.selectedMembers.map(m => m.idUser);
        this.messageService.add({severity: 'info', summary: 'Cargando', detail: 'El reporte se está generando...'});

        this.reportService.completedactivities(this.id, this.startDate, this.endDate, selectedUsersIds)
        .subscribe((response: Blob) => {
            // Crear un objeto Blob con la respuesta (PDF)
            const blob = new Blob([response], { type: 'application/pdf' });
            
            // Crear una URL temporal para el archivo Blob
            const url = window.URL.createObjectURL(blob);
            
            // Crear un enlace temporal para iniciar la descarga
            const a = document.createElement('a');
            a.href = url;
            a.download = 'reporte_actividadescompletadas.pdf';  // Nombre del archivo descargado
            document.body.appendChild(a);  // Agregar el enlace al DOM
            
            // Simular un click en el enlace para iniciar la descarga
            a.click();
            
            // Eliminar el enlace después de la descarga
            document.body.removeChild(a);
            this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'El reporte de actividades completadas se ha generado correctamente'});
            this.showCompletedTasksDialog = false;
        }, error => {
            console.error('Error generando el reporte: ', error);
        },);

        this.showCompletedTasksDialog = false;
      } else {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Debe definir un periodo y seleccionar un miembro'});
      }
    }

    closeProductivityDialog() {
      this.showProductivityDialog = false;
    }

    participation(){
      this.showParticipantDialog = true;
    }

    deadlines(){
      this.showDeliveryMemberDialog  = true;
    }

    coordinatorDeadlines(){
      this.showDeliveryCoordinatorDialog = true;
    }

    pendingTasks(){
      this.showPendingTasksDialog = true;
    }

    completedTasks(){
      this.showCompletedTasksDialog = true;
    }


}
