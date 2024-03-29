import { Component, OnInit } from '@angular/core';
import { Asignatura } from '../Clases/asignatura';
import { Usuario } from '../Clases/usuario';
import { AsignaturaService } from '../Services/asignatura.service';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ChatService } from '../Services/chat.service';
import { UsuarioService } from '../Services/usuario.service';
import { variablesGlobales } from '../Services/variablesGlobales';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
    selector: 'app-previaturas',
    templateUrl: './previaturas.component.html',
    styleUrls: ['./previaturas.component.css']
})
export class PreviaturasComponent implements OnInit {

    previaForm = new FormGroup({
        buscUsuarios: new FormControl('', [
            Validators.required
        ]),
        buscAsignatura: new FormControl('', [
            Validators.required
        ])
    });

    usuarios: Usuario[]; //listado de todos los usuarios
    asignaturas: Asignatura[]; //listado de todas las asignaturas
    dtOptions: DataTables.Settings = {};
    dtTrigger = new Subject();
    puede_cursar = "";
    codigo_asignatura;
    asignatura = ""; //se guarda el nombre de la asignatura que se buscó ej: Principios de programación
    id_usuario;
    cedula_usuario = "";
    nombre_usuario = "";
    apellido_usuario = "";
    asignaturas_pendientes;

    constructor(
        private asignaturaService: AsignaturaService,
        private chatService: ChatService,
        private router: Router,
        private toastr: ToastrService,
        private usuarioService: UsuarioService) {
        if (!variablesGlobales.getAdminValue())
            this.router.navigateByUrl('/inicio', {});
    }

    ngOnInit(): void {

        this.getUsuarios();
        this.getAsignaturas();
        this.getPrevia();
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 9,
            language: {
                url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
            }
        };

    }

    getUsuarios(): void {
        this.usuarioService.getUsuarios()
            .subscribe(
                usuarios => {
                    this.usuarios = usuarios.data;
                    this.dtTrigger.next();
                }
            );
    }

    getAsignaturas(): void {
        this.asignaturaService.getAsignaturas()
            .subscribe(
                asignaturas => {
                    this.asignaturas = asignaturas.data;
                    //console.log(asignaturas.data);
                    this.dtTrigger.next();
                }
            );
    }

    //esta funcion se llama cuando se hace el submit del form
    async getPrevia() {

        if (variablesGlobales.validateIdentificationNumber(this.previaForm.value.buscUsuarios)) {
            if (this.previaForm.value.buscAsignatura != "") {
                //en el value del form traigo todos los datos de la asignatura como del usuario para presentarlos mejor
                //datos asignatura
                let buscAsignatura = this.previaForm.value.buscAsignatura.split(":");
                this.codigo_asignatura = buscAsignatura[0];
                this.asignatura = buscAsignatura[1];

                //con la cedula del alumno que es la que traigo en el value, 
                //hago una consulta al backend para traer todos los dato de ese objeto usuario
                this.cedula_usuario = this.previaForm.value.buscUsuarios;

                let usuario_objeto;
                this.usuarioService.getUsuario(this.cedula_usuario).subscribe(data => {
                    usuario_objeto = data.usuario;
                    this.id_usuario = usuario_objeto.id;
                    this.nombre_usuario = usuario_objeto.nombre;
                    this.apellido_usuario = usuario_objeto.apellido;

                    //llamada al chat service para que resuva la consulta
                    this.chatService.cursada2(this.codigo_asignatura, usuario_objeto.id)
                        .subscribe(
                            dato => {
                                if (dato.Reply == "No, no estás en condiciones de realizar esta materia") {
                                    this.puede_cursar = "no se encuentra habilitado a cursar";
                                    this.buscarAsignaturasPendientes();
                                }
                                else {
                                    this.puede_cursar = "se encuentra habilitado a cursar";
                                }
                                this.dtTrigger.next();
                            }
                        );
                });
            }else this.toastr.error("Debe seleccionar una asignatura para verificar las previaturas del usuario seleccionado.");
        }else this.toastr.error("El documento ingresado no es valido, por favor vuelva a ingresarlo.");
    }


    //esta funcion es la que trae cuales materias le faltan cursar al alumno,
    //que son previas de la materia que se buscó antes
    buscarAsignaturasPendientes() {
        this.usuarioService.getAsignaturasPendientes(this.id_usuario, this.codigo_asignatura)
            .subscribe(data => {
                this.asignaturas_pendientes = data.Reply;
            });

    }
}
