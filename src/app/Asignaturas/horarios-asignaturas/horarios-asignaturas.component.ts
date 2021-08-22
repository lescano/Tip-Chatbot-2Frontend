import { Component, OnInit } from '@angular/core';
import { Asignatura } from '../../Clases/asignatura';
import { AsignaturaService } from '../../Services/asignatura.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { Horario } from '../../Clases/horario';
import { ToastrService } from 'ngx-toastr';
 
@Component({
  selector: 'app-horarios-asignaturas',
  templateUrl: './horarios-asignaturas.component.html',
  styleUrls: ['./horarios-asignaturas.component.css']
})
export class HorariosAsignaturasComponent implements OnInit {
  asignatura:Asignatura;
  horarios:Array<Horario>;
  cont:number;
  constructor(private router:Router,
    private asignaturaService:AsignaturaService,
    private toastr:ToastrService) { 
    const navigation = this.router.getCurrentNavigation();
    this.asignatura= navigation.extras.state.asignatura;
    this.horarios=new Array();
    //this.getHorarios();
  }

  ngOnInit(): void {
    this.cont=0;
    this.getHorarios();
  }
  getHorarios(){
    this.cont=0;
    for (let horario of this.asignatura.horarios) {
        this.asignaturaService.getHorario(horario).subscribe(data => {
        this.horarios.push(data.horario);   
        this.cont+=1;
        })

    }
  }
  eliminarHorario(id,i){
      this.asignaturaService.borrarHorario(id).subscribe(data => {
        this.toastr.success(data.data);
        if(data.data=="Horario eliminado con exito"){
          if (i !== -1) {
              this.horarios.splice(i, 1);
          }   
        }
      })
  }
  editarHorario(horario){
    this.router.navigateByUrl('/verHorario', { state: { horario: horario } });
  }
  nuevoHorario(){
    this.router.navigateByUrl('/nuevoHorario', { state: { asignatura: this.asignatura } });
  }
  volver(){
    this.router.navigateByUrl('/asignaturasAdmin', { state: { asignatura: this.asignatura } });
  }

}
