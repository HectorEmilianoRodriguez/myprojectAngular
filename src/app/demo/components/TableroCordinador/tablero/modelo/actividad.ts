export class Activity {
    constructor(
        public idactivitycl: number,
        public nameT: string,
        public descriptionT: string,
        public end_date: string, // Formato de fecha como string
        public logicdeleted: number, // Cambia esto a number (0 o 1) en lugar de boolean
        public important: number, // Cambia esto a number (0 o 1) en lugar de boolean
        public done: number, // Cambia esto a number (0 o 1) en lugar de boolean
        public idgrouptaskcl: number,
        public idLabel: number | null // Puede ser null si no se asigna
    ) {}
}
