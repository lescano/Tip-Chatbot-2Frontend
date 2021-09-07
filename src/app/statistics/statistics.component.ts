import { Component, OnInit } from '@angular/core';
import { EstadisticasService } from '../Services/estadisticas.service';
import { AsignaturaService } from '../Services/asignatura.service';
import { AuthService } from '../Services/auth.service';
import { variablesGlobales } from '../Services/variablesGlobales';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
    rowArrayConsults: Array<any> = [];
    rowArrayUsers: Array<any> = [];

    textToSearchUser: String;
    startDate: Date;
    endDate: Date;

    constructor(
        private asignaturaService: AsignaturaService,
        private staticsService: EstadisticasService,
        private authService: AuthService,
    ) {
    }

    ngOnInit(): void {
        this.startDate;

        let startDate = this.getDateFilter(8);
        let endDate = this.getDateFilter(null);
        this.staticsService.getCountQuestionByDate(this.getDateNoFormat(startDate), this.getDateNoFormat(endDate)).subscribe(data => {
            this.rowArrayConsults.splice(1);
            this.rowArrayConsults.push({ period: "Inicio: " + startDate + " Fin: " + endDate, value: data.countQuestions });
        })

        this.staticsService.getCountQuestionsByUser("").subscribe(data => {
            data.listResult.forEach(element => {
                this.rowArrayUsers.push({ ci: element.ci, nombre: element.nombre, cantQuerys: element.cantQuerys });
            });
        })
    }

    filterUserTable(value) {
        this.staticsService.getCountQuestionsByUser(value).subscribe(data => {
            console.log(value);
            console.log(data)
            this.rowArrayUsers.splice(0, this.rowArrayUsers.length);
            data.listResult.forEach(element => {
                this.rowArrayUsers.push({ ci: element.ci, nombre: element.nombre, cantQuerys: element.cantQuerys });
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
        } else {
            console.log("mensaje error");
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
