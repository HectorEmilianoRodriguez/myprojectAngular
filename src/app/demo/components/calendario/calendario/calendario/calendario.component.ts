import { Component, OnInit } from '@angular/core'; // Asegúrate de importar OnInit
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { IActivity } from '../../calendario/actividadmodel/Actividad'; // Asegúrate de que la ruta sea correcta
import { CalendarioSService } from './../../servicios/calendario-s.service';
import { WorkEnvMService } from 'src/app/demo/components/workenvm/servicios/workenvm-service'; // Asegúrate de que la ruta sea correcta
import { ActivatedRoute } from '@angular/router'; // Asegúrate de importar ActivatedRoute

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'
  ]
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
  newActivity: IActivity = { title: '', description: '', start: '', end: '', color: '#ffffff', idJoinUserWork: 1, id: '' }; // Datos de la nueva actividad
  selectedActivity: IActivity | null = null; // Actividad seleccionada para ver detalles
  idJoinUserWork: number; // Variable para almacenar el ID del entorno de trabajo
  id: any; // ID del grupo o del entorno de trabajo

  constructor(
    private activityService: CalendarioSService,
    private workEnvService: WorkEnvMService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id'); // Obtiene el ID del grupo o del entorno de trabajo
      console.log(this.id);
      this.getWorkEnv(); // Llama a obtener el entorno de trabajo
    });
  }

  getWorkEnv(): void {
    this.workEnvService.getWorkEnv(this.id).subscribe(
      (res) => {
        this.idJoinUserWork = res.idJoinUserWork; // Obtiene el ID del entorno de trabajo
        console.log('ID del entorno de trabajo:', this.idJoinUserWork);
        this.loadActivities(this.idJoinUserWork); // Carga las actividades después de obtener el ID
      },
      (error) => {
        console.error('Error fetching work environment', error);
      }
    );
  }

  loadActivities(idJoinUserWork: number) {
    this.activityService.getActivities(idJoinUserWork).subscribe(activities => {
      this.calendarOptions.events = activities.map(activity => ({
        title: activity.title,
        start: activity.start,
        end: activity.end,
        id: activity.id.toString()
      }));
    });
  }

  handleDateClick(arg: any) {
    this.newActivity.start = arg.dateStr; // Establece la fecha de inicio
    this.newActivity.end = arg.dateStr; // Establece la fecha de fin igual a la de inicio
    this.isActivityDialogVisible = true; // Muestra el diálogo para agregar actividad
  }

  saveActivity() {
    this.newActivity.idJoinUserWork = this.idJoinUserWork; // Asigna el ID del entorno de trabajo a la nueva actividad
    this.activityService.newActivity(this.newActivity).subscribe(() => {
      this.loadActivities(this.idJoinUserWork); // Recargar actividades después de crear una nueva
      this.isActivityDialogVisible = false; // Cierra el diálogo
      this.newActivity = { title: '', description: '', start: '', end: '', color: '#ffffff', idJoinUserWork: this.idJoinUserWork, id: '' }; // Reinicia los datos
    });
  }

  handleEventClick(arg: any) {
    this.selectedActivity = null; // Reinicia la actividad seleccionada
    this.activityService.getActivities(this.idJoinUserWork).subscribe(activities => {
      this.selectedActivity = activities.find(activity => activity.id === arg.event.id); // Establece la actividad seleccionada
      this.isDetailDialogVisible = true; // Muestra el diálogo de detalles
    }, error => {
      console.error('Error al cargar actividades:', error); // Manejo de errores
    });
  }

  deleteActivity() {
    if (this.selectedActivity) {
      this.activityService.deleteActivity(Number(this.selectedActivity.id)).subscribe(() => { // Convertir id a número
        this.loadActivities(this.idJoinUserWork); // Recargar actividades después de eliminar
        this.isDetailDialogVisible = false; // Cierra el diálogo this.selectedActivity = null; // Reinicia la actividad seleccionada
      });
    }
  }
}