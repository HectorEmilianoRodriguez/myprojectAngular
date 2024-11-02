export interface IActivity {
    title: string;
    description: string;
    start: string;
    end: string;
    color: string;
    id: string;
    idJoinUserWork: number;
  } 
  
  
  export class Activity implements IActivity {
      title: string;
      description: string;
      start: string;
      end: string;
      color: string;
      id: string;
      idJoinUserWork: number; // Campo agregado
    
      constructor(title: string, description: string, start: string, end: string, color: string, id: string, idJoinUserWork: number) {
        this.title = title;
        this.description = description;
        this.start = start;
        this.end = end;
        this.color = color;
        this.id = id;
        this.idJoinUserWork = idJoinUserWork; // Asignación en el constructor
      }
    }