import { Activity } from '../modelo/actividad'; // Asegúrate de que la ruta sea correcta

export class Group {
    constructor(
        public id: number,
        public name: string,
        public startdate: string, // Cambiado a string para reflejar el formato de fecha
        public enddate: string, // Cambiado a string para reflejar el formato de fecha
        public logicdeleted: number,
        public idJoinUserWork: number
    ) {}
}
