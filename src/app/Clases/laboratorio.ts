import { Evaluacion } from './evualuacion';

export interface Laboratorio {
    id:string;
    fechaEntrega: Date;
    fechaDefensa: Date;
    evaluacion:Evaluacion;
}