import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { PreguntaService } from 'src/app/Services/pregunta.service';

@Component({
    selector: 'app-unanswered-question',
    templateUrl: './unanswered-question.component.html',
    styleUrls: ['./unanswered-question.component.css']
})
export class UnansweredQuestionComponent implements OnInit {

    dtOptions: DataTables.Settings = {};
    dtTrigger = new Subject();
    arrayQuestions: Array<any> = [];

    constructor(private preguntaService: PreguntaService, private router: Router, private toastr: ToastrService) { }

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

    listar(): void {
        this.preguntaService.listarPendientes().subscribe(data => {
            if (data.result) {
                data.result.forEach(element => {
                    this.arrayQuestions.push({ question: element.pregunta, idQuestion: element._id });
                    this.dtTrigger.next();
                });
            }
        });
    }

    sendToResolveQuestion(question, idQuestion) {
        this.router.navigateByUrl('/nuevaPregunta', { state: { newQuestion: question, idQuestion: idQuestion } });
    }

    deleteQuestion(idQuestion) {
        this.preguntaService.deleteUnansweredQuestion(idQuestion).subscribe(responseDelete => {
            if (responseDelete.errorResult)
                this.toastr.error(responseDelete.errorResult);
            else {
                this.toastr.success(responseDelete.result);
                this.arrayQuestions = [];
                this.listar();
            }
        })
    }
}
