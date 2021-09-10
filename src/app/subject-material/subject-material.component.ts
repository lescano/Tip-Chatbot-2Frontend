import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { AsignaturaService } from '../Services/asignatura.service';

@Component({
    selector: 'app-subject-material',
    templateUrl: './subject-material.component.html',
    styleUrls: ['./subject-material.component.css']
})
export class SubjectMaterialComponent implements OnInit {

    idSubject: String;
    newMaterial = new FormGroup({
        titleMaterial: new FormControl('', Validators.required),
        urlMaterial: new FormControl('', Validators.required),
        descriptionMaterial: new FormControl('', Validators.required)
    });

    constructor(
        private router: Router,
        private asignaturaService: AsignaturaService,
        private toastr: ToastrService,
        private _location: Location
    ) {
        const navigation = this.router.getCurrentNavigation();
        if (navigation.extras.state)
            this.idSubject = navigation.extras.state.asignatura._id;
        else
            this.router.navigateByUrl('/asignaturasAdmin', {});
    }

    ngOnInit(): void {
    }

    createSubjectMaterial() {
        this.asignaturaService.newSubjectMaterial(
            this.idSubject,
            this.newMaterial.value.titleMaterial,
            this.newMaterial.value.urlMaterial,
            this.newMaterial.value.descriptionMaterial
        ).subscribe(data => {
            this.toastr.success(data.result);
        });
        this._location.back();
    }
}
