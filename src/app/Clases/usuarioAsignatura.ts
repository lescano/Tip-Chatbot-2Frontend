import { Asignatura } from './asignatura';
import { Usuario } from './usuario';

export interface UsuarioAsignatura {
    id:string;
    estado: string;
    usuario: Usuario;
    asignatura: Asignatura;
}