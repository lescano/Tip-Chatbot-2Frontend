import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../Clases/usuario';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import {Router} from '@angular/router';
import { Location } from '@angular/common';
import {AuthService} from '../../Services/auth.service';
import { FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';
import {AsignaturaService} from '../../Services/asignatura.service';
import { Horario } from '../../Clases/horario';
import { Evaluacion } from '../../Clases/evualuacion';
import { Asignatura } from '../../Clases/asignatura';
import { ToastrService } from 'ngx-toastr';
 
@Component({
  selector: 'app-nueva-evaluacion',
  templateUrl: './nueva-evaluacion.component.html',
  styleUrls: ['./nueva-evaluacion.component.css']
})
export class NuevaEvaluacionComponent implements OnInit {
  creandoLab:boolean;
  asignatura:Asignatura;
  profileForm = new FormGroup({
    nombre: new FormControl('',[
      Validators.required,
    ]),
    fecha: new FormControl('',[
      Validators.required,
      ]),
    tipo: new FormControl('',[
      Validators.required,
      ]), 
      fechaEntrega: new FormControl('',[
      //Validators.required,
      ]),
      fechaDefensa: new FormControl('',[
        //Validators.required,
        ]),
  });
  asignaturas :Asignatura[];

  constructor(private http: HttpClient,
    private router: Router,
    private auth: AuthService,
    private fb: FormBuilder,
    private asignaturaService:AsignaturaService,
    private _location: Location,
    private toastr:ToastrService) { 
      const navigation = this.router.getCurrentNavigation();
      this.asignatura= navigation.extras.state.asignatura;
      this.creandoLab=false;
    }

  ngOnInit(): void {
  }
  addEvaluacion(){
    this.asignaturaService.nuevaEvaluacion(
      this.profileForm.value.nombre,
      this.profileForm.value.fecha,
      this.profileForm.value.tipo,
      this.profileForm.value.fechaEntrega,
      this.profileForm.value.fechaDefensa,
      this.asignatura.id
      ).subscribe(data => {
      this.toastr.success(data.data);
      this.asignaturaService.getAsignaturas()
    .subscribe(asignaturas =>{
    this.asignaturas = asignaturas.data;
    for(let i=0;i<this.asignaturas.length;i++){
      if(this.asignaturas[i].id == this.asignatura.id){
        this.asignatura = this.asignaturas[i];
        this.router.navigateByUrl('/evaluaciones', { state: { asignatura: this.asignatura } });
      }
    }
       // this.router.navigateByUrl('/evaluaciones', { state: { asignatura: this.asignatura } });
      });
    
     // this.router.navigateByUrl('/evaluaciones', { state: { asignatura: this.asignatura } });
    }
    );
    
  }
  cancelar(){
    this._location.back();
  }
  select(value: string){
    if(value=="Laboratorio"){
      this.creandoLab=true;
    }else{
      this.creandoLab=false;
    }
  }
}
