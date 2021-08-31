import { Component, OnInit } from '@angular/core';
import { Asignatura } from '../Clases/asignatura';
import { Usuario } from '../Clases/usuario';
import { Previa } from '../Clases/previa';
import { AsignaturaService } from '../Services/asignatura.service';
import { Subject } from 'rxjs';
import { AsignaturasAdminComponent } from '../Asignaturas/asignaturas-admin/asignaturas-admin.component';
import { FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';
import { PreviaService } from '../Services/previa.service';
import { ChatService } from '../Services/chat.service';
import { UsuarioService } from '../Services/usuario.service';



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

  usuarios: Usuario[];
  asignaturas :Asignatura[];
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  puede_cursar = "";
  asignatura = "";
  cedula_usuario = "";
  nombre_usuario = "";
  apellido_usuario = "";

  constructor(
    private asignaturaService: AsignaturaService,
    private previaService: PreviaService,
    private chatService: ChatService,
    private usuarioService: UsuarioService){}

  ngOnInit(): void {

    this.getUsuarios();
    this.getAsignaturas();
    this.getPrevia();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 9,
      language:{
        url:'//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
      }
    };

  }

  getUsuarios(): void {
    this.usuarioService.getUsuarios()
    .subscribe(
      usuarios =>{
        this.usuarios = usuarios.data;
        this.dtTrigger.next();
      }
    );
  }

  getAsignaturas(): void {
    this.asignaturaService.getAsignaturas()
    .subscribe(
      asignaturas =>{
        this.asignaturas = asignaturas.data;
        //console.log(asignaturas.data);
        this.dtTrigger.next();
      }
    );
  }

  //esta funcion se llama cuando se hace el submit del form
  getPrevia(){
    console.log("a"+this.previaForm.value.buscUsuarios);
    console.log("p"+this.previaForm.value.buscAsignatura);
    if(this.previaForm.value.buscUsuarios != "" && this.previaForm.value.buscAsignatura != ""){

      //en el value del form traigo todos los datos de la asignatura como del usuario para presentarlos mejor
      //datos asignatura
      let buscAsignatura = this.previaForm.value.buscAsignatura.split(":");
      let codigo_asignatura = buscAsignatura[0];
      this.asignatura = buscAsignatura[1];

      //datos 
      let buscUsuarios = this.previaForm.value.buscUsuarios.split(":");
      let id_usuario = buscUsuarios[0];
      this.cedula_usuario = buscUsuarios[1];
      this.nombre_usuario = buscUsuarios[2];
      this.apellido_usuario = buscUsuarios[3];
      this.chatService.cursada2(codigo_asignatura,id_usuario)
      .subscribe(
        dato =>{
          if(dato.Reply == "No, no estás en condiciones de realizar esta materia"){
            this.puede_cursar = "no se encuentra habilitado a cursar";
          }
          else{
            this.puede_cursar = "se encuentra habilitado a cursar";
          }
          this.dtTrigger.next();
        }
      );

      
      

    }
  }


}
