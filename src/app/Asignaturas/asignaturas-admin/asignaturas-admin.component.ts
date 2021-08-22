import { Component, OnInit ,OnDestroy } from '@angular/core';
import { Asignatura } from '../../Clases/asignatura';
import { AsignaturaService } from '../../Services/asignatura.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
 
@Component({
  selector: 'app-asignaturas-admin',
  templateUrl: './asignaturas-admin.component.html',
  styleUrls: ['./asignaturas-admin.component.css']
})
export class AsignaturasAdminComponent implements OnInit, OnDestroy {
  asignaturas :Asignatura[];

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  constructor(private asignaturaService: AsignaturaService,
    private route: ActivatedRoute,
    private location: Location,
    private router:Router,
    private toastr: ToastrService) {}
    

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
  goBack(): void {
    this.router.navigateByUrl('/menuadmin');
  }
  editarSelect(asignatura){
    this.router.navigateByUrl('/verAsignatura', { state: { asignatura: asignatura } });
  }

  editarHorarios(asignatura){
    this.router.navigateByUrl('/horarios', { state: { asignatura: asignatura } });
  }
  borrarSelect(asignatura,i){
    if(confirm("Estas seguro que desea eliminar esta asignatúra? esta accion es permantente")){
    this.asignaturaService.borrarAsignatura(asignatura).subscribe(data => {
      this.toastr.success(data.data);
      if(data.data=="Asignatura eliminada con exito"){
        if (i !== -1) {
            this.asignaturas.splice(i, 1);
        }   
      }
      this.getAsignaturas();
    })
  }}
  editarEvaluaciones(asignatura){
    this.router.navigateByUrl('/evaluaciones', { state: { asignatura: asignatura } });
  }

}
