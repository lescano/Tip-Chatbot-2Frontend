import { Component, OnInit } from '@angular/core';
//import { ConsoleReporter } from 'jasmine';
import { ChatService } from '../Services/chat.service';
import { AuthService } from '../Services/auth.service';
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

	titulo = "ChatBot TIP";
	descripcion = "Ingresa tu consulta para comenzar";
  contenidoMensaje: string;
  mensajes= [];
  codigo = "";
  constructor(
     private messageService: ChatService,
     private authService:AuthService,
     private sanitized: DomSanitizer
    ) { }

  ngOnInit(): void {
   /* this.authService.isAdmin().subscribe(data => {
      alert(data.data);
    })*/
  }
  horarios(){
    this.mensajes[this.mensajes.length-1].botones = false;
    this.mensajes[this.mensajes.length-1].msj = "Escribiendo...";
    this.messageService.horarios(this.codigo).subscribe(data =>{
      this.responder(data.Reply,false);
    });
  }
  profesor(){
    this.mensajes[this.mensajes.length-1].botones = false;
    this.mensajes[this.mensajes.length-1].msj = "Escribiendo...";
    this.messageService.profesor(this.codigo).subscribe(data =>{
      this.responder(data.Reply,false);
    });
  }
  evaluaciones(){
    this.mensajes[this.mensajes.length-1].botones = false;
    this.mensajes[this.mensajes.length-1].msj = "Escribiendo...";
    this.messageService.evaluaciones(this.codigo).subscribe(data =>{
      this.responder(data.Reply,false);
    });
  }
  cursada(){
    this.mensajes[this.mensajes.length-1].botones = false;
    this.mensajes[this.mensajes.length-1].msj = "Escribiendo...";
    this.messageService.cursada(this.codigo).subscribe(data =>{
      this.responder(data.Reply,false);
    });
  }

  creditos(){
    this.mensajes[this.mensajes.length-1].botones = false;
    this.mensajes[this.mensajes.length-1].msj = "Escribiendo...";
    this.messageService.creditos(this.codigo).subscribe(data =>{
      this.responder(data.Reply,false);
    });
  }
  limite(){
    this.mensajes[this.mensajes.length-1].botones = false;
    this.mensajes[this.mensajes.length-1].msj = "Escribiendo...";
    this.messageService.limite(this.codigo).subscribe(data =>{
      this.responder(data.Reply,false);
    });
  }
 
  enviarMensaje(){
    let horaf;
    let minutosf;
    if(new Date().getHours() < 10){
      horaf = "0"+new Date().getHours();
    }else{
      horaf = new Date().getHours();
    }
    if(new Date().getMinutes() < 10){
      minutosf = "0"+new Date().getMinutes();
    }else{
      minutosf = new Date().getMinutes();
    }
    if(this.contenidoMensaje.length>255){
      this.mensajes.push({id:"tu", msj:this.contenidoMensaje,tono:"obscuro",hora:horaf+":"+minutosf});
      this.responderErrorLargo();
    }else if(this.contenidoMensaje==""){
      this.mensajes.push({id:"tu", msj:this.contenidoMensaje,tono:"obscuro",hora:horaf+":"+minutosf});
      this.responderErrorVacio();
    }else{
      this.mensajes.push({id:"tu", msj:this.contenidoMensaje,tono:"obscuro",hora:horaf+":"+minutosf});
      let mensaje = this.contenidoMensaje;
      this.contenidoMensaje = "";
      this.mensajes.push({id:"temporal", msj:"Escribiendo...",tono:"claro",hora:""});
      setTimeout(() => {  var chatHistory = document.getElementById("chat");
    chatHistory.scrollTop = chatHistory.scrollHeight; }, 50);
      this.messageService.add(mensaje)
      .subscribe(data => {
        if(data.Reply == ""){
          this.messageService.webhook().subscribe(data => {
            this.responder(data.Reply,false);
            //console.log(data.Reply);
          });
        }else if(data.Reply.includes("asignatura-")){
          this.responder("¿Qué deseas saber sobre esta asignatúra?<br>",true);
          let cod = data.Reply.split("-");
          this.codigo = cod[1];
        }else{
          this.responder(data.Reply,false);
        }
        
      });
    }
  
     
  }
  responderErrorLargo(){

    let horaf;
    let minutosf;
    if(new Date().getHours() < 10){
      horaf = "0"+new Date().getHours();
    }else{
      horaf = new Date().getHours();
    }
    if(new Date().getMinutes() < 10){
      minutosf = "0"+new Date().getMinutes();
    }else{
      minutosf = new Date().getMinutes();
    }
    this.mensajes.push({id:"boot",botones:false,msj:"No puedo entender más de 255 caractéres :(" ,tono:"claro",hora:horaf+":"+minutosf});
    setTimeout(() => {  var chatHistory = document.getElementById("chat");
    chatHistory.scrollTop = chatHistory.scrollHeight; }, 50);
  }
  responderErrorVacio(){
    let horaf;
    let minutosf;
    if(new Date().getHours() < 10){
      horaf = "0"+new Date().getHours();
    }else{
      horaf = new Date().getHours();
    }
    if(new Date().getMinutes() < 10){
      minutosf = "0"+new Date().getMinutes();
    }else{
      minutosf = new Date().getMinutes();
    }
    this.mensajes.push({id:"boot",botones:false, msj:"Escribe una consulta por favor" ,tono:"claro",hora:horaf+":"+minutosf});
    setTimeout(() => {  var chatHistory = document.getElementById("chat");
    chatHistory.scrollTop = chatHistory.scrollHeight; }, 50);
  }
  responder(respuesta,boton){
    let horaf;
    let minutosf;
    if(new Date().getHours() < 10){
      horaf = "0"+new Date().getHours();
    }else{
      horaf = new Date().getHours();
    }
    if(new Date().getMinutes() < 10){
      minutosf = "0"+new Date().getMinutes();
    }else{
      minutosf = new Date().getMinutes();
    }
    this.mensajes.pop();
    this.mensajes.push({id:"boot",botones:boton,msj:respuesta,tono:"claro",hora:horaf+":"+minutosf});
    setTimeout(() => {  var chatHistory = document.getElementById("chat");
    chatHistory.scrollTop = chatHistory.scrollHeight; }, 50);
    
  }

}
