import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios/servicios.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent implements OnInit {
  solicitudes: any[] = []; // Array para almacenar las solicitudes
  
  constructor(private serviciosService: ServiciosService) { }

  ngOnInit() {
    this.loadPendingApprovals(); // Cargar las solicitudes pendientes al iniciar
  }

  loadPendingApprovals() {
    this.serviciosService.getPendingApprovals().subscribe((data) => {
      console.log(data); // Verifica si se están obteniendo datos
      this.solicitudes = data; // Asignar las solicitudes obtenidas al array
    }, error => {
      console.error('Error al cargar las solicitudes:', error); // Manejo de errores
    });
  }

  acceptRequest(idUser: number, idWorkEnv: number) {
    this.serviciosService.acceptRequest(idUser, idWorkEnv).subscribe((response) => {
        if (response.success === "updated") {
            // Llama a la función para notificar al usuario
            this.serviciosService.notifyUserApprobedOrNot(idWorkEnv.toString(), idUser, 1).subscribe(() => {
                console.log('Notificación enviada al usuario.');
            }, error => {
                console.error('Error al enviar la notificación:', error);
            });
            alert('Solicitud aprobada con éxito.');
        }
        this.loadPendingApprovals(); // Recargar las solicitudes después de aceptar
    }, error => {
        console.error('Error al aprobar la solicitud:', error); // Manejo de errores
    });
  }

  rejectRequest(idJoinUserWork: number) {
    this.serviciosService.rejectRequest(idJoinUserWork).subscribe((response) => {
        if (response.success === "updated") {
            // Llama a la función para notificar al usuario
            this.serviciosService.notifyUserApprobedOrNot(idJoinUserWork.toString(), idJoinUserWork, 0).subscribe(() => {
                console.log('Notificación enviada al usuario.');
            }, error => {
                console.error('Error al enviar la notificación:', error);
            });
            alert('Solicitud rechazada con éxito.');
        }
        this.loadPendingApprovals(); // Recargar las solicitudes después de rechazar
    }, error => {
        console.error('Error al rechazar la solicitud:', error); // Manejo de errores
    });
  }
}