import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService} from './auth.service';


@Injectable({
  providedIn: 'root',
})
export class PreguntaService {
    //private httpUrl = 'http://localhost:8080/';
    private httpUrl = 'https://chatbot-tip-backend.herokuapp.com/';

    constructor(private http: HttpClient, private auth: AuthService) {

    }


  listar() {
    const headers = { 'Authorization': '*'};

  
    return this.http.get<any>(this.httpUrl + 'listar-intent');
  }

  nuevaPregunta(nombre,pregunta,respuesta){
    return this.http.post<any>(this.httpUrl + 'nuevo-intent', {
      nombreIntent:nombre,
      pregunta:pregunta,
      respuesta:respuesta
      });
  }
  borrar(id){
    return this.http.post<any>(this.httpUrl + 'borrar-intent', {
      idIntent:id,
      });
  }

  clear() {
    //this.messages = [];
  }
}