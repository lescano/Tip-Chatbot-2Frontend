import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService} from './auth.service';


@Injectable({
  providedIn: 'root',
})
export class FeriadoService {
    //private httpUrl = 'http://localhost:8080/';
    private httpUrl = 'https://chatbot-tip-backend.herokuapp.com/';
    constructor(private http: HttpClient, private auth: AuthService) { }


  listar() {
    const headers = { 'Authorization': '*'};
    return this.http.post<any>(this.httpUrl + 'feriados/listado',{});
  }

  nuevoFeriado(fecha,motivo){
    return this.http.post<any>(this.httpUrl + 'feriados/nuevo', {
      fecha:fecha,
      motivo:motivo
      });
  }
  borrar(id){
    return this.http.post<any>(this.httpUrl + 'feriados/delete', {
      id:id,
      });
  }

  clear() {
    //this.messages = [];
  }
}