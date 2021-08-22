import { Evaluacion } from './evualuacion';
import { Horario } from './horario';
import { Previa } from './previa';
import { UsuarioAsignatura } from './usuarioAsignatura';

export interface Asignatura {
    id:string;
    codigo: string;
    nombre: string;
    creditos: number;
    programa: string;
    apruebaPor: string;
    nombreDoc: string;
    correoDoc: string;
    fechaInscripcion:Date;
    horarios:Array<Horario>;
    previas:Array<Previa>;
    evaluaciones:Array<Evaluacion>;
    usuarioAsignaturas:Array<UsuarioAsignatura>;
  }
