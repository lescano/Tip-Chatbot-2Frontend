import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PreguntaService } from '../../Services/pregunta.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { variablesGlobales } from 'src/app/Services/variablesGlobales';

@Component({
    selector: 'app-nuevapregunta',
    templateUrl: './nuevapregunta.component.html',
    styleUrls: ['./nuevapregunta.component.css']
})
export class NuevapreguntaComponent implements OnInit {
    newQuestion: String;
    idQuestion: String;

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
        private fb: FormBuilder,
        private _location: Location,
        private router: Router,
        private toastr: ToastrService) {
        if (!variablesGlobales.getAdminValue())
            this.router.navigateByUrl('/inicio', {});

        const navigation = this.router.getCurrentNavigation();
        this.formasPregunta = new Array();

        if (navigation.extras.state) {
            this.newQuestion = navigation.extras.state.newQuestion;
            this.idQuestion = navigation.extras.state.idQuestion;
        }

    }

    ngOnInit(): void {
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
                        this.router.navigateByUrl('/preguntas');
                    })
                } else {
                    this.toastr.success("Nueva pregunta registrada con éxito");
                    this.router.navigateByUrl('/preguntas');
                }

            });
        }



    }
}
