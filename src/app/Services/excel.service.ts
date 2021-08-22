import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService} from './auth.service';


@Injectable({
  providedIn: 'root',
})
export class ExcelService {
    //private httpUrl = 'http://localhost:8080/';
    private httpUrl = 'https://chatbot-tip-backend.herokuapp.com/';
    constructor(private http: HttpClient, private auth: AuthService) { }


  Descargar() {
    const headers = { 'Authorization': '*'};
    return this.http.get<any>(this.httpUrl + 'planillas/download');
  }

  
  
  subir(form){
    const headers = {'Content-Type': 'multipart/form-data','Authorization': '*'}
    return this.http.post<any>(this.httpUrl + 'planillas/upload', form);
  }
  alta(){
    const headers = {'Content-Type': 'multipart/form-data','Authorization': '*'}
    return this.http.post<any>(this.httpUrl + 'planillas/alta', {});
  }
  clear() {
    //this.messages = [];
  }
}