export class Activity {
    id: number;
    nameT: string;
    descriptionT: string;
    end_date: Date;
    important: boolean;
    done: boolean;
    idLabel: number;
    idgrouptaskcl: number;

    constructor(
        id: number,
        nameT: string,
        descriptionT: string,
        end_date: Date,
        important: boolean,
        done: boolean,
        idLabel: number,
        idgrouptaskcl: number
    ) {
        this.id = id;
        this.nameT = nameT;
        this.descriptionT = descriptionT;
        this.end_date = end_date;
        this.important = important;
        this.done = done;
        this.idLabel = idLabel;
        this.idgrouptaskcl = idgrouptaskcl;
    }
}