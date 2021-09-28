import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../Clases/usuario';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    contraseniaDiferente: boolean;
    profileForm = new FormGroup({
        cedula: new FormControl('', [
            Validators.required,
            Validators.minLength(8)
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(6)
        ]),
        nombre: new FormControl('', [
            Validators.required,
        ]),
        apellido: new FormControl('', [
            Validators.required,
        ]),
        repassword: new FormControl('', [
            Validators.required

        ]),
    });
    admin: boolean;



    constructor(private http: HttpClient,
        private router: Router,
        private auth: AuthService,
        private fb: FormBuilder,
        private toastr: ToastrService) { }

    ngOnInit(): void {
    }

    addUser() {
        if (this.validateIdentificationNumber(this.profileForm.value.cedula)) {
            if (this.profileForm.value.password == this.profileForm.value.repassword) {
                this.auth.registerUser(this.profileForm.value.cedula,
                    this.profileForm.value.nombre,
                    this.profileForm.value.apellido,
                    this.profileForm.value.password
                )
                    .subscribe(data => {
                        if (data.data == "La cédula ya ha sido registrada") {
                            this.toastr.error(data.data);
                        } else {
                            this.toastr.success(data.data);
                            if (data.data == "Usuario agregado con éxito") {
                                this.contraseniaDiferente = false;
                                this.router.navigate(['/inicio']);
                            }
                        }
                    }
                    );
            } else {
                this.contraseniaDiferente = true;
            }
        } else this.toastr.error("La cédula ingresada no es valida");

    }

    validateIdentificationNumber: (idNumber: string | number) => boolean = idNumber => {
        const ci = typeof idNumber === 'number' ? idNumber.toString() : idNumber;

        if (ci.length < 7 || ci.length > 8)
            return false;

        const cleanNumber = ci.replace(/\D/g, '');
        const possibleValidationDigit = parseInt(
            cleanNumber[cleanNumber.length - 1],
            10
        );

        const validableNumber = cleanNumber.replace(/[0-9]$/, '');
        const actualValidationDigit = this.generateValidationDigit(validableNumber);

        return possibleValidationDigit === actualValidationDigit;
    };

    generateValidationDigit: (idNumber: string | number) => number = idNumber => {
        let ci = typeof idNumber === 'number' ? idNumber.toString() : idNumber;

        for (let i = 0; i < 7 - ci.length; i++)
            ci = '0' + ci;

        return this.safeGenerateValidationDigit(ci);
    };

    safeGenerateValidationDigit: (idNumber: string) => number = idNumber => {
        let ci = idNumber;
        let sum = 0;

        for (let i = 0; i < 7; i++)
            sum += parseInt('2987634'[i]) * parseInt(ci[i]);

        if (sum % 10 === 0)
            return 0;

        return 10 - (sum % 10);
    };

    cancelar() {
        this.router.navigate(['/inicio']);
    }
}
