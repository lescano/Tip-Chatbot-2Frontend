import { Component, OnInit } from '@angular/core';
import { ChatService } from '../Services/chat.service';
import { AsignaturaService } from '../Services/asignatura.service';
import { UsuarioService } from '../Services/usuario.service';
import { AuthService } from '../Services/auth.service';
import { DomSanitizer } from '@angular/platform-browser'
import { variablesGlobales } from '../Services/variablesGlobales';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeriadoService } from '../Services/feriado.service';
import * as moment from 'moment';

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
    arrayMaterials: Array<any> = [];

    constructor(
        private messageService: ChatService,
        private asignaturaService: AsignaturaService,
        private usuarioService: UsuarioService,
        private authService: AuthService,
        private feriadosService: FeriadoService,
        private sanitized: DomSanitizer,
        private modal: NgbModal
    ) { }

    ngOnInit(): void {
        if (this.authService.getActualUser()) {
            this.messageService.loadPreviousChat().subscribe(data => {
                data.listHistory.forEach(itemHistoy => {
                    this.mensajes.push({ id: "tu", msj: itemHistoy.pregunta, tono: "obscuro", hora: itemHistoy.hora + " " + itemHistoy.fecha });
                    this.mensajes.push({ id: "boot", botones: false, msj: itemHistoy.respuesta, tono: "claro", hora: itemHistoy.hora + " " + itemHistoy.fecha });
                });
                this.getInitMessage();
            });
        } else {
            this.getInitMessage();
        }
    }

    openModal(contenido) {
        this.modal.open(contenido);
    }

    getInitMessage() {
        let message = "¡Hola! Soy el asistente virtual del TIP.";
        message += "<br>📍 Puedes realizarme consultas sobre la carrera del Tecnólogo en Informática.";
        message += "<br>📍 Algunas preguntas requieren que estés registrado, me encargaré de que lo sepas!";
        message += "<br>📍 Consultame sobre las materias y te daré opciones.";
        message += "<br>¡Estoy para ayudarte! 😄";
        this.mensajes.push({ id: "boot", botones: false, msj: message, tono: "claro", hora: this.getDateTimeMesssage() });
        setTimeout(() => {
            var chatHistory = document.getElementById("chat");
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }, 500);
    }

    getDetailSubjectMaterial(idMaterial) {
        this.asignaturaService.getDetailSubjectMaterial(idMaterial).subscribe(data => {
            if (data.result) {
                this.arrayMaterials.splice(0, this.arrayMaterials.length);
                this.arrayMaterials.push({ idMaterial: data.result._id, url: data.result.url, title: data.result.titulo, codigo: data.result.asignatura.codigo });
                let message = data.result.titulo;
                message += "<br><br>" + data.result.descripcion;
                this.mensajes.pop();
                this.mensajes.push({ id: "boot", botones: false, materiales: true, msj: message, tono: "claro", hora: this.getDateTimeMesssage() });
            }
        });

    }

    showMaterial() {
        this.asignaturaService.getSubjectMaterials(this.codigo).subscribe(data => {
            if (data.result.length > 0) {
                this.arrayMaterials.splice(0, this.arrayMaterials.length);
                data.result.forEach(element => {
                    this.arrayMaterials.push({ idMaterial: element._id, url: element.url, title: element.titulo, codigo: data.idSubject });
                });
                this.mensajes.pop();
                this.mensajes.push({ id: "boot", botones: false, materiales: true, showDetail: true, msj: "Los materiales disponibles para esta materia son:", tono: "claro", hora: this.getDateTimeMesssage() });
            } else {
                this.mensajes.pop();
                this.mensajes.push({ id: "boot", botones: false, msj: "Esta materia aun no cuenta con materiales.", tono: "claro", hora: this.getDateTimeMesssage() });
            }
        });
    }

    insertHistoryAccessMaterial(idMaterial, codigo) {
        let dateTime = this.getDateTimeMesssage();
        let arrayDateTime = dateTime.split(" ");
        this.asignaturaService.newHistorySubjectMaterial(idMaterial, codigo, arrayDateTime[1], arrayDateTime[0]).subscribe(data => {
        });
    }

    horarios() {
        this.mensajes[this.mensajes.length - 1].botones = false;
        this.mensajes[this.mensajes.length - 1].msj = "Escribiendo...";
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

    cursada() {
        if (this.authService.getActualUser()) {
            this.mensajes.push({ id: "tu", msj: "¿Puedo cursar " + variablesGlobales.getSubjectByCode(this.codigo) + "?", tono: "obscuro", hora: this.getDateTimeMesssage() });
            this.mensajes.push({ id: "temporal", msj: "Escribiendo...", tono: "claro", hora: "" });

            this.mensajes[this.mensajes.length - 1].botones = false;
            this.mensajes[this.mensajes.length - 1].msj = "Escribiendo...";
            this.messageService.cursada(this.codigo).subscribe(data => {
                let dateTime = this.getDateTimeMesssage();
                let arrayDateTime = dateTime.split(" ");
                this.messageService.insertNewHistory("¿Puedo cursar " + variablesGlobales.getSubjectByCode(this.codigo) + "?", data.Reply, arrayDateTime[1], arrayDateTime[0], this.codigo).subscribe(response => {
                    this.usuarioService.getAsignaturasPendientes(this.authService.getActualUser(), this.codigo).subscribe(response => {
                        if (Array.isArray(response.Reply)) {
                            let messageDetail = data.Reply + "</br>";
                            response.Reply.forEach(element => {
                                messageDetail += element + "</br>";
                            });

                            this.responder(messageDetail, 0);
                            this.mensajes.push({ id: "temporal", msj: "Escribiendo...", tono: "claro", hora: "" });
                            this.responder("¿Deseas saber algo más?<br>", 1);
                        } else {

                        }
                    })
                });
            });
        } else {
            this.responder("Para consultar si estas habilitado para cursar una asignatura debes iniciar sesión.", 0);
            this.mensajes.push({ id: "temporal", msj: "Escribiendo...", tono: "claro", hora: "" });
            this.responder("¿Deseas saber algo más?<br>", 1);
        }
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

    getFeriados() {
        this.feriadosService.listar().subscribe(response => {
            if (Array.isArray(response.data)) {
                let stringFeriados = "Los feriados son: <br>";
                response.data.forEach(element => {
                    stringFeriados += "📍 " + moment(element.fecha).utc().format('DD/MM/YYYY') + " " + element.motivo + "<br>";
                });
                this.responder(stringFeriados, 0);
                if (this.authService.getActualUser()) {
                    let dateTime = this.getDateTimeMesssage();
                    let arrayDateTime = dateTime.split(" ");
                    this.messageService.insertNewHistory("feriados", stringFeriados, arrayDateTime[1], arrayDateTime[0], this.codigo).subscribe(response => {

                    });
                }
            }
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
                    if (data.Reply.localeCompare("error") == 0) {
                        let errorMessage = "No tengo una respuesta para esta pregunta 😞";
                        this.responder(errorMessage, 0);
                    } else if (data.Reply.includes("asignatura-")) {
                        this.responder("¿Qué deseas saber sobre esta asignatura?<br>", 1);
                        let cod = data.Reply.split("-");
                        this.codigo = cod[1];
                    } else if (data.Reply.localeCompare("getFeriados") == 0) {
                        this.getFeriados();
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
