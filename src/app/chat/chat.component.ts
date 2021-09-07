import { Component, OnInit } from '@angular/core';
import { ChatService } from '../Services/chat.service';
import { AuthService } from '../Services/auth.service';
import { DomSanitizer } from '@angular/platform-browser'
import { variablesGlobales } from '../Services/variablesGlobales';

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
    codigo = "";

    constructor(
        private messageService: ChatService,
        private authService: AuthService,
        private sanitized: DomSanitizer
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

    getInitMessage() {
        let message = "¡Hola! Soy el asistente virtual del Tip.";
        message += "<br>-Puedes realizarme consultas sobre la carrera del Tecnnólogo en Informática.";
        message += "<br>-Algunas preguntas requieren que estes registrado, me encargare de que lo sepas!";
        message += "<br>-Consultame sobre las materias y te dare opciones.";
        message += "<br>¡Estoy para ayudarte!";
        this.mensajes.push({ id: "boot", botones: false, msj: message, tono: "claro", hora: this.getDateTimeMesssage() });
        setTimeout(() => {
            var chatHistory = document.getElementById("chat");
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }, 500);
    }

    horarios() {
        this.mensajes[this.mensajes.length - 1].botones = false;
        this.mensajes[this.mensajes.length - 1].msj = "Escribiendo...";
        this.messageService.horarios(this.codigo).subscribe(data => {
            let dateTime = this.getDateTimeMesssage();
            let arrayDateTime = dateTime.split(" ");
            this.messageService.insertNewHistory("Horarios " + variablesGlobales.getSubjectByCode(this.codigo), data.Reply, arrayDateTime[1], arrayDateTime[0], this.codigo).subscribe(response => {
                this.responder(data.Reply, false);
            });
        });
    }

    profesor() {
        this.mensajes[this.mensajes.length - 1].botones = false;
        this.mensajes[this.mensajes.length - 1].msj = "Escribiendo...";
        this.messageService.profesor(this.codigo).subscribe(data => {
            let dateTime = this.getDateTimeMesssage();
            let arrayDateTime = dateTime.split(" ");
            this.messageService.insertNewHistory("Profesor " + variablesGlobales.getSubjectByCode(this.codigo), data.Reply, arrayDateTime[1], arrayDateTime[0], this.codigo).subscribe(response => {
                this.responder(data.Reply, false);
            });
        });
    }

    evaluaciones() {
        this.mensajes[this.mensajes.length - 1].botones = false;
        this.mensajes[this.mensajes.length - 1].msj = "Escribiendo...";
        this.messageService.evaluaciones(this.codigo).subscribe(data => {
            let dateTime = this.getDateTimeMesssage();
            let arrayDateTime = dateTime.split(" ");
            this.messageService.insertNewHistory("Evaluaciones " + variablesGlobales.getSubjectByCode(this.codigo), data.Reply, arrayDateTime[1], arrayDateTime[0], this.codigo).subscribe(response => {
                this.responder(data.Reply, false);
            });
        });
    }

    cursada() {
        this.mensajes[this.mensajes.length - 1].botones = false;
        this.mensajes[this.mensajes.length - 1].msj = "Escribiendo...";
        this.messageService.cursada(this.codigo).subscribe(data => {
            let dateTime = this.getDateTimeMesssage();
            let arrayDateTime = dateTime.split(" ");
            this.messageService.insertNewHistory("Cursé " + variablesGlobales.getSubjectByCode(this.codigo), data.Reply, arrayDateTime[1], arrayDateTime[0], this.codigo).subscribe(response => {
                this.responder(data.Reply, false);
            });
        });
    }

    creditos() {
        this.mensajes[this.mensajes.length - 1].botones = false;
        this.mensajes[this.mensajes.length - 1].msj = "Escribiendo...";
        this.messageService.creditos(this.codigo).subscribe(data => {
            let dateTime = this.getDateTimeMesssage();
            let arrayDateTime = dateTime.split(" ");
            this.messageService.insertNewHistory("Creditos " + variablesGlobales.getSubjectByCode(this.codigo), data.Reply, arrayDateTime[1], arrayDateTime[0], this.codigo).subscribe(response => {
                this.responder(data.Reply, false);
            });
        });
    }

    limite() {
        this.mensajes[this.mensajes.length - 1].botones = false;
        this.mensajes[this.mensajes.length - 1].msj = "Escribiendo...";
        this.messageService.limite(this.codigo).subscribe(data => {
            let dateTime = this.getDateTimeMesssage();
            let arrayDateTime = dateTime.split(" ");
            this.messageService.insertNewHistory("Limite de inscripción " + variablesGlobales.getSubjectByCode(this.codigo), data.Reply, arrayDateTime[1], arrayDateTime[0], this.codigo).subscribe(response => {
                this.responder(data.Reply, false);
            });
        });
    }

    enviarMensaje() {

        if (!this.contenidoMensaje || this.contenidoMensaje == "") {
            let errorMessage = "Escribe una consulta por favor";
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
                .subscribe(data => { //aca tengo que ahcer que guarde el mensaje
                    if (data.Reply == "") {
                        this.messageService.webhook().subscribe(data => {
                            this.responder(data.Reply, false);
                        });
                    } else if (data.Reply.includes("asignatura-")) {
                        this.responder("¿Qué deseas saber sobre esta asignatúra?<br>", true);
                        let cod = data.Reply.split("-");
                        this.codigo = cod[1];
                    } else {
                        this.responder(data.Reply, false);
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
