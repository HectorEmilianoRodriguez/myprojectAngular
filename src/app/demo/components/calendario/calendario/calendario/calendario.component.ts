import { Component, OnInit } from '@angular/core'; // Asegúrate de importar OnInit
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { IActivity } from '../../calendario/actividadmodel/Actividad'; // Asegúrate de que la ruta sea correcta
import { CalendarioSService } from './../../servicios/calendario-s.service';
import { WorkEnvMService } from 'src/app/demo/components/workenvm/servicios/workenvm-service'; // Asegúrate de que la ruta sea correcta
import { ActivatedRoute } from '@angular/router'; // Asegúrate de importar ActivatedRoute
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'
  ]
})

export class CalendarioComponent implements OnInit {
  date1: Date;
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
  isEditing: boolean = false;
  today: string;
  minEndDate: string;


  constructor(
    private activityService: CalendarioSService,
    private workEnvService: WorkEnvMService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    const todayDate = new Date();
    this.today = todayDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    this.minEndDate = this.today; 
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id'); // Obtiene el ID del grupo o del entorno de trabajo
      console.log(this.id);
      this.getWorkEnv(); // Llama a obtener el entorno de trabajo
    });
  }

  updateMinEndDate() {
    this.minEndDate = this.newActivity.start; // Actualiza la fecha mínima de fin a la fecha de inicio seleccionada
  }

  updateColorDisplay() {
    // Este método se llama automáticamente al cambiar el color
    // No es necesario hacer nada aquí, ya que el color se muestra directamente en el HTML
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
      if (Array.isArray(activities)) {
        const processedActivities = activities.map(activity => ({
          title: activity.title,
          start: activity.start ? activity.start.split('T')[0] : null, // Solo la fecha, sin hora
          description: activity.description,
          end: activity.end ? new Date(new Date(activity.end).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] : null, // Solo la fecha, sin hora
          color: activity.color,
          idCalendarEvent: activity.idCalendarEvent
        }));
        this.calendarOptions.events = processedActivities;
      }
    }, error => {
      console.error('Error al cargar actividades:', error);
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
    console.log('Evento clicado:', arg); // Verifica el objeto completo

    // Accede directamente a los detalles de la actividad desde arg.event
    const selectedActivity = {
        title: arg.event.title,
        description: arg.event.extendedProps.description || 'Sin descripción', // Asegúrate de usar extendedProps
        start: arg.event.start || new Date(), // Valor predeterminado a la fecha actual si no está definido
        end: arg.event.end || 'Sin fecha de fin', // Asegúrate de que end esté en el formato correcto
        color: arg.event.color || '#000000', // Valor predeterminado a negro
        idCalendarEvent: arg.event.extendedProps.idCalendarEvent,
        id: '', // Asigna un valor por defecto o extrae de arg.event si está disponible
        idJoinUserWork: this.idJoinUserWork // Asigna el ID del entorno de trabajo
    };

    console.log('Actividad seleccionada:', selectedActivity);

    // Asigna la actividad seleccionada
    this.selectedActivity = selectedActivity;

    // Verifica que se haya encontrado la actividad
    console.log('Actividad seleccionada:', this.selectedActivity);

    // Muestra el diálogo de detalles
    this.isDetailDialogVisible = true;
  }

  editActivity() {
    const activityData = {
      idCalendarEvent: this.selectedActivity.idCalendarEvent,
      title: this.selectedActivity.title,
      description: this.selectedActivity.description,
      start: this.selectedActivity.start,
      end: this.selectedActivity.end
    }

    this.activityService.editActivity(activityData).subscribe(() => {
      this.loadActivities(this.idJoinUserWork); // Recargar actividades después de editar
      this.isDetailDialogVisible = false; // Cierra el diálogo
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Actividad editada correctamente' }); // Mensaje de éxito agregado
    }, error => {
      console.error('Error al editar la actividad:', error);
    });
}


  deleteActivity() {
    if (this.selectedActivity) {
      const activityId = {
        idCalendarEvent: this.selectedActivity.idCalendarEvent
      }
      this.activityService.deleteActivity(activityId).subscribe(() => {
        this.loadActivities(this.idJoinUserWork); // Recargar actividades después de eliminar
        this.isDetailDialogVisible = false; // Cierra el diálogo
        this.selectedActivity = null; // Reinicia la actividad seleccionada
      }, error => {
        console.error('Error al eliminar la actividad:', error);
      });
    }
  }
}