import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsignaturaService } from '../Services/asignatura.service';
import { ToastrService } from 'ngx-toastr';

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

    constructor(
        private asignaturaService: AsignaturaService,
        private router: Router,
        private toastr: ToastrService
    ) {
        const navigation = this.router.getCurrentNavigation();
        if (navigation.extras.state) {
            this.subjectSelected = navigation.extras.state.asignatura;
            let date = new Date(this.subjectSelected.fechaInscripcion);
            let day = (date.getDate() + 1).toString();
            if (parseInt(day) < 10)
                day = "0" + day;
            this.fechaInscripcion = day + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
            this.getSubjectDetail(this.subjectSelected._id);
        } else this.router.navigateByUrl('/asignaturasAdmin', {});

    }

    ngOnInit(): void {

    }

    getSubjectDetail(idSubjectSelected) {
        this.asignaturaService.getSubjectDetail(idSubjectSelected).subscribe(data => {
            console.log(data)
            if (data.result) {
                this.loadTableMaterials(data.result.materiales)
            } else this.router.navigateByUrl('/asignaturasAdmin', {});
        });
    }

    loadTableMaterials(listMaterials) {
        listMaterials.forEach(element => {
            this.arrayMaterials.push({ titulo: element.titulo, descripcion: element.descripcion, url: element.url });
        });
    }

    goToCreateMaterial() {
        this.router.navigateByUrl('/material-asignatura', { state: { asignatura: this.subjectSelected } });
    }

    editarSelect() {
        this.router.navigateByUrl('/verAsignatura', { state: { asignatura: this.subjectSelected } });
    }

    editarHorarios() {
        this.router.navigateByUrl('/horarios', { state: { asignatura: this.subjectSelected } });
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
        this.router.navigateByUrl('/evaluaciones', { state: { asignatura: this.subjectSelected } });
    }

}
