import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { AsignaturaService } from 'src/app/Services/asignatura.service';
import { variablesGlobales } from 'src/app/Services/variablesGlobales';
import { Router } from '@angular/router';
@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
    public id: string;
    nombre: string;
    apellido: string;
    cedula: string;
    activoTelegram: boolean;
    editando: boolean;

    arraySubjectProgress: Array<any> = [];
    asignaturas = new Array();
    estados = new Array();

    cambiandoContrasenia: boolean;
    editandoPerfil: boolean;

    //contraseña
    actual: string;
    nueva: string;
    confirmar: string;
    noCoinciden: boolean;
    actualIncorrecta: boolean;


    profileForm = new FormGroup({
        cedula: new FormControl('', [
            Validators.required,
            Validators.minLength(8)
        ]),
        nombre: new FormControl('',
            Validators.required
        ),
        apellido: new FormControl('',
            Validators.required
        ),
    });
    passwdForm = new FormGroup({
        actual: new FormControl('', [
            Validators.required,
        ]),
        nueva: new FormControl('', [
            Validators.required,
            Validators.minLength(6)
        ]),
        confirmar: new FormControl('',
            Validators.required
        ),
    });

    constructor(private authService: AuthService, private usuarioService: UsuarioService, private asignaturaService: AsignaturaService, private toastr: ToastrService) {
        this.cambiandoContrasenia = false;
        this.id = this.authService.getActualUser();
        this.obtenerDatos();

    }

    ngOnInit(): void {
        this.editando = false;
        this.id = this.authService.getActualUser();
        this.obtenerDatos();
        this.noCoinciden = false;
        this.actualIncorrecta = false;
        this.getAsignaturas();
    }

    getAsignaturas(): void {
        this.authService.getUser().subscribe(data => {
            data.usuario.usuarioAsignaturas.forEach(element => {
                console.log(element)
                this.usuarioService.getUsuarioAsignatura(element)
                    .subscribe(dataStatus => {
                        this.asignaturaService.getDetalleAsignatura(dataStatus.usuarioAsignatura.asignatura)
                            .subscribe(dataInfoSubject => {
                                this.arraySubjectProgress.push({
                                    subject: dataInfoSubject.asignatura.nombre,
                                    credits: dataInfoSubject.asignatura.creditos,
                                    teacher: dataInfoSubject.asignatura.nombreDoc,
                                    approval: dataInfoSubject.asignatura.apruebaPor,
                                    state: dataStatus.usuarioAsignatura.estado
                                });
                            })
                    });
            });
        })
    }

    obtenerDatos() {
        this.authService.getUser().subscribe(data => {
            console.log(data)
            this.nombre = data.usuario.nombre;
            this.apellido = data.usuario.apellido;
            this.cedula = data.usuario.cedula;
            console.log(data.usuario);
            if (data.usuario.activo_telegram == false && data.usuario.id_telegram != "") {
                this.activoTelegram = false;
            }
            else {
                this.activoTelegram = true;
            }
        })
    }

    editar() {
        this.authService.updateUser(this.profileForm.value.cedula, this.profileForm.value.nombre, this.profileForm.value.apellido).subscribe(data => {
            if (data.data == "Usuario modificado con exito") {
                this.habilitarEditarPerfil();
                this.toastr.success(data.data);
            } else {
                this.toastr.success(data.data);
            }
            localStorage.setItem("usuario", this.profileForm.value.nombre + " " + this.profileForm.value.apellido);
        })
    }

    habilitarCambiarContrasenia() {
        this.cambiandoContrasenia = !this.cambiandoContrasenia;
        //this.editandoPerfil=!this.cambiandoContrasenia;
    }

    habilitarEditarPerfil() {
        this.obtenerDatos();
        this.editandoPerfil = !this.editandoPerfil;
    }


    cambiarContrasenia() {
        if (this.passwdForm.value.nueva == this.passwdForm.value.confirmar) {
            this.noCoinciden = false;

            this.authService.updateContrasenia(this.passwdForm.value.actual, this.passwdForm.value.nueva).subscribe(data => {
                if (data.data == "La contraseña actual es incorrecta") {
                    this.actualIncorrecta = true;
                    this.cambiandoContrasenia = true;
                } else {
                    this.toastr.success(data.data);
                    this.noCoinciden = false;
                    this.actualIncorrecta = false;
                    this.cambiandoContrasenia = false;
                    this.confirmar = "";
                    this.actual = "";
                    this.nueva = "";
                }
            })
        } else {
            this.actualIncorrecta = false;
            this.noCoinciden = true;
        }
    }

    eliminarUsuario() {
        if (confirm("Estas seguro que desea eliminar la cuenta? esta accion es permantente")) {
            this.authService.eliminarUsuario().subscribe(data => {
                this.toastr.success(data.data);
                this.authService.logOut();
            })
        }
    }

    verificarTelegram() {
        //console.log("ok");
        this.usuarioService.verificarUsuarioTelegram(this.id, true)
            .subscribe((res) => {
                if (!res.ok) {
                    console.log(res.err);
                    this.toastr.error("Ha ocurrido un error, por favor intente nuevamente más tarde.");
                }
                this.activoTelegram = true;
                this.toastr.success("Se ha activado su usuario de Telegram");
            })
    }

}
