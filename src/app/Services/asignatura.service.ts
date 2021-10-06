import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { variablesGlobales } from './variablesGlobales';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AsignaturaService {

    constructor(
        private http: HttpClient,
        private router: Router,
        private auth: AuthService
    ) { }

    deletePrevious(idSubject, idPrevious) {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + "asignaturas/deletePrevia",
            { idSubject: idSubject, idPrevious: idPrevious });
    }

    nuevaPrevia(idSubject, idSubjectPrevious, typeAprov) {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + "asignaturas/nuevaPrevia",
            { idSubject: idSubject, idSubjectPrevious: idSubjectPrevious, typeAprov: typeAprov });
    }

    getSubjectByName(nameSubject) {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'asignaturas/getSubjectByName', { nameSubject: nameSubject });
    }

    getSubjectByCode(codeSubject) {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'asignaturas/getSubjectByCode', { codeSubject: codeSubject });
    }

    getSubjectDetail(idSubject) {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'asignaturas/getSubjectDetail', { idSubject: idSubject });
    }

    getDetailSubjectMaterial(idMaterial) {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'asignaturas/getDetailSubjectMaterial', { idMaterial: idMaterial });
    }

    newHistorySubjectMaterial(idSubjectMaterial, codeSubject, currentDate, currentTime) {
        let idUser = this.auth.getActualUser();
        let arrayCurrentDate = currentDate.split('/');
        currentDate = arrayCurrentDate[2] + "" + arrayCurrentDate[1] + "" + arrayCurrentDate[0];
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'asignaturas/newHistorySubjectMaterial',
            { idUser: idUser, codeSubject: codeSubject, idSubjectMaterial: idSubjectMaterial, currentDate: currentDate, currentTime: currentTime });
    }

    newSubjectMaterial(idSubject, titleMaterial, urlMaterial, descriptionMaterial) {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'asignaturas/insertSubjectMaterial',
            { idSubject: idSubject, titleMaterial: titleMaterial, url: urlMaterial, description: descriptionMaterial });
    }

    getSubjectMaterials(codeSubject) {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'asignaturas/getSubjectMaterials', { codeSubject: codeSubject });
    }

    nuevaAsignatura(codigo, nombre, creditos, programa, apruebaPor, semestre, nombreDocente, correoDocente, fechaIncripcion) {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'asignaturas/nueva', {
            codigo: codigo,
            nombre: nombre,
            creditos: creditos,
            programa: programa,
            apruebaPor: apruebaPor,
            semestre: semestre,
            nombreDoc: nombreDocente,
            correoDoc: correoDocente,
            fechaInscripcion: fechaIncripcion,
        });
    }

    getAsignaturas() {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'asignaturas/listado', {});
    }

    editarAsignatura(asignatura) {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'asignaturas/update', {
            id: asignatura.id,
            codigo: asignatura.codigo,
            nombre: asignatura.nombre,
            creditos: asignatura.creditos,
            programa: asignatura.programa,
            apruebaPor: asignatura.apruebaPor,
            nombreDoc: asignatura.nombreDoc,
            correoDoc: asignatura.correoDoc,
            fechaInscripcion: asignatura.fechaInscripcion,
        });
    }

    borrarAsignatura(id) {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'asignaturas/delete', {
            id: id,
        });
    }

    getHorario(id) {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'asignaturas/detalleHorario', {
            id: id,
        });
    }

    editarHorario(horario) {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'asignaturas/updateHorario', {
            id: horario.id,
            semestre: horario.semestre,
            dia: horario.dia,
            horaDesde: horario.horaDesde,
            horaHasta: horario.horaHasta,
        }
        );
    }

    nuevoHorario(semestre, dia, horaDesde, horaHasta, asignatura) {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'asignaturas/nuevoHorario', {
            semestre: semestre,
            dia: dia,
            horaDesde: horaDesde,
            horaHasta: horaHasta,
            idAsig: asignatura,
        });
    }

    borrarHorario(id) {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'asignaturas/deleteHorario', {
            id: id,
        });
    }

    getEvaluacion(id) {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'asignaturas/detalleEvaluacion', {
            id: id,
        });
    }

    nuevaEvaluacion(nombre, fecha, tipo, fechaEntrega, fechaDefensa, id) {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'asignaturas/nuevaEvaluacion', {
            nombre: nombre,
            fecha: fecha,
            tipo: tipo,
            fechaEntrega: fechaEntrega,
            fechaDefensa: fechaDefensa,
            idAsig: id
        });
    }

    borrarEvaluacion(id, tipo) {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'asignaturas/deleteEvaluacion', {
            id: id,
            tipo: tipo
        });
    }

    getAsignaturasNoVinculadas(idSubject) {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'asignaturas/getAsignaturasNoVinculadas',
            { idSubject: idSubject });
    }

    getDetalleAsignatura(id) { ///detalle
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'asignaturas/detalle', {
            id: id,
        });
    }


}
