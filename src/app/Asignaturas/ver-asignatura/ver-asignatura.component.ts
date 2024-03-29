import { Component, OnInit } from '@angular/core';
import { Asignatura } from '../../Clases/asignatura';
import { AsignaturaService } from '../../Services/asignatura.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { variablesGlobales } from 'src/app/Services/variablesGlobales';

@Component({
    selector: 'app-ver-asignatura',
    templateUrl: './ver-asignatura.component.html',
    styleUrls: ['./ver-asignatura.component.css']
})
export class VerAsignaturaComponent implements OnInit {
    asignatura: Asignatura;
    asignaturaEditar: Asignatura;
    fecha: String;
    profileForm = new FormGroup({
        codigo: new FormControl('', [
            Validators.required,
            Validators.maxLength(4)
        ]),
        nombre: new FormControl('', [
            Validators.required,
            Validators.maxLength(50)
        ]),
        creditos: new FormControl('', [
            Validators.required,
            Validators.max(20),
            Validators.min(1)
        ]),
        apruebaPor: new FormControl('',
            Validators.required
        ),
        nombreDocente: new FormControl('', [
            Validators.required,
            Validators.maxLength(50)
        ]),
        correoDocente: new FormControl('', [
            Validators.required,
            Validators.email
        ]),
        fechaInscripcion: new FormControl('',
            Validators.required
        )
    });

    constructor(private router: Router,
        private subjectService: AsignaturaService,
        private toastr: ToastrService) {

        if (!variablesGlobales.getAdminValue())
            this.router.navigateByUrl('/inicio', {});

        const navigation = this.router.getCurrentNavigation();
        if (navigation.extras.state) {
            this.asignatura = navigation.extras.state.asignatura;

            this.asignaturaEditar = this.asignatura;

            let f = new Date(this.asignaturaEditar.fechaInscripcion);
            let dia = (f.getDate() + 1).toString();
            if (parseInt(dia) < 10) {
                dia = "0" + dia;
            }
            this.fecha = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + dia;
        } else this.router.navigateByUrl('/asignaturasAdmin');
    }

    ngOnInit(): void {

    }

    editarAsignatura() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(String(this.profileForm.value.correoDocente).toLowerCase())) {
            this.toastr.error("No has ingresado un correo electrónico válido");
        } else {
            this.asignatura.codigo = this.profileForm.value.codigo
            this.subjectService.getSubjectByName(this.profileForm.value.nombre).subscribe(responseName => {
                if (responseName.result) {
                    if (responseName.result.codigo != this.profileForm.value.codigo) {
                        this.toastr.error("El nombre de asignatura que intenta utililizar ya fue asignado.");
                        return;
                    }
                }

                this.asignaturaEditar.nombre = this.profileForm.value.nombre;
                this.asignaturaEditar.creditos = this.profileForm.value.creditos;
                this.asignaturaEditar.apruebaPor = this.profileForm.value.apruebaPor;
                this.asignaturaEditar.nombreDoc = this.profileForm.value.nombreDocente;
                this.asignaturaEditar.correoDoc = this.profileForm.value.correoDocente;
                this.asignaturaEditar.fechaInscripcion = this.profileForm.value.fechaInscripcion;
                this.subjectService.editarAsignatura(this.asignaturaEditar).subscribe(data => {
                    this.toastr.success(data.data);
                    this.router.navigateByUrl('/asignaturasAdmin');
                });
            });
        }
    }

    volver() {
        this.router.navigateByUrl('/asignaturasAdmin');
    }
}
