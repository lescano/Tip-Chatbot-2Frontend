import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { variablesGlobales } from './variablesGlobales';

@Injectable({
    providedIn: 'root',
})
export class ChatService {

    messages: string[] = [];
    constructor(private http: HttpClient, private auth: AuthService) { }

    add(message: string) {
        const headers = { 'Authorization': '*' };

        var id = this.auth.getActualUser();
        if (id == null || id == undefined) {
            id = "0";
        }
        return this.http.post<any>(variablesGlobales.getHttpUrlInterprete() + 'send-msg', { MSG: message, id: id });
    }

    webhook() {
        const headers = { 'Authorization': '*' };
        let response = this.http.post<any>(variablesGlobales.getHttpUrl() + 'preguntas/FAQcal5', {});
        return response;
    }

    loadPreviousChat() {
        const headers = { 'Authorization': '*' };
        let id = this.auth.getActualUser();
        if (id != null || id != undefined) {
            return this.http.post<any>(variablesGlobales.getHttpUrl() + 'historial/getUserHistory', { idUser: id });
        }
    }

    insertNewHistory(question, answer, currentDate, currentTime, subjectCode){
        const headers = { 'Authorization': '*' };
        let id = this.auth.getActualUser();
        let arrayCurrentDate = currentDate.split('/');
        currentDate = arrayCurrentDate[2] + "" + arrayCurrentDate[1] +  "" + arrayCurrentDate[0];
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'historial/insertUserHistory', {idUser: id, question: question, answer: answer, currentDate: currentDate, currentTime: currentTime, subjectCode: subjectCode});
    }
    
    profesor(codigo) {
        const headers = { 'Authorization': '*' };

        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'preguntas/FAQcal11', { codigo: codigo });
    }

    horarios(codigo) {
        const headers = { 'Authorization': '*' };

        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'preguntas/FAQcal9', { codigo: codigo });
    }

    evaluaciones(codigo) {
        const headers = { 'Authorization': '*' };

        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'preguntas/FAQcal10', { codigo: codigo });
    }

    creditos(codigo) {
        const headers = { 'Authorization': '*' };

        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'preguntas/FAQcal13', { codigo: codigo });
    }

    limite(codigo) {
        const headers = { 'Authorization': '*' };

        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'preguntas/FAQcal12', { codigo: codigo });
    }

    cursada(codigo) {
        const headers = { 'Authorization': '*' };
        var id = this.auth.getActualUser();
        if (id == null || id == undefined) {
            id = "0";
        }
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'preguntas/FAQcal8', { codigo: codigo, id: id });
    }

    clear() {
        //this.messages = [];
    }
    
    cursada2(codigo, id) {
        const headers = { 'Authorization': '*' };
        //var id= this.auth.getActualUser();
        if (id == null || id == undefined) {
            id = "0";
        }
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'preguntas/FAQcal8', { codigo: codigo, id: id });
    }
}
