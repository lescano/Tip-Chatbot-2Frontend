import { Component, OnInit,OnDestroy } from '@angular/core';
import { Asignatura } from '../../Clases/asignatura';
import { AsignaturaService } from '../../Services/asignatura.service';
import { UsuarioService } from '../../Services/usuario.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-agregar-asignatura-usuario',
  templateUrl: './agregar-asignatura-usuario.component.html',
  styleUrls: ['./agregar-asignatura-usuario.component.css']
})
export class AgregarAsignaturaUsuarioComponent implements OnInit , OnDestroy{

  asignaturas :Asignatura[];

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  
  constructor(private asignaturaService: AsignaturaService,
    private route: ActivatedRoute,
    private location: Location,
    private router:Router,
    private toastr: ToastrService,
    private usuarioService:UsuarioService) {}
    

  ngOnInit(): void {
    this.getAsignaturas();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 9,
      language:{
        url:'//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
      }
    };
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  getAsignaturas(): void {
    this.asignaturaService.getAsignaturas()
    .subscribe(asignaturas =>{
    this.asignaturas = asignaturas.data;
    this.dtTrigger.next();
    });
  }
  
  nuevoEstado(id,estado){
    this.usuarioService.nuevoEstadoAsignatura(id,estado)
    .subscribe(data =>{
      if(data.data == "Ya te has registrado a esta asignatura"){
        this.toastr.error(data.data);
      }else{
        this.toastr.success("Agregado con éxito");
        this.router.navigate(['/progreso']);
      }
 
      });
  }
  volver(){
    this.router.navigate(['/progreso']);
  }

}
