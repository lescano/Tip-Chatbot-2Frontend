import { Component, OnInit } from '@angular/core';
import { Asignatura } from '../../Clases/asignatura';
import { AsignaturaService } from '../../Services/asignatura.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { Horario } from '../../Clases/horario';
import { ToastrService } from 'ngx-toastr';
import { Evaluacion } from 'src/app/Clases/evualuacion';
 
@Component({
  selector: 'app-evaluaciones-asignatura',
  templateUrl: './evaluaciones-asignatura.component.html',
  styleUrls: ['./evaluaciones-asignatura.component.css']
})
export class EvaluacionesAsignaturaComponent implements OnInit {

  asignatura:Asignatura;
  evaluaciones:Array<Evaluacion>;
  cont:number;
  constructor(private router:Router,
    private asignaturaService:AsignaturaService,
    private toastr:ToastrService) { 
    const navigation = this.router.getCurrentNavigation();
    this.asignatura= navigation.extras.state.asignatura;
    this.evaluaciones=new Array();
   // this.getEvaluaciones();
  }

  async ngOnInit(): Promise<any> {
    this.cont=0;
    await this.getEvaluaciones();
  }
  async getEvaluaciones(){
    this.cont=0;
    for (let evaluacion of this.asignatura.evaluaciones) {

        this.asignaturaService.getEvaluacion(evaluacion).subscribe(data => {
        this.evaluaciones.push(data.evaluacion);   
        this.cont+=1;
        })

    }
    
  }
  eliminarEvaluacion(ev,i){
      this.asignaturaService.borrarEvaluacion(ev.id,ev.tipo).subscribe(data => {
        this.toastr.success(data.data);
        if(data.data=="Evaluacion eliminada con exito"){
          if (i !== -1) {
              this.evaluaciones.splice(i, 1);
          }   
        }
      })
  }
  nuevaEvaluacion(){
    this.router.navigateByUrl('/nuevaEvaluacion', { state: { asignatura: this.asignatura } });
  }
  volver(){
    this.router.navigateByUrl('/asignaturasAdmin', { state: { asignatura: this.asignatura } });
  }


}
