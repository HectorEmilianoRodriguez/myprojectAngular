import { Component, OnInit } from '@angular/core'; // Asegúrate de importar OnInit
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { IActivity } from '../../calendario/actividadmodel/Actividad'; // Asegúrate de que la ruta sea correcta
import { CalendarioSService } from './../../servicios/calendario-s.service';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})

export class CalendarioComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: [],
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this)
  };

  isActivityDialogVisible: boolean = false; // Controla la visibilidad del diálogo de actividad
  isDetailDialogVisible: boolean = false; // Controla la visibilidad del diálogo de detalles
  newActivity: IActivity = { title: '', description: '', start: '', end: '', color: '#ffffff', idJoinUserWork: 1 }; // Datos de la nueva actividad
  selectedActivity: IActivity | null = null; // Actividad seleccionada para ver detalles

  constructor(private activityService: CalendarioSService) {}

  ngOnInit() {
    const idJoinUserWork = 1; // Reemplaza con el ID real del usuario
    this.loadActivities(idJoinUserWork);
  }

  loadActivities(idJoinUserWork: number) {
    this.activityService.getActivities(idJoinUserWork).subscribe(activities => {
      this.calendarOptions.events = activities.map(activity => ({
        title: activity.title,
        start: activity.start,
        end: activity.end,
        id: activity.id
      }));
    });
  }

  handleDateClick(arg: any) {
    this.newActivity.start = arg.dateStr; // Establece la fecha de inicio
    this.newActivity.end = arg.dateStr; // Establece la fecha de fin igual a la de inicio
    this.isActivityDialogVisible = true; // Muestra el diálogo para agregar actividad
  }

  saveActivity() {
    this.activityService.newActivity(this.newActivity).subscribe(() => {
      this.loadActivities(1); // Recargar actividades después de crear una nueva
      this.isActivityDialogVisible = false; // Cierra el diálogo
      this.newActivity = { title: '', description: '', start: '', end: '', color: '#ffffff', idJoinUserWork: 1 }; // Reinicia los datos
    });
  }

  handleEventClick(arg: any) {
    this.activityService.getActivityById(arg.event.id).subscribe(activity => {
      this.selectedActivity = activity; // Establece la actividad seleccionada
      this.isDetailDialogVisible = true; // Muestra el diálogo de detalles
    });
  }

  deleteActivity() {
    if (this.selectedActivity) {
      this.activityService.deleteActivity(this.selectedActivity.id).subscribe(() => {
        this.loadActivities(1); // Recargar actividades después de eliminar
        this.isDetailDialogVisible = false; // Cierra el diálogo
        this.selectedActivity = null; // Reinicia la actividad seleccionada
      });
    }
  }
}