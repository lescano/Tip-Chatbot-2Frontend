import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PreguntaService } from '../../Services/pregunta.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-pregunta',
    templateUrl: './pregunta.component.html',
    styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit, OnDestroy {
    listado = [];
    dtOptions: DataTables.Settings = {};
    dtTrigger = new Subject();
    newQuestion: String;
    idQuestion: String;
    preguntaId: number;
    preguntaNombre: String;
    preguntaRespuesta: String;

    profileForm = new FormGroup({
        nombre: new FormControl('', [
            Validators.required,
        ]),
        respuesta: new FormControl('', [
            Validators.required,
        ])
    });
    secondForm = new FormGroup({
        pregunta: new FormControl('', [
        ])
    });

    formasPregunta = new Array();
    emojis: any[] = [{ em: "👆" }, { em: "👇" }, { em: "👈" }, { em: "👉" }, { em: "👋" }, { em: "👋" }, { em: "👌" }, { em: "👍" },
    { em: "👎" }, { em: "🙌" }, { em: "👏" }, { em: "👐" }, { em: "💪" }, { em: "😅" }, { em: "😂" }, { em: "😉" }, { em: "😊" }, { em: "😕" }, { em: "😔" },
    { em: "😦" }, { em: "😬" }, { em: "🤓" }, { em: "🤨" }, { em: "🤫" }, { em: "🤗" }, { em: "🌝" }, { em: "🎉" }, { em: "👀" }, { em: "👨‍🎓" },
    { em: "☕" }, { em: "💡" }, { em: "📆" }, { em: "📍" }, { em: "📞" }, { em: "📧" }, { em: "📱" }, { em: "🔑" }, { em: "🔒" }, { em: "🔔" }, { em: "🎖️" }];

    constructor(private preguntaService: PreguntaService,
        private toastr: ToastrService,
        private fb: FormBuilder,
        private _location: Location,
        private router: Router,
        private modal: NgbModal) {

        const navigation = this.router.getCurrentNavigation();
        this.formasPregunta = new Array();

        if (navigation.extras.state) {
            this.newQuestion = navigation.extras.state.newQuestion;
            this.idQuestion = navigation.extras.state.idQuestion;
        }
    }

    //FUNCIONALIDAD QUE ESTOY HACIENDO
    abrirModal(id, nombre, respuesta): void {
        this.preguntaId = id;
        this.profileForm.get('nombre').setValue(nombre);
        this.profileForm.get('respuesta').setValue(respuesta);
    }

    agregarForma(): void {
        this.formasPregunta.push(this.secondForm.value.pregunta);

        this.secondForm.get('pregunta').setValue("");

        //  console.log(this.formasPregunta);
    }
    quitar(): void {
        this.formasPregunta.pop();
    }

    addEmoji(i): void {
        this.profileForm.value.respuesta += this.emojis[i].em;
        this.profileForm.get('respuesta').setValue(this.profileForm.value.respuesta);
    }

    addPregunta(): void {
        if (this.formasPregunta.length == 0) {
            this.toastr.error("No has agregado ninguna forma de preguntar");
        } else {
            this.preguntaService.nuevaPregunta(
                this.profileForm.value.nombre,
                this.formasPregunta,
                this.profileForm.value.respuesta
            ).subscribe(data => {
                if (this.idQuestion) {
                    this.preguntaService.deleteUnansweredQuestion(this.idQuestion).subscribe(responseDelete => {
                        if (responseDelete.errorResult)
                            this.toastr.error(responseDelete);
                        else if (responseDelete.result)
                            this.toastr.success(responseDelete.result);
                    })
                } else {
                    window.location.reload();
                }
            });
        }
    }

    //TEMINA FUNCIONALIDAD QUE ESTOY HACIENDO
    ngOnInit(): void {
        this.listar();
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 9,
            retrieve: true,
            language: {
                url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
            }
        };
    }

    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
    }

    listar(): void {
        this.preguntaService.listar().subscribe(data => {
            data.Reply[0].forEach(element => {
                let identificador = element.name.split("/");
                this.listado.push({ id: identificador[4], nombre: element.displayName, respuesta: element.messages[0].text.text });
                this.dtTrigger.next();
            });
        });
    }

    borrarPregunta(id): void {

        if (confirm("Estas seguro que desea eliminar la pregunta? Esta acción es permantente")) {
            this.preguntaService.borrar(id).subscribe(data => {
                this.toastr.success("Pregunta eliminada con éxito");
                this.listado = [];
                this.listar();
            })
        }

    }

    editarPregunta(): void {
        if (confirm("Estas seguro que desea editar la pregunta? Esta acción es permantente y eliminará las formas de preguntar agregadas previamente a la pregunta")) {
            this.preguntaService.borrar(this.preguntaId).subscribe(data => {
                this.listado = [];
                this.listar();
            })
            this.addPregunta();
        }
    }
}
