import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { variablesGlobales } from './variablesGlobales';

@Injectable({
    providedIn: 'root',
})
export class PreguntaService {

    constructor(private http: HttpClient, private auth: AuthService) {

    }

    listar() {
        return this.http.get<any>(variablesGlobales.getHttpUrlInterprete() + 'listar-intent');
    }

    listarPendientes() {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'preguntas/getUnansweredQuestions', {});
    }

    deleteUnansweredQuestion(idQuestion){
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'preguntas/deleteUnansweredQuestion', {idQuestion: idQuestion});
    }

    nuevaPregunta(nombre, pregunta, respuesta) {
        return this.http.post<any>(variablesGlobales.getHttpUrlInterprete() + 'nuevo-intent', {
            nombreIntent: nombre,
            pregunta: pregunta,
            respuesta: respuesta
        });
    }
    borrar(id) {
        return this.http.post<any>(variablesGlobales.getHttpUrlInterprete() + 'borrar-intent', {
            idIntent: id,
        });
    }

    clear() {
        //this.messages = [];
    }
}