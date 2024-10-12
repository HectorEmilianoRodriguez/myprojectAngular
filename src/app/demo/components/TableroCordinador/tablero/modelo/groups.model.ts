import { Activity } from '../modelo/actividad'; // Asegúrate de que la ruta sea correcta

export class Group {
    id: number;
    name: string;
    description: string; // Asegúrate de que esta propiedad exista
    startdate: string; // Cambia a 'startdate' si es así en tu modelo
    enddate: string; // Cambia a 'enddate' si es así en tu modelo
    idJoinUserWork: number; // Asegúrate de que esta propiedad exista

    constructor(
        id: number,
        name: string,
        description: string,
        startdate: string,
        enddate: string,
        idJoinUserWork: number
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.startdate = startdate; // Asegúrate de que el nombre coincida
        this.enddate = enddate; // Asegúrate de que el nombre coincida
        this.idJoinUserWork = idJoinUserWork; // Asegúrate de que el nombre coincida
    }
}
