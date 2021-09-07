import { Component, OnInit } from '@angular/core';
import { EstadisticasService } from '../Services/estadisticas.service';
import { AsignaturaService } from '../Services/asignatura.service';
import { variablesGlobales } from '../Services/variablesGlobales';

@Component({
    selector: 'app-statics-asignaturas',
    templateUrl: './statics-asignaturas.component.html',
    styleUrls: ['./statics-asignaturas.component.css']
})
export class StaticsAsignaturasComponent implements OnInit {

    rowArrayConsultBySubject: Array<any> = [];
    arraySubjects: Array<any> = [];
    arrayConsultBySubjects: Array<any> = [];
    constructor(
        private staticsService: EstadisticasService,
        private subjectService: AsignaturaService
    ) { }

    ngOnInit(): void {

        this.staticsService.getCountSubjectConsult().subscribe(data => {
            data.listResult.forEach(element => {
                if (element._id) {
                    this.rowArrayConsultBySubject.push({ materia: variablesGlobales.getSubjectByCode(element._id), cantPreguntas: element.cantidad });
                }
            });
        });

        this.subjectService.getAsignaturas().subscribe(data => {
            data.data.forEach(element => {
                this.arraySubjects.push({ codigo: element.codigo, nombre: element.nombre });
            });
        })
    }

    filterQuestionsBySubject(value) {
        this.staticsService.getConsultsBySubject(value).subscribe(data => {
            this.arrayConsultBySubjects.splice(0, this.arrayConsultBySubjects.length);
            data.listResult.forEach(element => {
                this.arrayConsultBySubjects.push({ pregunta: element._id, ocurrencias: element.cantidad });
            });
        });
    }
}
