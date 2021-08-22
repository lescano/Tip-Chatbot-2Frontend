import { Asignatura } from './asignatura';
import { Parcial } from './parcial';
import { Examen } from './examen';
import { Laboratorio } from './laboratorio';

export interface Evaluacion {
    id:string;
    tipo:string;
    nombre: string;
    fecha: Date;
    asignatura: Asignatura;
    parcial:Parcial;
    examen:Examen;
    laboratorio:Laboratorio;
  }