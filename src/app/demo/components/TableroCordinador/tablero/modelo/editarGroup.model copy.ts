// src/app/demo/components/TableroCordinador/tablero/modelo/editarGroup.model.ts
export class EditarGroup {
    idgrouptaskcl: number; // Propiedad para almacenar el ID del grupo
    name: string;
    startdate: Date; // Fecha de inicio
    enddate: Date; // Fecha de fin
    idJoinUserWork: number; // ID del entorno de trabajo

    constructor(id: number, name: string, startdate: Date, enddate: Date, idJoinUserWork: number) {
        this.idgrouptaskcl = id; // Asigna el ID
        this.name = name; // Asigna el nombre
        this.startdate = startdate; // Asigna la fecha de inicio
        this.enddate = enddate; // Asigna la fecha de fin
        this.idJoinUserWork = idJoinUserWork; // Asigna el ID del entorno de trabajo
    }
}