import { Asignatura } from './asignatura';

export interface Horario {
    id:string;
    semestre: string;
    dia: string;
    horaDesde: string;
    horaHasta: string;
    asignatura: Asignatura;
  }
