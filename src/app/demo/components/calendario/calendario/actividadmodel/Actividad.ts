
export interface IActivity {
    id: number; // Identificador único de la actividad
    title: string; // Título de la actividad
    start: string; // Fecha y hora de inicio en formato ISO 8601 (ejemplo: '2023-10-01T10:00:00')
    end?: string; // Fecha y hora de finalización en formato ISO 8601 (opcional)
    description?: string; // Descripción de la actividad (opcional)
}