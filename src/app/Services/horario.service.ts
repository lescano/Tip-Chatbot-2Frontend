import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService} from './auth.service';
import { Horario } from '../Clases/horario';

@Injectable({
  providedIn: 'root',
})
export class HorarioService {
  messages: string[] = [];
  horarios:Array<Horario>;

    constructor(private http: HttpClient, private auth: AuthService) {
      this.horarios=new Array();
     }
}