import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../Clases/usuario';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { variablesGlobales } from 'src/app/Services/variablesGlobales';

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
        if (variablesGlobales.validateIdentificationNumber(this.profileForm.value.cedula)) {
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

    cancelar() {
        this.router.navigate(['/inicio']);
    }
}
