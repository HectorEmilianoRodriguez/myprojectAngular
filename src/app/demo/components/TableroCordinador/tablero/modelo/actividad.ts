export class Activity {
    idactivitycl: number;
    nameT: string;
    descriptionT: string;
    end_date: string; // Formato de fecha como string
    important: number; // Cambia esto a number (0 o 1) en lugar de boolean
    logicdeleted: number; // Cambia esto a number (0 o 1) en lugar de boolean
    done: number; // Cambia esto a number (0 o 1) en lugar de boolean
    idgrouptaskcl: number;
    idLabel: number | null; // Puede ser null si no se asigna

    constructor(
        idactivitycl: number,
        nameT: string,
        descriptionT: string,
        end_date: string,
        important: number,
        logicdeleted: number,
        done: number,
        idgrouptaskcl: number,
        idLabel: number | null
    ) {
        this.idactivitycl = idactivitycl;
        this.nameT = nameT;
        this.descriptionT = descriptionT;
        this.end_date = end_date;
        this.important = important;
        this.logicdeleted = logicdeleted;
        this.done = done;
        this.idgrouptaskcl = idgrouptaskcl;
        this.idLabel = idLabel;
    }
}
