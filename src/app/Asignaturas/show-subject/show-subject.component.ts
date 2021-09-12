import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsignaturaService } from '../../Services/asignatura.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { variablesGlobales } from 'src/app/Services/variablesGlobales';

@Component({
    selector: 'app-show-subject',
    templateUrl: './show-subject.component.html',
    styleUrls: ['./show-subject.component.css']
})
export class ShowSubjectComponent implements OnInit {
    subjectSelected: any;
    fechaInscripcion: String;

    arrayMaterials: Array<any> = [];
    arraySchedules: Array<any> = [];
    arrayPrevious: Array<any> = [];
    arrayEvaluations: Array<any> = [];

    newMaterial = new FormGroup({
        titleMaterial: new FormControl('', Validators.required),
        urlMaterial: new FormControl('', Validators.required),
        descriptionMaterial: new FormControl('', Validators.required)
    });

    constructor(
        private asignaturaService: AsignaturaService,
        private router: Router,
        private toastr: ToastrService
    ) {
        const navigation = this.router.getCurrentNavigation();
        if (navigation.extras.state) {
            this.subjectSelected = navigation.extras.state.asignatura;
            this.fechaInscripcion = this.getFechaWithFormat(this.subjectSelected.fechaInscripcion);
            this.getSubjectDetail(this.subjectSelected._id);
        } else this.router.navigateByUrl('/asignaturasAdmin', {});

    }

    ngOnInit(): void {

    }

    createSubjectMaterial() {
        this.asignaturaService.newSubjectMaterial(
            this.subjectSelected._id,
            this.newMaterial.value.titleMaterial,
            this.newMaterial.value.urlMaterial,
            this.newMaterial.value.descriptionMaterial
        ).subscribe(data => {
            this.toastr.success(data.result);
            if (data.result)
                this.arrayMaterials.push({ titulo: this.newMaterial.value.titleMaterial, descripcion: this.newMaterial.value.descriptionMaterial, url: this.newMaterial.value.url });
        });
    }

    getFechaWithFormat(dateValue) {
        let date = new Date(dateValue);
        let day = (date.getDate() + 1).toString();
        if (parseInt(day) < 10)
            day = "0" + day;

        return day + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    }

    getSubjectDetail(idSubjectSelected) {
        this.asignaturaService.getSubjectDetail(idSubjectSelected).subscribe(data => {
            if (data.result) {
                this.loadTableMaterials(data.result.materiales);
                this.loadTablePrevious(data.result.previas);
                this.loadTableEvaluations(data.result.evaluaciones);
                this.loadTableSchedules(data.result.horarios);
            } else this.router.navigateByUrl('/asignaturasAdmin');
        });
    }

    loadTableSchedules(listSchedules) {
        listSchedules.forEach(element => {
            this.arraySchedules.push({
                day: element.dia,
                initSchedule: element.horaDesde,
                finishSchedule: element.horaHasta,
                nameSemester: variablesGlobales.getSemesterName(element.semestre),
                objectSchedule: element,
                id: element._id
            });
        });
    }

    loadTablePrevious(listPrevious) {
        listPrevious.forEach(element => {
            this.arrayPrevious.push({ nameSubject: element.asignatura.nombre, teacher: element.asignatura.nombreDoc, credits: element.asignatura.creditos, approvalType: element.tipo, approvalPrevious: element.asignatura.apruebaPor });
        });
    }

    loadTableMaterials(listMaterials) {
        listMaterials.forEach(element => {
            this.arrayMaterials.push({ titulo: element.titulo, descripcion: element.descripcion, url: element.url });
        });
    }

    loadTableEvaluations(listEvaluations) {
        listEvaluations.forEach(element => {
            this.arrayEvaluations.push({ date: this.getFechaWithFormat(element.fecha), typeEvaluation: element.tipo, nameEvaluation: element.nombre, objectEvaluation: element });
        });
    }

    eliminarHorario(id, i) {
        this.asignaturaService.borrarHorario(id).subscribe(data => {
            this.toastr.success(data.data);
            if (data.data == "Horario eliminado con exito") {
                if (i !== -1) {
                    this.arraySchedules.splice(i, 1);
                }
            }
        })
    }
    editarHorario(horario) {
        this.router.navigateByUrl('/verHorario', { state: { horario: horario } });
    }

    goToCreateMaterial() {
        this.router.navigateByUrl('/material-asignatura', { state: { asignatura: this.subjectSelected } });
    }

    editarSelect() {
        this.router.navigateByUrl('/verAsignatura', { state: { asignatura: this.subjectSelected } });
    }

    newSchedules() {
        this.router.navigateByUrl('/nuevoHorario', { state: { asignatura: this.subjectSelected } });
    }

    borrarSelect() {
        if (confirm("Estas seguro que desea eliminar esta asignatúra? esta accion es permantente")) {
            this.asignaturaService.borrarAsignatura(this.subjectSelected._id).subscribe(data => {
                this.toastr.success(data.data);
                this.getAsignaturas();
            })
        }
    }

    getAsignaturas() {
        throw new Error('Method not implemented.');
    }

    editarEvaluaciones() {
        this.router.navigateByUrl('/nuevaEvaluacion', { state: { asignatura: this.subjectSelected } });
    }

    eliminarEvaluacion(ev, i) {
        this.asignaturaService.borrarEvaluacion(ev.id, ev.tipo).subscribe(data => {
            this.toastr.success(data.data);
            if (data.data == "Evaluacion eliminada con exito") {
                if (i !== -1) {
                    this.arrayEvaluations.splice(i, 1);
                }
            }
        })
    }

}
