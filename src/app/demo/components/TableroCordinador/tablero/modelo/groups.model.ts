import { Activity } from '../modelo/actividad'; // Asegúrate de que la ruta sea correcta

export class Group {
    name: string;
    description: string;
    startdate: string; // Asegúrate de que el nombre coincida
    endate: string; // Asegúrate de que el nombre coincida
    idJoinUserWork: number; // Asegúrate de que esta propiedad exista

    constructor(id: number, name: string, description: string, startdate: string, endate: string, idJoinUserWork: number) {
        this.name = name;
        this.description = description; // Asegúrate de que el nombre coincida
        this.startdate = startdate; // Asegúrate de que el nombre coincida
        this.endate = endate; // Asegúrate de que el nombre coincida
        this.idJoinUserWork = idJoinUserWork; // Asegúrate de que el nombre coincida
    }
}
