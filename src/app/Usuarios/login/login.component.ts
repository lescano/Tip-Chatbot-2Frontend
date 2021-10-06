import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../Clases/usuario';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { variablesGlobales } from "../../Services/variablesGlobales";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    datosMal: boolean;
    enviados: boolean;
    profileForm = new FormGroup({
        cedula: new FormControl('', [
            Validators.required,
            Validators.minLength(8)
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(4)
        ]),
    });

    constructor(private http: HttpClient,
        private router: Router,
        private auth: AuthService,
        private fb: FormBuilder,
        private toastr: ToastrService) {
        this.datosMal = false;
        this.enviados = false;
    }

    ngOnInit(): void {
    }

    login() {
        if (variablesGlobales.validateIdentificationNumber(this.profileForm.value.cedula) || this.profileForm.value.cedula == 'adminTip') {
            let documentToSend = this.profileForm.value.cedula;
            if (documentToSend == "adminTip")
                documentToSend = 11111111;

            this.enviados = true;
            this.auth.loginUser(documentToSend, this.profileForm.value.password)
                .subscribe(data => {
                    this.enviados = false;
                    if (data.ok) {
                        this.auth.setActualUser(data.usuario.id);
                        localStorage.setItem('soyAdmin', data.usuario.admin);
                        localStorage.setItem("token", data.token);
                        localStorage.setItem("usuario", data.usuario.nombre + " " + data.usuario.apellido);
                        window.location.reload();
                    } else {
                        this.datosMal = true;
                    }
                }
                );
        } else this.toastr.error("El documento ingresado no es valido.");
    }
}
