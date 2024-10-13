// src/app/demo/components/TableroCordinador/tablero/modelo/editarGroup.model.ts
export class EditarGroup {
    id: number; // Propiedad para almacenar el ID del grupo
    name: string;
    startdate: string; // Fecha de inicio
    enddate: string; // Fecha de fin
    idJoinUserWork: number; // ID del entorno de trabajo

    constructor(id: number, name: string, startdate: string, enddate: string, idJoinUserWork: number) {
        this.id = id; // Asigna el ID
        this.name = name; // Asigna el nombre
        this.startdate = startdate; // Asigna la fecha de inicio
        this.enddate = enddate; // Asigna la fecha de fin
        this.idJoinUserWork = idJoinUserWork; // Asigna el ID del entorno de trabajo
    }
}