import { Activity } from '../modelo/actividad'; // Asegúrate de que la ruta sea correcta

export class Group {
    idgrouptaskcl?: number; // Asegúrate de que esta propiedad exista
    name: string;
    startdate: Date; // Asegúrate de que el nombre coincida
    enddate: Date; // Asegúrate de que el nombre coincida
    idJoinUserWork: number; // Asegúrate de que esta propiedad exista

    constructor(id: number, name: string, startdate: Date, enddate: Date, idJoinUserWork: number) {
        this.idgrouptaskcl = id; // Asegúrate de que el nombre coincida
        this.name = name; // Asegúrate de que el nombre coincida
        this.startdate = startdate; // Asegúrate de que el nombre coincida
        this.enddate = enddate; // Asegúrate de que el nombre coincida
        this.idJoinUserWork = idJoinUserWork; // Asegúrate de que el nombre coincida
    }
}
