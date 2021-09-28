import { Component, OnInit, ViewChild } from '@angular/core';
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
    @ViewChild('closebutton') closebutton;
    @ViewChild('closebuttonMaterial') closebuttonMaterial;
    subjectSelected: any;
    fechaInscripcion: String;

    arrayMaterials: Array<any> = [];
    arraySchedules: Array<any> = [];
    arrayPrevious: Array<any> = [];
    arrayEvaluations: Array<any> = [];
    arrayListSubject: Array<any> = [];

    newMaterial = new FormGroup({
        titleMaterial: new FormControl('', Validators.required),
        urlMaterial: new FormControl('', Validators.required),
        descriptionMaterial: new FormControl('', Validators.required)
    });

    controlNewPrevia = new FormGroup({
        subjectPrevia: new FormControl('', Validators.required),
        typeAprov: new FormControl('', Validators.required)
    });

    constructor(
        private asignaturaService: AsignaturaService,
        private router: Router,
        private toastr: ToastrService
    ) {
        if (!variablesGlobales.getAdminValue())
            this.router.navigateByUrl('/inicio', {});
        const navigation = this.router.getCurrentNavigation();
        if (navigation.extras.state) {
            this.subjectSelected = navigation.extras.state.asignatura;
            this.fechaInscripcion = this.getFechaWithFormat(this.subjectSelected.fechaInscripcion);
            this.getSubjectDetail(this.subjectSelected._id);
        } else this.router.navigateByUrl('/asignaturasAdmin', {});
    }

    ngOnInit(): void {
        this.getSubjectsNoPrevious();
    }

    getSubjectsNoPrevious() {
        this.asignaturaService.getAsignaturasNoVinculadas(this.subjectSelected._id).subscribe(data => {
            if (data.errorResult)
                this.toastr.error(data.errorResult);
            else {
                this.arrayListSubject.splice(0, this.arrayListSubject.length);
                data.listResult.forEach(element => {
                    this.arrayListSubject.push({ idSubject: element._id, nameSubject: element.nombre });
                });
            }
        });
    }

    deletePrevious(idSubjectPrevious, index) {
        this.asignaturaService.deletePrevious(this.subjectSelected._id, idSubjectPrevious).subscribe(response => {
            this.arrayPrevious.splice(index, 1);
            this.getSubjectsNoPrevious();
        });
    }

    addNewPrevia() {
        this.asignaturaService.nuevaPrevia(this.subjectSelected._id, this.controlNewPrevia.value.subjectPrevia, this.controlNewPrevia.value.typeAprov).subscribe(response => {
            if (response.errorResult)
                this.toastr.error(response.errorResult);
            else {
                this.arrayPrevious.push({ idPrevious: response.newPrevia.idPrevious, nameSubject: response.newPrevia.materia, teacher: response.newPrevia.docente, credits: response.newPrevia.creditos, approvalType: response.newPrevia.condicion, approvalPrevious: response.newPrevia.aprobacion });
                this.toastr.success(response.result);
                this.getSubjectsNoPrevious();
            }
            this.closebutton.nativeElement.click();
        });
    }

    createSubjectMaterial() {
        this.asignaturaService.newSubjectMaterial(
            this.subjectSelected._id,
            this.newMaterial.value.titleMaterial,
            this.newMaterial.value.urlMaterial,
            this.newMaterial.value.descriptionMaterial
        ).subscribe(data => {
            if (data.errorResult)
                this.toastr.error(data.errorResult);
            else {
                this.toastr.success(data.result);
                if (data.result)
                    this.arrayMaterials.push({ titulo: this.newMaterial.value.titleMaterial, descripcion: this.newMaterial.value.descriptionMaterial, url: this.newMaterial.value.url });
                this.closebuttonMaterial.nativeElement.click();
            }
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
            console.log(data)
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
            this.arrayPrevious.push({ idPrevious: element._id, nameSubject: element.asignatura.nombre, teacher: element.asignatura.nombreDoc, credits: element.asignatura.creditos, approvalType: element.tipo, approvalPrevious: element.asignatura.apruebaPor });
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
