// src/app/demo/components/TableroCordinador/tablero/modelo/editarAct.model.ts

export class EditarAct {
    idactivitycl: number;
    nameT: string;
    descriptionT: string;
    end_date: string; // Formato de fecha como string
    important: number; // Cambia esto a number (0 o 1) en lugar de boolean
    idLabel: number | null; 
    logicdeleted: number; // Agregar esta propiedad
    done: number; // Agregar esta propiedad
    idgrouptaskcl: number; // Agregar esta propiedad

    constructor(
        idactivitycl: number,
        nameT: string,
        descriptionT: string,
        end_date: string,
        important: number,
        idLabel: number | null,
        logicdeleted: number,
        done: number,
        idgrouptaskcl: number
    ) {
        this.idactivitycl = idactivitycl;
        this.nameT = nameT;
        this.descriptionT = descriptionT;
        this.end_date = end_date;
        this.important = important;
        this.idLabel = idLabel;
        this.logicdeleted = logicdeleted; // Inicializar
        this.done = done; // Inicializar
        this.idgrouptaskcl = idgrouptaskcl; // Inicializar
    }
}