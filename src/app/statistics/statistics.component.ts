import { Component, OnInit } from '@angular/core';
import { EstadisticasService } from '../Services/estadisticas.service';
import { AsignaturaService } from '../Services/asignatura.service';
import { AuthService } from '../Services/auth.service';
import { variablesGlobales } from '../Services/variablesGlobales';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
    rowArrayConsults: Array<any> = [];
    rowArrayUsers: Array<any> = [];

    formGroupInterval = new FormGroup({
        dateInit: new FormControl('',
            Validators.required
        ),
        dateFinish: new FormControl('',
            Validators.required
        )
    });

    textToSearchUser: String;
    startDate: String;
    endDate: String;

    constructor(
        private router: Router,
        private asignaturaService: AsignaturaService,
        private staticsService: EstadisticasService,
        private authService: AuthService,
    ) {
        if (!variablesGlobales.getAdminValue())
            this.router.navigateByUrl('/inicio', {});
    }

    ngOnInit(): void {
        this.startDate;

        this.startDate = this.getDateFilter(8);
        this.endDate = this.getDateFilter(null);
        this.staticsService.getCountQuestionByDate(this.getDateNoFormat(this.startDate), this.getDateNoFormat(this.endDate)).subscribe(data => {
            this.rowArrayConsults.splice(1);
            this.rowArrayConsults.push({ period: "Inicio: " + this.startDate + " Fin: " + this.endDate, value: data.countQuestions });
        })

        this.staticsService.getCountQuestionsByUser("", this.getDateNoFormat(this.startDate), this.getDateNoFormat(this.endDate)).subscribe(data => {
            data.listResult.forEach(element => {
                this.rowArrayUsers.push({ ci: element.cedula, nombre: element.nombre + " " + element.apellido, cantQuerys: element.historialChat.length });
            });
        })
    }

    filterUserTable(value) {
        this.staticsService.getCountQuestionsByUser(value, this.getDateNoFormat(this.startDate), this.getDateNoFormat(this.endDate)).subscribe(data => {
            this.rowArrayUsers.splice(0, this.rowArrayUsers.length);
            data.listResult.forEach(element => {
                this.rowArrayUsers.push({ ci: element.cedula, nombre: element.nombre, cantQuerys: element.cantQuerys });
            });
        })
    }


    filterDateCountQuestions() {
        if (this.startDate && this.endDate) {
            let newStartDate = this.getDateNoFormat(this.startDate);
            let newEndDate = this.getDateNoFormat(this.endDate);
            this.staticsService.getCountQuestionByDate(newStartDate, newEndDate).subscribe(data => {
                this.rowArrayConsults.splice(0);
                this.rowArrayConsults.push({ period: "Inicio: " + this.startDate + " Fin: " + this.endDate, value: data.countQuestions });
            })

            this.filterUserTable("");
        }
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
