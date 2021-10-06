import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../Clases/usuario';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AsignaturaService } from '../../Services/asignatura.service';
import { ToastrService } from 'ngx-toastr';
import { variablesGlobales } from 'src/app/Services/variablesGlobales';

@Component({
    selector: 'app-nueva-asignatura',
    templateUrl: './nueva-asignatura.component.html',
    styleUrls: ['./nueva-asignatura.component.css']
})
export class NuevaAsignaturaComponent implements OnInit {
    profileForm = new FormGroup({
        codigo: new FormControl('', [
            Validators.required,
            Validators.maxLength(4)
        ]),
        nombre: new FormControl('', [
            Validators.required,
            Validators.maxLength(50),
        ]),
        creditos: new FormControl('', [
            Validators.required,
            Validators.max(20),
            Validators.min(1)
        ]),
        apruebaPor: new FormControl('', [
            Validators.required
        ]),
        semestre: new FormControl('', [
            Validators.required
        ]),
        nombreDocente: new FormControl('', [
            Validators.required
        ]),
        correoDocente: new FormControl('', [
            Validators.required,
            Validators.email,
        ]),
        fechaInscripcion: new FormControl('', [
            Validators.required
        ]),
    });
    constructor(private http: HttpClient,
        private router: Router,
        private auth: AuthService,
        private fb: FormBuilder,
        private asignaturaService: AsignaturaService,
        private toastr: ToastrService) {
        if (!variablesGlobales.getAdminValue())
            this.router.navigateByUrl('/inicio', {});
    }

    ngOnInit(): void {

    }

    addAsig() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(String(this.profileForm.value.correoDocente).toLowerCase())) {
            this.toastr.error("No has ingresado un correo electrónico válido");
        } else {
            this.asignaturaService.getSubjectByCode(this.profileForm.value.codigo).subscribe(responseCode => {
                if (!responseCode.result) {
                    this.asignaturaService.getSubjectByName(this.profileForm.value.nombre).subscribe(responseName => {
                        console.log(responseName)
                        if (!responseName.result) {
                            this.asignaturaService.nuevaAsignatura(
                                this.profileForm.value.codigo,
                                this.profileForm.value.nombre,
                                this.profileForm.value.creditos,
                                this.profileForm.value.programa,
                                this.profileForm.value.apruebaPor,
                                this.profileForm.value.semestre,
                                this.profileForm.value.nombreDocente,
                                this.profileForm.value.correoDocente,
                                this.profileForm.value.fechaInscripcion
                            ).subscribe(data => {
                                this.toastr.success(data.data);
                                this.router.navigate(['/asignaturasAdmin']);
                            });
                        }else{
                            this.toastr.error("Ya existe una asignatura con el nombre que intenta ingresar.");
                        }
                    });
                } else {
                    this.toastr.error('El codigo ingresado pertenece a otra asignatura.');
                }
            });
        }



    }
    cancelar() {
        /*this.nombre:string;
        this.cedula:string;
        this.apellido:string;
        this.password:string;
        this.admin:boolean;*/
        this.router.navigate(['/asignaturasAdmin']);
    }
}
