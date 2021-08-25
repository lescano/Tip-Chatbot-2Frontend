import { Component, OnInit } from '@angular/core';
import { Asignatura } from '../Clases/asignatura';
import { Previa } from '../Clases/previa';
import { AsignaturaService } from '../Services/asignatura.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-previaturas',
  templateUrl: './previaturas.component.html',
  styleUrls: ['./previaturas.component.css']
})
export class PreviaturasComponent implements OnInit {

  asignaturas :Asignatura[];
  previas:Previa[];
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  constructor(
    private asignaturaService: AsignaturaService){}

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

  getAsignaturas(): void {
    this.asignaturaService.getAsignaturas()
    .subscribe(asignaturas =>{
    this.asignaturas = asignaturas.data;
    this.dtTrigger.next();
    });
  }

}
