import { Activity } from '../modelo/actividad'; // Asegúrate de que la ruta sea correcta

export class Group {
    id: number;
    name: string;
    description: string;
    startdate: string; // Asegúrate de que el nombre coincida
    enddate: string; // Asegúrate de que el nombre coincida
    idJoinUserWork: number; // Asegúrate de que esta propiedad exista

    constructor(id: number, name: string, description: string, startdate: string, enddate: string, idJoinUserWork: number) {
        this.id = id;
        this.name = name;
        this.description = description; // Asegúrate de que el nombre coincida
        this.startdate = startdate; // Asegúrate de que el nombre coincida
        this.enddate = enddate; // Asegúrate de que el nombre coincida
        this.idJoinUserWork = idJoinUserWork; // Asegúrate de que el nombre coincida
    }
}
