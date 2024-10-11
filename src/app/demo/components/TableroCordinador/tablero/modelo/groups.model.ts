import { Activity } from '../modelo/actividad'; // Asegúrate de que la ruta sea correcta

export class Group {
    id: number;
    name: string;
    startdate: Date;
    enddate: Date;
    logicdeleted: boolean;
    idJoinUserWork: number;
    activities: Activity[] = []; // Asegúrate de que esto esté presente

    constructor(
        id: number,
        name: string,
        startdate: Date,
        enddate: Date,
        logicdeleted: boolean,
        idJoinUserWork: number
    ) {
        this.id = id;
        this.name = name;
        this.startdate = startdate;
        this.enddate = enddate;
        this.logicdeleted = logicdeleted;
        this.idJoinUserWork = idJoinUserWork;
    }
}