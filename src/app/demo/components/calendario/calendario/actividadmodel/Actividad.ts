export interface IActivity {
    title: string;
    description: string;
    start: string;
    end: string;
    color: string;
    id: string;
    idJoinUserWork: number;
    idCalendarEvent?: number;
    done: number;
} 

export class Activity implements IActivity {
    title: string;
    description: string;
    start: string;
    end: string;
    color: string;
    id: string;
    done: number;
    idJoinUserWork: number; // Campo agregado
    idCalendarEvent?: number;

    constructor(title: string, description: string, start: string, end: string, color: string, id: string, idJoinUserWork: number, idCalendarEvent?: number, done?: number) {
        this.title = title;
        this.description = description;
        this.start = start;
        this.end = end;
        this.color = color;
        this.id = id;
        this.idJoinUserWork = idJoinUserWork; // Asignación en el constructor
        this.idCalendarEvent = idCalendarEvent; // Asignación en el constructor
        this.done = done;
    }
}