import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { variablesGlobales } from './variablesGlobales';

@Injectable({
    providedIn: 'root'
})
export class EstadisticasService {

    constructor(private http: HttpClient, private auth: AuthService) { }

    getCountQuestionByDate(startDate, endDate) {
        const headers = { 'Authorization': '*' };
        return this.http.post<any>(variablesGlobales.getHttpUrl() + "historial/getCountQuestionByDate", { startDate: startDate, endDate: endDate });
    }

    getCountQuestionsByUser(value, startDate, endDate) {
        const headers = { 'Authorization': '*' };
        return this.http.post<any>(variablesGlobales.getHttpUrl() + "historial/getCountQuestionsByUser", { textToSearch: value, startDate: startDate, endDate: endDate });
    }

    getCountSubjectConsult(startDate, endDate) {
        const headers = { 'Authorization': '*' };
        return this.http.post<any>(variablesGlobales.getHttpUrl() + "historial/getCountSubjectConsult", { startDate: startDate, endDate: endDate });
    }

    getConsultsBySubject(codeSubject, startDate, endDate) {
        const headers = { 'Authorization': '*' };
        return this.http.post<any>(variablesGlobales.getHttpUrl() + "historial/getConsultsBySubject", { codeSubject: codeSubject, startDate: startDate, endDate: endDate });
    }

    getHistoryMaterials(idSubject, startDate, endDate) {
        const headers = { 'Authorization': '*' };
        return this.http.post<any>(variablesGlobales.getHttpUrl() + "historial/getHistoryMaterials", { idSubject: idSubject, startDate: startDate, endDate: endDate });
    }
}
