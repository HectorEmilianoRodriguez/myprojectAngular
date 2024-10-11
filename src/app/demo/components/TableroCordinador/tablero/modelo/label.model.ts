export class Label {
    idLabel: number;
    nameL: string;
    colorL: string;
    logicdeleted: boolean;
    idWorkEnv: number;

    constructor(
        idLabel: number,
        nameL: string,
        colorL: string,
        logicdeleted: boolean,
        idWorkEnv: number
    ) {
        this.idLabel = idLabel;
        this.nameL = nameL;
        this.colorL = colorL;
        this.logicdeleted = logicdeleted;
        this.idWorkEnv = idWorkEnv;
    }
}