import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService} from './auth.service';
import { variablesGlobales } from './variablesGlobales';

@Injectable({
  providedIn: 'root',
})
export class PreguntaService {
    
    //private httpUrl = 'https://chatbot-tip-backend.herokuapp.com/';

    constructor(private http: HttpClient, private auth: AuthService) {

    }


  listar() {
    const headers = { 'Authorization': '*'};

  
    return this.http.get<any>(variablesGlobales.getHttpUrlInterprete() + 'listar-intent');
  }

  nuevaPregunta(nombre,pregunta,respuesta){
    return this.http.post<any>(variablesGlobales.getHttpUrlInterprete() + 'nuevo-intent', {
      nombreIntent:nombre,
      pregunta:pregunta,
      respuesta:respuesta
      });
  }
  borrar(id){
    return this.http.post<any>(variablesGlobales.getHttpUrlInterprete() + 'borrar-intent', {
      idIntent:id,
      });
  }

  clear() {
    //this.messages = [];
  }
}