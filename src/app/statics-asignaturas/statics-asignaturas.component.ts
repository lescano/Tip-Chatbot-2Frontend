import { Component, OnInit } from '@angular/core';
import { EstadisticasService } from '../Services/estadisticas.service';
import { AsignaturaService } from '../Services/asignatura.service';
import { variablesGlobales } from '../Services/variablesGlobales';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { element } from 'protractor';
import { Router } from '@angular/router';

@Component({
    selector: 'app-statics-asignaturas',
    templateUrl: './statics-asignaturas.component.html',
    styleUrls: ['./statics-asignaturas.component.css']
})
export class StaticsAsignaturasComponent implements OnInit {

    rowArrayConsultBySubject: Array<any> = [];
    arraySubjects: Array<any> = [];
    arrayConsultBySubjects: Array<any> = [];
    arrayConsultMaterials: Array<any> = [];
    formGroupInterval = new FormGroup({
        dateInit: new FormControl('',
            Validators.required
        ),
        dateFinish: new FormControl('',
            Validators.required
        )
    });
    startDate: String;
    endDate: String;

    constructor(
        private router: Router,
        private staticsService: EstadisticasService,
        private subjectService: AsignaturaService
    ) {
        if (!variablesGlobales.getAdminValue())
            this.router.navigateByUrl('/inicio', {});
        this.startDate = this.getDateFilter(8);
        this.endDate = this.getDateFilter(null);
    }

    ngOnInit(): void {
        this.getCountSubjectConsult();
    }

    getCountSubjectConsult() {
        this.staticsService.getCountSubjectConsult(this.getDateNoFormat(this.startDate), this.getDateNoFormat(this.endDate)).subscribe(data => {
            this.rowArrayConsultBySubject.splice(0, this.rowArrayConsultBySubject.length);
            data.listResult.forEach(element => {
                if (element._id) {
                    this.rowArrayConsultBySubject.push({ idSubject: element._id, materia: variablesGlobales.getSubjectByCode(element._id), cantPreguntas: element.cantidad });
                }
            });
        });
    }

    filterResultByInterval() {
        this.getCountSubjectConsult();
    }

    getHistoryMaterials(idSubject) {
        this.staticsService.getHistoryMaterials(idSubject, this.getDateNoFormat(this.startDate), this.getDateNoFormat(this.endDate)).subscribe(data => {
            if (data.listResult) {
                data.listResult.forEach(element => {
                    this.arrayConsultMaterials.push({ title: element.title, count: element.cantidad });
                });
            }
        })
    }

    filterQuestionsBySubject(value) {
        this.staticsService.getConsultsBySubject(value, this.getDateNoFormat(this.startDate), this.getDateNoFormat(this.endDate)).subscribe(data => {
            this.arrayConsultBySubjects.splice(0, this.arrayConsultBySubjects.length);
            data.listResult.forEach(element => {
                this.arrayConsultBySubjects.push({ pregunta: element._id.pregunta, ocurrencias: element.cantidad });
            });
        });

        this.getHistoryMaterials(value);
    }

    getDateFilter(cantDates) {
        let currentDateTime = new Date();

        if (cantDates)
            currentDateTime.setDate(currentDateTime.getDate() - cantDates);

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

        return year + "-" + stringMonth + "-" + stringDay;
    }

    getDateNoFormat(dateWithFormat) {
        let arrayDate = dateWithFormat.split("-");
        return arrayDate[0] + arrayDate[1] + arrayDate[2];
    }
}
