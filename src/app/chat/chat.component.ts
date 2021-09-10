import { Component, OnInit } from '@angular/core';
import { ChatService } from '../Services/chat.service';
import { AuthService } from '../Services/auth.service';
import { DomSanitizer } from '@angular/platform-browser'
import { variablesGlobales } from '../Services/variablesGlobales';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

    titulo = "ChatBot TIP";
    descripcion = "Ingresa tu consulta para comenzar";
    contenidoMensaje: string;
    mensajes = [];
    codigo = ""; //codigo de la asignatura

    constructor(
        private messageService: ChatService,
        private authService: AuthService,
        private sanitized: DomSanitizer,
        private modal:NgbModal
    ) { }

    ngOnInit(): void {
        this.messageService.loadPreviousChat().subscribe(data => {
            data.listHistory.forEach(itemHistoy => {
                this.mensajes.push({ id: "tu", msj: itemHistoy.pregunta, tono: "obscuro", hora: itemHistoy.hora + " " + itemHistoy.fecha });
                this.mensajes.push({ id: "boot", botones: false, msj: itemHistoy.respuesta, tono: "claro", hora: itemHistoy.hora + " " + itemHistoy.fecha });
            });
            this.getInitMessage();
        });
    }

    openModal(contenido){
        this.modal.open(contenido);   
    }

    getInitMessage() {
        let message = "¡Hola! Soy el asistente virtual del Tip.";
        message += "<br>📍 Puedes realizarme consultas sobre la carrera del Tecnólogo en Informática.";
        message += "<br>📍 Algunas preguntas requieren que estes registrado, me encargare de que lo sepas!";
        message += "<br>📍 Consultame sobre las materias y te dare opciones.";
        message += "<br>¡Estoy para ayudarte! 😄";
        this.mensajes.push({ id: "boot", botones: false, msj: message, tono: "claro", hora: this.getDateTimeMesssage() });
        setTimeout(() => {
            var chatHistory = document.getElementById("chat");
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }, 500);
    }

    //REF(1): Información especifica calculada sobre una asignatura
    horarios() {        
        //se muestra en pantalla que el usuario envió un mensaje
        this.mensajes.push({ id: "tu", msj: "Horarios " + variablesGlobales.getSubjectByCode(this.codigo), tono: "obscuro", hora: this.getDateTimeMesssage() });
        //temporalmente se muestra este mensaje de espera y se borra cuando se muestra el mensaje con la respuesta
        this.mensajes.push({ id: "temporal", msj: "Escribiendo...", tono: "claro", hora: "" });

        //se pide la respuesta al servidor del backend 
        this.messageService.horarios(this.codigo).subscribe(data => {
            let dateTime = this.getDateTimeMesssage();
            let arrayDateTime = dateTime.split(" ");
            //el mensaje se guarda en el historial como si el usuario preguntara por el horario de la asignatura
            this.messageService.insertNewHistory("Horarios " + variablesGlobales.getSubjectByCode(this.codigo), data.Reply, arrayDateTime[1], arrayDateTime[0], this.codigo).subscribe(response => {
                //se devuelve la respuesta a la pregunta
                this.responder(data.Reply, 0);
                this.mensajes.push({ id: "temporal", msj: "Escribiendo...", tono: "claro", hora: "" });
                //se envia este mensaje para no cortar el ciclo de comunicación
                //por si el usuario tiene otra consulta sobre la asignatura que consultó anteriormente
                this.responder("¿Deseas saber algo más?<br>", 1);
            });
        });

    }

    profesor() {      //se detalla el funcionamiento en la REF(1)  
        this.mensajes.push({ id: "tu", msj: "Profesor " + variablesGlobales.getSubjectByCode(this.codigo), tono: "obscuro", hora: this.getDateTimeMesssage() });

        this.mensajes.push({ id: "temporal", msj: "Escribiendo...", tono: "claro", hora: "" });

        this.mensajes[this.mensajes.length - 1].botones = false;
        this.mensajes[this.mensajes.length - 1].msj = "Escribiendo...";
        this.messageService.profesor(this.codigo).subscribe(data => {
            let dateTime = this.getDateTimeMesssage();
            let arrayDateTime = dateTime.split(" ");
            this.messageService.insertNewHistory("Profesor " + variablesGlobales.getSubjectByCode(this.codigo), data.Reply, arrayDateTime[1], arrayDateTime[0], this.codigo).subscribe(response => {
                this.responder(data.Reply, 0);
                this.mensajes.push({ id: "temporal", msj: "Escribiendo...", tono: "claro", hora: "" });
                this.responder("¿Deseas saber algo más?<br>", 1);
            });
        });
    }

    evaluaciones() {        //se detalla el funcionamiento en la REF(1)  
        this.mensajes.push({ id: "tu", msj: "Evaluaciones " + variablesGlobales.getSubjectByCode(this.codigo), tono: "obscuro", hora: this.getDateTimeMesssage() });

        this.mensajes.push({ id: "temporal", msj: "Escribiendo...", tono: "claro", hora: "" });

        this.mensajes[this.mensajes.length - 1].botones = false;
        this.mensajes[this.mensajes.length - 1].msj = "Escribiendo...";
        this.messageService.evaluaciones(this.codigo).subscribe(data => {
            let dateTime = this.getDateTimeMesssage();
            let arrayDateTime = dateTime.split(" ");
            this.messageService.insertNewHistory("Evaluaciones " + variablesGlobales.getSubjectByCode(this.codigo), data.Reply, arrayDateTime[1], arrayDateTime[0], this.codigo).subscribe(response => {
                this.responder(data.Reply, 0);
                this.mensajes.push({ id: "temporal", msj: "Escribiendo...", tono: "claro", hora: "" });
                this.responder("¿Deseas saber algo más?<br>", 1);
            });
        });
    }

    cursada() {        //se detalla el funcionamiento en la REF(1)  
        this.mensajes.push({ id: "tu", msj: "¿Puedo cursar " + variablesGlobales.getSubjectByCode(this.codigo) + "?", tono: "obscuro", hora: this.getDateTimeMesssage() });

        this.mensajes.push({ id: "temporal", msj: "Escribiendo...", tono: "claro", hora: "" });

        this.mensajes[this.mensajes.length - 1].botones = false;
        this.mensajes[this.mensajes.length - 1].msj = "Escribiendo...";
        this.messageService.cursada(this.codigo).subscribe(data => {
            let dateTime = this.getDateTimeMesssage();
            let arrayDateTime = dateTime.split(" ");
            this.messageService.insertNewHistory("¿Puedo cursar " + variablesGlobales.getSubjectByCode(this.codigo) + "?", data.Reply, arrayDateTime[1], arrayDateTime[0], this.codigo).subscribe(response => {
                this.responder(data.Reply, 0);
                this.mensajes.push({ id: "temporal", msj: "Escribiendo...", tono: "claro", hora: "" });
                this.responder("¿Deseas saber algo más?<br>", 1);
            });
        });
    }

    creditos() {        //se detalla el funcionamiento en la REF(1)  
        this.mensajes.push({ id: "tu", msj: "Creditos " + variablesGlobales.getSubjectByCode(this.codigo), tono: "obscuro", hora: this.getDateTimeMesssage() });

        this.mensajes.push({ id: "temporal", msj: "Escribiendo...", tono: "claro", hora: "" });

        this.mensajes[this.mensajes.length - 1].botones = false;
        this.mensajes[this.mensajes.length - 1].msj = "Escribiendo...";
        this.messageService.creditos(this.codigo).subscribe(data => {
            let dateTime = this.getDateTimeMesssage();
            let arrayDateTime = dateTime.split(" ");
            this.messageService.insertNewHistory("Creditos " + variablesGlobales.getSubjectByCode(this.codigo), data.Reply, arrayDateTime[1], arrayDateTime[0], this.codigo).subscribe(response => {
                this.responder(data.Reply, 0);
                this.mensajes.push({ id: "temporal", msj: "Escribiendo...", tono: "claro", hora: "" });
                this.responder("¿Deseas saber algo más?<br>", 1);
            });
        });
    }

    limite() {              //se detalla el funcionamiento en la REF(1)  
        this.mensajes.push({ id: "tu", msj: "Limite de inscripción " + variablesGlobales.getSubjectByCode(this.codigo), tono: "obscuro", hora: this.getDateTimeMesssage() });

        this.mensajes.push({ id: "temporal", msj: "Escribiendo...", tono: "claro", hora: "" });

        this.mensajes[this.mensajes.length - 1].botones = false;
        this.mensajes[this.mensajes.length - 1].msj = "Escribiendo...";

        this.messageService.limite(this.codigo).subscribe(data => {
            let dateTime = this.getDateTimeMesssage();
            let arrayDateTime = dateTime.split(" ");
            this.messageService.insertNewHistory("Limite de inscripción " + variablesGlobales.getSubjectByCode(this.codigo), data.Reply, arrayDateTime[1], arrayDateTime[0], this.codigo).subscribe(response => {
                this.responder(data.Reply, 0);
                this.mensajes.push({ id: "temporal", msj: "Escribiendo...", tono: "claro", hora: "" });
                this.responder("¿Deseas saber algo más?<br>", 1);

            });
        });
    }

    enviarMensaje() {

        if (!this.contenidoMensaje || this.contenidoMensaje == "") {
            let errorMessage = "Escribe una consulta por favor ⚠️";
            this.mensajes.push({ id: "tu", msj: this.contenidoMensaje, tono: "obscuro", hora: this.getDateTimeMesssage() });
            this.responderErrorVacio(errorMessage);
            this.contenidoMensaje = "";
        } else if (this.contenidoMensaje.length > 255) {
            let errorMessage = "No puedo entender más de 255 caractéres 😞";
            this.mensajes.push({ id: "tu", msj: this.contenidoMensaje, tono: "obscuro", hora: this.getDateTimeMesssage() });
            this.responderErrorLargo(errorMessage);
            this.contenidoMensaje = "";
        } else {
            this.mensajes.push({ id: "tu", msj: this.contenidoMensaje, tono: "obscuro", hora: this.getDateTimeMesssage() });
            let mensaje = this.contenidoMensaje;
            this.contenidoMensaje = "";
            this.mensajes.push({ id: "temporal", msj: "Escribiendo...", tono: "claro", hora: "" });
            setTimeout(() => {
                var chatHistory = document.getElementById("chat");
                chatHistory.scrollTop = chatHistory.scrollHeight;
            }, 50);
            this.messageService.add(mensaje)
                .subscribe(data => {
                    if (data.Reply == "" || data.Reply.includes("error")) {
                        //Crear modal que envie un correo al administrador
                        this.responder("Completa el formulario de pregunta<br>", 2);
                    } else if (data.Reply.includes("asignatura-")) {
                        this.responder("¿Qué deseas saber sobre esta asignatúra?<br>", 1);
                        let cod = data.Reply.split("-");
                        this.codigo = cod[1];
                    } else {
                        this.responder(data.Reply, 0);
                    }
                });
        }
    }

    responderErrorLargo(message) {
        this.mensajes.push({ id: "boot", botones: false, msj: message, tono: "claro", hora: this.getDateTimeMesssage() });
        setTimeout(() => {
            var chatHistory = document.getElementById("chat");
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }, 50);
    }

    responderErrorVacio(message) {
        this.mensajes.push({ id: "boot", botones: false, msj: message, tono: "claro", hora: this.getDateTimeMesssage() });
        setTimeout(() => {
            var chatHistory = document.getElementById("chat");
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }, 50);
    }

    responder(respuesta, boton) {
        this.mensajes.pop();
        this.mensajes.push({ id: "boot", botones: boton, msj: respuesta, tono: "claro", hora: this.getDateTimeMesssage() });
        setTimeout(() => {
            var chatHistory = document.getElementById("chat");
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }, 50);

    }


    getDateTimeMesssage() {
        let currentDateTime = new Date();


        let day = currentDateTime.getDate();
        let month = currentDateTime.getMonth() + 1;
        let year = currentDateTime.getFullYear();

        let stringDay;
        if (day < 10)
            stringDay = "0" + day;
        else stringDay = day;

        let stringMonth;
        if (month < 10) stringMonth = "0" + month;
        else stringMonth = month;

        let hours = currentDateTime.getHours();
        let minutes = currentDateTime.getMinutes();
        let stringHours;
        if (hours < 10) stringHours = "0" + hours;
        else stringHours = hours;

        let stringMinutes;
        if (minutes < 10) stringMinutes = "0" + minutes;
        else stringMinutes = minutes;

        return stringHours + ":" + stringMinutes + " " + stringDay + "/" + stringMonth + "/" + year;
    }
}
